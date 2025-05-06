'use client';

import Hero from "@/components/hero/Hero";
import TranslatedText from "@/components/translatedText/TranslatedText";
import PriceCalculator from "@/components/priceCalculator/PriceCalculator";

export default function Prices() {
  return (
    <>
      <Hero
        backgroundSrc="/assets/images/testimage.jpg"
        title="Priser"
        overlayOpacity={0.5}
        height="h-[40vh]"
      />
      <PriceCalculator />
    </>
  );
}