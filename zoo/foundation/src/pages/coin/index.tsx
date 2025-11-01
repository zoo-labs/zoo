import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

export default function Coin() {
  return (
    <Layout>
      <Seo
        templateTitle="ZOO Coin"
        description="ZOO governance token for decentralized conservation funding and DAO voting"
      />
      <Navbar />

      <div className="bg-black text-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">ZOO Coin</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            The governance token powering decentralized conservation funding. Vote on proposals,
            allocate resources, and shape the future of wildlife preservation.
          </p>
        </div>

        {/* Token Info */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Token Utility</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">🗳️</span>
                  <div>
                    <strong className="text-white">Governance Voting</strong>
                    <p className="text-sm mt-1">Vote on conservation proposals and fund allocation</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">💰</span>
                  <div>
                    <strong className="text-white">Treasury Management</strong>
                    <p className="text-sm mt-1">Participate in decisions about the $5M+ conservation treasury</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">🎁</span>
                  <div>
                    <strong className="text-white">Staking Rewards</strong>
                    <p className="text-sm mt-1">Earn rewards for long-term commitment to conservation</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">🌍</span>
                  <div>
                    <strong className="text-white">Experience Access</strong>
                    <p className="text-sm mt-1">Exclusive access to conservation expeditions and events</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Token Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Supply</span>
                  <span className="font-bold">1,000,000,000 ZOO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Circulating Supply</span>
                  <span className="font-bold">450,000,000 ZOO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Contract</span>
                  <span className="font-mono text-sm">luxdefi.eth</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Network</span>
                  <span className="font-bold">Ethereum, Polygon</span>
                </div>
                <hr className="border-gray-700" />
                <div className="pt-4">
                  <p className="text-gray-400 mb-2">Current Price</p>
                  <p className="text-3xl font-bold">$0.0234</p>
                  <p className="text-green-500 text-sm">+12.4% (24h)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Token Distribution */}
        <div className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Token Distribution</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-green-500">35%</p>
                <p className="text-xl mt-2">Conservation Treasury</p>
                <p className="text-sm text-gray-400 mt-2">Locked for conservation initiatives</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-500">25%</p>
                <p className="text-xl mt-2">Community Rewards</p>
                <p className="text-sm text-gray-400 mt-2">Staking and participation rewards</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-purple-500">20%</p>
                <p className="text-xl mt-2">Team & Advisors</p>
                <p className="text-sm text-gray-400 mt-2">4-year vesting schedule</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-yellow-500">20%</p>
                <p className="text-xl mt-2">Public Distribution</p>
                <p className="text-sm text-gray-400 mt-2">Initial and ongoing distribution</p>
              </div>
            </div>
          </div>
        </div>

        {/* DAOs Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">DAO Governance Tokens</h2>
          <p className="text-xl text-gray-300 mb-12">
            Each conservation DAO has its own governance token for specialized decision-making
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'OCEAN', dao: 'OceanDAO', focus: 'Marine Conservation', tvl: '$325,000' },
              { name: 'SHARK', dao: 'SharkDAO', focus: 'Shark Protection', tvl: '$150,000' },
              { name: 'BELUGA', dao: 'BelugaDAO', focus: 'Arctic Wildlife', tvl: '$75,000' },
              { name: 'TIGER', dao: 'TigerDAO', focus: 'Big Cat Sanctuaries', tvl: '$200,000' },
              { name: 'RESEARCH', dao: 'ResearchDAO', focus: 'Scientific Research', tvl: '$500,000' },
              { name: 'ZEN', dao: 'ZenDAO', focus: 'AI Development', tvl: '$300,000' },
            ].map((token) => (
              <div key={token.name} className="border border-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{token.name}</h3>
                    <p className="text-gray-400">{token.dao}</p>
                  </div>
                  <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{token.focus}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Treasury</span>
                  <span className="font-bold">{token.tvl}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Get ZOO */}
        <div className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">How to Get ZOO</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">1. Donate to Conservation</h3>
                <p className="text-gray-400 mb-4">
                  Receive ZOO tokens when you donate to conservation initiatives
                </p>
                <Link
                  href="/donation"
                  className="text-green-500 hover:text-green-400 font-medium"
                >
                  Donate Now →
                </Link>
              </div>
              <div className="border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">2. Participate in DAOs</h3>
                <p className="text-gray-400 mb-4">
                  Earn tokens by contributing to DAO proposals and governance
                </p>
                <Link
                  href="/fund"
                  className="text-green-500 hover:text-green-400 font-medium"
                >
                  Join a DAO →
                </Link>
              </div>
              <div className="border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">3. Trade on DEX</h3>
                <p className="text-gray-400 mb-4">
                  Trade ZOO on Uniswap, SushiSwap, and other decentralized exchanges
                </p>
                <a
                  href="https://app.uniswap.org"
                  className="text-green-500 hover:text-green-400 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Trade on Uniswap →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join the Conservation Economy
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Hold ZOO to participate in governance and help direct millions in conservation funding
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/fund"
                className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Explore DAOs
              </Link>
              <Link
                href="/markets"
                className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-colors"
              >
                View Markets
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}