import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black/30 to-black/60 border-t border-white/10 py-16 mt-20">
      <div className="container">
        {/* DAO Links Section */}
        <div className="text-center mb-12 pb-12 border-b border-white/10">
          <h3 className="text-2xl font-bold mb-6 animate-fadeIn">Conservation DAOs</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/ocean" className="group bg-white/3 border border-white/10 rounded-xl p-4 hover:border-[#667eea]/50 hover:bg-white/5 hover:scale-105 transition-all duration-300">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🧬</div>
              <div className="text-sm font-semibold">OceanDAO</div>
            </Link>
            <Link href="/shark" className="group bg-white/3 border border-white/10 rounded-xl p-4 hover:border-[#667eea]/50 hover:bg-white/5 hover:scale-105 transition-all duration-300">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🦈</div>
              <div className="text-sm font-semibold">SharkDAO</div>
            </Link>
            <Link href="/kauai" className="group bg-white/3 border border-white/10 rounded-xl p-4 hover:border-[#667eea]/50 hover:bg-white/5 hover:scale-105 transition-all duration-300">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🏝️</div>
              <div className="text-sm font-semibold">KauaiDAO</div>
            </Link>
            <Link href="/tiger" className="group bg-white/3 border border-white/10 rounded-xl p-4 hover:border-[#667eea]/50 hover:bg-white/5 hover:scale-105 transition-all duration-300">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🐅</div>
              <div className="text-sm font-semibold">TigerDAO</div>
            </Link>
            <Link href="/beluga" className="group bg-white/3 border border-white/10 rounded-xl p-4 hover:border-[#667eea]/50 hover:bg-white/5 hover:scale-105 transition-all duration-300">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🐋</div>
              <div className="text-sm font-semibold">BelugaDAO</div>
            </Link>
            <Link href="/research" className="group bg-white/3 border border-white/10 rounded-xl p-4 hover:border-[#667eea]/50 hover:bg-white/5 hover:scale-105 transition-all duration-300">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🔬</div>
              <div className="text-sm font-semibold">ResearchDAO</div>
            </Link>
            <Link href="/zoo" className="group bg-white/3 border border-white/10 rounded-xl p-4 hover:border-[#667eea]/50 hover:bg-white/5 hover:scale-105 transition-all duration-300">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🦁</div>
              <div className="text-sm font-semibold">ZooDAO</div>
            </Link>
            <Link href="/zen" className="group bg-white/3 border border-white/10 rounded-xl p-4 hover:border-[#667eea]/50 hover:bg-white/5 hover:scale-105 transition-all duration-300">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🧘</div>
              <div className="text-sm font-semibold">ZenDAO</div>
            </Link>
          </div>
        </div>

        {/* Foundation Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-white/10">
          {/* About */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4">About Zoo Labs Foundation</h4>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              A 501(c)(3) nonprofit organization dedicated to advancing wildlife conservation through decentralized collaboration and scientific research.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-green-400 font-semibold">Tax-Exempt Public Charity</span>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <div className="text-white/60 text-sm space-y-2">
              <p>
                <span className="text-white/40">EIN:</span> <span className="font-mono">88-3538992</span>
              </p>
              <p>
                995 Market St<br />
                San Francisco, CA 94103<br />
                United States
              </p>
              <p className="pt-2">
                <a href="mailto:contact@zoo.ngo" className="text-[#667eea] hover:underline">
                  contact@zoo.ngo
                </a>
              </p>
            </div>
          </div>

          {/* Community */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4">Join Our Community</h4>
            <div className="flex flex-col gap-3">
              <Link href="https://twitter.com/zoo_labs" target="_blank" className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/10 group-hover:border-[#667eea]/50 transition-all">
                  <span>𝕏</span>
                </div>
                <span className="text-sm">Follow on Twitter</span>
              </Link>
              <Link href="https://discord.gg/AqrYhChx5b" target="_blank" className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/10 group-hover:border-[#667eea]/50 transition-all">
                  <span>💬</span>
                </div>
                <span className="text-sm">Join Discord</span>
              </Link>
              <Link href="https://github.com/zoo-labs" target="_blank" className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/10 group-hover:border-[#667eea]/50 transition-all">
                  <span>⚡</span>
                </div>
                <span className="text-sm">View on GitHub</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6 flex-wrap justify-center text-sm">
            <Link href="https://zoo.ngo" className="text-white/50 hover:text-white transition-colors">
              Foundation Home
            </Link>
            <Link href="https://zoo.ngo/about" className="text-white/50 hover:text-white transition-colors">
              About
            </Link>
            <Link href="https://zoo.ngo/animals" className="text-white/50 hover:text-white transition-colors">
              Animals
            </Link>
            <Link href="https://zoo.ngo/experiences" className="text-white/50 hover:text-white transition-colors">
              Experiences
            </Link>
            <Link href="https://zoo.ngo/donation" className="text-white/50 hover:text-white transition-colors">
              Donate
            </Link>
          </div>
          <div className="text-white/30 text-sm text-center md:text-right">
            © 2025 Zoo Labs Foundation Inc
            <br className="md:hidden" />
            <span className="hidden md:inline"> • </span>
            All rights reserved
          </div>
        </div>

        {/* Tax Deductibility Notice */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-xs">
            Donations to Zoo Labs Foundation Inc are tax-deductible to the extent permitted by law.
          </p>
        </div>
      </div>
    </footer>
  )
}
