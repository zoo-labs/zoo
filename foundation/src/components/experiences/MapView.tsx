import React, { useEffect, useRef, useState } from 'react';
import { Experience } from '@/types/experiences';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface MapViewProps {
  experiences: Experience[];
}

// Mapbox public token (you should replace this with your own token)
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

const MapView = ({ experiences }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Load Mapbox GL JS from CDN
    if (!window.mapboxgl) {
      // Add CSS
      const link = document.createElement('link');
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      // Add JS
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
      script.async = true;
      script.onload = () => {
        setMapLoaded(true);
      };
      document.body.appendChild(script);

      return () => {
        document.head.removeChild(link);
        document.body.removeChild(script);
      };
    } else {
      setMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapContainer.current || mapRef.current) return;

    const mapboxgl = (window as any).mapboxgl;
    mapboxgl.accessToken = MAPBOX_TOKEN;

    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-122.5, 37.7], // Center on Farallone Islands area
      zoom: 2,
      projection: 'globe'
    });

    mapRef.current = map;

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('load', () => {
      // Set fog for 3D effect
      map.setFog({
        'range': [-1, 2],
        'horizon-blend': 0.3,
        'color': 'white',
        'high-color': '#add8e6',
        'space-color': '#d8f2ff',
        'star-intensity': 0.0
      });

      // Add markers for each experience
      experiences.forEach(experience => {
        if (experience.location.city === 'Global') return;

        let coordinates: [number, number];

        if (experience.location.city.includes('Farallone Islands')) {
          // Farallone Islands coordinates
          coordinates = [-123.0, 37.7];
        } else {
          coordinates = [experience.location.coordinates.lng, experience.location.coordinates.lat];
        }

        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#3b82f6';
        el.style.border = '3px solid white';
        el.style.cursor = 'pointer';
        el.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        el.style.transition = 'all 0.3s ease';

        // Add hover effect
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.2)';
          el.style.backgroundColor = '#2563eb';
        });

        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
          el.style.backgroundColor = '#3b82f6';
        });

        // Create popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          className: 'experience-popup'
        }).setHTML(`
          <div style="padding: 10px; min-width: 200px;">
            <h3 style="font-weight: bold; margin-bottom: 5px; color: #1f2937;">${experience.title}</h3>
            <p style="color: #6b7280; margin-bottom: 5px;">${experience.location.city}, ${experience.location.country}</p>
            <p style="color: #3b82f6; font-weight: 600;">$${experience.pricing.amount} / ${experience.pricing.period}</p>
          </div>
        `);

        // Add marker to map
        new mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(map);
      });

      // Add special emphasis for Farallone Islands
      const farallonExperiences = experiences.filter(e => e.location.city.includes('Farallone Islands'));
      if (farallonExperiences.length > 0) {
        // Add a pulsing circle for Farallone Islands
        map.addSource('farallone-pulse', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-123.0, 37.7]
            },
            properties: {}
          }
        });

        // Add multiple layers for pulsing effect
        const pulseColors = ['rgba(59, 130, 246, 0.4)', 'rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.2)'];
        const pulseSizes = [50, 70, 90];

        pulseColors.forEach((color, i) => {
          map.addLayer({
            id: `farallone-pulse-${i}`,
            type: 'circle',
            source: 'farallone-pulse',
            paint: {
              'circle-radius': pulseSizes[i],
              'circle-color': color,
              'circle-blur': 1,
              'circle-opacity': {
                stops: [[0, 0], [10, 0.3], [20, 0]]
              }
            }
          });
        });
      }
    });

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapLoaded, experiences]);

  if (!mapLoaded) {
    return (
      <Card className="border-gray-800 bg-gray-900 mb-8 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>Experience Locations</CardTitle>
          <CardDescription>Loading interactive map...</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-96 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading map...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-800 bg-gray-900 mb-8 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>Experience Locations</CardTitle>
        <CardDescription>Interactive 3D globe showing all wildlife volunteer opportunities</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div
          ref={mapContainer}
          className="h-64 sm:h-80 md:h-96 lg:h-[32rem] xl:h-[36rem]"
          style={{ minHeight: '16rem' }}
        />
      </CardContent>
    </Card>
  );
};

// Declare mapboxgl on window
declare global {
  interface Window {
    mapboxgl: any;
  }
}

export default MapView;