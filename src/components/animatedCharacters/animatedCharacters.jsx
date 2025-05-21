"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

export default function AnimatedCharacters({ text }) {
  const textRef = useRef(null);
  const hasAnimated = useRef(false);
  const isHome = usePathname() === "/";

  useEffect(() => {
    const chars = textRef.current?.querySelectorAll(".char");

    if (chars && !hasAnimated.current) {
      if (isHome) {
        const tl = gsap.timeline({ delay: 1 });

        tl.set(textRef.current, { opacity: 1 })
          .fromTo(
            chars,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.8,
              ease: "power2.out",
            }
          )
          .to(chars, { duration: 1 })
          .to(textRef.current, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.in",
            onComplete: () => (hasAnimated.current = true),
          });
      } else {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.2,
            ease: "power2.out",
            onComplete: () => (hasAnimated.current = true),
          }
        );
      }
    }
  }, []);

  return (
    <div
      ref={textRef}
      className="text-3xl md:text-6xl font-semibold leading-tight md:leading-relaxed text-center opacity-0"
    >
      {text.split("").map((char, index) => (
        <span key={index} className="char inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
