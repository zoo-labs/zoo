import * as React from 'react';
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

/** A tick box, drawn by the UA in the brand hue. `accent-color` is the whole of
 *  it — the four class names that used to be here (`rounded border-gray-700
 *  bg-gray-900 focus:ring-white`) styled nothing, and a native control needs no
 *  help beyond its colour. */
const tick: React.CSSProperties = { accentColor: 'var(--berry)', width: 16, height: 16 };

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

  /** One list of tick boxes. The three that used to be written out longhand
   *  differed only in which key they wrote to and what they offered. */
  const box = (
    key: 'wildlifeTypes' | 'continent' | 'volunteerTasks',
    values: readonly string[]
  ) => {
    const selected = (filters[key] ?? []) as readonly string[];
    return (
      <div className='space-y-2'>
        {values.map((value) => (
          <label key={value} className='flex items-center gap-2 cursor-pointer'>
            <input
              type='checkbox'
              style={tick}
              checked={selected.includes(value)}
              onChange={() => handleCheckboxChange(key, value as never)}
            />
            <span className='text-sm'>{value}</span>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className={cn('card p-4', className)}>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-bold text-foreground'>Filters</h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Show filters' : 'Hide filters'}
          aria-expanded={!isCollapsed}
          className='p-1 rounded-md text-foreground'
        >
          {isCollapsed ? <ChevronDown className='h-5 w-5' /> : <ChevronUp className='h-5 w-5' />}
        </button>
      </div>

      {!isCollapsed && (
        <>
          <div className='mb-4'>
            <Button onClick={handleClearFilters} variant='outline' width='100%'>
              Clear All Filters
            </Button>
          </div>

          <Accordion type='multiple' className='w-full text-foreground'>
            <AccordionItem value='wildlife-types'>
              <AccordionTrigger className='text-base font-medium'>Wildlife Types</AccordionTrigger>
              <AccordionContent>
                {box('wildlifeTypes', ['Big Cats', 'Primates', 'Elephants', 'Marine Life', 'Birds', 'General Wildlife'])}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='continents'>
              <AccordionTrigger className='text-base font-medium'>Continents</AccordionTrigger>
              <AccordionContent>
                {box('continent', ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'])}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='volunteer-tasks'>
              <AccordionTrigger className='text-base font-medium'>Volunteer Tasks</AccordionTrigger>
              <AccordionContent>
                {box('volunteerTasks', [
                  'Food Preparation',
                  'Habitat Maintenance',
                  'Animal Rehabilitation',
                  'Research',
                  'Education',
                  'Conservation',
                ])}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='duration'>
              <AccordionTrigger className='text-base font-medium'>Duration (weeks)</AccordionTrigger>
              <AccordionContent>
                <div className='flex items-end gap-2'>
                  <div className='flex-1'>
                    <label className='text-xs text-muted-foreground' htmlFor='duration-min'>Min</label>
                    <input
                      id='duration-min'
                      type='number'
                      min='1'
                      className='bg-gray-900 border rounded-md p-1 w-full text-sm'
                      value={filters.duration?.min ?? ''}
                      onChange={(e) => handleDurationChange('min', e.target.value)}
                    />
                  </div>
                  <div className='text-muted-foreground pb-2'>-</div>
                  <div className='flex-1'>
                    <label className='text-xs text-muted-foreground' htmlFor='duration-max'>Max</label>
                    <input
                      id='duration-max'
                      type='number'
                      min='1'
                      className='bg-gray-900 border rounded-md p-1 w-full text-sm'
                      value={filters.duration?.max ?? ''}
                      onChange={(e) => handleDurationChange('max', e.target.value)}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className='mt-4'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='checkbox'
                style={tick}
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
