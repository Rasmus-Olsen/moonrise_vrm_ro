'use client';

import Hero from "@/components/hero/Hero";
import TranslatedText from "@/components/translatedText/TranslatedText";

export default function Shows() {
  return (
    <>
      <Hero
        backgroundSrc="/assets/images/testimage.jpg"
        title="Shows"
        overlayOpacity={0.5}
        height="h-[40vh]"
      />
    </>
  );
}