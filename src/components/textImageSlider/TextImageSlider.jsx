"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TranslatedText from "../translatedText/TranslatedText";
import Button from "../button/Button";

const TextImageSlider = ({
  title,
  text1,
  text2,
  text3,
  text4,
  images = ["/assets/images/testimage.jpg"],
  sliderPosition = "left",
  buttonText,
  buttonLink,
  overlayOpacity = 0,
  buttonStyle = "btn-one",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const textContent = (
    <div className="flex flex-col space-y-4 justify-center h-[400px] md:min-h-[400px] md:h-auto">
      <h2 className="text-heading">
        <TranslatedText>{title}</TranslatedText>
      </h2>
      <p className="text-body">
        <TranslatedText>{text1}</TranslatedText>
      </p>
      <p className="text-body">
        <TranslatedText>{text2}</TranslatedText>
      </p>
      <p className="text-body">
        <TranslatedText>{text3}</TranslatedText>
      </p>
      {text4 && (
        <p className="text-body">
          <TranslatedText>{text4}</TranslatedText>
        </p>
      )}
      
      {buttonText && buttonLink && (
        <Link href={buttonLink} className="mt-6 inline-block">
          <Button buttonStyle={buttonStyle}>
            <TranslatedText>{buttonText}</TranslatedText>
          </Button>
        </Link>
      )}
    </div>
  );

  // Single image mode (TextImage style)
  if (images.length === 1) {
    const imageContent = (
      <div className="w-full md:w-1/2 relative min-h-[400px] order-2 md:order-none">
        <div className="absolute inset-0">
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={true}
          />
          {overlayOpacity > 0 && (
            <div
              className="absolute inset-0 bg-black rounded-lg"
              style={{ opacity: overlayOpacity }}
            />
          )}
        </div>
      </div>
    );

    return (
      <div className="flex flex-col md:flex-row gap-8 md:items-stretch">
        {sliderPosition === "left" ? (
          <>
            {imageContent}
            <div className="w-full md:w-1/2">{textContent}</div>
          </>
        ) : (
          <>
            <div className="w-full md:w-1/2">{textContent}</div>
            {imageContent}
          </>
        )}
      </div>
    );
  }

  // Multiple images mode (TextSlider style)
  const getVisibleImages = () => {
    const prev = images[(currentIndex - 1 + images.length) % images.length];
    const current = images[currentIndex];
    const next = images[(currentIndex + 1) % images.length];
    return [prev, current, next];
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const visibleImages = getVisibleImages();

  const sliderContent = (
    <div className="w-full md:w-1/2 relative order-2 md:order-none h-[400px] md:h-auto flex items-center">
      <div className="w-full h-full relative overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out absolute inset-0"
          style={{
            transform: `translateX(calc(-${416}px + 50% - 208px))`,
            willChange: "transform"
          }}
        >
          {visibleImages.map((src, index) => (
            <div
              key={`${currentIndex}-${index}`}
              className="flex-shrink-0 h-full"
              style={{ width: "400px" }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={index === 1 ? title : `Slide`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="400px"
                  priority={true}
                />
                {overlayOpacity > 0 && (
                  <div
                    className="absolute inset-0 bg-black rounded-lg"
                    style={{ opacity: overlayOpacity }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-10 h-10 rounded-full transition-all cursor-pointer flex items-center justify-center z-20"
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
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-10 h-10 rounded-full transition-all cursor-pointer flex items-center justify-center z-20"
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
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
  );

  return (
    <div className="flex flex-col md:flex-row gap-8 md:items-stretch">
      {sliderPosition === "left" ? (
        <>
          {sliderContent}
          <div className="w-full md:w-1/2">{textContent}</div>
        </>
      ) : (
        <>
          <div className="w-full md:w-1/2">{textContent}</div>
          {sliderContent}
        </>
      )}
    </div>
  );
};

export default TextImageSlider;
