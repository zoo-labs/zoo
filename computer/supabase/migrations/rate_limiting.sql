-- Rate Limiting Log Table
CREATE TABLE IF NOT EXISTS rate_limit_log (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    endpoint TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    success BOOLEAN DEFAULT true,
    response_time_ms INTEGER,
    user_agent TEXT,
    method TEXT,
    status_code INTEGER
);

-- Index for faster queries
CREATE INDEX idx_rate_limit_user_timestamp ON rate_limit_log(user_id, timestamp DESC);
CREATE INDEX idx_rate_limit_endpoint_timestamp ON rate_limit_log(endpoint, timestamp DESC);
CREATE INDEX idx_rate_limit_ip_timestamp ON rate_limit_log(ip_address, timestamp DESC);
CREATE INDEX idx_rate_limit_timestamp ON rate_limit_log(timestamp DESC);

-- Rate Limit Rules Table (for custom limits per user/endpoint)
CREATE TABLE IF NOT EXISTS rate_limit_rules (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    endpoint TEXT,
    requests_per_minute INTEGER DEFAULT 100,
    requests_per_hour INTEGER DEFAULT 1000,
    requests_per_day INTEGER DEFAULT 10000,
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, endpoint)
);

-- Rate Limit Violations Table (for tracking abuse)
CREATE TABLE IF NOT EXISTS rate_limit_violations (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    ip_address INET,
    endpoint TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    requests_attempted INTEGER,
    limit_exceeded INTEGER,
    blocked_until TIMESTAMP WITH TIME ZONE
);

-- Function to check rate limits
CREATE OR REPLACE FUNCTION check_rate_limit(
    p_user_id UUID,
    p_endpoint TEXT,
    p_ip_address INET
) RETURNS TABLE(
    allowed BOOLEAN,
    remaining_requests INTEGER,
    reset_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
    v_requests_per_minute INTEGER;
    v_requests_count INTEGER;
    v_custom_limit INTEGER;
BEGIN
    -- Check if user has custom limits
    SELECT requests_per_minute INTO v_custom_limit
    FROM rate_limit_rules
    WHERE user_id = p_user_id
      AND (endpoint = p_endpoint OR endpoint IS NULL)
      AND enabled = true
    ORDER BY endpoint DESC NULLS LAST
    LIMIT 1;

    -- Use custom limit or default
    v_requests_per_minute := COALESCE(v_custom_limit, 100);

    -- Count recent requests
    SELECT COUNT(*) INTO v_requests_count
    FROM rate_limit_log
    WHERE (user_id = p_user_id OR (user_id IS NULL AND ip_address = p_ip_address))
      AND endpoint = p_endpoint
      AND timestamp > NOW() - INTERVAL '1 minute';

    -- Log this request
    INSERT INTO rate_limit_log (user_id, endpoint, ip_address, timestamp, success)
    VALUES (p_user_id, p_endpoint, p_ip_address, NOW(), v_requests_count < v_requests_per_minute);

    -- Return result
    RETURN QUERY
    SELECT
        v_requests_count < v_requests_per_minute AS allowed,
        GREATEST(0, v_requests_per_minute - v_requests_count)::INTEGER AS remaining_requests,
        NOW() + INTERVAL '1 minute' AS reset_at;
END;
$$ LANGUAGE plpgsql;

-- Function to clean old logs (run daily)
CREATE OR REPLACE FUNCTION clean_old_rate_limit_logs() RETURNS void AS $$
BEGIN
    -- Delete logs older than 7 days
    DELETE FROM rate_limit_log
    WHERE timestamp < NOW() - INTERVAL '7 days';

    -- Delete violations older than 30 days
    DELETE FROM rate_limit_violations
    WHERE timestamp < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to clean old logs (requires pg_cron extension)
-- Run this if pg_cron is available:
-- SELECT cron.schedule('clean-rate-limit-logs', '0 2 * * *', 'SELECT clean_old_rate_limit_logs()');

-- Row Level Security Policies
ALTER TABLE rate_limit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limit_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limit_violations ENABLE ROW LEVEL SECURITY;

-- Admin users can view all logs
CREATE POLICY "Admin users can view all rate limit logs" ON rate_limit_log
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.uid() = id
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Users can view their own logs
CREATE POLICY "Users can view own rate limit logs" ON rate_limit_log
    FOR SELECT USING (auth.uid() = user_id);

-- Admin users can manage rate limit rules
CREATE POLICY "Admin users can manage rate limit rules" ON rate_limit_rules
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.uid() = id
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Admin users can view violations
CREATE POLICY "Admin users can view rate limit violations" ON rate_limit_violations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.uid() = id
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Create views for easier monitoring
CREATE OR REPLACE VIEW rate_limit_stats AS
SELECT
    endpoint,
    COUNT(*) as total_requests,
    COUNT(CASE WHEN success THEN 1 END) as successful_requests,
    COUNT(CASE WHEN NOT success THEN 1 END) as blocked_requests,
    AVG(response_time_ms) as avg_response_time,
    DATE_TRUNC('hour', timestamp) as hour
FROM rate_limit_log
WHERE timestamp > NOW() - INTERVAL '24 hours'
GROUP BY endpoint, DATE_TRUNC('hour', timestamp)
ORDER BY hour DESC, total_requests DESC;

CREATE OR REPLACE VIEW rate_limit_user_stats AS
SELECT
    u.email,
    u.id as user_id,
    COUNT(r.*) as total_requests,
    COUNT(CASE WHEN r.success THEN 1 END) as successful_requests,
    COUNT(CASE WHEN NOT r.success THEN 1 END) as blocked_requests,
    MAX(r.timestamp) as last_request
FROM auth.users u
LEFT JOIN rate_limit_log r ON u.id = r.user_id
WHERE r.timestamp > NOW() - INTERVAL '24 hours'
GROUP BY u.id, u.email
ORDER BY total_requests DESC;

-- Grant necessary permissions
GRANT SELECT ON rate_limit_stats TO authenticated;
GRANT SELECT ON rate_limit_user_stats TO authenticated;