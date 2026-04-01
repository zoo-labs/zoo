-- Webhook events table for idempotency
CREATE TABLE IF NOT EXISTS webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

-- Create index for quick lookup
CREATE INDEX idx_webhook_events_event_id ON webhook_events(event_id);
CREATE INDEX idx_webhook_events_processed ON webhook_events(processed);

-- Orders table for payment tracking
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_intent_id TEXT UNIQUE,
  checkout_session_id TEXT UNIQUE,
  customer_id TEXT,
  customer_email TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending',
  failure_reason TEXT,
  refund_id UUID,
  refunded_amount DECIMAL(10, 2),
  metadata JSONB,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for orders
CREATE INDEX idx_orders_payment_intent ON orders(payment_intent_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id TEXT UNIQUE NOT NULL,
  customer_id TEXT NOT NULL,
  status TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  last_payment_date TIMESTAMPTZ,
  active BOOLEAN DEFAULT TRUE,
  items JSONB NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for subscriptions
CREATE INDEX idx_subscriptions_subscription_id ON subscriptions(subscription_id);
CREATE INDEX idx_subscriptions_customer_id ON subscriptions(customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_active ON subscriptions(active);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  subscription_id TEXT,
  stripe_invoice_id TEXT UNIQUE,
  payment_intent_id TEXT,
  customer_id TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending',
  failure_reason TEXT,
  invoice_pdf TEXT,
  hosted_invoice_url TEXT,
  metadata JSONB,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for invoices
CREATE INDEX idx_invoices_order_id ON invoices(order_id);
CREATE INDEX idx_invoices_subscription_id ON invoices(subscription_id);
CREATE INDEX idx_invoices_stripe_invoice_id ON invoices(stripe_invoice_id);
CREATE INDEX idx_invoices_status ON invoices(status);

-- Refunds table
CREATE TABLE IF NOT EXISTS refunds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  charge_id TEXT NOT NULL,
  payment_intent_id TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending',
  reason TEXT,
  metadata JSONB,
  refunded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for refunds
CREATE INDEX idx_refunds_charge_id ON refunds(charge_id);
CREATE INDEX idx_refunds_payment_intent_id ON refunds(payment_intent_id);

-- Payment failures log
CREATE TABLE IF NOT EXISTS payment_failures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_intent_id TEXT,
  amount DECIMAL(10, 2),
  currency TEXT,
  error_message TEXT,
  error_code TEXT,
  customer_email TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for payment failures
CREATE INDEX idx_payment_failures_payment_intent ON payment_failures(payment_intent_id);
CREATE INDEX idx_payment_failures_customer_email ON payment_failures(customer_email);

-- Subscription changes log
CREATE TABLE IF NOT EXISTS subscription_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id TEXT NOT NULL,
  change_type TEXT NOT NULL,
  previous_data JSONB,
  new_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for subscription changes
CREATE INDEX idx_subscription_changes_subscription_id ON subscription_changes(subscription_id);

-- GPU access control table (for GPU subscriptions)
CREATE TABLE IF NOT EXISTS gpu_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id TEXT,
  customer_id TEXT,
  gpu_type TEXT,
  active BOOLEAN DEFAULT TRUE,
  terminated_at TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for GPU access
CREATE INDEX idx_gpu_access_subscription_id ON gpu_access(subscription_id);
CREATE INDEX idx_gpu_access_customer_id ON gpu_access(customer_id);
CREATE INDEX idx_gpu_access_active ON gpu_access(active);

-- Webhook retry log table
CREATE TABLE IF NOT EXISTS webhook_retry_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT NOT NULL,
  event_type TEXT,
  retried_at TIMESTAMPTZ NOT NULL,
  result TEXT NOT NULL,
  message TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for retry log
CREATE INDEX idx_webhook_retry_log_event_id ON webhook_retry_log(event_id);
CREATE INDEX idx_webhook_retry_log_result ON webhook_retry_log(result);

-- Add RLS policies
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_failures ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_changes ENABLE ROW LEVEL SECURITY;
ALTER TABLE gpu_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_retry_log ENABLE ROW LEVEL SECURITY;

-- Admin-only access policies (webhook events should only be accessible by service role)
CREATE POLICY "Service role only" ON webhook_events
  FOR ALL USING (auth.role() = 'service_role');

-- Orders can be viewed by the customer who made them
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.email() = customer_email);

CREATE POLICY "Service role full access to orders" ON orders
  FOR ALL USING (auth.role() = 'service_role');

-- Subscriptions can be viewed by the owner
CREATE POLICY "Users can view their own subscriptions" ON subscriptions
  FOR SELECT USING (
    customer_id IN (
      SELECT customer_id FROM orders WHERE customer_email = auth.email()
    )
  );

CREATE POLICY "Service role full access to subscriptions" ON subscriptions
  FOR ALL USING (auth.role() = 'service_role');

-- Invoices can be viewed by the owner
CREATE POLICY "Users can view their own invoices" ON invoices
  FOR SELECT USING (
    customer_id IN (
      SELECT customer_id FROM orders WHERE customer_email = auth.email()
    )
  );

CREATE POLICY "Service role full access to invoices" ON invoices
  FOR ALL USING (auth.role() = 'service_role');

-- Service role only for other tables
CREATE POLICY "Service role only for refunds" ON refunds
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role only for payment_failures" ON payment_failures
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role only for subscription_changes" ON subscription_changes
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role only for gpu_access" ON gpu_access
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role only for webhook_retry_log" ON webhook_retry_log
  FOR ALL USING (auth.role() = 'service_role');