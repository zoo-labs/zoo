import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

export default function Markets() {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <Layout>
      <Seo
        templateTitle="Markets"
        description="Zoo Foundation token markets, trading data, and liquidity information"
      />
      <Navbar />

      <div className="bg-black text-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Conservation Markets</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            Track conservation token performance, liquidity pools, and DAO treasuries in real-time.
            Transparent markets for transparent conservation.
          </p>
        </div>

        {/* Market Overview */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-900 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-2">Total Market Cap</p>
              <p className="text-2xl font-bold">$23.4M</p>
              <p className="text-green-500 text-sm">+8.2% (24h)</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-2">Total Treasury Value</p>
              <p className="text-2xl font-bold">$2.55M</p>
              <p className="text-green-500 text-sm">+3.1% (24h)</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-2">24h Volume</p>
              <p className="text-2xl font-bold">$485K</p>
              <p className="text-red-500 text-sm">-12.5% (24h)</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-2">Active DAOs</p>
              <p className="text-2xl font-bold">8</p>
              <p className="text-gray-500 text-sm">2 pending</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-700 mb-8">
            <div className="flex space-x-8">
              {['overview', 'tokens', 'pools', 'treasury'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`pb-4 px-1 capitalize ${
                    selectedTab === tab
                      ? 'text-white border-b-2 border-green-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {selectedTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6">Token Markets</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-700">
                      <th className="pb-4 text-gray-400 font-normal">#</th>
                      <th className="pb-4 text-gray-400 font-normal">Token</th>
                      <th className="pb-4 text-gray-400 font-normal">Price</th>
                      <th className="pb-4 text-gray-400 font-normal">24h Change</th>
                      <th className="pb-4 text-gray-400 font-normal">Market Cap</th>
                      <th className="pb-4 text-gray-400 font-normal">Volume (24h)</th>
                      <th className="pb-4 text-gray-400 font-normal">Treasury</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { rank: 1, symbol: 'ZOO', name: 'Zoo Token', price: 0.0234, change: 12.4, mcap: '10.5M', volume: '234K', treasury: '1M' },
                      { rank: 2, symbol: 'OCEAN', name: 'OceanDAO', price: 0.0089, change: 5.2, mcap: '3.2M', volume: '89K', treasury: '325K' },
                      { rank: 3, symbol: 'RESEARCH', name: 'ResearchDAO', price: 0.0156, change: -2.3, mcap: '2.8M', volume: '67K', treasury: '500K' },
                      { rank: 4, symbol: 'ZEN', name: 'ZenDAO', price: 0.0112, change: 8.9, mcap: '2.1M', volume: '45K', treasury: '300K' },
                      { rank: 5, symbol: 'TIGER', name: 'TigerDAO', price: 0.0067, change: 3.1, mcap: '1.8M', volume: '38K', treasury: '200K' },
                      { rank: 6, symbol: 'SHARK', name: 'SharkDAO', price: 0.0045, change: -1.2, mcap: '1.5M', volume: '29K', treasury: '150K' },
                      { rank: 7, symbol: 'KAUAI', name: 'KauaiDAO', price: 0.0038, change: 6.7, mcap: '1.2M', volume: '18K', treasury: '125K' },
                      { rank: 8, symbol: 'BELUGA', name: 'BelugaDAO', price: 0.0023, change: 4.5, mcap: '0.8M', volume: '12K', treasury: '75K' },
                    ].map((token) => (
                      <tr key={token.symbol} className="border-b border-gray-800 hover:bg-gray-900">
                        <td className="py-4">{token.rank}</td>
                        <td className="py-4">
                          <div>
                            <p className="font-medium">{token.symbol}</p>
                            <p className="text-sm text-gray-400">{token.name}</p>
                          </div>
                        </td>
                        <td className="py-4">${token.price}</td>
                        <td className="py-4">
                          <span className={token.change > 0 ? 'text-green-500' : 'text-red-500'}>
                            {token.change > 0 ? '+' : ''}{token.change}%
                          </span>
                        </td>
                        <td className="py-4">${token.mcap}</td>
                        <td className="py-4">${token.volume}</td>
                        <td className="py-4">${token.treasury}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedTab === 'tokens' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Token Analytics</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h4 className="text-xl font-bold mb-4">Top Gainers (24h)</h4>
                  <div className="space-y-3">
                    {[
                      { symbol: 'ZOO', change: 12.4 },
                      { symbol: 'ZEN', change: 8.9 },
                      { symbol: 'KAUAI', change: 6.7 },
                    ].map((token) => (
                      <div key={token.symbol} className="flex justify-between items-center">
                        <span className="font-medium">{token.symbol}</span>
                        <span className="text-green-500">+{token.change}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-6">
                  <h4 className="text-xl font-bold mb-4">Top Volume (24h)</h4>
                  <div className="space-y-3">
                    {[
                      { symbol: 'ZOO', volume: '234K' },
                      { symbol: 'OCEAN', volume: '89K' },
                      { symbol: 'RESEARCH', volume: '67K' },
                    ].map((token) => (
                      <div key={token.symbol} className="flex justify-between items-center">
                        <span className="font-medium">{token.symbol}</span>
                        <span className="text-gray-400">${token.volume}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'pools' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Liquidity Pools</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { pair: 'ZOO/USDC', liquidity: '2.3M', volume: '145K', apy: '24.5%', dex: 'Uniswap V3' },
                  { pair: 'ZOO/ETH', liquidity: '1.8M', volume: '89K', apy: '18.2%', dex: 'Uniswap V3' },
                  { pair: 'OCEAN/USDC', liquidity: '450K', volume: '32K', apy: '31.2%', dex: 'SushiSwap' },
                  { pair: 'RESEARCH/ETH', liquidity: '380K', volume: '28K', apy: '27.8%', dex: 'Uniswap V2' },
                ].map((pool) => (
                  <div key={pool.pair} className="border border-gray-700 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold">{pool.pair}</h4>
                        <p className="text-sm text-gray-400">{pool.dex}</p>
                      </div>
                      <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm">
                        {pool.apy} APY
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Liquidity</span>
                        <span>${pool.liquidity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Volume (24h)</span>
                        <span>${pool.volume}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'treasury' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">DAO Treasuries</h3>
              <div className="space-y-4">
                {[
                  { dao: 'ZooDAO', value: '1,000,000', tokens: '45% ZOO, 30% USDC, 25% ETH', proposals: 24 },
                  { dao: 'ResearchDAO', value: '500,000', tokens: '40% RESEARCH, 35% USDC, 25% ETH', proposals: 12 },
                  { dao: 'OceanDAO', value: '325,000', tokens: '50% OCEAN, 30% USDC, 20% ETH', proposals: 8 },
                  { dao: 'ZenDAO', value: '300,000', tokens: '45% ZEN, 35% USDC, 20% ETH', proposals: 9 },
                  { dao: 'TigerDAO', value: '200,000', tokens: '40% TIGER, 40% USDC, 20% ETH', proposals: 8 },
                  { dao: 'SharkDAO', value: '150,000', tokens: '35% SHARK, 45% USDC, 20% ETH', proposals: 5 },
                ].map((treasury) => (
                  <div key={treasury.dao} className="bg-gray-900 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-bold">{treasury.dao}</h4>
                      <Link
                        href={`/fund/${treasury.dao.toLowerCase().replace('dao', '')}.html`}
                        className="text-green-500 hover:text-green-400"
                      >
                        View DAO →
                      </Link>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Total Value</p>
                        <p className="text-2xl font-bold">${treasury.value}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Allocation</p>
                        <p className="text-sm">{treasury.tokens}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Active Proposals</p>
                        <p className="text-xl font-bold">{treasury.proposals}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Trading Section */}
        <div className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Start Trading</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Uniswap</h3>
                <p className="text-gray-400 mb-4">
                  Trade ZOO and DAO tokens on Ethereum mainnet
                </p>
                <a
                  href="https://app.uniswap.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-400"
                >
                  Trade on Uniswap →
                </a>
              </div>
              <div className="border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">SushiSwap</h3>
                <p className="text-gray-400 mb-4">
                  Access liquidity pools and earn rewards
                </p>
                <a
                  href="https://www.sushi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-400"
                >
                  Trade on SushiSwap →
                </a>
              </div>
              <div className="border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">QuickSwap</h3>
                <p className="text-gray-400 mb-4">
                  Low-fee trading on Polygon network
                </p>
                <a
                  href="https://quickswap.exchange"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-400"
                >
                  Trade on QuickSwap →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}