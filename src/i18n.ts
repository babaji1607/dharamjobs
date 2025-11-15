import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';

export const locales = ['hi', 'en', 'ta', 'te', 'kn', 'mr', 'gu', 'bn', 'or'] as const;
export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
  hi: 'हिन्दी',
  en: 'English',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  kn: 'ಕನ್ನಡ',
  mr: 'मराठी',
  gu: 'ગુજરાતી',
  bn: 'বাংলা',
  or: 'ଓଡ଼ିଆ'
};

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'hi') as Locale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
