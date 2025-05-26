import dynamic from 'next/dynamic';
import { getShows } from '@/lib/notion';
import Hero from '@/components/hero/Hero';

// Lazy load components
const ShowsGallery = dynamic(() => import('@/components/shows/ShowsGallery'), {
  loading: () => <div className="animate-pulse bg-gray-700 h-[600px] rounded-lg container mx-auto px-4 md:px-8 mt-16"></div>
});

export default async function Shows() {
  const shows = await getShows();

  return (
    <>
      <Hero
        backgroundSrc="/assets/images/shows.webp"
        title="Shows"
        overlayOpacity={0}
        height="h-[50vh]"
      />
      <ShowsGallery shows={shows} />
    </>
  );
}