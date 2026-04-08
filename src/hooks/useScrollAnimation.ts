'use client';

import { useRef, useEffect } from 'react';
import { useInView, useAnimationControls } from 'framer-motion';

interface UseScrollAnimationOptions {
    once?: boolean;
    amount?: number | 'some' | 'all';
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
    const { once = true, amount = 'some' } = options;
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once,
        margin: '-100px' as `${number}px`,
        amount,
    });
    const controls = useAnimationControls();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    return { ref, isInView, controls };
}
