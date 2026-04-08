'use client';

import { createContext, useState, useCallback, useEffect } from 'react';
import type { Locale } from '@/types';
import { translate } from '@/lib/i18n';

const STORAGE_KEY = 'wiwi-locale';
const DEFAULT_LOCALE: Locale = 'vi';

export interface I18nContextType {
    locale: Locale;
    t: (key: string) => string;
    setLocale: (locale: Locale) => void;
}

export const I18nContext = createContext<I18nContextType | null>(null);

function getStoredLocale(): Locale {
    if (typeof window === 'undefined') return DEFAULT_LOCALE;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'vi' || stored === 'en') return stored;
    } catch {
        // localStorage unavailable (e.g. private browsing)
    }
    return DEFAULT_LOCALE;
}

export default function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setLocaleState(getStoredLocale());
        setMounted(true);
    }, []);

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        try {
            localStorage.setItem(STORAGE_KEY, newLocale);
        } catch {
            // localStorage unavailable
        }
    }, []);

    const t = useCallback(
        (key: string) => translate(locale, key),
        [locale]
    );

    if (!mounted) {
        return null;
    }

    return (
        <I18nContext.Provider value={{ locale, t, setLocale }}>
            {children}
        </I18nContext.Provider>
    );
}
