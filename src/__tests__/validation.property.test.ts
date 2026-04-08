import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { contactFormSchema } from '@/lib/validation';

describe('Contact form validation property-based tests', () => {
    /**
     * **Validates: Requirements 10.3**
     *
     * Property 3: Contact form validation rejects missing required fields
     * For any ContactFormData where fullName, email, or message is empty/whitespace,
     * contactFormSchema.safeParse should return success: false
     * and the error should reference the empty field.
     */
    it('Property 3: rejects missing required fields', () => {
        const validName = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);
        const validEmail = fc.emailAddress();
        const validMessage = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);
        const whitespace = fc.constantFrom('', ' ', '  ', '\t', '\n', '  \t\n  ');

        // Case: empty fullName
        fc.assert(
            fc.property(whitespace, validEmail, validMessage, (name, email, message) => {
                const result = contactFormSchema.safeParse({ fullName: name, email, message });
                expect(result.success).toBe(false);
                if (!result.success) {
                    const paths = result.error.issues.map((i) => i.path.join('.'));
                    expect(paths).toContain('fullName');
                }
            }),
            { numRuns: 50 },
        );

        // Case: empty email
        fc.assert(
            fc.property(validName, whitespace, validMessage, (name, email, message) => {
                const result = contactFormSchema.safeParse({ fullName: name, email, message });
                expect(result.success).toBe(false);
                if (!result.success) {
                    const paths = result.error.issues.map((i) => i.path.join('.'));
                    expect(paths).toContain('email');
                }
            }),
            { numRuns: 50 },
        );

        // Case: empty message
        fc.assert(
            fc.property(validName, validEmail, whitespace, (name, email, message) => {
                const result = contactFormSchema.safeParse({ fullName: name, email, message });
                expect(result.success).toBe(false);
                if (!result.success) {
                    const paths = result.error.issues.map((i) => i.path.join('.'));
                    expect(paths).toContain('message');
                }
            }),
            { numRuns: 50 },
        );
    });

    /**
     * **Validates: Requirements 10.4**
     *
     * Property 4: Contact form email format validation
     * For any string without @ or without valid domain after @,
     * setting it as email should fail validation.
     * For any valid email format (user@domain.tld), validation should pass.
     */
    it('Property 4: rejects invalid email formats', () => {
        // Strings without @ should fail
        const noAt = fc.string({ minLength: 1 }).filter((s) => !s.includes('@') && s.trim().length > 0);
        fc.assert(
            fc.property(noAt, (email) => {
                const result = contactFormSchema.safeParse({
                    fullName: 'Test',
                    email,
                    message: 'Hello',
                });
                expect(result.success).toBe(false);
            }),
            { numRuns: 50 },
        );
    });

    it('Property 4: accepts valid email formats', () => {
        // Generate emails matching Zod v4's stricter email regex
        const alphaNum = fc.array(
            fc.integer({ min: 0, max: 35 }).map((v) =>
                v < 26 ? String.fromCharCode(97 + v) : String.fromCharCode(48 + v - 26),
            ),
            { minLength: 1, maxLength: 10 },
        ).map((arr) => arr.join(''));

        const alpha = fc.array(
            fc.integer({ min: 0, max: 25 }).map((v) => String.fromCharCode(97 + v)),
            { minLength: 2, maxLength: 4 },
        ).map((arr) => arr.join(''));

        const validEmail = fc.tuple(alphaNum, alphaNum, alpha).map(([l, d, t]) => `${l}@${d}.${t}`);

        fc.assert(
            fc.property(validEmail, (email) => {
                const result = contactFormSchema.safeParse({
                    fullName: 'Test',
                    email,
                    message: 'Hello',
                });
                expect(result.success).toBe(true);
            }),
            { numRuns: 100 },
        );
    });
});
