import * as React from 'react';
import { useState, useEffect } from 'react';
import { LayoutGrid, List } from 'lucide-react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import ExperienceCard from '@/components/experiences/ExperienceCard';
import FilterPanel from '@/components/experiences/FilterPanel';
import Globe from '@/components/WrapGlobe';
import { experiences } from '@/data/experiencesData';
import { FilterOptions, Experience } from '@/types/experiences';
import { Button } from '@/components/ui/button';

enum ViewMode {
  GRID = 'grid',
  LIST = 'list'
}

/**
 * Sidebar beside content, and it needs no breakpoint.
 *
 * The panel used to ask for `md:w-64`, which the stylesheet does not publish, so
 * it had no width at all and `shrink-0` then refused to let it give any back —
 * the results column took whatever was left, and three card columns inside it
 * came out narrow enough to wrap every heading. These two bases wrap themselves:
 * while both fit on one line the panel settles at its 16rem and the results take
 * the rest; when they cannot, the row wraps and each takes the full width.
 */
const aside: React.CSSProperties = { flex: '1 1 16rem' };
const results: React.CSSProperties = { flex: '999 1 30rem' };

export default function ExperiencesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRID);
  const [filters, setFilters] = useState<FilterOptions>({});
  // Only show featured experiences
  const featuredExperiences = experiences.filter(exp => exp.featured);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>(featuredExperiences);

  // Apply filters when they change
  useEffect(() => {
    let results = [...featuredExperiences];
    
    // Filter by continent
    if (filters.continent && filters.continent.length > 0) {
      results = results.filter(exp => 
        filters.continent!.includes(exp.location.continent)
      );
    }
    
    // Filter by wildlife types
    if (filters.wildlifeTypes && filters.wildlifeTypes.length > 0) {
      results = results.filter(exp => 
        exp.wildlifeTypes.some(type => filters.wildlifeTypes!.includes(type))
      );
    }
    
    // Filter by volunteer tasks
    if (filters.volunteerTasks && filters.volunteerTasks.length > 0) {
      results = results.filter(exp => 
        exp.volunteerTasks.some(task => filters.volunteerTasks!.includes(task))
      );
    }
    
    // Filter by duration
    if (filters.duration) {
      if (filters.duration.min) {
        results = results.filter(exp => exp.duration.minWeeks >= filters.duration!.min!);
      }
      if (filters.duration.max) {
        results = results.filter(exp => 
          exp.duration.minWeeks <= filters.duration!.max! || 
          (exp.duration.maxWeeks && exp.duration.maxWeeks <= filters.duration!.max!)
        );
      }
    }
    
    // Filter by accessibility (beginner friendly)
    if (filters.accessible) {
      results = results.filter(exp => exp.requirements.length <= 3);
    }
    
    setFilteredExperiences(results);
  }, [filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <Layout>
      <Seo templateTitle="Wildlife Volunteer Experiences" />
      <Navbar />
      
      <main className="bg-background text-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className='mb-8 flex flex-col md:flex-row items-center gap-6'>
            <div className='flex-1 text-left flex flex-col justify-center'>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Wildlife Volunteer<br />
                Experiences
              </h1>
              <p className="text-muted-foreground text-lg">
                Find your perfect wildlife volunteer opportunity from {featuredExperiences.length} programs worldwide
              </p>
            </div>
            <div className='w-64 shrink-0 flex justify-end'>
              <Globe />
            </div>
          </div>

          <div className="flex flex-wrap gap-8 mt-8">
            {/* Filter sidebar */}
            <div style={aside}>
              <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
            </div>

            {/* Results area */}
            <div style={results}>
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <p className="text-muted-foreground">
                  Found <span className="font-medium text-foreground">{filteredExperiences.length}</span> experiences
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === ViewMode.GRID ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode(ViewMode.GRID)}
                    aria-pressed={viewMode === ViewMode.GRID}
                    gap='$2'
                  >
                    <LayoutGrid className="h-4 w-4" />
                    Grid
                  </Button>

                  <Button
                    variant={viewMode === ViewMode.LIST ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode(ViewMode.LIST)}
                    aria-pressed={viewMode === ViewMode.LIST}
                    gap='$2'
                  >
                    <List className="h-4 w-4" />
                    List
                  </Button>
                </div>
              </div>

              <div className="border-b mb-6"></div>

              {filteredExperiences.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No experiences match your filters</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your filters to find more options</p>
                  <Button onClick={() => setFilters({})}>Clear All Filters</Button>
                </div>
              ) : (
                <div className={viewMode === ViewMode.GRID ? 'grid-cards' : 'space-y-6'}>
                  {filteredExperiences.map((experience) => (
                    <ExperienceCard key={experience.id} experience={experience} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Newsletter />
      <Footer />
    </Layout>
  );
}