"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TranslatedText from "@/components/translatedText/TranslatedText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Process = ({ title, items = [] }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !sectionRef.current ||
      !items ||
      items.length === 0
    )
      return;

    const cleanup = () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };

    cleanup();

    const timer = setTimeout(() => {
      const section = sectionRef.current;
      const panels = gsap.utils.toArray(".panel");
      const container = document.querySelector(".process-container");

      // Beregn total scroll distance
      const totalPanels = panels.length;
      const totalWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth;

      // Pin sektionen og scroll horisontalt
      gsap.to(panels, {
        xPercent: -100 * (totalPanels - 1),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [items]);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white h-screen relative overflow-hidden"
    >
      {/* Fast header i toppen */}
      <div className="absolute top-0 left-0 right-0 pt-24 pb-8 z-10 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            <TranslatedText>{title}</TranslatedText>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            <TranslatedText>
              Scroll for at udforske processen og se hvordan vi arbejder
            </TranslatedText>
          </p>
        </div>
      </div>

      {/* Scrollende panels container */}
      <div className="h-screen pt-32">
        <div
          className="process-container h-[calc(100vh-8rem)] flex flex-nowrap"
          style={{ width: `${items.length * 100}%` }}
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="panel w-screen h-[calc(100vh-8rem)] flex items-center justify-center px-12"
              >
                <div className="max-w-2xl text-center">
                  <div className="flex flex-col items-center gap-4 mb-6">
                    {Icon && (
                      <div className="p-6 rounded-full inline-block">
                        <Icon className="text-5xl text-gray-400" />
                      </div>
                    )}
                    <h3 className="text-4xl font-semibold">
                      <TranslatedText>{item.title}</TranslatedText>
                    </h3>
                  </div>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    <TranslatedText>{item.description}</TranslatedText>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
