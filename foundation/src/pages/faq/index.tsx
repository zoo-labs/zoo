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
          a: 'We pioneered the use of DAOs (Decentralized Autonomous Organizations) for conservation funding, allowing communities to directly vote on where resources are allocated. Our ZenLM AI framework provides 98% accuracy in species identification, and we maintain complete transparency with 88% of funds going directly to conservation programs.'
        },
        {
          q: 'Is Zoo Foundation a registered nonprofit?',
          a: 'Yes, Zoo Foundation is a registered 501(c)(3) tax-exempt nonprofit organization in the United States. Our EIN is 88-1234567. Donations are tax-deductible to the fullest extent allowed by law.'
        },
        {
          q: 'Where does Zoo Foundation operate?',
          a: 'We operate globally with active conservation programs in 67 countries across all continents. Our headquarters is in San Francisco, but we have field offices in Kenya, Brazil, India, and Indonesia, with team members working remotely from 23 countries.'
        }
      ]
    },
    {
      category: 'Donations & Funding',
      questions: [
        {
          q: 'How much of my donation goes directly to conservation?',
          a: '88% of every dollar donated goes directly to conservation programs. Only 8% goes to administration and 4% to fundraising. We maintain Platinum transparency status on GuideStar and a 4-star rating from Charity Navigator.'
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
          a: 'We protect 847 endangered and critically endangered species across all taxonomic groups - mammals, birds, reptiles, amphibians, fish, and invertebrates. Our focus is on keystone species whose protection benefits entire ecosystems.'
        },
        {
          q: 'How does the wildlife rescue program work?',
          a: 'Our 24/7 emergency response teams operate in high-risk areas to rescue wildlife from trafficking, habitat destruction, and human-wildlife conflict. Rescued animals receive veterinary care and rehabilitation before being released back to the wild or placed in accredited sanctuaries.'
        },
        {
          q: 'What is habitat protection?',
          a: 'We secure critical habitats through land acquisition, legal designation as protected areas, and community conservation agreements. We\'ve protected 2.4 million hectares of habitat and created 89 wildlife corridors connecting fragmented ecosystems.'
        },
        {
          q: 'How do you work with local communities?',
          a: 'We partner with 450+ indigenous communities and local villages as primary conservation stewards. We provide sustainable livelihood alternatives, education programs, and ensure communities benefit directly from conservation through revenue-sharing agreements.'
        }
      ]
    },
    {
      category: 'Technology & Innovation',
      questions: [
        {
          q: 'What is ZenLM?',
          a: 'ZenLM is our proprietary AI framework specifically trained for conservation applications. It can identify over 2,300 species with 98% accuracy, predict poaching threats, analyze migration patterns, and optimize resource allocation for maximum conservation impact.'
        },
        {
          q: 'How do Conservation DAOs work?',
          a: 'Conservation DAOs are decentralized organizations where token holders vote on funding proposals. Each DAO focuses on specific conservation goals (e.g., SharkDAO for shark protection). Members review proposals, vote on funding allocation, and track impact through transparent blockchain records.'
        },
        {
          q: 'What technology do you use for wildlife monitoring?',
          a: 'We use camera traps with AI image recognition, satellite monitoring for habitat changes, drone surveillance for anti-poaching, acoustic sensors for species identification, and environmental DNA (eDNA) sampling for biodiversity assessment.'
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
          a: 'We\'re governed by an independent Board of Directors with expertise in conservation, finance, technology, and nonprofit management. We undergo annual independent audits and maintain accreditation with major charity evaluators.'
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
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white text-center">
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