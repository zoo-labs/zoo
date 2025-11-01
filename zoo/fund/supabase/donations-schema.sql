-- Donations table for 501(c)(3) compliance and record-keeping
-- Zoo Foundation EIN: 88-3538992

-- Create donations table for tracking all contributions
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    donor_id UUID REFERENCES auth.users(id),
    donor_email TEXT,
    donor_wallet TEXT,
    donor_name TEXT,
    donor_address TEXT,
    dao_id UUID REFERENCES public.daos(id),
    dao_name TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'ETH',
    usd_value NUMERIC,
    transaction_hash TEXT UNIQUE,
    multisig_address TEXT DEFAULT 'luxdefi.eth',
    designation TEXT NOT NULL,
    tax_deductible BOOLEAN DEFAULT TRUE,
    receipt_sent BOOLEAN DEFAULT FALSE,
    receipt_sent_at TIMESTAMP WITH TIME ZONE,
    receipt_email TEXT,
    acknowledgment_sent BOOLEAN DEFAULT FALSE,
    acknowledgment_date DATE,
    donation_date DATE DEFAULT CURRENT_DATE,
    fiscal_year INTEGER DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
    donation_type TEXT CHECK (donation_type IN ('crypto', 'cash', 'stock', 'property', 'other')) DEFAULT 'crypto',
    anonymous BOOLEAN DEFAULT FALSE,
    metadata JSONB,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donor information table for comprehensive record-keeping
CREATE TABLE IF NOT EXISTS public.donors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    email TEXT UNIQUE,
    wallet_address TEXT UNIQUE,
    full_name TEXT,
    organization_name TEXT,
    donor_type TEXT CHECK (donor_type IN ('individual', 'organization', 'foundation', 'corporate')) DEFAULT 'individual',
    mailing_address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    country TEXT DEFAULT 'USA',
    phone TEXT,
    email_opt_in BOOLEAN DEFAULT TRUE,
    total_donated NUMERIC DEFAULT 0,
    first_donation_date DATE,
    last_donation_date DATE,
    donation_count INTEGER DEFAULT 0,
    preferred_contact_method TEXT CHECK (preferred_contact_method IN ('email', 'mail', 'phone', 'none')) DEFAULT 'email',
    tax_exempt_status BOOLEAN DEFAULT FALSE,
    ein TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tax receipts table for IRS compliance
CREATE TABLE IF NOT EXISTS public.tax_receipts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    donation_id UUID REFERENCES public.donations(id) ON DELETE CASCADE,
    donor_id UUID REFERENCES public.donors(id),
    receipt_number TEXT UNIQUE NOT NULL,
    receipt_date DATE DEFAULT CURRENT_DATE,
    tax_year INTEGER NOT NULL,
    total_amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'ETH',
    usd_value NUMERIC,
    description TEXT,
    goods_or_services_provided BOOLEAN DEFAULT FALSE,
    goods_or_services_description TEXT,
    goods_or_services_value NUMERIC DEFAULT 0,
    deductible_amount NUMERIC,
    receipt_pdf_url TEXT,
    sent_via TEXT CHECK (sent_via IN ('email', 'mail', 'download')) DEFAULT 'email',
    sent_to TEXT,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Annual giving summary for major donors
CREATE TABLE IF NOT EXISTS public.annual_giving_summary (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    donor_id UUID REFERENCES public.donors(id),
    tax_year INTEGER NOT NULL,
    total_donations NUMERIC NOT NULL,
    total_usd_value NUMERIC,
    donation_count INTEGER NOT NULL,
    largest_donation NUMERIC,
    dao_breakdown JSONB,
    summary_sent BOOLEAN DEFAULT FALSE,
    summary_sent_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(donor_id, tax_year)
);

-- Functions for donation processing

-- Function to generate receipt number
CREATE OR REPLACE FUNCTION generate_receipt_number(year INTEGER)
RETURNS TEXT AS $$
DECLARE
    sequence_num INTEGER;
    receipt_num TEXT;
BEGIN
    -- Get next sequence number for the year
    SELECT COALESCE(MAX(CAST(SUBSTRING(receipt_number FROM 10) AS INTEGER)), 0) + 1
    INTO sequence_num
    FROM public.tax_receipts
    WHERE tax_year = year;

    -- Format: ZOO-YYYY-######
    receipt_num := FORMAT('ZOO-%s-%s', year, LPAD(sequence_num::TEXT, 6, '0'));

    RETURN receipt_num;
END;
$$ LANGUAGE plpgsql;

-- Function to process donation and create receipt
CREATE OR REPLACE FUNCTION process_donation_receipt(p_donation_id UUID)
RETURNS UUID AS $$
DECLARE
    v_receipt_id UUID;
    v_donation RECORD;
    v_receipt_number TEXT;
BEGIN
    -- Get donation details
    SELECT * INTO v_donation
    FROM public.donations
    WHERE id = p_donation_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Donation not found';
    END IF;

    -- Generate receipt number
    v_receipt_number := generate_receipt_number(v_donation.fiscal_year);

    -- Create tax receipt
    INSERT INTO public.tax_receipts (
        donation_id,
        donor_id,
        receipt_number,
        tax_year,
        total_amount,
        currency,
        usd_value,
        description,
        deductible_amount,
        sent_to
    ) VALUES (
        p_donation_id,
        v_donation.donor_id,
        v_receipt_number,
        v_donation.fiscal_year,
        v_donation.amount,
        v_donation.currency,
        v_donation.usd_value,
        FORMAT('%s - Wildlife Conservation Fund', v_donation.dao_name),
        v_donation.amount, -- Full amount is deductible for 501(c)(3)
        COALESCE(v_donation.donor_email, v_donation.donor_wallet)
    ) RETURNING id INTO v_receipt_id;

    -- Mark donation as receipt sent
    UPDATE public.donations
    SET receipt_sent = TRUE,
        receipt_sent_at = NOW()
    WHERE id = p_donation_id;

    RETURN v_receipt_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update donor statistics
CREATE OR REPLACE FUNCTION update_donor_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update or insert donor record
    INSERT INTO public.donors (
        user_id,
        email,
        wallet_address,
        total_donated,
        first_donation_date,
        last_donation_date,
        donation_count
    ) VALUES (
        NEW.donor_id,
        NEW.donor_email,
        NEW.donor_wallet,
        NEW.amount,
        NEW.donation_date,
        NEW.donation_date,
        1
    )
    ON CONFLICT (COALESCE(email, wallet_address))
    DO UPDATE SET
        total_donated = donors.total_donated + NEW.amount,
        last_donation_date = NEW.donation_date,
        donation_count = donors.donation_count + 1,
        updated_at = NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers

-- Update donor stats on new donation
CREATE TRIGGER update_donor_stats_on_donation
    AFTER INSERT ON public.donations
    FOR EACH ROW
    EXECUTE FUNCTION update_donor_stats();

-- Update timestamps
CREATE TRIGGER update_donations_updated_at
    BEFORE UPDATE ON public.donations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donors_updated_at
    BEFORE UPDATE ON public.donors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Indexes for performance
CREATE INDEX idx_donations_donor_email ON public.donations(donor_email);
CREATE INDEX idx_donations_donor_wallet ON public.donations(donor_wallet);
CREATE INDEX idx_donations_dao_name ON public.donations(dao_name);
CREATE INDEX idx_donations_date ON public.donations(donation_date);
CREATE INDEX idx_donations_fiscal_year ON public.donations(fiscal_year);
CREATE INDEX idx_donations_tx_hash ON public.donations(transaction_hash);
CREATE INDEX idx_donors_email ON public.donors(email);
CREATE INDEX idx_donors_wallet ON public.donors(wallet_address);
CREATE INDEX idx_tax_receipts_donation ON public.tax_receipts(donation_id);
CREATE INDEX idx_tax_receipts_number ON public.tax_receipts(receipt_number);
CREATE INDEX idx_tax_receipts_year ON public.tax_receipts(tax_year);

-- RLS Policies

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.annual_giving_summary ENABLE ROW LEVEL SECURITY;

-- Staff can view all donations (for reporting)
CREATE POLICY "Staff can view all donations" ON public.donations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.dao_memberships
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'signer')
        )
    );

-- Donors can view their own donations
CREATE POLICY "Donors can view own donations" ON public.donations
    FOR SELECT USING (
        donor_id = auth.uid() OR
        donor_email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR
        donor_wallet IN (
            SELECT wallet_address FROM public.user_wallets
            WHERE user_id = auth.uid()
        )
    );

-- Donors can view their own profile
CREATE POLICY "Donors can view own profile" ON public.donors
    FOR SELECT USING (
        user_id = auth.uid() OR
        email = (SELECT email FROM auth.users WHERE id = auth.uid())
    );

-- Donors can update their own profile
CREATE POLICY "Donors can update own profile" ON public.donors
    FOR UPDATE USING (
        user_id = auth.uid() OR
        email = (SELECT email FROM auth.users WHERE id = auth.uid())
    );

-- Donors can view their own receipts
CREATE POLICY "Donors can view own receipts" ON public.tax_receipts
    FOR SELECT USING (
        donor_id IN (
            SELECT id FROM public.donors
            WHERE user_id = auth.uid()
            OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
        )
    );

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Initial configuration
INSERT INTO public.metadata (key, value) VALUES
('organization_name', 'Zoo Labs Foundation'),
('ein', '88-3538992'),
('address', '995 Market St, San Francisco, CA 94103'),
('tax_exempt_status', '501(c)(3)'),
('mission', 'Wildlife conservation through decentralized funding and community governance')
ON CONFLICT DO NOTHING;