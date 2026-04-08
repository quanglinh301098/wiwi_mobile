'use client';

import { useContext } from 'react';
import { I18nContext } from '@/components/providers/I18nProvider';
import type { I18nContextType } from '@/components/providers/I18nProvider';

export function useI18n(): I18nContextType {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}
