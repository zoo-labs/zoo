import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FilterOptions, WildlifeType, VolunteerTask, Continent } from '@/types/experiences';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/clsxm';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
}

const FilterPanel = ({ filters, onFilterChange, className = '' }: FilterPanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Helper for updating filters
  const updateFilters = (newPartialFilters: Partial<FilterOptions>) => {
    onFilterChange({
      ...filters,
      ...newPartialFilters,
    });
  };
  
  // Handler for checkbox filters (continents, wildlife types, volunteer tasks)
  const handleCheckboxChange = (
    filterKey: keyof Pick<FilterOptions, 'continent' | 'wildlifeTypes' | 'volunteerTasks'>,
    value: Continent | WildlifeType | VolunteerTask
  ) => {
    const currentValues = filters[filterKey] || [];
    
    // If value is already selected, remove it
    if (currentValues.includes(value as never)) {
      updateFilters({
        [filterKey]: currentValues.filter(v => v !== value) as any,
      });
    } 
    // Otherwise, add it
    else {
      updateFilters({
        [filterKey]: [...currentValues, value] as any,
      });
    }
  };
  
  // Handler for duration filters
  const handleDurationChange = (key: 'min' | 'max', value: string) => {
    const numValue = value === '' ? undefined : parseInt(value, 10);
    updateFilters({
      duration: {
        ...filters.duration,
        [key]: numValue,
      },
    });
  };
  
  // Handler for boolean filters
  const handleBooleanChange = (key: keyof Pick<FilterOptions, 'accessible'>, checked: boolean) => {
    updateFilters({
      [key]: checked,
    });
  };
  
  // Handler for clearing all filters
  const handleClearFilters = () => {
    onFilterChange({});
  };
  
  return (
    <div className={cn("bg-black border border-gray-800 rounded-lg p-4", className)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Filters</h2>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:bg-gray-800 text-white"
        >
          {isCollapsed ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {!isCollapsed && (
        <>
          <div className="mb-4">
            <Button 
              onClick={handleClearFilters}
              variant="outline"
              className="w-full"
            >
              Clear All Filters
            </Button>
          </div>
          
          <Accordion type="multiple" className="w-full text-white">
            <AccordionItem value="wildlife-types">
              <AccordionTrigger className="text-md font-medium">
                Wildlife Types
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {['Big Cats', 'Primates', 'Elephants', 'Marine Life', 'Birds', 'General Wildlife'].map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        className="rounded border-gray-700 bg-gray-900 text-white focus:ring-white mr-2"
                        checked={filters.wildlifeTypes?.includes(type as WildlifeType) || false}
                        onChange={() => handleCheckboxChange('wildlifeTypes', type as WildlifeType)}
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="continents">
              <AccordionTrigger className="text-md font-medium">
                Continents
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'].map((continent) => (
                    <label key={continent} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        className="rounded border-gray-700 bg-gray-900 text-white focus:ring-white mr-2"
                        checked={filters.continent?.includes(continent as Continent) || false}
                        onChange={() => handleCheckboxChange('continent', continent as Continent)}
                      />
                      <span className="text-sm">{continent}</span>
                    </label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="volunteer-tasks">
              <AccordionTrigger className="text-md font-medium">
                Volunteer Tasks
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {[
                    'Food Preparation', 
                    'Habitat Maintenance', 
                    'Animal Rehabilitation', 
                    'Research', 
                    'Education', 
                    'Conservation'
                  ].map((task) => (
                    <label key={task} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        className="rounded border-gray-700 bg-gray-900 text-white focus:ring-white mr-2"
                        checked={filters.volunteerTasks?.includes(task as VolunteerTask) || false}
                        onChange={() => handleCheckboxChange('volunteerTasks', task as VolunteerTask)}
                      />
                      <span className="text-sm">{task}</span>
                    </label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="duration">
              <AccordionTrigger className="text-md font-medium">
                Duration (weeks)
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center gap-2">
                  <div>
                    <label className="text-xs text-gray-400">Min</label>
                    <input 
                      type="number"
                      min="1"
                      className="bg-gray-900 border border-gray-800 rounded p-1 w-full text-sm"
                      value={filters.duration?.min ?? ''}
                      onChange={(e) => handleDurationChange('min', e.target.value)}
                    />
                  </div>
                  <div className="text-gray-400">-</div>
                  <div>
                    <label className="text-xs text-gray-400">Max</label>
                    <input 
                      type="number"
                      min="1"
                      className="bg-gray-900 border border-gray-800 rounded p-1 w-full text-sm"
                      value={filters.duration?.max ?? ''}
                      onChange={(e) => handleDurationChange('max', e.target.value)}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="mt-4">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox"
                className="rounded border-gray-700 bg-gray-900 text-white focus:ring-white mr-2"
                checked={filters.accessible || false}
                onChange={(e) => handleBooleanChange('accessible', e.target.checked)}
              />
              <span>Beginner Friendly</span>
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterPanel;