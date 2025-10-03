import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: 'About Zoo Foundation',
      questions: [
        {
          q: 'What is Zoo Foundation?',
          a: 'Zoo Foundation is a 501(c)(3) nonprofit organization dedicated to protecting endangered species through innovative technology, scientific research, and community-driven conservation. We combine AI-powered wildlife monitoring with decentralized funding mechanisms to create transparent, effective conservation programs worldwide.'
        },
        {
          q: 'How is Zoo Foundation different from other conservation organizations?',
          a: 'We focus on transparent, community-driven conservation funding. Our approach emphasizes direct partnerships with field organizations like Shark Stewards, educational expeditions that combine wildlife experiences with conservation support, and maintaining complete financial transparency for all donors.'
        },
        {
          q: 'Is Zoo Foundation a registered nonprofit?',
          a: 'Yes, Zoo Foundation is a registered 501(c)(3) tax-exempt nonprofit organization in the United States. Donations are tax-deductible to the fullest extent allowed by law.'
        },
        {
          q: 'Where does Zoo Foundation operate?',
          a: 'Zoo Foundation is based in San Francisco and partners with conservation organizations worldwide. Our primary focus is supporting field research and wildlife protection through partnerships and educational expeditions.'
        }
      ]
    },
    {
      category: 'Donations & Funding',
      questions: [
        {
          q: 'How much of my donation goes directly to conservation?',
          a: 'We strive to maximize the portion of donations that go directly to conservation programs. We maintain transparent financial records and provide regular reports showing how donations are used to support wildlife protection and research.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept credit/debit cards, bank transfers, PayPal, cryptocurrency (Bitcoin, Ethereum), stock donations, and planned giving through wills and estates. For major gifts over $10,000, we offer personalized giving options.'
        },
        {
          q: 'Can I specify how my donation is used?',
          a: 'Yes! You can designate your donation to specific programs like Wildlife Rescue, Habitat Protection, Marine Conservation, or Research. You can also contribute to specific DAOs focused on particular species or regions.'
        },
        {
          q: 'Are donations tax-deductible?',
          a: 'Yes, donations to Zoo Foundation are tax-deductible in the United States. We provide tax receipts for all donations over $250. International donors should consult local tax laws regarding charitable deductions.'
        },
        {
          q: 'How can I verify how funds are used?',
          a: 'Visit our Transparency page to view detailed financial reports, including audited financials, Form 990s, and real-time tracking of fund allocation. All DAO transactions are recorded on the blockchain for complete transparency.'
        }
      ]
    },
    {
      category: 'Conservation Programs',
      questions: [
        {
          q: 'What species does Zoo Foundation protect?',
          a: 'We support conservation efforts for endangered and critically endangered species across all taxonomic groups - mammals, birds, reptiles, amphibians, and marine life. Our current focus includes great white sharks through our partnership with Shark Stewards and other keystone species whose protection benefits entire ecosystems.'
        },
        {
          q: 'How does the wildlife rescue program work?',
          a: 'We support wildlife rescue efforts through partnerships with field organizations. These partners provide emergency response, veterinary care, and rehabilitation for animals affected by human-wildlife conflict, with the goal of releasing them back to the wild when possible.'
        },
        {
          q: 'What is habitat protection?',
          a: 'We support habitat protection through partnerships and funding for conservation organizations working to secure critical habitats through legal designation as protected areas and community conservation agreements.'
        },
        {
          q: 'How do you work with local communities?',
          a: 'We believe in community-based conservation and support programs that ensure local communities benefit from wildlife protection through sustainable livelihood alternatives and education programs.'
        }
      ]
    },
    {
      category: 'Technology & Innovation',
      questions: [
        {
          q: 'How does Zoo Foundation use technology for conservation?',
          a: 'We explore innovative technologies to support conservation efforts, including wildlife monitoring systems and data collection tools. Our goal is to help conservation partners use technology effectively for research and protection.'
        },
        {
          q: 'What is your approach to transparent funding?',
          a: 'We believe in complete transparency for all donations. We provide detailed financial reports showing how funds are allocated to conservation programs, and we\'re exploring blockchain-based systems to make this transparency even more accessible to donors.'
        },
        {
          q: 'What technology supports your wildlife expeditions?',
          a: 'Our partner organizations like Shark Stewards use professional wildlife observation equipment, GPS tracking for research, and photographic documentation to support conservation science during expeditions.'
        },
        {
          q: 'Is my data secure when I donate?',
          a: 'Yes, we use bank-level encryption for all transactions, comply with PCI DSS standards for payment processing, and never store sensitive payment information. Our systems undergo regular security audits by independent firms.'
        }
      ]
    },
    {
      category: 'Getting Involved',
      questions: [
        {
          q: 'How can I volunteer?',
          a: 'We offer field volunteering for those with relevant skills, remote volunteering for technology and administrative support, student internships, and our Conservation Leadership Fellowship. Visit our Get Involved page to see current opportunities.'
        },
        {
          q: 'Can my company partner with Zoo Foundation?',
          a: 'Yes! We offer corporate partnerships including employee giving programs, cause marketing campaigns, technology partnerships, and CSR initiatives. Contact partnerships@zoo.ngo to discuss options.'
        },
        {
          q: 'How can I stay updated on your work?',
          a: 'Subscribe to our newsletter for weekly updates, follow us on social media (@zoofoundation), read our blog for detailed project updates, or join our community Discord for real-time discussions with our team and supporters.'
        },
        {
          q: 'Can I visit your conservation projects?',
          a: 'We offer limited conservation expeditions for major donors and partners. These experiences provide firsthand insight into our field operations while ensuring minimal disruption to wildlife and local communities.'
        }
      ]
    },
    {
      category: 'Impact & Accountability',
      questions: [
        {
          q: 'How do you measure conservation success?',
          a: 'We track specific metrics including population numbers of target species, hectares of habitat protected, reduction in poaching incidents, community livelihood improvements, and biodiversity indicators. All metrics are independently verified and published in our annual impact report.'
        },
        {
          q: 'Who oversees Zoo Foundation?',
          a: 'We\'re governed by a Board of Directors including Zach Kelling, Kamron Pahlavi, and Executive Director Antje Worring. Our board provides strategic guidance and ensures accountability in our conservation mission.'
        },
        {
          q: 'How can I verify your impact claims?',
          a: 'All our impact data is independently verified by third-party conservation scientists. We publish peer-reviewed research in scientific journals, provide GPS coordinates for protected areas, and use blockchain to create immutable records of conservation activities.'
        },
        {
          q: 'What happens if a conservation project fails?',
          a: 'We maintain full transparency about both successes and failures. When projects don\'t achieve goals, we publish detailed analyses of what went wrong, lessons learned, and how we\'re adapting our approach. This commitment to learning helps improve future conservation efforts.'
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const index = categoryIndex * 100 + questionIndex;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <Seo
        templateTitle="FAQ"
        description="Frequently asked questions about Zoo Foundation's conservation work"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-gray-700">
              Everything you need to know about Zoo Foundation's mission to protect 
              endangered species through technology and community action.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => {
                    const isOpen = openIndex === categoryIndex * 100 + questionIndex;
                    return (
                      <div 
                        key={questionIndex}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-lg pr-4">{item.q}</span>
                          <span className={`text-2xl transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                            +
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6">
                            <p className="text-gray-600 leading-relaxed">{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="bg-black border border-white rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Our team is here to help. Reach out and we'll respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@zoo.ngo"
                className="inline-block bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all"
              >
                Email Us
              </a>
              <a
                href="/contact"
                className="inline-block bg-transparent border-2 border-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-all"
              >
                Contact Form
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}