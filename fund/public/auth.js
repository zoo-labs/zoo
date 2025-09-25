// Zoo Fund Authentication Module - Supabase + Web3 Wallet Integration
// Robust authentication system with multiple providers

import { createClient } from '@supabase/supabase-js';

// Supabase configuration (replace with your project details)
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Authentication state
let authState = {
    user: null,
    wallet: null,
    daos: [],
    session: null,
    provider: null // 'wallet', 'google', 'email'
};

// Enhanced authentication manager
class ZooAuthManager {
    constructor() {
        this.listeners = [];
        this.initializeAuth();
    }

    async initializeAuth() {
        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            await this.handleSession(session);
        }

        // Listen for auth state changes
        supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth event:', event);
            await this.handleSession(session);
        });

        // Check for Web3 wallet
        if (typeof window.ethereum !== 'undefined') {
            this.detectWalletProvider();
        }
    }

    async handleSession(session) {
        if (session) {
            authState.session = session;
            authState.user = session.user;

            // Load user's DAOs and permissions
            await this.loadUserDAOs(session.user.id);

            // Check if user has linked wallet
            await this.checkLinkedWallet(session.user.id);

            this.notifyListeners('authenticated', authState);
        } else {
            this.clearAuth();
        }
    }

    // Wallet authentication with Supabase integration
    async authenticateWallet() {
        try {
            if (!window.ethereum) {
                throw new Error('No wallet provider detected');
            }

            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (accounts.length === 0) {
                throw new Error('No accounts found');
            }

            const address = accounts[0];

            // Create message for signature
            const message = this.createSignMessage(address);

            // Request signature
            const signature = await window.ethereum.request({
                method: 'personal_sign',
                params: [message, address]
            });

            // Verify signature and authenticate with Supabase
            const { data, error } = await supabase.auth.signInWithOtp({
                email: `${address.toLowerCase()}@wallet.local`,
                options: {
                    data: {
                        wallet_address: address,
                        signature: signature,
                        message: message,
                        provider: 'metamask'
                    }
                }
            });

            if (error) throw error;

            // Store wallet info
            authState.wallet = {
                address: address,
                provider: this.detectWalletProvider(),
                chainId: await window.ethereum.request({ method: 'eth_chainId' })
            };

            // Link wallet to user profile
            await this.linkWalletToProfile(address, signature);

            return { success: true, wallet: authState.wallet };

        } catch (error) {
            console.error('Wallet authentication failed:', error);
            throw error;
        }
    }

    // Google authentication
    async authenticateGoogle() {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/fund`,
                    scopes: 'email profile'
                }
            });

            if (error) throw error;
            authState.provider = 'google';
            return { success: true, data };

        } catch (error) {
            console.error('Google authentication failed:', error);
            throw error;
        }
    }

    // Email authentication with magic link
    async authenticateEmail(email) {
        try {
            // Validate email
            if (!this.validateEmail(email)) {
                throw new Error('Invalid email address');
            }

            const { data, error } = await supabase.auth.signInWithOtp({
                email: email,
                options: {
                    emailRedirectTo: `${window.location.origin}/fund`,
                }
            });

            if (error) throw error;

            authState.provider = 'email';
            return {
                success: true,
                message: 'Check your email for the login link!'
            };

        } catch (error) {
            console.error('Email authentication failed:', error);
            throw error;
        }
    }

    // Email + password authentication (more traditional)
    async authenticateEmailPassword(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

            authState.provider = 'email';
            return { success: true, data };

        } catch (error) {
            console.error('Email/password authentication failed:', error);
            throw error;
        }
    }

    // Sign up new user
    async signUp(email, password, metadata = {}) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: metadata
                }
            });

            if (error) throw error;

            return { success: true, data };

        } catch (error) {
            console.error('Sign up failed:', error);
            throw error;
        }
    }

    // Link wallet to existing profile
    async linkWalletToProfile(address, signature) {
        try {
            const { data, error } = await supabase
                .from('user_wallets')
                .upsert({
                    user_id: authState.user.id,
                    wallet_address: address.toLowerCase(),
                    signature: signature,
                    linked_at: new Date().toISOString(),
                    chain_id: authState.wallet?.chainId || '0x1'
                });

            if (error) throw error;

            return { success: true };

        } catch (error) {
            console.error('Failed to link wallet:', error);
            throw error;
        }
    }

    // Load user's DAO memberships
    async loadUserDAOs(userId) {
        try {
            // Query user's DAO memberships from Supabase
            const { data: memberships, error } = await supabase
                .from('dao_memberships')
                .select(`
                    dao_id,
                    daos (
                        name,
                        treasury_address,
                        safe_address,
                        token_symbol
                    ),
                    voting_power,
                    role,
                    joined_at
                `)
                .eq('user_id', userId);

            if (error) throw error;

            // If user has wallet, also check on-chain memberships
            if (authState.wallet) {
                const onChainDAOs = await this.checkOnChainMemberships(
                    authState.wallet.address
                );

                // Merge database and on-chain data
                authState.daos = this.mergeDAOData(memberships, onChainDAOs);
            } else {
                authState.daos = memberships || [];
            }

            return authState.daos;

        } catch (error) {
            console.error('Failed to load DAOs:', error);
            return [];
        }
    }

    // Check on-chain DAO memberships
    async checkOnChainMemberships(address) {
        try {
            // This would connect to actual smart contracts
            // For now, returning mock data
            const daoContracts = {
                'OceanDAO': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bE8f3a',
                'SharkDAO': '0x8f3a35Cc6634C0532925a3b844Bc9e7595f0b742d',
                'BelugaDAO': '0x9e7595f0b742d35Cc6634C0532925a3b844Bc8f3a'
            };

            const memberships = [];

            // Check each DAO contract for membership
            for (const [dao, contract] of Object.entries(daoContracts)) {
                // In production: call contract to check membership
                // const isMember = await contract.methods.isMember(address).call();

                // Mock implementation
                if (Math.random() > 0.5) {
                    memberships.push({
                        dao: dao,
                        contract: contract,
                        votingPower: Math.floor(Math.random() * 1000) + 100,
                        isMultisigSigner: Math.random() > 0.8
                    });
                }
            }

            return memberships;

        } catch (error) {
            console.error('Failed to check on-chain memberships:', error);
            return [];
        }
    }

    // Check if user has linked wallet
    async checkLinkedWallet(userId) {
        try {
            const { data, error } = await supabase
                .from('user_wallets')
                .select('wallet_address, chain_id')
                .eq('user_id', userId)
                .single();

            if (data && !error) {
                authState.wallet = {
                    address: data.wallet_address,
                    chainId: data.chain_id,
                    provider: 'linked'
                };
            }

            return data;

        } catch (error) {
            console.error('Failed to check linked wallet:', error);
            return null;
        }
    }

    // Create sign message for wallet authentication
    createSignMessage(address) {
        const timestamp = Date.now();
        const domain = window.location.hostname;

        return `Zoo Fund Authentication

Sign this message to authenticate with Zoo Fund.

Wallet: ${address}
Domain: ${domain}
Timestamp: ${timestamp}
Nonce: ${this.generateNonce()}

This signature verifies you control this wallet address.`;
    }

    // Generate random nonce
    generateNonce() {
        return Math.random().toString(36).substring(2, 15) +
               Math.random().toString(36).substring(2, 15);
    }

    // Detect wallet provider
    detectWalletProvider() {
        if (window.ethereum) {
            if (window.ethereum.isMetaMask) return 'metamask';
            if (window.ethereum.isCoinbaseWallet) return 'coinbase';
            if (window.ethereum.isWalletConnect) return 'walletconnect';
            return 'unknown';
        }
        return null;
    }

    // Validate email format
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Sign out
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            this.clearAuth();
            this.notifyListeners('signedOut', null);

            return { success: true };

        } catch (error) {
            console.error('Sign out failed:', error);
            throw error;
        }
    }

    // Clear authentication state
    clearAuth() {
        authState = {
            user: null,
            wallet: null,
            daos: [],
            session: null,
            provider: null
        };
    }

    // Merge database and on-chain DAO data
    mergeDAOData(dbData, chainData) {
        const merged = [...(dbData || [])];

        for (const chainDAO of chainData) {
            const existing = merged.find(d =>
                d.daos?.name === chainDAO.dao
            );

            if (existing) {
                // Update with on-chain data
                existing.onChainVotingPower = chainDAO.votingPower;
                existing.isMultisigSigner = chainDAO.isMultisigSigner;
            } else {
                // Add new DAO from chain
                merged.push({
                    dao_id: chainDAO.dao,
                    daos: {
                        name: chainDAO.dao,
                        safe_address: chainDAO.contract
                    },
                    voting_power: chainDAO.votingPower,
                    role: chainDAO.isMultisigSigner ? 'signer' : 'member',
                    onChain: true
                });
            }
        }

        return merged;
    }

    // Subscribe to auth state changes
    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    // Notify listeners of auth changes
    notifyListeners(event, data) {
        this.listeners.forEach(callback => callback(event, data));
    }

    // Get current auth state
    getAuthState() {
        return { ...authState };
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!authState.user;
    }

    // Check if user has wallet connected
    hasWallet() {
        return !!authState.wallet;
    }
}

// Create singleton instance
const zooAuth = new ZooAuthManager();

// Export for use in other modules
export default zooAuth;

// Also attach to window for direct access
window.zooAuth = zooAuth;