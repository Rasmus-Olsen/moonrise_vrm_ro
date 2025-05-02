"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitch = () => {
  const { currentLang, setCurrentLang } = useLanguage();

  const toggleLanguage = () => {
    setCurrentLang(currentLang === "da" ? "en" : "da");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-white hover:text-gray-300 transition-colors cursor-pointer"
    >
      {currentLang.toUpperCase()}
    </button>
  );
};

export default LanguageSwitch;
