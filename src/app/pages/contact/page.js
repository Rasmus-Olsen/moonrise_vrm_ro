'use client'

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Hero from '@/components/hero/Hero';
import { getReviews } from '@/lib/supabase';

// Lazy load components
const TextImageSlider = dynamic(() => import('@/components/textImageSlider/TextImageSlider'), {
  loading: () => <div className="animate-pulse bg-gray-700 h-[400px] rounded-lg"></div>
});
const Trustpilot = dynamic(() => import('@/components/trustpilot/Trustpilot'), {
  loading: () => <div className="animate-pulse bg-gray-700 h-[300px] rounded-lg"></div>
});
const Newsletter = dynamic(() => import('@/components/newsletter/Newsletter'), {
  loading: () => <div className="animate-pulse bg-gray-700 h-[200px] rounded-lg"></div>
});

export default function Contact() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Kunne ikke hente anmeldelser');
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return (
    <>
      <Hero
        backgroundSrc='/assets/images/contact.png'
        title='Kontakt'
        overlayOpacity={0}
        height='h-[40vh]'
      />

      <div className='container mx-auto px-4 md:px-0 py-6 space-y-16'>
        <TextImageSlider
          title='Om Moonrise'
          text1='Moonrise er Danmarks første godkendte udbyder af lysdroneshows - en ny, bæredygtig og spektakulær måde at skabe visuelle oplevelser på. Vi kombinerer avanceret teknologi med kreativt design for at levere shows, der forvandler nattehimlen til levende fortællinger i lys og bevægelse.'
          text2='Bag Moonrise står et team med stærk teknisk baggrund og mange års erfaring fra event- og filmbranchen gennem SimpleCreations. Vi forstår både det praktiske, det æstetiske og det tekniske, og vi går aldrig på kompromis med sikkerhed eller kvalitet.'
          text3='Uanset om du ønsker et færdigudviklet show eller en specialdesignet løsning, arbejder vi tæt sammen med dig for at skabe en oplevelse, der passer perfekt til dit arrangement - og som dine gæster aldrig glemmer.'
          text4='Vil du vide mere, se tidligere projekter eller høre om mulighederne? Så er du altid velkommen til at kontakte os – vi står klar til at hjælpe.'
          images={['/assets/images/om-moonrise.png']}
          sliderPosition='right'
        />

        <Newsletter />
        
        {loading ? (
          <div className="text-center">
            <p className="text-gray-600">Indlæser anmeldelser...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <Trustpilot reviews={reviews} />
        )}
      </div>

      
    </>
  )
}
