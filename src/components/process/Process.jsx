"use client";

import { useInView } from "react-intersection-observer";
import TranslatedText from "@/components/translatedText/TranslatedText";

const ProcessItem = ({ icon: Icon, title, description, index, totalItems }) => {
  const { ref, inView } = useInView({
    threshold: 0.7,
    triggerOnce: false,
  });

  return (
    <div ref={ref} className="relative flex items-center mb-16 last:mb-0">
      {index < totalItems - 1 && (
        <div className="absolute top-[30px] left-[30px] w-0.5 h-[calc(100%+4rem)] border-l-2 border-dashed border-gray-600 -z-10" />
      )}

      <div className="flex items-start relative z-10">
        <div className={`w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${inView ? 'opacity-100 scale-100' : 'opacity-50 scale-90'}`}>
          <Icon className="w-6 h-6 text-blue-500" />
        </div>

        <div className={`ml-6 transition-all duration-300 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <h3 className="text-lg font-semibold mb-2">
            <TranslatedText>{title}</TranslatedText>
          </h3>
          <p className="text-sm text-gray-400">
            <TranslatedText>{description}</TranslatedText>
          </p>
        </div>
      </div>
    </div>
  );
};

const Process = ({ title, items }) => {
  return (
    <div className="bg-black text-white py-16 mb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start">
          <div className="lg:w-1/2 mb-12 lg:mb-0 mx-auto">
            <h2>
              <TranslatedText>{title}</TranslatedText>
            </h2>
          </div>
          <div className="lg:w-1/2">
            <div className="relative pl-4">
              {items.map((item, index) => (
                <ProcessItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  index={index}
                  totalItems={items.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
