import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Star, MapPin, ArrowLeft, Check } from 'lucide-react';

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

  const handleBookNow = () => {
    // In a real app, this would navigate to a booking page or show a form
    alert('Booking functionality would be implemented here');
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
              className="text-gray-400 hover:text-white"
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
                  className="object-cover w-full h-full rounded-lg"
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
                  <p>{experience.overview}</p>
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
                  
                  <div>
                    <h3 className="font-medium mb-2">Duration</h3>
                    <p>
                      {experience.duration.minWeeks} 
                      {experience.duration.maxWeeks ? ` to ${experience.duration.maxWeeks}` : '+'} weeks
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
                    Book Now
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