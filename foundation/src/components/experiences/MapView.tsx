import React, { useEffect, useRef } from 'react';
import { Experience } from '@/types/experiences';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface MapViewProps {
  experiences: Experience[];
}

const MapView = ({ experiences }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add a placeholder SVG map
    if (mapRef.current) {
      const mapContainer = mapRef.current;
      mapContainer.innerHTML = '';
      
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 1000 500');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      
      // Simple world map outline (simplified for demonstration)
      const worldMap = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      worldMap.setAttribute('d', 'M200,100 C300,50 400,50 500,100 C600,150 700,150 800,100 L800,300 C700,350 600,350 500,300 C400,250 300,250 200,300 Z');
      worldMap.setAttribute('fill', 'none');
      worldMap.setAttribute('stroke', '#333');
      worldMap.setAttribute('stroke-width', '2');
      svg.appendChild(worldMap);
      
      // Add markers for each experience
      experiences.forEach(experience => {
        // Convert lat/lng to simple x,y for demo (not accurate)
        const x = (experience.location.coordinates.lng + 180) * (1000 / 360);
        const y = (90 - experience.location.coordinates.lat) * (500 / 180);
        
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        marker.setAttribute('cx', x.toString());
        marker.setAttribute('cy', y.toString());
        marker.setAttribute('r', '5');
        marker.setAttribute('fill', '#FFFFFF');
        
        // Add glow effect
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', x.toString());
        glow.setAttribute('cy', y.toString());
        glow.setAttribute('r', '8');
        glow.setAttribute('fill', 'none');
        glow.setAttribute('stroke', '#FFFFFF');
        glow.setAttribute('stroke-width', '2');
        glow.setAttribute('opacity', '0.5');
        
        const animateOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateOpacity.setAttribute('attributeName', 'opacity');
        animateOpacity.setAttribute('values', '0.5;0.8;0.5');
        animateOpacity.setAttribute('dur', '2s');
        animateOpacity.setAttribute('repeatCount', 'indefinite');
        
        glow.appendChild(animateOpacity);
        svg.appendChild(glow);
        svg.appendChild(marker);
        
        // Add tooltip
        const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        tooltip.textContent = `${experience.title} - ${experience.location.city}, ${experience.location.country}`;
        marker.appendChild(tooltip);
        
        // Add hover effect
        marker.addEventListener('mouseover', () => {
          marker.setAttribute('r', '7');
          glow.setAttribute('r', '12');
        });
        
        marker.addEventListener('mouseout', () => {
          marker.setAttribute('r', '5');
          glow.setAttribute('r', '8');
        });
      });
      
      mapContainer.appendChild(svg);
    }
  }, [experiences]);
  
  return (
    <Card className="border-gray-800 bg-gray-900 mb-8">
      <CardHeader className="pb-2">
        <CardTitle>Experience Locations</CardTitle>
        <CardDescription>Explore our wildlife volunteer opportunities around the world</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          ref={mapRef} 
          className="h-64 bg-gray-900 relative"
        ></div>
      </CardContent>
    </Card>
  );
};

export default MapView;