'use client';

import { useState, useEffect } from 'react';
import { translateText } from '@/utils/translate';
import { useLanguage } from '@/contexts/LanguageContext';

const TranslatedText = ({ children }) => {
  const { currentLang } = useLanguage();
  const [translatedText, setTranslatedText] = useState(children);

  useEffect(() => {
    const translate = async () => {
      if (typeof children === 'string' && currentLang !== 'da') {
        const translated = await translateText(children, currentLang);
        setTranslatedText(translated);
      } else {
        setTranslatedText(children);
      }
    };

    translate();
  }, [children, currentLang]);

  return <>{translatedText}</>;
};

export default TranslatedText;
