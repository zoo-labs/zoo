import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'SharkDAO Partners with Shark Stewards for Global Conservation',
    excerpt: 'Announcing our partnership with Shark Stewards to protect sharks worldwide through research, education, and policy advocacy.',
    author: 'Zoo Foundation',
    date: 'September 25, 2025',
    category: 'Partnership',
    image: '/images/volunteer-experiences/luxury-yacht-shark-breach.jpg',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'ZenLM: AI-Powered Wildlife Monitoring Achieves 98% Accuracy',
    excerpt: 'Our AI framework successfully identifies over 2,300 species from camera trap images, revolutionizing conservation monitoring.',
    author: 'Dr. Sarah Chen',
    date: 'September 20, 2025',
    category: 'Technology',
    image: '/images/animals/amur_leopard.jpg',
    readTime: '8 min read'
  },
  {
    id: 3,
    title: '$500K Research Grant Approved for Ocean DNA Sequencing',
    excerpt: 'ResearchDAO approves major funding for environmental DNA collection and analysis in Pacific marine sanctuaries.',
    author: 'OceanDAO Team',
    date: 'September 15, 2025',
    category: 'Funding',
    image: '/images/animals/javan_rhino.jpg',
    readTime: '4 min read'
  },
  {
    id: 4,
    title: 'TigerDAO Rescues 12 Tigers from Illegal Wildlife Trade',
    excerpt: 'In collaboration with local authorities, TigerDAO successfully rescues and rehabilitates tigers destined for black market.',
    author: 'Conservation Team',
    date: 'September 10, 2025',
    category: 'Rescue',
    image: '/images/animals/siberian_tiger.jpg',
    readTime: '6 min read'
  },
  {
    id: 5,
    title: 'Frontiers North Partnership: Beluga Sanctuary Expansion',
    excerpt: 'BelugaDAO and Frontiers North Adventures announce expansion of Arctic beluga whale sanctuaries in Hudson Bay.',
    author: 'BelugaDAO',
    date: 'September 5, 2025',
    category: 'Partnership',
    image: '/images/animals/pygmy_hippo.jpg',
    readTime: '7 min read'
  },
  {
    id: 6,
    title: 'Community Spotlight: How DAOs Are Revolutionizing Conservation',
    excerpt: 'Exploring how decentralized governance is enabling faster, more transparent decision-making in wildlife conservation.',
    author: 'Michael Torres',
    date: 'August 30, 2025',
    category: 'Analysis',
    image: '/images/animals/nubian_giraffe.jpg',
    readTime: '10 min read'
  }
];

const categories = ['All', 'Partnership', 'Technology', 'Funding', 'Rescue', 'Analysis'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <Layout>
      <Seo
        templateTitle="Blog"
        description="Latest news and updates from Zoo Foundation's conservation initiatives"
      />
      <Navbar />

      <div className="bg-black text-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Conservation Blog</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            Updates from the field, partnership announcements, research breakthroughs,
            and success stories from our global conservation efforts.
          </p>
        </div>

        {/* Featured Post */}
        <div className="container mx-auto px-4 pb-16">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Featured</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-xl mb-6 opacity-90">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span>{blogPosts[0].author}</span>
                  <span>•</span>
                  <span>{blogPosts[0].date}</span>
                  <span>•</span>
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <Link
                  href={`/blog/${blogPosts[0].id}`}
                  className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  Read Full Story
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="aspect-video bg-black/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors">
                <div className="aspect-video bg-gray-800"></div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span className="bg-gray-800 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    <Link href={`/blog/${post.id}`} className="hover:text-green-500 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      By {post.author}
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-green-500 hover:text-green-400 font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Updated on Conservation
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Get weekly updates on our conservation efforts, research breakthroughs, and ways to help
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-gray-800 px-6 py-3 rounded-full text-white placeholder-gray-400 border border-gray-700 focus:border-green-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-green-600 px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Explore Topics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Conservation Success', count: 45, icon: '🎉' },
              { name: 'Research & Science', count: 38, icon: '🔬' },
              { name: 'DAO Governance', count: 24, icon: '🗳️' },
              { name: 'Wildlife Rescue', count: 31, icon: '🦁' },
              { name: 'Technology', count: 27, icon: '💻' },
              { name: 'Partnerships', count: 19, icon: '🤝' },
              { name: 'Field Reports', count: 42, icon: '📍' },
              { name: 'Community', count: 35, icon: '🌍' },
            ].map((topic) => (
              <Link
                key={topic.name}
                href={`/blog/category/${topic.name.toLowerCase().replace(' ', '-')}`}
                className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors"
              >
                <div className="text-3xl mb-3">{topic.icon}</div>
                <h3 className="font-bold mb-1">{topic.name}</h3>
                <p className="text-sm text-gray-400">{topic.count} articles</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}