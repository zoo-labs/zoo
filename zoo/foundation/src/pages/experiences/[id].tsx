import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Star, MapPin, ArrowLeft, Check, Plus, Minus, Calendar } from 'lucide-react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { getExperienceById, experiences } from '@/data/experiencesData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExperienceCard from '@/components/experiences/ExperienceCard';

export default function ExperienceDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const experience = id ? getExperienceById(id as string) : null;

  // State for date selection and ticket quantity (for Farallones expedition)
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [optionalDonation, setOptionalDonation] = useState<number>(0);

  // Available dates for Farallones expedition
  const farallonesDates = [
    { date: 'Sep 28, 2025', time: '7:30 AM-4:30 PM' },
    { date: 'Oct 5, 2025', time: '7:30 AM-4:30 PM' },
    { date: 'Oct 19, 2025', time: '7:30 AM-4:30 PM' },
    { date: 'Nov 2, 2025', time: '7:30 AM-4:30 PM' },
  ];

  const handleBookNow = () => {
    if (experience?.id === '9' && !selectedDate) {
      alert('Please select a date for your expedition');
      return;
    }
    // Go directly to PayPal for wildlife experience booking
    const baseAmount = experience?.pricing.amount ? experience.pricing.amount * ticketQuantity : 0;
    const totalAmount = baseAmount + optionalDonation;
    window.open(`https://www.paypal.biz/zoongo?amount=${totalAmount}&tickets=${ticketQuantity}&date=${selectedDate}&donation=${optionalDonation}`, '_blank');
  };

  const incrementTickets = () => {
    if (ticketQuantity < 20) setTicketQuantity(ticketQuantity + 1);
  };

  const decrementTickets = () => {
    if (ticketQuantity > 1) setTicketQuantity(ticketQuantity - 1);
  };
  
  if (!experience && router.isReady) {
    return (
      <Layout>
        <Seo templateTitle="Experience Not Found" />
        <Navbar />
        <div className="bg-black text-white min-h-screen">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl md:text-4xl mb-6">Experience Not Found</h1>
            <p className="mb-8">The experience you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Button asChild>
              <Link href="/experiences">
                Browse All Experiences
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </Layout>
    );
  }

  if (!experience) {
    return (
      <Layout>
        <Seo />
        <Navbar />
        <div className="bg-black text-white min-h-screen">
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-800 rounded w-3/4 mx-auto mb-6"></div>
              <div className="h-4 bg-gray-800 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-96 bg-gray-800 rounded w-full mx-auto mb-4"></div>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <Seo templateTitle={experience.title} />
      <Navbar />
      
      <main className="bg-black text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-gray-400 hover:text-black"
            >
              <Link href="/experiences" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to all experiences
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{experience.title}</h1>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-6">
                  <Star className="w-5 h-5 fill-current mr-1" />
                  <span>{experience.rating}</span>
                  <span className="text-gray-400 ml-1">({experience.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span>{experience.location.city}, {experience.location.country}</span>
                </div>
              </div>
              
              <div className="aspect-w-16 aspect-h-9 mb-8 rounded-lg overflow-hidden relative h-96">
                <img
                  src={experience.images[0]}
                  alt={experience.title}
                  className={`w-full h-full rounded-lg ${experience.id === 'nonprofit-signup' ? 'object-cover object-center' : 'object-cover'}`}
                  style={experience.id === 'nonprofit-signup' ? { objectPosition: '50% 45%' } : undefined}
                />
              </div>
              
              <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="impact">Impact</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="ethics">Ethics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="text-gray-300 space-y-4">
                  {experience.overview.includes('Create Your Conservation Experience') ? (
                    <>
                      <h2 className="text-xl font-bold text-white mb-4">Create Your Conservation Experience</h2>
                      <p>{experience.overview.replace('Create Your Conservation Experience\n\n', '')}</p>
                    </>
                  ) : (
                    <p>{experience.overview}</p>
                  )}
                  <p>{experience.description}</p>
                </TabsContent>
                
                <TabsContent value="impact" className="text-gray-300">
                  <p>{experience.impact}</p>
                </TabsContent>
                
                <TabsContent value="tasks">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {experience.volunteerTasks.map((task) => (
                      <div key={task} className="flex items-center">
                        <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="ethics" className="text-gray-300">
                  <p>{experience.ethicalConsiderations}</p>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="bg-gray-900 border-gray-800 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-xl">Booking Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Pricing</h3>
                    <div className="text-3xl font-bold mb-1">${experience.pricing.amount}</div>
                    <div className="text-gray-400 text-sm">per {experience.pricing.period}</div>
                  </div>

                  {/* Date selection for Farallones expedition */}
                  {experience.id === "9" && (
                    <div>
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Select Date
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {farallonesDates.map((dateOption) => (
                          <button
                            key={dateOption.date}
                            onClick={() => setSelectedDate(dateOption.date)}
                            className={`p-3 rounded-lg border transition-all text-left ${
                              selectedDate === dateOption.date
                                ? 'bg-gray-600 border-gray-600 text-white'
                                : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                            }`}
                          >
                            <div className="text-sm font-medium">Sun, {dateOption.date}</div>
                            <div className="text-xs opacity-75">{dateOption.time}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ticket quantity selector for Farallones expedition */}
                  {experience.id === "9" && (
                    <div>
                      <h3 className="font-medium mb-3">Number of Tickets</h3>
                      <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                        <button
                          onClick={decrementTickets}
                          className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                          disabled={ticketQuantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{ticketQuantity}</div>
                          <div className="text-sm text-gray-400">
                            Tickets: ${experience.pricing.amount * ticketQuantity}
                            {optionalDonation > 0 && (
                              <>
                                <br />
                                Total: ${experience.pricing.amount * ticketQuantity + optionalDonation}
                              </>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={incrementTickets}
                          className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                          disabled={ticketQuantity >= 20}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {experience.id === "9" && (
                    <div>
                      <h3 className="font-medium mb-3">Optional Conservation Donation</h3>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="text-sm text-gray-400 mb-3">
                          Support marine conservation efforts with an additional tax-deductible donation
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">$</span>
                          <input
                            type="number"
                            min="0"
                            step="10"
                            value={optionalDonation}
                            onChange={(e) => setOptionalDonation(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-white"
                            placeholder="0"
                          />
                        </div>
                        {optionalDonation > 0 && (
                          <p className="text-sm text-gray-300 mt-2">
                            Thank you! Your ${optionalDonation} donation will support shark conservation.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-medium mb-2">Duration</h3>
                    <p>
                      {(experience.id === "1" || experience.id === "7" || experience.id === "8") ? "10-12 hours" :
                        experience.id === "9" ? "8+ hours" :
                        experience.id === "nonprofit-signup" ? "Ongoing Partnership" :
                        `${experience.duration.minWeeks}${experience.duration.maxWeeks ? ` to ${experience.duration.maxWeeks}` : '+'} weeks`
                      }
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Requirements</h3>
                    <ul className="space-y-2">
                      {experience.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleBookNow}
                    className="w-full"
                  >
                    {experience.id === "nonprofit-signup" ? "Apply Now" :
                     experience.id === "9" ?
                       selectedDate ?
                         `Book Now - $${experience.pricing.amount * ticketQuantity + optionalDonation}` :
                         "Select Date to Continue" :
                       "Book Now"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar Experiences</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experiences
                .filter(exp => 
                  exp.id !== experience.id && 
                  (exp.wildlifeTypes.some(type => experience.wildlifeTypes.includes(type)) || 
                   exp.location.continent === experience.location.continent)
                )
                .slice(0, 3)
                .map(exp => (
                  <ExperienceCard key={exp.id} experience={exp} />
                ))
              }
            </div>
          </div>
        </div>
      </main>
      
      <Newsletter />
      <Footer />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = experiences.map((experience) => ({
    params: { id: experience.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  return {
    props: {
      id: params.id,
    },
  };
}