import type { Locale, LocaleMessages } from '@/types';
import vi from '@/locales/vi.json';
import en from '@/locales/en.json';

const messages: Record<Locale, LocaleMessages> = {
    vi: vi as LocaleMessages,
    en: en as LocaleMessages,
};

export function getMessages(locale: Locale): LocaleMessages {
    return messages[locale];
}

export function translate(locale: Locale, key: string): string {
    const msg = messages[locale];
    const keys = key.split('.');
    let result: unknown = msg;

    for (const k of keys) {
        if (result === null || result === undefined || typeof result !== 'object') {
            return key;
        }
        result = (result as Record<string, unknown>)[k];
    }

    if (typeof result === 'string') {
        return result;
    }

    return key;
}
