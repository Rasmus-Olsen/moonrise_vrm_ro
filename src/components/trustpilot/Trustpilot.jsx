"use client";

import { useState, useEffect, useRef } from "react";
import TranslatedText from "@/components/translatedText/TranslatedText";
import gsap from "gsap";

const Trustpilot = ({ reviews = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const isAnimating = useRef(false);

  // Få de 5 synlige reviews (2 forrige, nuværende, 2 næste)
  const getVisibleReviews = () => {
    if (reviews.length <= 3) return reviews;

    const visibleReviews = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + reviews.length) % reviews.length;
      visibleReviews.push(reviews[index]);
    }
    return visibleReviews;
  };

  // Gå til næste review
  const handleNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const slider = sliderRef.current;
    const slides = slider.children;

    gsap.to(slider, {
      x: "-66.66%",
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        setTimeout(() => {
          gsap.set(slider, { x: "-33.33%" });
          isAnimating.current = false;
        }, 10);
      }
    });
  };

  // Gå til forrige review
  const handlePrev = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const slider = sliderRef.current;
    const slides = slider.children;

    gsap.to(slider, {
      x: "0%",
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
        setTimeout(() => {
          gsap.set(slider, { x: "-33.33%" });
          isAnimating.current = false;
        }, 10);
      }
    });
  };

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

        <div className="relative max-w-7xl mx-auto px-12">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                ref={sliderRef}
                className="flex"
                style={{
                  willChange: "transform",
                  transform: "translateX(calc(-100% / 3))"
                }}
              >
                {visibleReviews.map((review, index) => (
                  <div
                    key={index}
                    className="w-[calc(100%/3)] flex-shrink-0 px-3"
                  >
                    <div className="rounded-xl bg-[var(--background)] border border-[var(--purple)] p-4 md:p-6 lg:p-8 h-full shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex flex-col h-full gap-2">
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-6 h-6 ${
                                i < (review.stars || 5)
                                  ? "text-[var(--purple)]"
                                  : "text-gray-400"
                              }`}
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
                        <h3 className="text-xl font-semibold mb-2 !text-[var(--white)]">
                          <TranslatedText>{review.heading}</TranslatedText>
                        </h3>
                        <p className="!text-[var(--white)] mb-4 flex-grow leading-relaxed">
                          <TranslatedText>{review.text}</TranslatedText>
                        </p>
                        <p className="font-medium !text-[var(--white)]">
                          <TranslatedText>{review.author}</TranslatedText>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-[-40px] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-10 h-10 rounded-full transition-all cursor-pointer flex items-center justify-center z-20 shadow-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-[-40px] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-10 h-10 rounded-full transition-all cursor-pointer flex items-center justify-center z-20 shadow-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Navigation */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating.current) return;
                  if (index === currentIndex) return;

                  isAnimating.current = true;
                  const direction = index > currentIndex ? 1 : -1;
                  const slider = sliderRef.current;

                  const slides = slider.children;

                  if (direction > 0) {
                    gsap.to(slider, {
                      x: "-66.66%",
                      duration: 0.8,
                      ease: "power2.inOut",
                      onComplete: () => {
                        setCurrentIndex(index);
                        gsap.set(slider, { x: "-33.33%" });
                        isAnimating.current = false;
                      }
                    });
                  } else {
                    gsap.set(slider, { x: "0%" });
                    gsap.to(slider, {
                      x: "-33.33%",
                      duration: 0.8,
                      ease: "power2.inOut",
                      onComplete: () => {
                        setCurrentIndex(index);
                        isAnimating.current = false;
                      }
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trustpilot;
