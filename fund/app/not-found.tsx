'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { daos } from '@/lib/daos'

export default function NotFound() {
  const [randomDAO, setRandomDAO] = useState(daos[0])

  useEffect(() => {
    // Pick a random DAO on client side
    const random = daos[Math.floor(Math.random() * daos.length)]
    setRandomDAO(random)
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center py-20">
        <div className="container max-w-2xl text-center">
          {/* 404 Animation */}
          <div className="mb-8 relative">
            <div className="text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#667eea] to-[#764ba2] leading-none animate-pulse">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-6xl animate-bounce">
              🔍
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-white/70 mb-8">
            Oops! This page has gone extinct. But don't worry, there are plenty of conservation projects to explore!
          </p>

          {/* Random DAO Recommendation */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 mb-8">
            <div className="text-sm text-white/60 uppercase tracking-wide mb-3">
              Recommended for you
            </div>
            <div className="text-6xl mb-4">{randomDAO.emoji}</div>
            <h2 className="text-2xl font-bold mb-2">{randomDAO.name}</h2>
            <p className="text-white/80 mb-6">{randomDAO.tagline}</p>
            <Link
              href={`/${randomDAO.id}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Explore {randomDAO.name}
              <span>→</span>
            </Link>
          </div>

          {/* All DAOs Grid */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-sm text-white/60 mb-6">Or explore all conservation DAOs:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {daos.map((dao) => (
                <Link
                  key={dao.id}
                  href={`/${dao.id}`}
                  className="group bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#667eea]/50 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {dao.emoji}
                  </div>
                  <div className="text-sm font-semibold">{dao.symbol}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Home Link */}
          <div className="mt-8">
            <Link
              href="/"
              className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-2"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
