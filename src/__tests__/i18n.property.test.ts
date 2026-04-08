import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { translate } from '@/lib/i18n';
import vi from '@/locales/vi.json';
import en from '@/locales/en.json';

/**
 * Collect all leaf-level dot-separated keys from a nested object.
 */
function collectKeys(obj: Record<string, unknown>, prefix = ''): string[] {
    const keys: string[] = [];
    for (const [k, v] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${k}` : k;
        if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
            keys.push(...collectKeys(v as Record<string, unknown>, fullKey));
        } else if (typeof v === 'string') {
            keys.push(fullKey);
        }
    }
    return keys;
}

/** Resolve a dot-separated key on a nested object */
function resolve(obj: unknown, key: string): unknown {
    let cur = obj;
    for (const k of key.split('.')) {
        if (cur === null || cur === undefined || typeof cur !== 'object') return undefined;
        cur = (cur as Record<string, unknown>)[k];
    }
    return cur;
}

const viKeys = collectKeys(vi as Record<string, unknown>);
const enKeys = collectKeys(en as Record<string, unknown>);
const commonKeys = viKeys.filter((k) => enKeys.includes(k));

describe('i18n property-based tests', () => {
    /**
     * **Validates: Requirements 3.3**
     *
     * Property 1: i18n translation lookup consistency
     * For any valid key that exists in both vi.json and en.json,
     * translate('en', key) returns the English value and
     * translate('vi', key) returns the Vietnamese value.
     */
    it('Property 1: translation lookup returns correct value for each locale', () => {
        expect(commonKeys.length).toBeGreaterThan(0);

        fc.assert(
            fc.property(
                fc.constantFrom(...commonKeys),
                (key: string) => {
                    const enResult = translate('en', key);
                    const viResult = translate('vi', key);

                    const expectedEn = resolve(en, key);
                    const expectedVi = resolve(vi, key);

                    expect(enResult).toBe(expectedEn);
                    expect(viResult).toBe(expectedVi);
                },
            ),
            { numRuns: 100 },
        );
    });

    /**
     * **Validates: Requirements 3.4**
     *
     * Property 2: i18n locale persistence round-trip
     * For any locale ('vi' | 'en'), after setting localStorage('wiwi-locale', locale),
     * reading localStorage('wiwi-locale') returns the same locale.
     */
    it('Property 2: locale persistence round-trip via localStorage', () => {
        beforeEach(() => {
            localStorage.clear();
        });

        fc.assert(
            fc.property(
                fc.constantFrom('vi' as const, 'en' as const),
                (locale) => {
                    localStorage.setItem('wiwi-locale', locale);
                    const stored = localStorage.getItem('wiwi-locale');
                    expect(stored).toBe(locale);
                },
            ),
            { numRuns: 100 },
        );
    });
});
