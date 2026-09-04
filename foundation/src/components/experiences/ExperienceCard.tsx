import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import { Experience } from '@/types/experiences';
import Photo from '@/components/Photo';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/clsxm';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const { id, title, location, images, description, wildlifeTypes, pricing, rating, reviewsCount } = experience;
  
  return (
    <Link href={`/experiences/${id}`} className="block">
      <Card className="group h-full overflow-hidden transition-colors hover:border-[color:var(--border-strong)]">
        <div className="relative">
          <Photo
            src={images[0]}
            alt={title}
            ratio="4 / 3"
            className="rounded-none border-0"
            imgClassName="transform transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 w-full p-2">
            <span className="rounded-full bg-black/55 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
              {wildlifeTypes[0]}
            </span>
          </div>
        </div>

        <CardContent className="p-4 space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-medium line-clamp-1">{title}</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>{rating}</span>
              <span style={{ color: 'var(--muted-foreground)' }}>({reviewsCount})</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            <MapPin className="w-3 h-3" />
            <span>{location.city}, {location.country}</span>
          </div>
          
          <p className="line-clamp-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>{description}</p>
        </CardContent>
        
        <CardFooter className="pt-0 px-4 pb-4">
          <div className="flex w-full items-center justify-between border-t pt-2" style={{ borderColor: 'var(--border)' }}>
            <p className="font-medium">
              ${pricing.amount} <span className="text-sm font-normal" style={{ color: 'var(--muted-foreground)' }}>/ {pricing.period}</span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ExperienceCard;