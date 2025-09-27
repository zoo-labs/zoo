import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

export default function Docs() {
  const [selectedSection, setSelectedSection] = useState('getting-started');

  return (
    <Layout>
      <Seo
        templateTitle="Documentation"
        description="Technical documentation for Zoo Foundation APIs, SDKs, and conservation tools"
      />
      <Navbar />

      <div className="bg-black text-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Documentation</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            Comprehensive technical documentation for integrating with Zoo Foundation's
            conservation technology stack, APIs, and decentralized governance tools.
          </p>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1">
              <nav className="sticky top-4">
                <h3 className="text-lg font-bold mb-4">Documentation</h3>
                <ul className="space-y-2">
                  {[
                    { id: 'getting-started', label: 'Getting Started' },
                    { id: 'api-reference', label: 'API Reference' },
                    { id: 'zenlm', label: 'ZenLM AI Framework' },
                    { id: 'dao-governance', label: 'DAO Governance' },
                    { id: 'smart-contracts', label: 'Smart Contracts' },
                    { id: 'sdks', label: 'SDKs & Libraries' },
                    { id: 'data-formats', label: 'Data Formats' },
                    { id: 'webhooks', label: 'Webhooks & Events' },
                  ].map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => setSelectedSection(section.id)}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedSection === section.id
                            ? 'bg-green-600 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        {section.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Content Area */}
            <div className="md:col-span-3">
              {selectedSection === 'getting-started' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Introduction</h3>
                      <p className="text-gray-300 mb-4">
                        Zoo Foundation provides a comprehensive API ecosystem for conservation organizations,
                        researchers, and developers building wildlife protection solutions.
                      </p>
                      <p className="text-gray-300">
                        Our APIs enable access to wildlife monitoring data, AI-powered species identification,
                        conservation funding mechanisms, and decentralized governance tools.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">Authentication</h3>
                      <div className="bg-gray-900 rounded-lg p-6 mb-4">
                        <p className="text-gray-400 mb-4">Include your API key in the Authorization header:</p>
                        <pre className="bg-black p-4 rounded overflow-x-auto">
                          <code>{`Authorization: Bearer YOUR_API_KEY`}</code>
                        </pre>
                      </div>
                      <p className="text-gray-300">
                        Request an API key at <a href="https://api.zoo.network/keys" className="text-green-500 hover:text-green-400">api.zoo.network/keys</a>
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">Base URL</h3>
                      <div className="bg-gray-900 rounded-lg p-6">
                        <code className="text-green-400">https://api.zoo.network/v1</code>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">Rate Limits</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Free tier: 1,000 requests/day</li>
                        <li>• Research tier: 10,000 requests/day</li>
                        <li>• Conservation Partner: Unlimited</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === 'api-reference' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">API Reference</h2>
                  <div className="space-y-8">
                    <div className="border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4">Species Identification</h3>
                      <div className="bg-gray-900 rounded p-4 mb-4">
                        <code className="text-green-400">POST /api/v1/species/identify</code>
                      </div>
                      <p className="text-gray-400 mb-4">
                        Upload an image for AI-powered species identification
                      </p>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium mb-2">Request Body:</p>
                          <pre className="bg-black p-4 rounded overflow-x-auto text-sm">
{`{
  "image": "base64_encoded_image",
  "location": {
    "lat": 40.7128,
    "lng": -74.0060
  },
  "timestamp": "2025-09-27T10:00:00Z"
}`}
                          </pre>
                        </div>
                        <div>
                          <p className="font-medium mb-2">Response:</p>
                          <pre className="bg-black p-4 rounded overflow-x-auto text-sm">
{`{
  "species": {
    "common_name": "Bengal Tiger",
    "scientific_name": "Panthera tigris tigris",
    "confidence": 0.98
  },
  "conservation_status": "Endangered",
  "population_estimate": 2500
}`}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4">Habitat Analysis</h3>
                      <div className="bg-gray-900 rounded p-4 mb-4">
                        <code className="text-green-400">POST /api/v1/habitat/analyze</code>
                      </div>
                      <p className="text-gray-400 mb-4">
                        Analyze satellite imagery for habitat health assessment
                      </p>
                    </div>

                    <div className="border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4">Threat Monitoring</h3>
                      <div className="bg-gray-900 rounded p-4 mb-4">
                        <code className="text-green-400">GET /api/v1/threats/monitor</code>
                      </div>
                      <p className="text-gray-400 mb-4">
                        Real-time monitoring of conservation threats in specified regions
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === 'zenlm' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">ZenLM AI Framework</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Overview</h3>
                      <p className="text-gray-300 mb-4">
                        ZenLM is our proprietary language model specifically trained on conservation data,
                        wildlife behavior patterns, and environmental factors.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">Capabilities</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-3">•</span>
                          <div>
                            <strong>Species Classification:</strong> 98% accuracy across 2,300+ species
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-3">•</span>
                          <div>
                            <strong>Behavior Prediction:</strong> Predict migration patterns and habitat use
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-3">•</span>
                          <div>
                            <strong>Threat Detection:</strong> Identify poaching and habitat destruction risks
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-3">•</span>
                          <div>
                            <strong>Population Analysis:</strong> Estimate population sizes and trends
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">Model Access</h3>
                      <div className="bg-gray-900 rounded-lg p-6">
                        <p className="text-gray-400 mb-4">ZenLM endpoints:</p>
                        <ul className="space-y-2 font-mono text-sm">
                          <li><code className="text-green-400">POST /api/v1/zenlm/analyze</code></li>
                          <li><code className="text-green-400">POST /api/v1/zenlm/predict</code></li>
                          <li><code className="text-green-400">GET /api/v1/zenlm/insights</code></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === 'dao-governance' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">DAO Governance</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Governance APIs</h3>
                      <p className="text-gray-300 mb-6">
                        Integrate with Zoo Foundation's decentralized governance system for
                        transparent conservation funding decisions.
                      </p>
                    </div>

                    <div className="border border-gray-700 rounded-lg p-6">
                      <h4 className="text-xl font-bold mb-4">Create Proposal</h4>
                      <div className="bg-gray-900 rounded p-4 mb-4">
                        <code className="text-green-400">POST /api/v1/dao/proposals</code>
                      </div>
                      <pre className="bg-black p-4 rounded overflow-x-auto text-sm">
{`{
  "dao": "OceanDAO",
  "title": "Fund Coral Reef Restoration",
  "description": "...",
  "amount": 50000,
  "recipient": "0x...",
  "milestones": [...]
}`}
                      </pre>
                    </div>

                    <div className="border border-gray-700 rounded-lg p-6">
                      <h4 className="text-xl font-bold mb-4">Vote on Proposal</h4>
                      <div className="bg-gray-900 rounded p-4 mb-4">
                        <code className="text-green-400">POST /api/v1/dao/proposals/{'id'}/vote</code>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === 'smart-contracts' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">Smart Contracts</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Contract Addresses</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-900 rounded-lg p-6">
                          <h4 className="font-bold mb-2">ZOO Token</h4>
                          <code className="text-green-400 text-sm">0x1234...abcd</code>
                          <p className="text-gray-400 text-sm mt-2">Ethereum Mainnet</p>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-6">
                          <h4 className="font-bold mb-2">Treasury Contract</h4>
                          <code className="text-green-400 text-sm">0x5678...efgh</code>
                          <p className="text-gray-400 text-sm mt-2">Ethereum Mainnet</p>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-6">
                          <h4 className="font-bold mb-2">Governance Contract</h4>
                          <code className="text-green-400 text-sm">0x9abc...ijkl</code>
                          <p className="text-gray-400 text-sm mt-2">Ethereum Mainnet</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">Contract ABIs</h3>
                      <p className="text-gray-300 mb-4">
                        Download contract ABIs for integration:
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <a href="#" className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700">
                          Download ABIs
                        </a>
                        <a href="https://github.com/zoo-labs/contracts" className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600">
                          View on GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === 'sdks' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">SDKs & Libraries</h2>
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="border border-gray-700 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4">JavaScript/TypeScript</h3>
                        <div className="bg-gray-900 rounded p-4 mb-4">
                          <code className="text-green-400">npm install @zoo-foundation/sdk</code>
                        </div>
                        <pre className="bg-black p-4 rounded text-sm">
{`import { ZooClient } from '@zoo-foundation/sdk';

const client = new ZooClient({
  apiKey: 'YOUR_API_KEY'
});

const species = await client.identify(image);`}
                        </pre>
                      </div>

                      <div className="border border-gray-700 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4">Python</h3>
                        <div className="bg-gray-900 rounded p-4 mb-4">
                          <code className="text-green-400">pip install zoo-foundation</code>
                        </div>
                        <pre className="bg-black p-4 rounded text-sm">
{`from zoo_foundation import ZooClient

client = ZooClient(api_key='YOUR_API_KEY')

species = client.identify(image)
print(species.common_name)`}
                        </pre>
                      </div>

                      <div className="border border-gray-700 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4">Go</h3>
                        <div className="bg-gray-900 rounded p-4 mb-4">
                          <code className="text-green-400">go get github.com/zoo-foundation/go-sdk</code>
                        </div>
                      </div>

                      <div className="border border-gray-700 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4">REST API</h3>
                        <p className="text-gray-400">
                          Direct HTTP requests supported for any language
                        </p>
                        <a href="#api-reference" className="text-green-500 hover:text-green-400 mt-4 inline-block">
                          View API Reference →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === 'data-formats' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">Data Formats</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Wildlife Observation Format</h3>
                      <pre className="bg-black p-4 rounded overflow-x-auto text-sm">
{`{
  "observation_id": "obs_123456",
  "timestamp": "2025-09-27T10:00:00Z",
  "location": {
    "lat": 40.7128,
    "lng": -74.0060,
    "accuracy_meters": 10,
    "habitat_type": "forest"
  },
  "species": {
    "common_name": "Bengal Tiger",
    "scientific_name": "Panthera tigris tigris",
    "confidence": 0.98
  },
  "individual": {
    "id": "tiger_001",
    "age_estimate": "adult",
    "sex": "male",
    "health_status": "good"
  },
  "behavior": {
    "activity": "hunting",
    "group_size": 1,
    "interaction": null
  },
  "media": [
    {
      "type": "image",
      "url": "https://...",
      "captured_by": "camera_trap_01"
    }
  ],
  "environmental": {
    "temperature_celsius": 28,
    "humidity_percent": 75,
    "weather": "clear"
  }
}`}
                      </pre>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">Conservation Project Format</h3>
                      <pre className="bg-black p-4 rounded overflow-x-auto text-sm">
{`{
  "project_id": "proj_789",
  "name": "Tiger Habitat Restoration",
  "dao": "TigerDAO",
  "status": "active",
  "funding": {
    "target": 100000,
    "raised": 75000,
    "currency": "USD"
  },
  "milestones": [...],
  "impact_metrics": {...}
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === 'webhooks' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">Webhooks & Events</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Available Events</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>
                          <strong>species.identified</strong> - New species identification completed
                        </li>
                        <li>
                          <strong>threat.detected</strong> - Conservation threat detected
                        </li>
                        <li>
                          <strong>proposal.created</strong> - New DAO proposal submitted
                        </li>
                        <li>
                          <strong>proposal.executed</strong> - DAO proposal approved and executed
                        </li>
                        <li>
                          <strong>milestone.completed</strong> - Project milestone achieved
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">Webhook Configuration</h3>
                      <div className="bg-gray-900 rounded-lg p-6">
                        <p className="text-gray-400 mb-4">Register a webhook endpoint:</p>
                        <pre className="bg-black p-4 rounded overflow-x-auto text-sm">
{`POST /api/v1/webhooks
{
  "url": "https://your-app.com/webhook",
  "events": ["species.identified", "threat.detected"],
  "secret": "your_webhook_secret"
}`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">Event Payload</h3>
                      <pre className="bg-black p-4 rounded overflow-x-auto text-sm">
{`{
  "event": "species.identified",
  "timestamp": "2025-09-27T10:00:00Z",
  "data": {
    "species": "Bengal Tiger",
    "location": {...},
    "confidence": 0.98
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Quick Links</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <a href="https://github.com/zoo-labs" className="border border-gray-700 rounded-lg p-6 hover:bg-gray-800 transition-colors">
                <h3 className="font-bold mb-2">GitHub</h3>
                <p className="text-gray-400 text-sm">View our open source repositories</p>
              </a>
              <a href="https://api.zoo.network/status" className="border border-gray-700 rounded-lg p-6 hover:bg-gray-800 transition-colors">
                <h3 className="font-bold mb-2">API Status</h3>
                <p className="text-gray-400 text-sm">Check service availability</p>
              </a>
              <a href="https://api.zoo.network/keys" className="border border-gray-700 rounded-lg p-6 hover:bg-gray-800 transition-colors">
                <h3 className="font-bold mb-2">Get API Key</h3>
                <p className="text-gray-400 text-sm">Request access to our APIs</p>
              </a>
              <a href="/support" className="border border-gray-700 rounded-lg p-6 hover:bg-gray-800 transition-colors">
                <h3 className="font-bold mb-2">Support</h3>
                <p className="text-gray-400 text-sm">Get help from our team</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}