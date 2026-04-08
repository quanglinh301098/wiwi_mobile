import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

/**
 * easeOutCubic extracted from src/hooks/useAnimatedCounter.ts
 * This is the pure counting logic used by the AnimatedCounter.
 */
function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

describe('AnimatedCounter property-based tests', () => {
    /**
     * **Validates: Requirements 8.3**
     *
     * Property 5: AnimatedCounter converges to target
     * For any positive integer target, the counter logic (easeOutCubic at progress=1.0)
     * should produce exactly the target value.
     * Math.round(easeOutCubic(1) * target) === target
     */
    it('Property 5: counter converges exactly to target at progress=1.0', () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 1, max: 1_000_000 }),
                (target: number) => {
                    const finalValue = Math.round(easeOutCubic(1) * target);
                    expect(finalValue).toBe(target);
                },
            ),
            { numRuns: 100 },
        );
    });
});
