"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TranslatedText from "../translatedText/TranslatedText";
import Button from "../button/Button";
import gsap from "gsap";

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
  buttonStyle = "btn-one"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const isAnimating = useRef(false);

  const handleNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    gsap.to(sliderRef.current, {
      xPercent: -100,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        const slider = sliderRef.current;
        const first = slider.children[0];
        slider.appendChild(first);
        gsap.set(slider, { xPercent: 0 });
        setCurrentIndex((prev) => (prev + 1) % images.length);
        isAnimating.current = false;
      }
    });
  };

  const handlePrev = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const slider = sliderRef.current;
    const last = slider.children[slider.children.length - 1];
    slider.insertBefore(last, slider.firstChild);
    gsap.set(slider, { xPercent: -100 });

    gsap.to(slider, {
      xPercent: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        isAnimating.current = false;
      }
    });
  };

  const textContent = (
    <div className="flex flex-col space-y-4 justify-center min-h-[250px] md:min-h-[400px]">
      {title && (
        <h2 className="text-heading">
          <TranslatedText>{title}</TranslatedText>
        </h2>
      )}
      {[text1, text2, text3, text4].map((text, i) =>
        text ? (
          <p key={i} className="text-body">
            <TranslatedText>{text}</TranslatedText>
          </p>
        ) : null
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

  const sliderContent = (
    <div className="w-full md:w-1/2 relative order-2 md:order-none h-[400px] md:h-auto flex items-center">
      <div className="w-full h-full relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex absolute inset-0"
          style={{ transform: "translateX(0%)", willChange: "transform" }}
        >
          {images.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-full h-full relative">
              <Image
                src={src}
                alt={`Slide ${i}`}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {overlayOpacity > 0 && (
                <div
                  className="absolute inset-0 bg-black rounded-lg"
                  style={{ opacity: overlayOpacity }}
                />
              )}
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
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-8 md:items-stretch relative">
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
