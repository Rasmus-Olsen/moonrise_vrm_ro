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
      const panels = gsap.utils.toArray(".panel");
      const container = document.querySelector(".process-container");

      // Horizontal scroll effect without snapping
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: true,
          anticipatePin: 1, // Hjælper med smooth pinning
          // Her tilføjer vi halvdelen af viewportbredden til enden,
          // så sidste panel kan slutte midt på skærmen
          end: () => {
            const totalWidth = container.scrollWidth;
            const viewportWidth = window.innerWidth;
            const scrollDistance = totalWidth - viewportWidth;
            return "+=" + scrollDistance;
          }
        }
      });

      // Fade/scale animation per panel med specialbehandling for første og sidste
      panels.forEach((panel, i) => {
        const totalPanels = panels.length;
        const isFirst = i === 0;
        const isLast = i === totalPanels - 1;

        let start = "center center";
        let end = "center center";

        if (isFirst) {
          start = "left center";
          end = "center center";
        } else if (isLast) {
          start = "center center";
          end = "right center";
        }

        gsap.fromTo(
          panel,
          { autoAlpha: 0, scale: 0.95, y: 20 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            scrollTrigger: {
              trigger: panel,
              start,
              end,
              scrub: true
            }
          }
        );
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [items]);

  return (
    <>
      {/* Header */}
      <section className="flex flex-col items-center bg-black text-white pt-30 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">
            <TranslatedText>{title}</TranslatedText>
          </h2>
        </div>
      </section>

      {/* Process Panels */}
      <section
        ref={sectionRef}
        className="bg-pink-500 text-white overflow-hidden min-h-screen"
      >
        <div
          className="process-container h-screen flex flex-nowrap"
          style={{ width: `${items.length * 100}%` }}
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="panel w-screen h-screen flex items-center justify-center px-12"
              >
                <div className="max-w-2xl text-center">
                  <div className="flex flex-col items-center gap-4 mb-6">
                    {Icon && <Icon className="text-5xl text-white" />}
                    <h3 className="text-4xl font-semibold">
                      <TranslatedText>{item.title}</TranslatedText>
                    </h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    <TranslatedText>{item.description}</TranslatedText>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Process;
