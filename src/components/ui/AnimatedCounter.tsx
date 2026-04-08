'use client';

import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

interface AnimatedCounterProps {
    target: number;
    duration?: number;
    suffix?: string;
    label: string;
}

export default function AnimatedCounter({ target, duration = 2, suffix = '', label }: AnimatedCounterProps) {
    const { count, ref } = useAnimatedCounter(target, duration);

    return (
        <div ref={ref} className="flex flex-col items-center text-center">
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text">
                {count}
                {suffix}
            </span>
            <span className="mt-2 text-sm sm:text-base text-text-secondary">
                {label}
            </span>
        </div>
    );
}
