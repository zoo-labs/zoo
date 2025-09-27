import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image?: string;
  featured?: boolean;
  readTime: string;
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    date: '2025-01-27',
    category: 'Conservation Victory',
    title: 'Historic Agreement Protects 50,000 Square Kilometers of Amazon Rainforest',
    excerpt: 'In partnership with indigenous communities and the Brazilian government, Zoo Foundation secures permanent protection for critical biodiversity hotspot housing over 10,000 species.',
    featured: true,
    readTime: '5 min read',
    image: '/images/amazon-protection.jpg'
  },
  {
    id: '2',
    date: '2025-01-25',
    category: 'Research Breakthrough',
    title: 'AI Model Achieves 99.2% Accuracy in Identifying Endangered Species',
    excerpt: 'Our latest ZenLM update can now identify and track individual animals across 847 endangered species, revolutionizing population monitoring efforts worldwide.',
    readTime: '4 min read'
  },
  {
    id: '3',
    date: '2025-01-22',
    category: 'Partnership',
    title: 'Shark Stewards International Joins Forces with Zoo Foundation',
    excerpt: 'Strategic partnership will protect critical shark habitats across 50,000 square kilometers of ocean, establishing new marine sanctuaries.',
    readTime: '3 min read'
  },
  {
    id: '4',
    date: '2025-01-20',
    category: 'Funding',
    title: 'ResearchDAO Awards $2.3 Million to Amazon Biodiversity Study',
    excerpt: 'Largest single research grant will fund comprehensive environmental DNA sampling across the Amazon basin to establish biodiversity baselines.',
    readTime: '6 min read'
  },
  {
    id: '5',
    date: '2025-01-18',
    category: 'Wildlife Rescue',
    title: '1,000th Endangered Animal Successfully Rehabilitated and Released',
    excerpt: 'Milestone achievement as our wildlife rescue centers celebrate the successful rehabilitation and release of a juvenile Sumatran tiger.',
    readTime: '4 min read'
  },
  {
    id: '6',
    date: '2025-01-15',
    category: 'Technology',
    title: 'Blockchain-Based Wildlife Tracking System Goes Live in Africa',
    excerpt: 'Immutable tracking data for 234 endangered species now secured on-chain, preventing poaching through real-time alerts.',
    readTime: '5 min read'
  },
  {
    id: '7',
    date: '2025-01-12',
    category: 'Climate Action',
    title: 'Coral Restoration Project Shows 78% Survival Rate After One Year',
    excerpt: 'Heat-resistant coral varieties developed by our research team demonstrate remarkable resilience in warming ocean conditions.',
    readTime: '7 min read'
  },
  {
    id: '8',
    date: '2025-01-10',
    category: 'Community',
    title: 'Indigenous-Led Conservation Program Expands to 30 Nations',
    excerpt: 'Amazon Sacred Headwaters Initiative receives additional $3.2 million in direct support for traditional land management.',
    readTime: '4 min read'
  }
];

const pressReleases = [
  {
    date: '2025-01-26',
    title: 'Zoo Foundation Announces $45 Million Conservation Fund',
    pdf: '/press/2025-01-conservation-fund.pdf'
  },
  {
    date: '2025-01-20',
    title: 'Annual Impact Report Shows 847 Species Protected',
    pdf: '/press/2025-impact-report.pdf'
  },
  {
    date: '2025-01-15',
    title: 'New Board Members Bring Conservation Expertise',
    pdf: '/press/2025-board-announcement.pdf'
  }
];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'all',
    'Conservation Victory',
    'Research Breakthrough',
    'Partnership',
    'Funding',
    'Wildlife Rescue',
    'Technology',
    'Climate Action',
    'Community'
  ];

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = newsItems.find(item => item.featured);

  return (
    <Layout>
      <Seo
        templateTitle="News & Media"
        description="Latest conservation news, research breakthroughs, and updates from Zoo Foundation"
      />
      <Navbar />

      <div className="bg-black text-white min-h-screen">
        {/* Hero Section */}
        <div className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20" />
          <div className="container mx-auto px-4 relative">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              News & Media
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
              Stay updated on our conservation victories, research breakthroughs, and the latest
              developments in wildlife protection.
            </p>
          </div>
        </div>

        {/* Featured Story */}
        {featuredNews && (
          <div className="container mx-auto px-4 pb-16">
            <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-2xl overflow-hidden">
              <div className="p-8 md:p-12">
                <span className="inline-block px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium mb-4">
                  Featured Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {featuredNews.title}
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center gap-6 text-gray-400">
                  <span>{new Date(featuredNews.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span>{featuredNews.readTime}</span>
                  <Link href={`/news/${featuredNews.id}`} className="text-green-500 hover:text-green-400 font-medium">
                    Read Full Story →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-900 text-white px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map(item => (
              <article key={item.id} className="bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                {item.image && (
                  <div className="h-48 bg-gradient-to-br from-green-900 to-blue-900" />
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-green-500 font-medium">
                      {item.category}
                    </span>
                    <span className="text-sm text-gray-400">
                      {item.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <Link
                      href={`/news/${item.id}`}
                      className="text-green-500 hover:text-green-400 text-sm font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Press Releases */}
        <div className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Press Releases</h2>
            <div className="space-y-4">
              {pressReleases.map((release, index) => (
                <div key={index} className="bg-black rounded-lg p-6 flex items-center justify-between hover:bg-gray-800 transition-colors">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">
                      {new Date(release.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="text-lg font-medium">
                      {release.title}
                    </h3>
                  </div>
                  <a
                    href={release.pdf}
                    className="text-green-500 hover:text-green-400 font-medium whitespace-nowrap"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download PDF →
                  </a>
                </div>
              ))}
            </div>
            <Link
              href="/press"
              className="inline-block mt-8 text-green-500 hover:text-green-400 font-medium"
            >
              View All Press Releases →
            </Link>
          </div>
        </div>

        {/* Media Kit */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Media Kit</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl">
              Access our media resources including logos, brand guidelines, fact sheets, and high-resolution
              images for press use.
            </p>
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-black/50 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">📁</div>
                <p className="font-medium">Brand Assets</p>
              </div>
              <div className="bg-black/50 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">📸</div>
                <p className="font-medium">Photo Library</p>
              </div>
              <div className="bg-black/50 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">📊</div>
                <p className="font-medium">Fact Sheets</p>
              </div>
              <div className="bg-black/50 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">📺</div>
                <p className="font-medium">Video Resources</p>
              </div>
            </div>
            <a
              href="/media-kit"
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Download Media Kit
            </a>
          </div>
        </div>

        {/* Press Contact */}
        <div className="bg-black py-16 border-t border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Press Inquiries</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              For media inquiries, interview requests, or additional information, please contact our
              communications team.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <div>
                <p className="text-gray-400 mb-2">Email</p>
                <a href="mailto:press@zoo.foundation" className="text-green-500 hover:text-green-400 font-medium">
                  press@zoo.foundation
                </a>
              </div>
              <div>
                <p className="text-gray-400 mb-2">Phone</p>
                <a href="tel:+14155551234" className="text-green-500 hover:text-green-400 font-medium">
                  +1 (415) 555-1234
                </a>
              </div>
              <div>
                <p className="text-gray-400 mb-2">Press Kit</p>
                <a href="/media-kit" className="text-green-500 hover:text-green-400 font-medium">
                  Download Resources
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