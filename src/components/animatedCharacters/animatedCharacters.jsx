"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedCharacters({ text }) {
  const textRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const chars = textRef.current?.querySelectorAll(".char");

    if (chars && !hasAnimated.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          // Ingen toggleActions - animation kører kun når man scroller ind
          onEnter: () => {
            if (!hasAnimated.current) {
              tl.play();
              hasAnimated.current = true;
            }
          },
          once: true // Gør at ScrollTrigger kun aktiveres én gang
        },
        paused: true // Start paused, så vi kan styre play i onEnter
      });

      tl.fromTo(
        chars,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: "power2.out" }
      ).to(chars, {
        opacity: 0,
        y: 20,
        stagger: 0,
        duration: 0.5,
        ease: "power2.in",
        delay: 1
      });
    }
  }, []);

  return (
    <div
      ref={textRef}
      className="text-6xl font-semibold leading-relaxed text-center"
    >
      {text.split("").map((char, index) => (
        <span key={index} className="char inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
