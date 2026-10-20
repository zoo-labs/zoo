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

/**
 * The page splits into an account of the experience and a booking panel beside
 * it. `lg:col-span-2` / `lg:col-span-1` said that once and the stylesheet
 * publishes neither, so the two sat as equal thirds of a grid that was never
 * three columns. Two flex bases wrap themselves instead: the panel holds 20rem
 * while the account can keep 30rem, and below that the row wraps and each takes
 * the width.
 */
const account: React.CSSProperties = { flex: '999 1 30rem', minWidth: 0 };
const panel: React.CSSProperties = { flex: '1 1 20rem' };

/** The booking panel follows the reader down, clearing the fixed bar. */
const follow: React.CSSProperties = {
  position: 'sticky',
  top: 'calc(var(--nav-h) + var(--space-4))',
};

/** A block of the page that has not arrived yet. */
const Bone = ({ height, width }: { height: string; width: string }) => (
  <div className='bg-gray-900 rounded-md mx-auto mb-4' style={{ height, width, maxWidth: '100%' }} />
);

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
        <div className="bg-background text-foreground min-h-screen">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl md:text-4xl mb-6">Experience Not Found</h1>
            <p className="mb-8">The experience you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/experiences">
              <Button>
                Browse All Experiences
              </Button>
            </Link>
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
        <div className="bg-background text-foreground min-h-screen">
          <div className="container mx-auto px-4 py-16 text-center">
            <Bone height='2.5rem' width='75%' />
            <Bone height='1rem' width='50%' />
            <Bone height='24rem' width='100%' />
          </div>
        </div>
        <Footer />
      </Layout>
    );
  }

  const farallones = experience.id === '9';

  return (
    <Layout>
      <Seo templateTitle={experience.title} />
      <Navbar />

      <main className="bg-background text-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <Link href="/experiences">
              <Button variant="outline" size="sm" gap='$2'>
                <ArrowLeft className="h-4 w-4" />
                Back to all experiences
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-12">
            <div style={account}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{experience.title}</h1>

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5" fill='currentColor' aria-hidden />
                  <span>{experience.rating}</span>
                  <span className="text-muted-foreground">({experience.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5" aria-hidden />
                  <span>{experience.location.city}, {experience.location.country}</span>
                </div>
              </div>

              {/* `.plate` is the site's place for a photograph: it clips, rounds
                  and fills its own <img>, so the picture needs no classes of its
                  own and cannot be a different shape here than anywhere else. */}
              <div className="plate mb-8" style={{ aspectRatio: '16 / 9' }}>
                <img
                  src={experience.images[0]}
                  alt={experience.title}
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

                <TabsContent value="overview" className="text-secondary space-y-4">
                  {experience.overview.includes('Create Your Conservation Experience') ? (
                    <>
                      <h2 className="text-xl font-bold text-foreground mb-4">Create Your Conservation Experience</h2>
                      <p>{experience.overview.replace('Create Your Conservation Experience\n\n', '')}</p>
                    </>
                  ) : (
                    <p>{experience.overview}</p>
                  )}
                  <p>{experience.description}</p>
                </TabsContent>

                <TabsContent value="impact" className="text-secondary">
                  <p>{experience.impact}</p>
                </TabsContent>

                <TabsContent value="tasks">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {experience.volunteerTasks.map((task) => (
                      <div key={task} className="flex items-center gap-2">
                        <Check className="w-5 h-5 shrink-0" aria-hidden />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="ethics" className="text-secondary">
                  <p>{experience.ethicalConsiderations}</p>
                </TabsContent>
              </Tabs>
            </div>

            <div style={panel}>
              <Card style={follow}>
                <CardHeader>
                  <CardTitle className="text-xl">Booking Information</CardTitle>
                </CardHeader>
                <CardContent gap='$6'>
                  <div>
                    <h3 className="font-medium mb-2">Pricing</h3>
                    <div className="text-3xl font-bold mb-1">${experience.pricing.amount}</div>
                    <div className="text-muted-foreground text-sm">per {experience.pricing.period}</div>
                  </div>

                  {/* Date selection for Farallones expedition */}
                  {farallones && (
                    <div>
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4" aria-hidden />
                        Select Date
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {farallonesDates.map((dateOption) => {
                          const picked = selectedDate === dateOption.date;
                          return (
                            <button
                              key={dateOption.date}
                              onClick={() => setSelectedDate(dateOption.date)}
                              aria-pressed={picked}
                              className={picked
                                ? 'w-full p-3 rounded-lg border-strong bg-white text-left transition-colors'
                                : 'w-full p-3 rounded-lg border bg-gray-900 text-left transition-colors'}
                            >
                              <div className="text-sm font-medium">Sun, {dateOption.date}</div>
                              <div className="text-xs text-muted-foreground">{dateOption.time}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Ticket quantity selector for Farallones expedition */}
                  {farallones && (
                    <div>
                      <h3 className="font-medium mb-3">Number of Tickets</h3>
                      <div className="flex items-center justify-between bg-gray-900 rounded-lg p-4">
                        {/* `.disc` is the site's round control at the 44px tap
                            target; `--hue` says which colour it is drawn in. */}
                        <button
                          onClick={decrementTickets}
                          className="disc"
                          data-outline
                          aria-label="One ticket fewer"
                          disabled={ticketQuantity <= 1}
                          style={{ ['--hue']: 'var(--carbon)', opacity: ticketQuantity <= 1 ? 0.4 : 1 } as React.CSSProperties}
                        >
                          <Minus className="w-4 h-4" aria-hidden />
                        </button>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{ticketQuantity}</div>
                          <div className="text-sm text-muted-foreground">
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
                          className="disc"
                          data-outline
                          aria-label="One ticket more"
                          disabled={ticketQuantity >= 20}
                          style={{ ['--hue']: 'var(--carbon)', opacity: ticketQuantity >= 20 ? 0.4 : 1 } as React.CSSProperties}
                        >
                          <Plus className="w-4 h-4" aria-hidden />
                        </button>
                      </div>
                    </div>
                  )}

                  {farallones && (
                    <div>
                      <h3 className="font-medium mb-3">Optional Conservation Donation</h3>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-3">
                          Support marine conservation efforts with an additional tax-deductible donation
                        </p>
                        {/* `.field` is one line joined to one control, drawn as a
                            single object — which is exactly what a currency mark
                            and its amount are. */}
                        <label className="field">
                          <span className="text-lg">$</span>
                          <input
                            type="number"
                            min="0"
                            step="10"
                            value={optionalDonation}
                            onChange={(e) => setOptionalDonation(Math.max(0, parseInt(e.target.value) || 0))}
                            aria-label="Optional conservation donation in dollars"
                            placeholder="0"
                          />
                        </label>
                        {optionalDonation > 0 && (
                          <p className="text-sm text-secondary mt-2">
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
                        farallones ? "8+ hours" :
                        experience.id === "nonprofit-signup" ? "Ongoing Partnership" :
                        `${experience.duration.minWeeks}${experience.duration.maxWeeks ? ` to ${experience.duration.maxWeeks}` : '+'} weeks`
                      }
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Requirements</h3>
                    <ul className="space-y-2">
                      {experience.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 mt-1 shrink-0" aria-hidden />
                          <span className="text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleBookNow} width='100%'>
                    {experience.id === "nonprofit-signup" ? "Apply Now" :
                     farallones ?
                       selectedDate ?
                         `Book Now - $${experience.pricing.amount * ticketQuantity + optionalDonation}` :
                         "Select Date to Continue" :
                       "Book Now"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Experiences</h2>
            <div className="grid-cards">
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
