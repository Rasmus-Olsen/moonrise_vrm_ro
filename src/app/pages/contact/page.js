'use client'

import { useState, useEffect } from 'react';
import TextImageSlider from "@/components/textImageSlider/TextImageSlider";
import Hero from "@/components/hero/Hero";
import Trustpilot from "@/components/trustpilot/Trustpilot";
import { getReviews } from '@/lib/supabase';

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

import TextImageSlider from '@/components/textImageSlider/TextImageSlider'
import Hero from '@/components/hero/Hero'
import Newsletter from '@/components/newsletter/Newsletter'

export default function Contact () {
  return (
    <>
      <Hero
        backgroundSrc='/assets/images/testimage.jpg'
        title='Kontakt'
        overlayOpacity={0.5}
        height='h-[40vh]'
      />

      <div className="container mx-auto px-4 md:px-8 py-16 space-y-16">
      <div className='container mx-auto px-4 md:px-8 py-16 space-y-16'>
        <TextImageSlider
          title='Om Moonrise'
          text1='Moonrise er Danmarks første godkendte udbyder af lysdroneshows - en ny, bæredygtig og spektakulær måde at skabe visuelle oplevelser på. Vi kombinerer avanceret teknologi med kreativt design for at levere shows, der forvandler nattehimlen til levende fortællinger i lys og bevægelse.'
          text2='Bag Moonrise står et team med stærk teknisk baggrund og mange års erfaring fra event- og filmbranchen gennem SimpleCreations. Vi forstår både det praktiske, det æstetiske og det tekniske, og vi går aldrig på kompromis med sikkerhed eller kvalitet.'
          text3='Uanset om du ønsker et færdigudviklet show eller en specialdesignet løsning, arbejder vi tæt sammen med dig for at skabe en oplevelse, der passer perfekt til dit arrangement - og som dine gæster aldrig glemmer.'
          text4='Vil du vide mere, se tidligere projekter eller høre om mulighederne? Så er du altid velkommen til at kontakte os – vi står klar til at hjælpe.'
          images={['/assets/images/testimage.jpg']}
          sliderPosition='left'
        />

        <TextImageSlider
          title='Vores Projekter'
          text1='Se nogle af vores seneste drone shows og projekter. Hver show er skræddersyet til kundens ønsker og behov.'
          text2='Vi kan skabe alt fra simple mønstre til komplekse animationer og fortællinger på himlen.'
          text3='Kontakt os for at høre mere om mulighederne for dit næste event.'
          sliderPosition='right'
          images={[
            '/assets/images/testimage.jpg',
            '/assets/images/testimage2.png',
            '/assets/images/testimage.jpg',
            '/assets/images/testimage2.png'
          ]}
        />
        
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

      <Newsletter />
    </>
  )
}
