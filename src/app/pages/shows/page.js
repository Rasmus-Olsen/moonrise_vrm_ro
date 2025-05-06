'use client';

import { useState, useEffect } from 'react';
import Hero from "@/components/hero/Hero";
import ShowsGallery from "@/components/shows/ShowsGallery";
import { getShows } from '@/lib/supabase';

export default function Shows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchShows() {
      try {
        const data = await getShows();
        setShows(data);
      } catch (error) {
        console.error('Error fetching shows:', error);
        setError('Kunne ikke hente shows');
      } finally {
        setLoading(false);
      }
    }

    fetchShows();
  }, []);

  return (
    <>
      <Hero
        backgroundSrc="/assets/images/testimage.jpg"
        title="Shows"
        overlayOpacity={0.5}
        height="h-[40vh]"
      />
      {loading ? (
        <div className="container mx-auto px-4 py-8 text-center text-white">
          Indlæser shows...
        </div>
      ) : error ? (
        <div className="container mx-auto px-4 py-8 text-center text-red-500">
          {error}
        </div>
      ) : (
        <ShowsGallery shows={shows} />
      )}
    </>
  );
}