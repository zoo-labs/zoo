'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

interface DAOOnboardingFormData {
  name: string
  symbol: string
  tagline: string
  description: string
  mission: string
  focusArea: string
  fundingGoal: string
  multisig: string
  partners: string
  website: string
  twitter: string
  discord: string
  contactEmail: string
}

export function DAOOnboardingForm() {
  const { isConnected, address } = useAccount()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<DAOOnboardingFormData>({
    name: '',
    symbol: '',
    tagline: '',
    description: '',
    mission: '',
    focusArea: 'marine',
    fundingGoal: '',
    multisig: '',
    partners: '',
    website: '',
    twitter: '',
    discord: '',
    contactEmail: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const focusAreas = [
    { value: 'marine', label: '🌊 Marine Conservation', icon: '🧬' },
    { value: 'terrestrial', label: '🌲 Terrestrial Wildlife', icon: '🐅' },
    { value: 'arctic', label: '❄️ Arctic Ecosystems', icon: '🐋' },
    { value: 'research', label: '🔬 Conservation Research', icon: '🧪' },
    { value: 'technology', label: '💻 Conservation Tech', icon: '🤖' },
    { value: 'other', label: '🌍 Other', icon: '🦁' }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // In production, this would submit to your backend API
      // For now, we'll just log and show success message
      console.log('DAO Onboarding submission:', {
        ...formData,
        walletAddress: address,
        timestamp: new Date().toISOString()
      })

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      setSubmitted(true)
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-12 text-center">
        <div className="w-20 h-20 bg-[#667eea]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🔗</span>
        </div>
        <h3 className="text-2xl font-bold mb-4">Connect Your Wallet</h3>
        <p className="text-white/70 mb-6">
          To launch a new conservation DAO, please connect your wallet first. This ensures secure governance and transparent funding.
        </p>
        <p className="text-sm text-white/50">
          Use the "Connect Wallet" button in the top right corner
        </p>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl p-12 text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✅</span>
        </div>
        <h3 className="text-2xl font-bold mb-4">Application Submitted!</h3>
        <p className="text-white/80 mb-6">
          Thank you for your interest in launching <strong>{formData.name}</strong>. Our team will review your application and reach out within 3-5 business days.
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left mb-6">
          <h4 className="text-sm font-semibold mb-3 text-white/70">Next Steps:</h4>
          <ol className="space-y-2 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">1.</span>
              <span>Team review and governance vote (2-3 days)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">2.</span>
              <span>Smart contract deployment and multisig setup</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">3.</span>
              <span>DAO page creation and fundraising launch</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">4.</span>
              <span>Community onboarding and first proposals</span>
            </li>
          </ol>
        </div>
        <button
          onClick={() => { setSubmitted(false); setStep(1); setFormData({
            name: '',
            symbol: '',
            tagline: '',
            description: '',
            mission: '',
            focusArea: 'marine',
            fundingGoal: '',
            multisig: '',
            partners: '',
            website: '',
            twitter: '',
            discord: '',
            contactEmail: ''
          }) }}
          className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/15 transition-all"
        >
          Submit Another Application
        </button>
      </div>
    )
  }

  const totalSteps = 3

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-white/70">Step {step} of {totalSteps}</span>
          <span className="text-sm text-white/50">{Math.round((step / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Basic Information</h3>
              <p className="text-white/60 text-sm">Tell us about your conservation DAO</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">DAO Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., CoralDAO, ElephantDAO"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Token Symbol *</label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                required
                placeholder="e.g., CORAL, ELEPHANT"
                maxLength={10}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea] uppercase"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tagline *</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                required
                placeholder="One sentence describing your mission"
                maxLength={100}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Focus Area *</label>
              <select
                name="focusArea"
                value={formData.focusArea}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#667eea]"
              >
                {focusAreas.map(area => (
                  <option key={area.value} value={area.value} className="bg-black">
                    {area.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Funding Goal (USD) *</label>
              <input
                type="text"
                name="fundingGoal"
                value={formData.fundingGoal}
                onChange={handleChange}
                required
                placeholder="e.g., $250,000"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea]"
              />
            </div>
          </div>
        )}

        {/* Step 2: Mission & Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Mission & Details</h3>
              <p className="text-white/60 text-sm">Share your vision and strategy</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe your conservation focus, approach, and what makes your DAO unique"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea] resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mission Statement *</label>
              <textarea
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                required
                rows={3}
                placeholder="What is your DAO's core mission?"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea] resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Partner Organizations</label>
              <textarea
                name="partners"
                value={formData.partners}
                onChange={handleChange}
                rows={2}
                placeholder="List any partner organizations, research institutions, or field operators"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea] resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 3: Technical & Contact */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Technical & Contact</h3>
              <p className="text-white/60 text-sm">Setup and communication details</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Multisig Address *</label>
              <input
                type="text"
                name="multisig"
                value={formData.multisig}
                onChange={handleChange}
                required
                placeholder="0x... or zoo.eth"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea] font-mono text-sm"
              />
              <p className="text-xs text-white/40 mt-1">Your DAO's treasury wallet address</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contact Email *</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Twitter Handle</label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="@yourdao"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Discord Invite</label>
                <input
                  type="text"
                  name="discord"
                  value={formData.discord}
                  onChange={handleChange}
                  placeholder="discord.gg/..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea]"
                />
              </div>
            </div>

            <div className="bg-[#667eea]/10 border border-[#667eea]/30 rounded-lg p-4">
              <p className="text-sm text-white/80">
                <strong className="text-white">Note:</strong> After submission, the Zoo community will vote on your DAO proposal. Approved DAOs receive:
              </p>
              <ul className="text-sm text-white/70 mt-2 space-y-1 ml-4">
                <li>• Dedicated DAO page on Zoo Fund</li>
                <li>• Smart contract deployment support</li>
                <li>• Marketing and community promotion</li>
                <li>• Integration with Zoo Foundation infrastructure</li>
              </ul>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
            >
              Previous
            </button>
          ) : (
            <div></div>
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export function DAOOnboardingPage() {
  return (
    <div className="py-20">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#667eea]/10 border border-[#667eea]/30 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#667eea] rounded-full animate-pulse"></span>
            <span className="text-sm text-[#667eea] font-semibold">Self-Service Onboarding</span>
          </div>
          <h1 className="text-5xl font-black mb-6 tracking-tight">Launch Your Conservation DAO</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Join the decentralized conservation movement. Launch a specialized DAO, raise funds transparently, and coordinate conservation efforts globally.
          </p>
          <div className="flex items-center justify-center gap-12 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span>Fast approval process</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span>Secure multisig treasury</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <span>Global community support</span>
            </div>
          </div>
        </div>

        {/* Onboarding Form */}
        <DAOOnboardingForm />

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'How long does the approval process take?',
                a: 'Typically 3-5 business days. Your application will be reviewed by the Zoo community through our governance process.'
              },
              {
                q: 'What are the requirements to launch a DAO?',
                a: 'You need a clear conservation mission, initial team/partners, and a multisig wallet. We welcome DAOs at all funding stages.'
              },
              {
                q: 'Do I need technical expertise?',
                a: 'No! We handle smart contract deployment and technical setup. You focus on your conservation mission.'
              },
              {
                q: 'What fees are involved?',
                a: 'Zoo Foundation takes a 5% platform fee from funds raised to support infrastructure and shared services.'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white/3 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-2">{faq.q}</h4>
                <p className="text-white/70 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
