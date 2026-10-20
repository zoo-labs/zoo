import * as React from 'react';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import { Experience } from '@/types/experiences';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ExperienceCardProps {
  experience: Experience;
}

/** Two lines of copy, then an ellipsis. Stated here because it is a shape, not a
 *  colour: no token decides how many lines a description gets. */
const clamp = (lines: number): React.CSSProperties => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

/**
 * The wildlife label used to sit on the photograph with `bg-gradient-to-t
 * from-black/60` behind it and `bg-white/20 backdrop-blur-sm` on the chip —
 * three names no rule answers, so the scrim never painted and the chip was
 * white type on whatever the photo happened to be under it. "Great White
 * Sharks" landed across the shark.
 *
 * The scrim is now a real gradient reading --night, and the chip carries its own
 * ground at 72% of that same value, so the label is legible over any frame of
 * any photograph and can never be half-cut: it is laid out inside the picture's
 * own box, aligned to its bottom edge, and the box clips.
 */
const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const { id, title, location, images, description, wildlifeTypes, pricing, rating, reviewsCount } = experience;

  return (
    <Link href={`/experiences/${id}`} style={{ display: 'block', height: '100%' }}>
      <Card overflow='hidden' height='100%' hoverStyle={{ borderColor: 'var(--border-strong)' }}>
        <div className='relative overflow-hidden' style={{ aspectRatio: '4 / 3' }}>
          <img
            src={images[0]}
            alt={title}
            className='w-full h-full'
            style={{ display: 'block', objectFit: 'cover' }}
          />
          <div
            className='absolute left-0 bottom-0 w-full flex'
            style={{
              padding: 'var(--space-3)',
              background: 'linear-gradient(to top, color-mix(in oklab, var(--night) 78%, transparent), transparent)',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.25rem var(--space-3)',
                borderRadius: 'var(--radius-full)',
                background: 'color-mix(in oklab, var(--night) 72%, transparent)',
                color: 'var(--white)',
                fontSize: 'var(--text-xs)',
                lineHeight: 'var(--leading-xs)',
                fontWeight: 'var(--weight-medium)',
              }}
            >
              {wildlifeTypes[0]}
            </span>
          </div>
        </div>

        <CardContent pt='$4' gap='$2'>
          <div className='flex items-start justify-between gap-2'>
            <h3 className='font-medium' style={{ ...clamp(2), flex: '1 1 auto', minWidth: 0 }}>{title}</h3>
            <div className='flex items-center gap-1 text-sm shrink-0'>
              <Star className='w-4 h-4' fill='currentColor' aria-hidden />
              <span>{rating}</span>
              <span className='text-muted-foreground'>({reviewsCount})</span>
            </div>
          </div>

          <div className='flex items-center gap-1 text-sm text-muted-foreground'>
            <MapPin className='w-3 h-3 shrink-0' aria-hidden />
            <span>{location.city}, {location.country}</span>
          </div>

          <p className='text-sm text-muted-foreground' style={clamp(2)}>{description}</p>
        </CardContent>

        <CardFooter>
          <div className='w-full pt-2 flex items-center justify-between border-t'>
            <p className='font-medium'>
              ${pricing.amount} <span className='text-sm text-muted-foreground font-normal'>/ {pricing.period}</span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ExperienceCard;
