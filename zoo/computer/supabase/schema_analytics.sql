-- Usage Records Table for Analytics
CREATE TABLE IF NOT EXISTS usage_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    reservation_id UUID,
    gpu_type VARCHAR(100) NOT NULL,
    hours_used DECIMAL(10, 2) NOT NULL,
    compute_units DECIMAL(10, 2) NOT NULL,
    cost_usd DECIMAL(10, 2) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_usage_records_user_id ON usage_records(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_records_timestamp ON usage_records(timestamp);
CREATE INDEX IF NOT EXISTS idx_usage_records_user_timestamp ON usage_records(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_usage_records_gpu_type ON usage_records(gpu_type);

-- Enable Row Level Security
ALTER TABLE usage_records ENABLE ROW LEVEL SECURITY;

-- Policies for usage_records
CREATE POLICY "Users can view their own usage records" ON usage_records
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert usage records" ON usage_records
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Service role can update usage records" ON usage_records
    FOR UPDATE
    USING (true);

-- Function to get usage summary for a user
CREATE OR REPLACE FUNCTION get_user_usage_summary(p_user_id UUID)
RETURNS TABLE (
    total_hours DECIMAL,
    total_cost DECIMAL,
    total_compute_units DECIMAL,
    gpu_type VARCHAR,
    gpu_hours DECIMAL,
    gpu_cost DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    WITH summary AS (
        SELECT
            SUM(hours_used) as total_hours,
            SUM(cost_usd) as total_cost,
            SUM(compute_units) as total_compute_units
        FROM usage_records
        WHERE user_id = p_user_id
    ),
    by_gpu AS (
        SELECT
            gpu_type,
            SUM(hours_used) as gpu_hours,
            SUM(cost_usd) as gpu_cost
        FROM usage_records
        WHERE user_id = p_user_id
        GROUP BY gpu_type
    )
    SELECT
        s.total_hours,
        s.total_cost,
        s.total_compute_units,
        g.gpu_type,
        g.gpu_hours,
        g.gpu_cost
    FROM summary s
    CROSS JOIN by_gpu g;
END;
$$ LANGUAGE plpgsql;

-- Function to get monthly spending
CREATE OR REPLACE FUNCTION get_monthly_spending(p_user_id UUID, p_months INTEGER DEFAULT 6)
RETURNS TABLE (
    month TEXT,
    cost DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        TO_CHAR(DATE_TRUNC('month', timestamp), 'YYYY-MM') as month,
        SUM(cost_usd) as cost
    FROM usage_records
    WHERE user_id = p_user_id
        AND timestamp >= NOW() - INTERVAL '1 month' * p_months
    GROUP BY DATE_TRUNC('month', timestamp)
    ORDER BY month;
END;
$$ LANGUAGE plpgsql;

-- Sample data insertion (for testing)
-- This can be commented out in production
/*
INSERT INTO usage_records (user_id, gpu_type, hours_used, compute_units, cost_usd, timestamp, metadata)
SELECT
    (SELECT id FROM auth.users LIMIT 1),
    gpu_types.gpu,
    ROUND((RANDOM() * 10 + 1)::numeric, 2),
    ROUND((RANDOM() * 100 + 10)::numeric, 2),
    ROUND((RANDOM() * 50 + 5)::numeric, 2),
    NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 90),
    jsonb_build_object(
        'project', 'Project-' || FLOOR(RANDOM() * 5 + 1),
        'region', (ARRAY['us-west', 'us-east', 'eu-west'])[FLOOR(RANDOM() * 3 + 1)]
    )
FROM
    (SELECT unnest(ARRAY['NVIDIA H100', 'NVIDIA A100', 'NVIDIA A6000', 'NVIDIA RTX 4090', 'NVIDIA V100']) as gpu) as gpu_types,
    generate_series(1, 50) as n;
*/