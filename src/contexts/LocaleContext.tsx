"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

// Import all message files statically
import hiMessages from '../../messages/hi.json';
import enMessages from '../../messages/en.json';
import taMessages from '../../messages/ta.json';
import teMessages from '../../messages/te.json';
import knMessages from '../../messages/kn.json';
import mrMessages from '../../messages/mr.json';
import guMessages from '../../messages/gu.json';
import bnMessages from '../../messages/bn.json';
import orMessages from '../../messages/or.json';

export const locales = ['hi', 'en', 'ta', 'te', 'kn', 'mr', 'gu', 'bn', 'or'] as const;
export type Locale = (typeof locales)[number];

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

const allMessages: Record<Locale, any> = {
    hi: hiMessages,
    en: enMessages,
    ta: taMessages,
    te: teMessages,
    kn: knMessages,
    mr: mrMessages,
    gu: guMessages,
    bn: bnMessages,
    or: orMessages
};

type Messages = Record<string, any>;

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    messages: Messages;
    t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(() => {
        if (typeof window !== 'undefined') {
            const savedLocale = Cookies.get('NEXT_LOCALE') as Locale;
            if (savedLocale && locales.includes(savedLocale)) {
                return savedLocale;
            }
        }
        return 'hi';
    });
    const [messages, setMessages] = useState<Messages>(() => {
        if (typeof window !== 'undefined') {
            const savedLocale = Cookies.get('NEXT_LOCALE') as Locale;
            if (savedLocale && locales.includes(savedLocale)) {
                return allMessages[savedLocale];
            }
        }
        return hiMessages;
    });

    useEffect(() => {
        setMessages(allMessages[locale]);
    }, [locale]);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        Cookies.set('NEXT_LOCALE', newLocale, { expires: 365 });
    };

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = messages;

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key;
    };

    return (
        <LocaleContext.Provider value={{ locale, setLocale, messages, t }}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within LocaleProvider');
    }
    return context;
}
