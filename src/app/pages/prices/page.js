"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";

// Lazy load components
const PriceCalculator = dynamic(
  () => import("@/components/priceCalculator/PriceCalculator"),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-700 h-[600px] rounded-lg container mx-auto px-4 md:px-8 mt-16"></div>
    )
  }
);

export default function Prices() {
  return (
    <>
      <Hero
        backgroundSrc="/assets/images/i-m-zion-wQ5NwAt-Boo-unsplash.jpg"
        title="Priser"
        overlayOpacity={0}
        height="h-[40vh]"
      />
      <PriceCalculator />
    </>
  );
}
