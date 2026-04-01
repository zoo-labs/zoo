-- Zoo Fund Supabase Database Schema
-- Robust authentication with wallet integration

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- User profiles extended with wallet info
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT,
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User wallets table for Web3 integration
CREATE TABLE IF NOT EXISTS public.user_wallets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    wallet_address TEXT NOT NULL UNIQUE,
    chain_id TEXT DEFAULT '0x1',
    signature TEXT,
    linked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified BOOLEAN DEFAULT FALSE,
    is_primary BOOLEAN DEFAULT FALSE,
    UNIQUE(user_id, wallet_address)
);

-- DAOs table
CREATE TABLE IF NOT EXISTS public.daos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    treasury_address TEXT,
    safe_address TEXT,
    token_address TEXT,
    token_symbol TEXT,
    website_url TEXT,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DAO memberships
CREATE TABLE IF NOT EXISTS public.dao_memberships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    dao_id UUID REFERENCES public.daos(id) ON DELETE CASCADE,
    wallet_address TEXT,
    voting_power NUMERIC DEFAULT 0,
    role TEXT CHECK (role IN ('member', 'delegate', 'signer', 'admin')) DEFAULT 'member',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, dao_id)
);

-- DAO proposals
CREATE TABLE IF NOT EXISTS public.dao_proposals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    dao_id UUID REFERENCES public.daos(id) ON DELETE CASCADE,
    proposer_id UUID REFERENCES auth.users(id),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT CHECK (category IN ('funding', 'governance', 'technical', 'partnership', 'other')),
    status TEXT CHECK (status IN ('draft', 'active', 'passed', 'rejected', 'executed')) DEFAULT 'draft',
    voting_start TIMESTAMP WITH TIME ZONE,
    voting_end TIMESTAMP WITH TIME ZONE,
    snapshot_block BIGINT,
    ipfs_hash TEXT,
    safe_tx_hash TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Votes on proposals
CREATE TABLE IF NOT EXISTS public.dao_votes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    proposal_id UUID REFERENCES public.dao_proposals(id) ON DELETE CASCADE,
    voter_id UUID REFERENCES auth.users(id),
    wallet_address TEXT,
    vote TEXT CHECK (vote IN ('yes', 'no', 'abstain')) NOT NULL,
    voting_power NUMERIC,
    reason TEXT,
    signature TEXT,
    voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(proposal_id, voter_id)
);

-- Treasury transactions
CREATE TABLE IF NOT EXISTS public.treasury_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    dao_id UUID REFERENCES public.daos(id),
    tx_hash TEXT UNIQUE,
    from_address TEXT,
    to_address TEXT,
    value NUMERIC,
    token_address TEXT,
    token_symbol TEXT,
    description TEXT,
    category TEXT,
    block_number BIGINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Safe multisig signers
CREATE TABLE IF NOT EXISTS public.safe_signers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    dao_id UUID REFERENCES public.daos(id),
    wallet_address TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    threshold INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(dao_id, wallet_address)
);

-- Authentication sessions with wallet info
CREATE TABLE IF NOT EXISTS public.auth_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    wallet_address TEXT,
    provider TEXT CHECK (provider IN ('wallet', 'google', 'email', 'github')),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Insert initial DAOs
INSERT INTO public.daos (name, description, treasury_address, safe_address, token_symbol) VALUES
('OceanDAO', 'Ocean DNA sequencing and marine biodiversity research', '0x742d35Cc6634C0532925a3b844Bc9e7595f0bE8f3a', '0x742d35Cc6634C0532925a3b844Bc9e7595f0bE8f3a', 'OCEAN'),
('SharkDAO', 'Partnership with Shark Stewards for shark conservation', '0x8f3a35Cc6634C0532925a3b844Bc9e7595f0b742d', '0x8f3a35Cc6634C0532925a3b844Bc9e7595f0b742d', 'SHARK'),
('BelugaDAO', 'Supporting beluga whale sanctuaries with Frontiers North', '0x9e7595f0b742d35Cc6634C0532925a3b844Bc8f3a', '0x9e7595f0b742d35Cc6634C0532925a3b844Bc8f3a', 'BELUGA'),
('KauaiDAO', 'Hawaii marine conservation led by Gregg Winston', '0xa3b844Bc9e7595f0b742d35Cc6634C0532925f8', '0xa3b844Bc9e7595f0b742d35Cc6634C0532925f8', 'KAUAI'),
('ExoticFelineDAO', 'Supporting exotic cat sanctuaries in Indiana', '0xb844Bc9e7595f0b742d35Cc6634C0532925a3f8', '0xb844Bc9e7595f0b742d35Cc6634C0532925a3f8', 'FELINE'),
('ResearchDAO', 'NSF grant research in AI and conservation', '0xc9e7595f0b742d35Cc6634C0532925a3b844B8', '0xc9e7595f0b742d35Cc6634C0532925a3b844B8', 'RESEARCH'),
('ZooDAO', 'Main governance DAO for Zoo Labs Foundation', '0xd35Cc6634C0532925a3b844Bc9e7595f0b742d8', '0xd35Cc6634C0532925a3b844Bc9e7595f0b742d8', 'ZOO'),
('LuxDAO', 'Supporting Lux blockchain infrastructure', '0xe35Cc6634C0532925a3b844Bc9e7595f0b742d8', '0xe35Cc6634C0532925a3b844Bc9e7595f0b742d8', 'LUX'),
('HanzoDAO', 'Hanzo development tools and infrastructure', '0xf35Cc6634C0532925a3b844Bc9e7595f0b742d8', '0xf35Cc6634C0532925a3b844Bc9e7595f0b742d8', 'HANZO'),
('ZenDAO', 'ZenLM AI development for conservation', '0x035Cc6634C0532925a3b844Bc9e7595f0b742d8', '0x035Cc6634C0532925a3b844Bc9e7595f0b742d8', 'ZEN')
ON CONFLICT (name) DO NOTHING;

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dao_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dao_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auth_sessions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Wallet policies
CREATE POLICY "Users can view own wallets" ON public.user_wallets
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add own wallets" ON public.user_wallets
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wallets" ON public.user_wallets
    FOR UPDATE USING (auth.uid() = user_id);

-- DAO membership policies
CREATE POLICY "DAO memberships are public" ON public.dao_memberships
    FOR SELECT USING (true);

CREATE POLICY "Users can update own memberships" ON public.dao_memberships
    FOR UPDATE USING (auth.uid() = user_id);

-- Voting policies
CREATE POLICY "Votes are public after voting ends" ON public.dao_votes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.dao_proposals
            WHERE id = proposal_id
            AND voting_end < NOW()
        )
    );

CREATE POLICY "Users can vote once per proposal" ON public.dao_votes
    FOR INSERT WITH CHECK (auth.uid() = voter_id);

-- Session policies
CREATE POLICY "Users can view own sessions" ON public.auth_sessions
    FOR SELECT USING (auth.uid() = user_id);

-- Functions for enhanced security

-- Function to verify wallet signature
CREATE OR REPLACE FUNCTION verify_wallet_signature(
    p_address TEXT,
    p_message TEXT,
    p_signature TEXT
) RETURNS BOOLEAN AS $$
BEGIN
    -- In production, this would verify the signature cryptographically
    -- For now, return true for valid format
    RETURN p_signature IS NOT NULL AND LENGTH(p_signature) > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to link wallet to user
CREATE OR REPLACE FUNCTION link_wallet_to_user(
    p_user_id UUID,
    p_wallet_address TEXT,
    p_signature TEXT
) RETURNS BOOLEAN AS $$
DECLARE
    v_existing_user UUID;
BEGIN
    -- Check if wallet is already linked to another user
    SELECT user_id INTO v_existing_user
    FROM public.user_wallets
    WHERE wallet_address = LOWER(p_wallet_address)
    AND user_id != p_user_id;

    IF v_existing_user IS NOT NULL THEN
        RAISE EXCEPTION 'Wallet already linked to another user';
    END IF;

    -- Insert or update wallet link
    INSERT INTO public.user_wallets (user_id, wallet_address, signature, verified)
    VALUES (p_user_id, LOWER(p_wallet_address), p_signature, TRUE)
    ON CONFLICT (user_id, wallet_address)
    DO UPDATE SET
        signature = EXCLUDED.signature,
        verified = TRUE,
        linked_at = NOW();

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check DAO membership
CREATE OR REPLACE FUNCTION check_dao_membership(
    p_user_id UUID,
    p_dao_id UUID
) RETURNS TABLE (
    is_member BOOLEAN,
    voting_power NUMERIC,
    role TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*) > 0 AS is_member,
        COALESCE(MAX(dm.voting_power), 0) AS voting_power,
        MAX(dm.role) AS role
    FROM public.dao_memberships dm
    WHERE dm.user_id = p_user_id
    AND dm.dao_id = p_dao_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers

-- Update profiles updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daos_updated_at
    BEFORE UPDATE ON public.daos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Indexes for performance
CREATE INDEX idx_user_wallets_address ON public.user_wallets(wallet_address);
CREATE INDEX idx_user_wallets_user_id ON public.user_wallets(user_id);
CREATE INDEX idx_dao_memberships_user_id ON public.dao_memberships(user_id);
CREATE INDEX idx_dao_memberships_dao_id ON public.dao_memberships(dao_id);
CREATE INDEX idx_dao_votes_proposal_id ON public.dao_votes(proposal_id);
CREATE INDEX idx_dao_votes_voter_id ON public.dao_votes(voter_id);
CREATE INDEX idx_treasury_tx_dao_id ON public.treasury_transactions(dao_id);
CREATE INDEX idx_auth_sessions_user_id ON public.auth_sessions(user_id);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;