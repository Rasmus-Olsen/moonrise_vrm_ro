"use client";

import { useState } from "react";
import TranslatedText from "@/components/translatedText/TranslatedText";

const Trustpilot = ({ reviews = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Få de 3 synlige reviews (forrige, nuværende, næste)
  const getVisibleReviews = () => {
    if (reviews.length <= 3) return reviews;

    const visibleReviews = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % reviews.length;
      visibleReviews.push(reviews[index]);
    }
    return visibleReviews;
  };

  // Gå til næste review
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  // Gå til forrige review
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (!reviews.length) return null;

  const visibleReviews = getVisibleReviews();

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-0">
            <TranslatedText>Vores kunder taler for os</TranslatedText>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div className="flex gap-6 transition-transform duration-500 ease-in-out">
              {visibleReviews.map((review, index) => (
                <div key={index} className="w-full md:w-1/3 flex-shrink-0">
                  <div className="rounded-xl shadow-xl p-8 h-full">
                    <div className="flex flex-col h-full gap-2">
                      <div className="flex gap-2 mb-0">
                        <img
                          src={`https://roweb.dk/kea/moonrise/star-${
                            review.stars || "5"
                          }.png`}
                          alt={`${review.stars || "5"} stars`}
                          className="h-8 w-auto"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-0">
                        <TranslatedText>{review.heading}</TranslatedText>
                      </h3>
                      <p className="text-gray-600 mb-0 flex-grow">
                        <TranslatedText>{review.text}</TranslatedText>
                      </p>
                      <p className="font-medium text-gray-900">
                        <TranslatedText>{review.author}</TranslatedText>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white/80 hover:bg-white text-black w-10 h-10 rounded-full transition-all cursor-pointer flex items-center justify-center z-20 shadow-lg"
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
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white/80 hover:bg-white text-black w-10 h-10 rounded-full transition-all cursor-pointer flex items-center justify-center z-20 shadow-lg"
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
                onClick={() => setCurrentIndex(index)}
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
