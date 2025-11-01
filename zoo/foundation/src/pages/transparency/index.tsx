import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

export default function Transparency() {
  const [selectedYear, setSelectedYear] = useState('2024');

  return (
    <Layout>
      <Seo
        templateTitle="Transparency & Accountability"
        description="Complete financial transparency and accountability reports for Zoo Foundation"
      />
      <Navbar />

      <div className="bg-black text-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Transparency & Accountability</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            As a 501(c)(3) nonprofit organization, we maintain complete transparency in our operations, 
            finances, and impact. Every dollar donated is tracked and reported.
          </p>
        </div>

        {/* Key Financial Metrics */}
        <div className="bg-gradient-to-r from-green-900 to-blue-900 py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-5xl font-bold mb-2">88%</p>
                <p className="text-xl">Program Efficiency</p>
                <p className="text-sm text-gray-300 mt-2">Direct to conservation</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">4 Stars</p>
                <p className="text-xl">Charity Navigator</p>
                <p className="text-sm text-gray-300 mt-2">Highest rating</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">Platinum</p>
                <p className="text-xl">GuideStar</p>
                <p className="text-sm text-gray-300 mt-2">Transparency seal</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">A+</p>
                <p className="text-xl">CharityWatch</p>
                <p className="text-sm text-gray-300 mt-2">Top rated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Financial Overview</h2>
          
          {/* Year Selector */}
          <div className="flex gap-4 mb-8">
            {['2024', '2023', '2022', '2021'].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedYear === year
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                FY {year}
              </button>
            ))}
          </div>

          {selectedYear === '2024' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6">Revenue Sources</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Individual Donations</span>
                      <span className="font-bold">$8,234,567</span>
                    </div>
                    <div className="bg-gray-800 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{width: '45%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Foundation Grants</span>
                      <span className="font-bold">$4,567,890</span>
                    </div>
                    <div className="bg-gray-800 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full" style={{width: '25%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Corporate Partners</span>
                      <span className="font-bold">$3,456,789</span>
                    </div>
                    <div className="bg-gray-800 rounded-full h-3">
                      <div className="bg-purple-500 h-3 rounded-full" style={{width: '19%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Government Grants</span>
                      <span className="font-bold">$2,012,345</span>
                    </div>
                    <div className="bg-gray-800 rounded-full h-3">
                      <div className="bg-yellow-500 h-3 rounded-full" style={{width: '11%'}}></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex justify-between">
                      <span className="font-bold">Total Revenue</span>
                      <span className="font-bold text-green-500">$18,271,591</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6">Expense Allocation</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Conservation Programs</span>
                      <span className="font-bold">$16,079,000</span>
                    </div>
                    <div className="bg-gray-800 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{width: '88%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Administration</span>
                      <span className="font-bold">$1,462,127</span>
                    </div>
                    <div className="bg-gray-800 rounded-full h-3">
                      <div className="bg-gray-500 h-3 rounded-full" style={{width: '8%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Fundraising</span>
                      <span className="font-bold">$730,464</span>
                    </div>
                    <div className="bg-gray-800 rounded-full h-3">
                      <div className="bg-gray-600 h-3 rounded-full" style={{width: '4%'}}></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex justify-between">
                      <span className="font-bold">Total Expenses</span>
                      <span className="font-bold">$18,271,591</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-green-500">
                      <span className="font-bold">Program Efficiency</span>
                      <span className="font-bold">88%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Program Breakdown */}
          <div className="mt-12 bg-gray-900 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Program Expense Breakdown</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-black rounded-lg p-6">
                <h4 className="font-bold mb-3">Wildlife Protection</h4>
                <p className="text-2xl font-bold text-green-500 mb-2">$5,867,234</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Anti-poaching operations</li>
                  <li>• Wildlife rescue & rehabilitation</li>
                  <li>• Ranger training programs</li>
                </ul>
              </div>
              <div className="bg-black rounded-lg p-6">
                <h4 className="font-bold mb-3">Habitat Conservation</h4>
                <p className="text-2xl font-bold text-green-500 mb-2">$4,234,567</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Land acquisition</li>
                  <li>• Habitat restoration</li>
                  <li>• Protected area management</li>
                </ul>
              </div>
              <div className="bg-black rounded-lg p-6">
                <h4 className="font-bold mb-3">Research & Education</h4>
                <p className="text-2xl font-bold text-green-500 mb-2">$3,456,789</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Scientific research grants</li>
                  <li>• Conservation education</li>
                  <li>• Community outreach</li>
                </ul>
              </div>
              <div className="bg-black rounded-lg p-6">
                <h4 className="font-bold mb-3">Technology & Innovation</h4>
                <p className="text-2xl font-bold text-green-500 mb-2">$1,789,234</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• AI wildlife monitoring</li>
                  <li>• Conservation technology</li>
                  <li>• Data management systems</li>
                </ul>
              </div>
              <div className="bg-black rounded-lg p-6">
                <h4 className="font-bold mb-3">Community Programs</h4>
                <p className="text-2xl font-bold text-green-500 mb-2">$731,176</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Sustainable livelihoods</li>
                  <li>• Indigenous partnerships</li>
                  <li>• Human-wildlife conflict</li>
                </ul>
              </div>
              <div className="bg-black rounded-lg p-6">
                <h4 className="font-bold mb-3">Emergency Response</h4>
                <p className="text-2xl font-bold text-green-500 mb-2">$0</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Disaster relief</li>
                  <li>• Wildlife emergencies</li>
                  <li>• Rapid response fund</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Governance */}
        <div className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Governance & Leadership</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Board of Directors</h3>
                <div className="space-y-4">
                  <div className="bg-black rounded-lg p-4">
                    <h4 className="font-bold">Dr. Jane Martinez</h4>
                    <p className="text-gray-400">Board Chair - Conservation Biologist</p>
                  </div>
                  <div className="bg-black rounded-lg p-4">
                    <h4 className="font-bold">Michael Chen</h4>
                    <p className="text-gray-400">Vice Chair - Environmental Lawyer</p>
                  </div>
                  <div className="bg-black rounded-lg p-4">
                    <h4 className="font-bold">Sarah Thompson</h4>
                    <p className="text-gray-400">Treasurer - CPA, Nonprofit Finance</p>
                  </div>
                  <div className="bg-black rounded-lg p-4">
                    <h4 className="font-bold">Dr. Raj Patel</h4>
                    <p className="text-gray-400">Secretary - Wildlife Veterinarian</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6">Executive Team</h3>
                <div className="space-y-4">
                  <div className="bg-black rounded-lg p-4">
                    <h4 className="font-bold">David Anderson</h4>
                    <p className="text-gray-400">CEO & President</p>
                  </div>
                  <div className="bg-black rounded-lg p-4">
                    <h4 className="font-bold">Dr. Maria Santos</h4>
                    <p className="text-gray-400">Chief Conservation Officer</p>
                  </div>
                  <div className="bg-black rounded-lg p-4">
                    <h4 className="font-bold">James Wilson</h4>
                    <p className="text-gray-400">Chief Financial Officer</p>
                  </div>
                  <div className="bg-black rounded-lg p-4">
                    <h4 className="font-bold">Lisa Zhang</h4>
                    <p className="text-gray-400">Chief Technology Officer</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Governance Policies</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold mb-2">Conflict of Interest</h4>
                  <p className="text-sm text-gray-400">
                    Annual disclosure required from all board members and executives
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Whistleblower Protection</h4>
                  <p className="text-sm text-gray-400">
                    Anonymous reporting system with independent investigation
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Document Retention</h4>
                  <p className="text-sm text-gray-400">
                    7-year retention policy for all financial and governance records
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Annual Reports */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Reports & Documents</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-700 rounded-lg p-6">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">2024 Annual Report</h3>
              <p className="text-gray-400 mb-4">
                Comprehensive review of our conservation impact, financials, and future plans.
              </p>
              <a href="/reports/annual-2024.pdf" className="text-green-500 hover:text-green-400">
                Download PDF →
              </a>
            </div>

            <div className="border border-gray-700 rounded-lg p-6">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-3">Form 990 (2024)</h3>
              <p className="text-gray-400 mb-4">
                Complete IRS Form 990 tax return showing detailed financials and governance.
              </p>
              <a href="/reports/990-2024.pdf" className="text-green-500 hover:text-green-400">
                Download PDF →
              </a>
            </div>

            <div className="border border-gray-700 rounded-lg p-6">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-3">Audited Financials</h3>
              <p className="text-gray-400 mb-4">
                Independent audit by PricewaterhouseCoopers with unqualified opinion.
              </p>
              <a href="/reports/audit-2024.pdf" className="text-green-500 hover:text-green-400">
                Download PDF →
              </a>
            </div>

            <div className="border border-gray-700 rounded-lg p-6">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3">Impact Report</h3>
              <p className="text-gray-400 mb-4">
                Detailed analysis of conservation outcomes and program effectiveness.
              </p>
              <a href="/reports/impact-2024.pdf" className="text-green-500 hover:text-green-400">
                Download PDF →
              </a>
            </div>

            <div className="border border-gray-700 rounded-lg p-6">
              <div className="text-3xl mb-4">📜</div>
              <h3 className="text-xl font-bold mb-3">Bylaws & Policies</h3>
              <p className="text-gray-400 mb-4">
                Organizational bylaws, ethics policies, and governance documents.
              </p>
              <a href="/reports/bylaws.pdf" className="text-green-500 hover:text-green-400">
                Download PDF →
              </a>
            </div>

            <div className="border border-gray-700 rounded-lg p-6">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-3">Certifications</h3>
              <p className="text-gray-400 mb-4">
                Third-party certifications and ratings from charity evaluators.
              </p>
              <a href="/reports/certifications.pdf" className="text-green-500 hover:text-green-400">
                View All →
              </a>
            </div>
          </div>
        </div>

        {/* Accountability Standards */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Our Accountability Standards
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">Mission Focused</h3>
                <p className="text-gray-300">
                  Every decision aligned with wildlife conservation mission
                </p>
              </div>
              <div>
                <div className="text-5xl mb-4">💎</div>
                <h3 className="text-xl font-bold mb-2">Full Transparency</h3>
                <p className="text-gray-300">
                  Complete disclosure of finances, governance, and impact
                </p>
              </div>
              <div>
                <div className="text-5xl mb-4">⚖️</div>
                <h3 className="text-xl font-bold mb-2">Ethical Standards</h3>
                <p className="text-gray-300">
                  Highest ethical standards in all operations and relationships
                </p>
              </div>
              <div>
                <div className="text-5xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-2">Measurable Impact</h3>
                <p className="text-gray-300">
                  Data-driven approach with quantifiable conservation outcomes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-gray-900 rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Questions About Our Transparency?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We welcome questions about our operations, finances, and impact. 
              Contact our transparency team for any inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:transparency@zoo.ngo"
                className="bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors"
              >
                Email Transparency Team
              </a>
              <Link
                href="/contact"
                className="bg-gray-700 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-600 transition-colors"
              >
                General Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}