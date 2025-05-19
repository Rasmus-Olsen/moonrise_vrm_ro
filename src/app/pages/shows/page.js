import { getShows } from '@/lib/notion';
import ShowsGallery from '@/components/shows/ShowsGallery';
import Hero from '@/components/hero/Hero';

export default async function Shows() {
  const shows = await getShows();

  return (
    <>
      <Hero
        backgroundSrc="/assets/images/testimage.jpg"
        title="Shows"
        overlayOpacity={0.5}
        height="h-[40vh]"
      />
      <ShowsGallery shows={shows} />
    </>
  );
}