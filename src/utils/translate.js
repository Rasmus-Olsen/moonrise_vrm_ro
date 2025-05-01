// Cache for translations to avoid unnecessary API calls
const translationCache = new Map();

export async function translateText(text, targetLang) {
  const cacheKey = `${text}_${targetLang}`;
  
  // Check cache first
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=da|${targetLang}`);
    const data = await response.json();
    
    if (data.responseStatus === 200) {
      const translation = data.responseData.translatedText;
      translationCache.set(cacheKey, translation);
      return translation;
    } else {
      console.error('Translation error:', data);
      return text; // Return original text if translation fails
    }
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
}
