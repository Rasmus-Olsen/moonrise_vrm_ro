"use client";

import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import TranslatedText from "@/components/translatedText/TranslatedText";

const StatItem = ({ title, value, suffix = "", description = "" }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepValue = value / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setCount(Math.min(Math.round(stepValue * currentStep), value));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-6xl font-bold mb-2">
        {count}
        <span className="text-blue-500">{suffix}</span>
      </div>
      <h3 className="text-sm uppercase tracking-wide mb-2">
        <TranslatedText>{title}</TranslatedText>
      </h3>
      {description && (
        <p className="text-sm opacity-70">
          <TranslatedText>{description}</TranslatedText>
        </p>
      )}
    </div>
  );
};

const Stats = ({ title, items }) => {
  return (
    <div className="bg-black text-white py-16 mx-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start">
          <div className="lg:w-1/2 mb-12 lg:mb-0 mx-auto">
            <h2>
              <TranslatedText>{title}</TranslatedText>
            </h2>
          </div>
          <div className="lg:w-1/2 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
              {items.map((item, index) => (
                <StatItem
                  key={index}
                  title={item.title}
                  value={item.value}
                  suffix={item.suffix}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
