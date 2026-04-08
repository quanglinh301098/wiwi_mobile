'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import ParticleBackground from '@/components/ui/ParticleBackground';
import CTAButton from '@/components/ui/CTAButton';

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const childVariants: Variants = {
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

function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

export default function HeroSection() {
    const { t } = useI18n();
    const prefersReducedMotion = useReducedMotion();

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Particle Background */}
            <ParticleBackground />

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-4 max-w-4xl mx-auto"
                variants={prefersReducedMotion ? undefined : containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight gradient-text mb-6"
                    variants={prefersReducedMotion ? reducedVariants : childVariants}
                >
                    {t('hero.title')}
                </motion.h1>

                <motion.p
                    className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-10 max-w-2xl mx-auto"
                    variants={prefersReducedMotion ? reducedVariants : childVariants}
                >
                    {t('hero.subtitle')}
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    variants={prefersReducedMotion ? reducedVariants : childVariants}
                >
                    <CTAButton
                        variant="primary"
                        onClick={() => scrollToSection('contact')}
                    >
                        {t('hero.ctaPrimary')}
                    </CTAButton>
                    <CTAButton
                        variant="secondary"
                        onClick={() => scrollToSection('about')}
                    >
                        {t('hero.ctaSecondary')}
                    </CTAButton>
                </motion.div>
            </motion.div>
        </section>
    );
}
