import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Download, Github, ExternalLink, ChevronRight, Play,
  Volume2, VolumeX, ArrowRight, Egg, Sword, Droplets,
  Flame, ShoppingBag, Heart, Sparkles, Bird,
  Award, Globe, Shield, Zap, Brain, DollarSign,
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const heroSlides = [
  { id: 0, title: 'Exotic Animals', type: '', uri: '#market' },
  { id: 1, title: 'Siberian Tiger', type: 'tiger', uri: '#drops' },
  { id: 2, title: 'Sumatran Elephant', type: 'elephant', uri: '#drops' },
  { id: 3, title: 'Nubian Giraffe', type: 'giraffe', uri: '#drops' },
  { id: 4, title: 'Leopards + More', type: 'more', uri: '#drops' },
  { id: 5, title: 'Origin Eggs', type: 'eggs', uri: '#eggs' },
]

const eggs = [
  { title: 'Endangered Egg', glb: '/models/Eggs/origin_endangered_egg_2.glb', image: '/img/egg1.png' },
  { title: 'Sublime Egg', glb: '/models/Eggs/origin_sublime_egg.glb', image: '/img/egg2.png' },
  { title: 'Rare Egg', glb: '/models/Eggs/origin_rare_egg.glb', image: '/img/egg.png' },
]

const nftUtilities = [
  { title: 'Play', icon: <Sword className="w-6 h-6" />, desc: 'Game mechanics with real rewards' },
  { title: 'Hatch', icon: <Egg className="w-6 h-6" />, desc: 'Hatch eggs into unique animals' },
  { title: 'Pools', icon: <Droplets className="w-6 h-6" />, desc: 'Liquidity-backed NFTs' },
  { title: 'Feed', icon: <Heart className="w-6 h-6" />, desc: 'Feed to increase collateral' },
  { title: 'Burning', icon: <Flame className="w-6 h-6" />, desc: 'Deflationary mechanics' },
  { title: 'Buy / Sell', icon: <ShoppingBag className="w-6 h-6" />, desc: 'Marketplace trading' },
  { title: 'Grow', icon: <Sparkles className="w-6 h-6" />, desc: 'Baby to Adult stages' },
  { title: 'Boosts', icon: <Zap className="w-6 h-6" />, desc: 'Boost your earnings' },
  { title: 'Make Offers', icon: <DollarSign className="w-6 h-6" />, desc: 'Bid on any NFT' },
  { title: 'Breed', icon: <Bird className="w-6 h-6" />, desc: 'Up to 7x per generation' },
  { title: 'Earns', icon: <Award className="w-6 h-6" />, desc: 'Passive yield from NFTs' },
  { title: 'Metaverse', icon: <Globe className="w-6 h-6" />, desc: 'Virtual companions' },
]

const animals = [
  { name: 'Sumatran Elephant', latin: 'Elephas Maximus Sumatranus', image: '/images/elephant.png', threat: 'Critically Endangered' },
  { name: 'Siberian Tiger', latin: 'Panthera Tigris Altaica', image: '/images/tiger.png', threat: 'Endangered' },
  { name: 'Amur Leopard', latin: 'Panthera Pardus Orientalis', image: '/img/amur-leopard.png', threat: 'Critically Endangered' },
  { name: 'Javan Rhino', latin: 'Rhinoceros Sondaicus', image: '/images/giant-rhino.png', threat: 'Critically Endangered' },
  { name: 'Pygmy Hippo', latin: 'Choeropsis Liberiensis', image: '/images/hippo.png', threat: 'Endangered' },
]

const conservationStats = [
  { value: '16,000+', label: 'endangered species threatened with extinction' },
  { value: '82%', label: 'of spending dedicated to conservation' },
  { value: '100%', label: 'controlled by members of Zoo DAO' },
]

const partners = [
  { name: 'WWF', src: '/img/wwf.svg' },
  { name: 'WCS', src: '/img/wcs.svg' },
  { name: 'ZSL', src: '/img/zsl.svg' },
  { name: 'IUCN', src: '/img/iucn.svg' },
  { name: 'Panthera', src: '/img/panthera.svg' },
  { name: 'IRF', src: '/img/irf.svg' },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0])
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.1])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Sync slide titles to video timestamps (original behavior)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleTime = () => {
      const t = video.currentTime
      let idx = 0
      if (t < 9) idx = 0
      else if (t < 17) idx = 1
      else if (t < 21) idx = 2
      else if (t < 29) idx = 3
      else if (t < 38) idx = 4
      else idx = 5
      setActiveSlide(idx)
    }
    video.addEventListener('timeupdate', handleTime)
    return () => video.removeEventListener('timeupdate', handleTime)
  }, [])

  const slide = heroSlides[activeSlide]

  return (
    <>
      <Head>
        <title>Zoo Labs - Exotic Animals x AI Agents</title>
        <meta name="description" content="Zoo Labs - Collect, hatch, breed, and trade exotic animal AI agents. NFT marketplace powered by decentralized science." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-black text-white">

        {/* ─── Nav ─────────────────────────────────────────────────────────── */}
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
        }`}>
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tight">ZOO</Link>
            <div className="hidden md:flex items-center space-x-8 text-sm">
              <a href="#eggs" className="text-white/70 hover:text-white transition-colors">Eggs</a>
              <a href="#nft-utility" className="text-white/70 hover:text-white transition-colors">Game</a>
              <a href="#animals" className="text-white/70 hover:text-white transition-colors">Animals</a>
              <a href="#market" className="text-white/70 hover:text-white transition-colors">Marketplace</a>
              <a href="#governance" className="text-white/70 hover:text-white transition-colors">DAO</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="https://github.com/zoo-labs" target="_blank" className="p-2 text-white/70 hover:text-white">
                <Github className="w-5 h-5" />
              </Link>
              <a href="#eggs" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
                <Play className="w-4 h-4" />
                Enter Zoo
              </a>
            </div>
          </div>
        </nav>

        {/* ─── Hero: Fullscreen Video ──────────────────────────────────────── */}
        <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="relative h-screen w-full overflow-hidden">
          <video
            ref={videoRef}
            autoPlay muted={isMuted} loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/videoplayback-trimmed.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80" />

          <div className="absolute inset-0 z-50 flex items-center">
            <div className="container mx-auto px-6">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-none tracking-tight">
                  {slide.title}
                </h1>
                <Link href={slide.uri}>
                  <span className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/60 rounded-full text-lg font-medium hover:bg-white/10 transition-all cursor-pointer">
                    {slide.type ? `Buy ${slide.type.charAt(0).toUpperCase() + slide.type.slice(1)}` : 'Explore the Zoo'}
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-8 right-8 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1"
            >
              <motion.div className="w-1.5 h-3 bg-white/60 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ─── Buy Origin Eggs ─────────────────────────────────────────────── */}
        <section id="eggs" className="py-24 px-6 bg-black">
          <div className="container mx-auto max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Buy Origin Egg NFTs.</h2>
              <p className="text-center text-white/50 mb-16 text-lg">Each Origin Egg can mint 1,500+ unique animal NFTs.</p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                {eggs.map((egg) => (
                  <motion.div
                    key={egg.title}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full md:w-[280px] cursor-pointer group hover:border-amber-400/30 transition-all"
                  >
                    <div className="w-full h-[260px] bg-black rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="w-48 h-48 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={egg.image} alt={egg.title} className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{egg.title}</h3>
                      <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-amber-400/20 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Unimaginable Experiences (Trippy Video) ─────────────────────── */}
        <section className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-center max-w-4xl leading-tight"
            >
              Unimaginable
              <br />
              Experiences
            </motion.h2>
          </div>
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/videos/trippy_animals_short.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
        </section>

        {/* ─── Reliable Governance ─────────────────────────────────────────── */}
        <section id="governance" className="py-24 px-6 bg-black">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">Reliable Governance</h2>
                  <p className="text-white/50 text-lg mb-8 leading-relaxed">
                    Our DAO leverages holographic consensus and quadratic voting.
                    Every $ZOO holder has a voice in how the ecosystem evolves.
                  </p>
                  <a href="#" className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/15 transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="lg:w-1/2">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/img/partnership.svg" alt="Governance" className="w-48 h-48 mx-auto opacity-60" />
                    <p className="text-white/40 mt-6 text-sm">Holographic Consensus + Quadratic Voting</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── NFT Utilities Grid ──────────────────────────────────────────── */}
        <section id="nft-utility" className="py-24 px-6 bg-zinc-950">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">What can you do with your NFT?</h2>
              <p className="text-center text-white/50 mb-16 text-lg">
                Zoo NFTs have real value and unique <em className="text-white/70">utility!</em>
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {nftUtilities.map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-between cursor-pointer hover:border-white/20 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-white/60 group-hover:text-white transition-colors">{item.icon}</span>
                      <div>
                        <p className="font-semibold text-lg">{item.title}</p>
                        <p className="text-white/40 text-sm">{item.desc}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── It All Starts With 1 Egg ────────────────────────────────────── */}
        <section className="py-24 px-6 bg-black">
          <div className="container mx-auto max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2">
                  <div className="bg-white/5 border border-white/10 rounded-2xl h-[400px] flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/egg.gif" alt="Origin Egg" className="w-72 h-72 object-contain" />
                  </div>
                </div>
                <div className="lg:w-1/2 text-center lg:text-left">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    It all starts with 1 egg.
                  </h2>
                  <p className="text-white/50 text-lg mb-8 leading-relaxed">
                    Buy an Origin Egg, hatch it to discover your unique animal. Feed it, grow it from baby to adult, then breed to create the next generation.
                  </p>
                  <a href="#eggs" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all">
                    Start Collecting
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Grab an Animal ──────────────────────────────────────────────── */}
        <section id="animals" className="py-24 px-6 bg-zinc-950">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Or grab an animal straightaway</h2>
              <p className="text-center text-white/50 mb-16 text-lg">5 endangered species as AI agents you can collect, trade, and play with</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {animals.map((animal) => (
                  <motion.div
                    key={animal.name}
                    whileHover={{ y: -6 }}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-white/20 transition-all"
                  >
                    <div className="h-[240px] bg-black flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={animal.image} alt={animal.name} className="w-48 h-48 object-contain group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-amber-400/80 font-medium mb-1">{animal.threat}</p>
                      <h3 className="text-xl font-bold mb-1">{animal.name}</h3>
                      <p className="text-white/40 text-sm italic">{animal.latin}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-white/50 text-sm">AI Agent NFT</span>
                        <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Breed + Piggy Bank */}
              <div className="grid md:grid-cols-2 gap-8 mt-16">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="h-[200px] flex items-center justify-center mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/circle_tiger.png" alt="Breed" className="w-40 h-40 object-contain" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Breed up to 7X</h3>
                  <p className="text-white/50 leading-relaxed">
                    First generation can breed up to 7x, while every latter generation will be able to breed 1 less time.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="h-[200px] flex items-center justify-center mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/hippo.png" alt="Piggy Bank" className="w-40 h-40 object-contain" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Virtual Piggy Bank</h3>
                  <p className="text-white/50 leading-relaxed">
                    Start earning rewards as you lock liquidity into your NFT... like a virtual piggy bank.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Marketplace / Conservation Stats ────────────────────────────── */}
        <section id="market" className="py-24 px-6 bg-black">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex flex-col lg:flex-row items-start gap-16">
                <div className="lg:w-1/2">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white/80">We love animals.</h2>
                  <p className="text-white/50 leading-relaxed mb-8">
                    The Zoo Labs Foundation is dedicated to saving and preserving endangered species.
                    Our 501c3 is controlled by the Zoo DAO and allocates a portion of its liquidity
                    to supporting animals in real life! By participating in the Zoo ecosystem you are
                    also aiding in the efforts to save endangered species in the real world.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#" className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 text-black rounded-full font-medium hover:bg-white transition-colors">
                      <span>Donate Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a href="#governance" className="inline-flex items-center gap-3 px-6 py-3 border border-white/30 rounded-full font-medium hover:bg-white/5 transition-colors">
                      <span>Join DAO</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="lg:w-1/2 w-full">
                  <div className="space-y-0">
                    {conservationStats.map((stat) => (
                      <div key={stat.value} className="border-b border-white/10 py-6 flex items-center gap-8">
                        <span className="text-4xl font-bold text-white/70 min-w-[140px]">{stat.value}</span>
                        <span className="text-white/40">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Partners ────────────────────────────────────────────────────── */}
        <section className="py-16 px-6 bg-zinc-950 border-y border-white/5">
          <div className="container mx-auto max-w-6xl">
            <p className="text-center text-white/30 text-sm uppercase tracking-widest mb-10">Conservation Partners</p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-40">
              {partners.map((p) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={p.name} src={p.src} alt={p.name} className="h-10 w-auto invert" />
              ))}
            </div>
          </div>
        </section>

        {/* ─── App Download / AI Section ───────────────────────────────────── */}
        <section className="py-24 px-6 bg-black">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-10 md:p-16 text-center">
                <Brain className="w-16 h-16 mx-auto mb-6 text-purple-400" />
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Zoo AI Desktop App</h2>
                <p className="text-white/50 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                  Run local AI models privately. Powered by ZenLM (Qwen3 architecture).
                  Your animals are AI agents that learn, evolve, and interact.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="https://github.com/zoo-labs/zoo/releases"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all"
                  >
                    <Download className="w-5 h-5" />
                    Download App
                  </a>
                  <Link
                    href="https://github.com/zoo-labs/zoo"
                    target="_blank"
                    className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    View Source
                  </Link>
                </div>
                <div className="flex gap-6 justify-center mt-8 text-sm text-white/40">
                  <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> 100% Private</span>
                  <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> GPU Accelerated</span>
                  <span className="flex items-center gap-2"><Brain className="w-4 h-4" /> ZenLM Models</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Footer ──────────────────────────────────────────────────────── */}
        <footer className="border-t border-white/10 py-16 px-6 bg-black">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <span className="text-2xl font-bold tracking-tight">ZOO</span>
                <p className="text-sm text-white/40 mt-3">
                  Exotic animals meet cutting-edge AI.
                  Collect, hatch, breed, and trade.
                </p>
                <div className="flex gap-4 mt-4">
                  {[
                    { icon: '/img/twitter.svg', href: '#' },
                    { icon: '/img/discord.svg', href: '#' },
                    { icon: '/img/telegram.svg', href: '#' },
                    { icon: '/img/instagram.svg', href: '#' },
                  ].map((s) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <a key={s.icon} href={s.href} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                      <img src={s.icon} alt="" className="w-4 h-4 invert opacity-60" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-white/80">Ecosystem</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#eggs" className="text-white/40 hover:text-white/80 transition-colors">Buy Eggs</a></li>
                  <li><a href="#animals" className="text-white/40 hover:text-white/80 transition-colors">Animals</a></li>
                  <li><a href="#market" className="text-white/40 hover:text-white/80 transition-colors">Marketplace</a></li>
                  <li><a href="#governance" className="text-white/40 hover:text-white/80 transition-colors">DAO</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-white/80">Research</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="https://papers.zoo.ngo" className="text-white/40 hover:text-white/80 transition-colors">Papers</Link></li>
                  <li><Link href="https://zenlm.org" className="text-white/40 hover:text-white/80 transition-colors">ZenLM Models</Link></li>
                  <li><Link href="https://github.com/zoo-labs" className="text-white/40 hover:text-white/80 transition-colors">Open Source</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-white/80">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="https://hanzo.ai" className="text-white/40 hover:text-white/80 transition-colors">Hanzo AI</Link></li>
                  <li><Link href="https://zoo.ngo" className="text-white/40 hover:text-white/80 transition-colors">Zoo Foundation</Link></li>
                  <li><a href="mailto:info@zoolabs.io" className="text-white/40 hover:text-white/80 transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/30">
              <p>&copy; {new Date().getFullYear()} Zoo Labs Foundation. All rights reserved. | NVIDIA Inception Partner | Techstars &apos;17</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
