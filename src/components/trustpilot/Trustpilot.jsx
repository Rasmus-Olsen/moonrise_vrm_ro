"use client";

import { useState, useEffect, useRef } from "react";
import TranslatedText from "@/components/translatedText/TranslatedText";
import gsap from "gsap";

const Trustpilot = ({ reviews = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const isAnimating = useRef(false);

  const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

  const getXValue = (position) => {
    if (isMobile()) {
      if (position === "next") return "-200%";
      if (position === "reset") return "-100%";
      if (position === "prev") return "0%";
    } else {
      if (position === "next") return "-66.66%";
      if (position === "reset") return "-33.33%";
      if (position === "prev") return "0%";
    }
  };

  const getVisibleReviews = () => {
    if (reviews.length <= 3) return reviews;
    const visibleReviews = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + reviews.length) % reviews.length;
      visibleReviews.push(reviews[index]);
    }
    return visibleReviews;
  };

  const handleNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const slider = sliderRef.current;

    gsap.to(slider, {
      x: getXValue("next"),
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        setTimeout(() => {
          gsap.set(slider, { x: getXValue("reset") });
          isAnimating.current = false;
        }, 10);
      },
    });
  };

  const handlePrev = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const slider = sliderRef.current;

    gsap.to(slider, {
      x: getXValue("prev"),
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
        setTimeout(() => {
          gsap.set(slider, { x: getXValue("reset") });
          isAnimating.current = false;
        }, 10);
      },
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    gsap.set(slider, { x: getXValue("reset") });
  }, []);

  if (!reviews.length) return null;
  const visibleReviews = getVisibleReviews();

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-0 !text-white">
            <TranslatedText>Vores kunder taler for os</TranslatedText>
          </h2>
        </div>

        <div className="relative max-w-7xl mx-auto md:px-12">
          <div className="relative">
            <div className="overflow-hidden">
              <div ref={sliderRef} className="flex" style={{ willChange: "transform" }}>
                {visibleReviews.map((review, index) => (
                  <div
                    key={index}
                    className="w-full sm:w-full md:w-[calc(100%/3)] flex-shrink-0 px-3"
                  >
                    <div className="h-full flex">
                    <div className="flex flex-col justify-between w-full min-h-[235px] flex-grow rounded-xl bg-[var(--background)] border border-[var(--blue)] p-3 md:p-4 lg:p-5 gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-6 h-6 ${i < (review.stars || 5) ? "text-[var(--blue)]" : "text-gray-400"}`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                        </div>
                        <p className="text-l font-semibold">
                          <TranslatedText>{review.heading}</TranslatedText>
                        </p>
                        <p>
                          <TranslatedText>{review.text}</TranslatedText>
                        </p>
                        <p className="font-medium">
                          <TranslatedText>{review.author}</TranslatedText>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button onClick={handlePrev} className="absolute left-[-20px] md:left-[-40px] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-10 h-10 rounded-full transition-all cursor-pointer flex items-center justify-center z-20 shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={handleNext} className="absolute right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-10 h-10 rounded-full transition-all cursor-pointer flex items-center justify-center z-20 shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating.current || index === currentIndex) return;
                  isAnimating.current = true;
                  const direction = index > currentIndex ? 1 : -1;
                  const slider = sliderRef.current;

                  if (direction > 0) {
                    gsap.to(slider, {
                      x: getXValue("next"),
                      duration: 0.8,
                      ease: "power2.inOut",
                      onComplete: () => {
                        setCurrentIndex(index);
                        gsap.set(slider, { x: getXValue("reset") });
                        isAnimating.current = false;
                      },
                    });
                  } else {
                    gsap.set(slider, { x: getXValue("prev") });
                    gsap.to(slider, {
                      x: getXValue("reset"),
                      duration: 0.8,
                      ease: "power2.inOut",
                      onComplete: () => {
                        setCurrentIndex(index);
                        isAnimating.current = false;
                      },
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trustpilot;