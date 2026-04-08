'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'framer-motion';

function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

export function useAnimatedCounter(target: number, duration: number = 2) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const hasAnimated = useRef(false);

    const animate = useCallback(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const durationMs = duration * 1000;
        let startTime: number | null = null;

        function step(timestamp: number) {
            if (startTime === null) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            const easedProgress = easeOutCubic(progress);
            const currentValue = Math.round(easedProgress * target);

            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                // Ensure we converge exactly to target
                setCount(target);
            }
        }

        requestAnimationFrame(step);
    }, [target, duration]);

    useEffect(() => {
        if (isInView && !hasAnimated.current) {
            animate();
        }
    }, [isInView, animate]);

    return { count, ref };
}
