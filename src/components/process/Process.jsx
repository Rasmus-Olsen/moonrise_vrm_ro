"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TranslatedText from "@/components/translatedText/TranslatedText";

const ProcessItem = ({ icon: Icon, title, description, index, totalItems }) => {
  const { ref, inView } = useInView({
    threshold: 0.7,
    triggerOnce: false,
  });

  const iconVariants = {
    inactive: {
      scale: 0.8,
      opacity: 0.5,
    },
    active: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  return (
    <div ref={ref} className="relative flex items-center mb-16 last:mb-0">
      {index < totalItems - 1 && (
        <div className="absolute top-[30px] left-[30px] w-0.5 h-[calc(100%+4rem)] border-l-2 border-dashed border-gray-600 -z-10" />
      )}

      <motion.div
        className="flex items-start relative z-10"
        animate={inView ? "active" : "inactive"}
      >
        <motion.div
          variants={iconVariants}
          className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <Icon className="w-6 h-6 text-blue-500" />
        </motion.div>

        {inView && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="ml-6"
          >
            <h3 className="text-lg font-semibold mb-2">
              <TranslatedText>{title}</TranslatedText>
            </h3>
            <p className="text-sm text-gray-400">
              <TranslatedText>{description}</TranslatedText>
            </p>
          </motion.div>
        )}
      </motion.div>
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
