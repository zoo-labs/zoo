import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import { Experience } from '@/types/experiences';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/clsxm';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const { id, title, location, images, description, wildlifeTypes, pricing, rating, reviewsCount } = experience;
  
  return (
    <Link href={`/experiences/${id}`} className="block">
      <Card className="overflow-hidden group h-full bg-black hover:border-gray-600 transition-colors">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent">
            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
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
              <span className="text-gray-400">({reviewsCount})</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <MapPin className="w-3 h-3" />
            <span>{location.city}, {location.country}</span>
          </div>
          
          <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
        </CardContent>
        
        <CardFooter className="pt-0 px-4 pb-4">
          <div className="w-full pt-2 flex items-center justify-between border-t border-gray-800">
            <p className="font-medium">
              ${pricing.amount} <span className="text-sm text-gray-400 font-normal">/ {pricing.period}</span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ExperienceCard;