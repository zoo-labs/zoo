'use client'

import { useState } from 'react'

const DID_NETWORKS = [
  { method: 'zoo', name: 'Zoo Network', chainId: 200200, color: '#10B981', site: 'zoo.id' },
  { method: 'pars', name: 'Pars Network', chainId: 494949, color: '#E6B800', site: 'pars.network/id' },
  { method: 'ai', name: 'Hanzo Network', chainId: 36963, color: '#8B5CF6', site: 'hanzo.id' },
  { method: 'lux', name: 'Lux Network', chainId: 96369, color: '#3B82F6', site: 'lux.id' },
]

const STAKE_TIERS = [
  { length: 1, stake: 100000 },
  { length: 2, stake: 10000 },
  { length: 3, stake: 1000 },
  { length: 4, stake: 100 },
  { length: 5, stake: 10 },
]

export default function Page() {
  const [handle, setHandle] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  const getStakeAmount = (handle: string) => {
    const len = handle.length
    const tier = STAKE_TIERS.find(t => len <= t.length) || { stake: 10 }
    return tier.stake
  }

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gradient-zoo">ZOO</span>
              <span className="text-xs text-white/50 mt-1">ID</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#identity" className="text-sm text-white/70 hover:text-white transition-colors">Identity</a>
              <a href="#networks" className="text-sm text-white/70 hover:text-white transition-colors">Networks</a>
              <a href="#features" className="text-sm text-white/70 hover:text-white transition-colors">Features</a>
            </div>
            <button 
              onClick={() => setIsConnected(!isConnected)}
              className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-sm hover:bg-emerald-500/30 transition-colors"
            >
              {isConnected ? '0x1234...abcd' : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-transparent to-transparent" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient-zoo">ZOO</span> ID
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Decentralized Identity for the Open AI Research Network
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Self-sovereign identity built on Zoo Network. Own your identity across DeSci and DeAI ecosystems.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#identity" className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition-colors">
              Mint Identity
            </a>
            <a href="#features" className="px-8 py-3 border border-white/20 hover:border-white/40 rounded-lg transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Identity Minting Section */}
      <section id="identity" className="py-24 px-6 bg-gradient-to-b from-transparent to-emerald-900/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Mint Your <span className="text-gradient-zoo">did:zoo</span> Identity
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Register your unique handle on Zoo Network. Your identity works across all connected networks.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 glow-zoo">
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Choose your handle</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">@</span>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                  placeholder="yourname"
                  className="flex-1 bg-transparent border-b border-white/20 focus:border-emerald-500 outline-none py-2 text-xl"
                />
                <span className="text-gray-500">.zoo</span>
              </div>
            </div>

            {handle && (
              <div className="mb-6 p-4 bg-black/30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Your DID:</span>
                  <code className="text-emerald-400">did:zoo:{handle}</code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Required stake:</span>
                  <span className="text-white font-mono">{getStakeAmount(handle).toLocaleString()} ZOO</span>
                </div>
              </div>
            )}

            <button 
              disabled={!isConnected || !handle}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
            >
              {!isConnected ? 'Connect Wallet First' : !handle ? 'Enter a Handle' : 'Mint Identity'}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Stake is refundable when you release your identity
            </p>
          </div>
        </div>
      </section>

      {/* Cross-Network DID Section */}
      <section id="networks" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Omnichain Identity
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Your identity works across all connected networks. One handle, multiple DIDs.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DID_NETWORKS.map((network) => (
              <a
                key={network.method}
                href={`https://${network.site}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/30 transition-all group"
              >
                <div 
                  className="w-12 h-12 rounded-full mb-4 flex items-center justify-center text-xl font-bold"
                  style={{ backgroundColor: `${network.color}20`, color: network.color }}
                >
                  {network.method[0].toUpperCase()}
                </div>
                <h3 className="text-lg font-semibold mb-1 group-hover:text-white transition-colors">
                  {network.name}
                </h3>
                <code className="text-sm text-gray-400">did:{network.method}:handle</code>
                <p className="text-xs text-gray-500 mt-2">Chain ID: {network.chainId}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-gradient-to-b from-transparent to-emerald-900/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Zoo ID?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Self-Sovereign</h3>
              <p className="text-gray-400">Own your identity. No central authority can revoke or modify your credentials.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verifiable Credentials</h3>
              <p className="text-gray-400">Issue and receive cryptographically verifiable credentials that work everywhere.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cross-Chain</h3>
              <p className="text-gray-400">One identity across Zoo, Pars, Hanzo, Lux, and more. True omnichain presence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gradient-zoo">ZOO</span>
              <span className="text-xs text-white/50">ID</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="https://zoo.ngo" className="hover:text-white transition-colors">Zoo Foundation</a>
              <a href="https://zips.zoo.ngo" className="hover:text-white transition-colors">ZIPs</a>
              <a href="https://github.com/zoo-labs" className="hover:text-white transition-colors">GitHub</a>
            </div>
            <p className="text-sm text-gray-500">Chain ID: 200200</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
