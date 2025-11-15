import { Locale } from '@/contexts/LocaleContext';

const MYMEMORY_API = 'https://api.mymemory.translated.net/get';

// Map our locale codes to MyMemory API language codes
const langMap: Record<Locale, string> = {
  hi: 'hi-IN',
  en: 'en-GB',
  ta: 'ta-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  bn: 'bn-IN',
  or: 'or-IN'
};

export async function translateText(
  text: string,
  targetLang: Locale,
  sourceLang: Locale = 'en'
): Promise<string> {
  if (!text || sourceLang === targetLang) return text;

  try {
    const response = await fetch(
      `${MYMEMORY_API}?q=${encodeURIComponent(text)}&langpair=${langMap[sourceLang]}|${langMap[targetLang]}`
    );
    
    if (!response.ok) {
      console.error('Translation API error:', response.status);
      return text;
    }

    const data = await response.json();
    
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
    
    return text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
}

export async function translateJobContent(
  title: string,
  description: string,
  sourceLang: Locale,
  targetLangs: Locale[]
): Promise<Record<Locale, { title: string; description: string }>> {
  const translations: Record<string, { title: string; description: string }> = {
    [sourceLang]: { title, description }
  };

  // Translate to all target languages
  for (const lang of targetLangs) {
    if (lang === sourceLang) continue;

    try {
      // Add small delay to avoid rate limiting (free tier)
      await new Promise(resolve => setTimeout(resolve, 200));

      const [translatedTitle, translatedDescription] = await Promise.all([
        translateText(title, lang, sourceLang),
        translateText(description, lang, sourceLang)
      ]);

      translations[lang] = {
        title: translatedTitle,
        description: translatedDescription
      };
    } catch (error) {
      console.error(`Failed to translate to ${lang}:`, error);
      translations[lang] = { title, description }; // Fallback to original
    }
  }

  return translations as Record<Locale, { title: string; description: string }>;
}
