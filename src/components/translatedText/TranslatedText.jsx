'use client';

import { useState, useEffect } from 'react';
import { translateText } from '@/utils/translate';
import { useLanguage } from '@/contexts/LanguageContext';

const TranslatedText = ({ children }) => {
  const { currentLang } = useLanguage();
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    const translate = async () => {
      // Hvis children er undefined eller null, vis ingenting
      if (children == null) {
        setTranslatedText('');
        return;
      }
      
      // Hvis children er en string og sproget ikke er dansk
      if (typeof children === 'string' && currentLang !== 'da') {
        try {
          const translated = await translateText(children, currentLang);
          setTranslatedText(translated || children);
        } catch (error) {
          console.error('Translation error:', error);
          setTranslatedText(children);
        }
      } else {
        // Hvis det er et React element eller dansk sprog
        setTranslatedText(children);
      }
    };

    translate();
  }, [children, currentLang]);

  // Hvis translatedText er null eller undefined, vis ingenting
  if (translatedText == null) return null;
  
  return <>{translatedText}</>;
};

export default TranslatedText;
