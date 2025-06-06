"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TranslatedText from "@/components/translatedText/TranslatedText";

export default function ProcessTest({ title, items, description }) {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const whiteLineRef = useRef(null);
  const stepRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(-1);
  const [iconPositions, setIconPositions] = useState([]);

  useEffect(() => {
    const steps = stepRefs.current;
    const newPositions = steps.map((el) => el?.offsetTop || 0);
    setIconPositions(newPositions);
  }, [items]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const line = lineRef.current;
      const whiteLine = whiteLineRef.current;
      if (!container || !line || !whiteLine) return;

      const rect = container.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const offsetTop = rect.top + scrollTop;

      const lastOffset = iconPositions[iconPositions.length - 1] ?? 0;
      const maxLineHeight = lastOffset + 20;

      const currentScroll = scrollTop + window.innerHeight / 2 - offsetTop;
      const clampedHeight = Math.min(Math.max(currentScroll, 0), maxLineHeight);

      line.style.height = `${clampedHeight}px`;
      whiteLine.style.height = `${maxLineHeight}px`;

      stepRefs.current.forEach((el, index) => {
        if (clampedHeight >= el.offsetTop - 40) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, iconPositions]);

  return (
    <section className="pt-20 pb-2 relative">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          <TranslatedText>{title}</TranslatedText>
        </h2>
        <p className="text-center mb-16">
          <TranslatedText>{description}</TranslatedText>
        </p>

        <div ref={containerRef} className="relative">
          {/* White background line */}
          <div
            ref={whiteLineRef}
            className="absolute top-0 w-1 bg-white z-0 line-background"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              height: "0%"
            }}
          ></div>

          {/* Blue progress line */}
          <div
            ref={lineRef}
            className="absolute top-0 w-1 bg-[var(--blue)] z-10 progress-line"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              height: "0%"
            }}
          ></div>

          {/* Floating Icons */}
          {items.map((item, index) => (
            <div
              key={index}
              className="absolute z-20 icon-container"
              style={{
                top: `${iconPositions[index] ?? 0}px`,
                left: "50%",
                transform: "translateX(-50%)"
              }}
            >
              <div className="w-10 h-10 rounded-full bg-white border-4 border-[var(--blue)] flex items-center justify-center relative">
                <item.icon className="text-blue-500 text-lg z-10" />
                {activeStep === index && (
                  <motion.div
                    className="absolute -inset-1 bg-[var(--navy)] rounded-full"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                )}
              </div>
            </div>
          ))}

          {/* Step text */}
          {items.map((item, index) => (
            <motion.div
              key={index}
              ref={(el) => (stepRefs.current[index] = el)}
              className={`timeline-step mb-20 relative min-h-[100px] flex w-full ${
                index % 2 === 0 ? "md:justify-end" : "md:justify-start"
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence>
                {activeStep >= index && (
                  <motion.div
                    className="max-w-md step-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      <TranslatedText>{item.title}</TranslatedText>
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      <TranslatedText>{item.description}</TranslatedText>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
