'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
};

const reducedVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } },
};

/* SVG Icons for the 4 strength points */
function TeamIcon() {
    return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function ProcessIcon() {
    return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    );
}

function SupportIcon() {
    return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    );
}

function TechIcon() {
    return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="9" y="9" width="6" height="6" />
            <line x1="9" y1="1" x2="9" y2="4" />
            <line x1="15" y1="1" x2="15" y2="4" />
            <line x1="9" y1="20" x2="9" y2="23" />
            <line x1="15" y1="20" x2="15" y2="23" />
            <line x1="20" y1="9" x2="23" y2="9" />
            <line x1="20" y1="14" x2="23" y2="14" />
            <line x1="1" y1="9" x2="4" y2="9" />
            <line x1="1" y1="14" x2="4" y2="14" />
        </svg>
    );
}

const pointIcons = [<TeamIcon />, <ProcessIcon />, <SupportIcon />, <TechIcon />];

export default function WhyChooseUsSection() {
    const { t } = useI18n();
    const { ref, controls } = useScrollAnimation();
    const prefersReducedMotion = useReducedMotion();

    // Read stats from locale
    const stats = [
        { value: 50, suffix: '+', labelKey: 'whyUs.stats.0.label' },
        { value: 30, suffix: '+', labelKey: 'whyUs.stats.1.label' },
        { value: 5, suffix: '+', labelKey: 'whyUs.stats.2.label' },
        { value: 98, suffix: '%', labelKey: 'whyUs.stats.3.label' },
    ];

    return (
        <section id="why-us" className="py-20 px-4 relative">
            <div ref={ref} className="max-w-6xl mx-auto">
                {/* Section Title */}
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center gradient-text mb-14"
                    variants={prefersReducedMotion ? reducedVariants : itemVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {t('whyUs.title')}
                </motion.h2>

                {/* Strength Points Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
                    variants={prefersReducedMotion ? undefined : containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div key={i} variants={prefersReducedMotion ? reducedVariants : itemVariants}>
                            <GlassCard className="p-6 h-full flex items-start gap-4 hover:border-neon-purple/30 transition-colors duration-300">
                                <div className="text-neon-cyan shrink-0 mt-1">
                                    {pointIcons[i]}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                                        {t(`whyUs.points.${i}.title`)}
                                    </h3>
                                    <p className="text-text-secondary text-base leading-relaxed">
                                        {t(`whyUs.points.${i}.description`)}
                                    </p>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Animated Stats */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    variants={prefersReducedMotion ? undefined : containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {stats.map((stat, i) => (
                        <motion.div key={i} variants={prefersReducedMotion ? reducedVariants : itemVariants}>
                            <AnimatedCounter
                                target={stat.value}
                                suffix={stat.suffix}
                                label={t(stat.labelKey)}
                                duration={2}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
