import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';
import Intro from '@/components/intro/Intro';
import Comment from '@/components/Comment';
import Principles from '@/components/Principles';
import AnimalDetail from '@/components/animal/Detail';
import AnimalItems from '@/components/animal/Item';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Layout>
      <Seo />
      <Navbar />

      <Intro
        breadcrumbs="Zoo Labs Foundation"
        title="Preserve"
        comment=" Wildlife biodiversity through aligned charities, education, research and active conservation efforts."
      />

      <Comment />

      <Principles />

      <div>
        <AnimalDetail />
      </div>

      <AnimalItems />

      {/* Research & Science Section (Migrated from Hanzo Industries) */}
      <section className="bg-gradient-to-b from-white via-emerald-50/30 to-white py-24 border-t border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 mb-4">
              <span>🔬</span>
              <span>Open Science & Ecological AI</span>
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-950 tracking-tight">
              Conservation Science Powered by AI
            </h2>
            <p className="text-xl text-gray-600 mt-4 leading-relaxed">
              We pioneer open-access research, bioacoustics, edge computer vision, and decentralized AI to protect Earth's most vulnerable species.
            </p>
          </div>

          {/* Zoo Labs Laboratory Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-800 text-white p-8 md:p-12 mb-16 shadow-xl">
            <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-white/20 text-white backdrop-blur-md mb-4 uppercase tracking-wider">
                  🧪 Autonomous Research Laboratory
                </span>
                <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                  Zoo Labs — AI & Robotics for Wildlife
                </h3>
                <p className="text-lg text-emerald-100 leading-relaxed max-w-2xl mb-6">
                  Zoo Labs is our non-profit applied AI research lab developing open foundational models, real-time bioacoustic interpreters, and interactive marine intelligence.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="https://zoolabs.io"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-extrabold text-base shadow-md transition-all"
                  >
                    <span>Launch Zoo Labs (zoolabs.io)</span>
                    <span className="text-emerald-700">↗</span>
                  </Link>
                  <Link
                    href="/research"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-900/60 hover:bg-emerald-900/90 text-white border border-white/20 font-bold text-base transition-colors"
                  >
                    <span>Read Research Papers</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
              <div className="md:col-span-4 flex flex-col gap-3 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-200">Lab Capabilities</p>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span>🐬</span>
                  <span>ZenLM Marine Bioacoustics</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span>📷</span>
                  <span>Anti-Poaching Computer Vision</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span>🧬</span>
                  <span>eDNA Biodiversity Mapping</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span>🌐</span>
                  <span>DeSci Community Grants</span>
                </div>
              </div>
            </div>
          </div>

          {/* Research Areas Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mb-6">
                  🐬
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Marine Bioacoustics & ZenLM</h4>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  Decoding beluga whale vocalizations, dolphin clicks, and cetacean communication patterns using state-of-the-art acoustic foundation models.
                </p>
              </div>
              <Link
                href="https://zoolabs.io"
                className="inline-flex items-center text-emerald-600 font-bold hover:text-emerald-700 gap-1.5 text-base"
              >
                <span>Interactive Beluga at Labs</span>
                <span>↗</span>
              </Link>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-3xl mb-6">
                  ⚡
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Gym Training Platform</h4>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  Decentralized model training at scale using TF-GRPO on distributed edge nodes. Reducing compute costs by 99% for non-profit conservation groups.
                </p>
              </div>
              <Link
                href="/research"
                className="inline-flex items-center text-sky-600 font-bold hover:text-sky-700 gap-1.5 text-base"
              >
                <span>Read Technical Whitepaper</span>
                <span>→</span>
              </Link>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-3xl mb-6">
                  🌐
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Experience Ledger & DeSci</h4>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  Decentralized Semantic Optimization (DSO) for peer-to-peer wildlife tracking, proof-of-conservation telemetry, and transparent grants.
                </p>
              </div>
              <Link
                href="https://zoo.fund"
                className="inline-flex items-center text-teal-600 font-bold hover:text-teal-700 gap-1.5 text-base"
              >
                <span>Explore Zoo Fund (DeSci)</span>
                <span>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Wildlife Volunteer Experiences */}
      <section className="bg-gray-50 py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-sky-100 text-sky-900 mb-4">
              <span>🌊</span>
              <span>Field Expeditions & Sanctuaries</span>
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-950 tracking-tight">
              Wildlife Volunteer Experiences
            </h2>
            <p className="text-lg text-gray-600 mt-4 leading-relaxed">
              Get up close with wildlife conservation through our hands-on field volunteer expeditions and animal sanctuaries worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/experiences/1" className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img
                  src="/images/volunteer-experiences/luxury-yacht-shark-breach.jpg"
                  alt="Ultimate Luxury Great White Shark Expedition"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Farallone Islands, San Francisco</span>
                <h3 className="font-extrabold text-xl text-gray-900 mt-1 mb-2">Great White Shark Expedition</h3>
                <p className="text-gray-600 text-sm mb-4">Tagging and observation alongside marine biologists and underwater telemetry.</p>
                <p className="text-xl font-black text-emerald-700">$75,000 <span className="text-sm font-normal text-gray-500">/ 20 Guests Expedition</span></p>
              </div>
            </Link>

            <Link href="/experiences/7" className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img
                  src="/images/volunteer-experiences/intimate-shark-two.jpg"
                  alt="Intimate Great White Shark Encounter"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Farallone Islands, San Francisco</span>
                <h3 className="font-extrabold text-xl text-gray-900 mt-1 mb-2">Intimate Shark Encounter</h3>
                <p className="text-gray-600 text-sm mb-4">Hands-on conservation training and shark cage observation for two.</p>
                <p className="text-xl font-black text-emerald-700">$2,500 <span className="text-sm font-normal text-gray-500">/ 2 Guests</span></p>
              </div>
            </Link>

            <Link href="/experiences/8" className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img
                  src="/images/volunteer-experiences/modular-shark-adventure.jpg"
                  alt="Premium Great White Shark Expedition"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Farallone Islands, San Francisco</span>
                <h3 className="font-extrabold text-xl text-gray-900 mt-1 mb-2">Premium Wildlife Expedition</h3>
                <p className="text-gray-600 text-sm mb-4">Full-day ocean research vessel voyage with drone & hydrophone data capture.</p>
                <p className="text-xl font-black text-emerald-700">$3,500 <span className="text-sm font-normal text-gray-500">/ Expedition</span></p>
              </div>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <Link href="/experiences" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-extrabold text-base shadow-md transition-colors">
              <span>Browse All Volunteer Expeditions</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Join the Movement & Donate */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 mb-4">
            <span>💚</span>
            <span>Tax-Deductible 501(c)(3)</span>
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-950 tracking-tight mb-6">
            Join the Movement to Save Earth's Animals
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-14 leading-relaxed">
            Whether through direct contributions, student volunteering, or spreading awareness, your support powers real-world conservation impact.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-14 text-left">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:shadow-md transition-all">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Direct Donations</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Fund field collars, anti-poaching patrols, veterinary medicine, and food supplies for wildlife sanctuaries.
              </p>
              <Link href="/donation" className="text-emerald-700 font-extrabold hover:text-emerald-800 text-sm flex items-center gap-1">
                <span>Give Today</span>
                <span>→</span>
              </Link>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:shadow-md transition-all">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Institutional Partnerships</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Collaborate with research institutions, university departments, and environmental conservation trusts.
              </p>
              <Link href="/partners" className="text-emerald-700 font-extrabold hover:text-emerald-800 text-sm flex items-center gap-1">
                <span>Partner With Us</span>
                <span>→</span>
              </Link>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:shadow-md transition-all">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Zoo Labs AI Research</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Explore open science datasets, fine-tune models for wildlife tracking, or contribute to bioacoustic models.
              </p>
              <Link href="https://zoolabs.io" className="text-emerald-700 font-extrabold hover:text-emerald-800 text-sm flex items-center gap-1">
                <span>Visit Labs (zoolabs.io)</span>
                <span>↗</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/donation"
              className="inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Donate Now (501c3)
            </Link>
            <Link
              href="https://zoolabs.io"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white hover:bg-gray-50 text-gray-900 border-2 border-emerald-500 font-bold text-lg shadow-sm transition-all"
            >
              Explore Zoo Labs (zoolabs.io) ↗
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}