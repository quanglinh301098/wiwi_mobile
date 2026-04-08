'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import GlassCard from '@/components/ui/GlassCard';

const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
};

const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
};

const reducedVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } },
};

export default function AboutSection() {
    const { t } = useI18n();
    const { ref, controls } = useScrollAnimation();
    const prefersReducedMotion = useReducedMotion();

    return (
        <section id="about" className="py-20 px-4 relative overflow-hidden">
            <div
                ref={ref}
                className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
                {/* Text content — fades in from left */}
                <motion.div
                    variants={prefersReducedMotion ? reducedVariants : fadeInLeft}
                    initial="hidden"
                    animate={controls}
                >
                    <GlassCard className="p-8 md:p-10">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-6">
                            {t('about.title')}
                        </h2>
                        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                            {t('about.description')}
                        </p>
                    </GlassCard>
                </motion.div>

                {/* Decorative illustration — fades in from right */}
                <motion.div
                    variants={prefersReducedMotion ? reducedVariants : fadeInRight}
                    initial="hidden"
                    animate={controls}
                    className="flex items-center justify-center"
                >
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                        {/* Outer glowing ring */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-purple/20 via-neon-blue/20 to-neon-cyan/20 blur-2xl animate-pulse" />

                        {/* Main orb */}
                        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-neon-purple via-neon-blue to-neon-cyan opacity-30 blur-xl" />

                        {/* Inner core */}
                        <div className="absolute inset-10 rounded-full bg-gradient-to-br from-neon-purple via-neon-blue to-neon-cyan opacity-60 blur-md" />

                        {/* Center bright spot */}
                        <div className="absolute inset-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />

                        {/* Orbiting ring SVG */}
                        <svg
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 200 200"
                            aria-hidden="true"
                        >
                            <ellipse
                                cx="100"
                                cy="100"
                                rx="90"
                                ry="40"
                                fill="none"
                                stroke="url(#orbitGradient)"
                                strokeWidth="0.5"
                                opacity="0.5"
                                transform="rotate(-30 100 100)"
                            />
                            <ellipse
                                cx="100"
                                cy="100"
                                rx="70"
                                ry="30"
                                fill="none"
                                stroke="url(#orbitGradient)"
                                strokeWidth="0.5"
                                opacity="0.3"
                                transform="rotate(20 100 100)"
                            />
                            <defs>
                                <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="50%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
