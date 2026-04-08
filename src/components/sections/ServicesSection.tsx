'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ServiceCard from '@/components/ui/ServiceCard';

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
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

/* Simple SVG icons for each service */
function CodeIcon() {
    return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    );
}

function MobileIcon() {
    return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
    );
}

function BrainIcon() {
    return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
            <line x1="10" y1="22" x2="14" y2="22" />
            <line x1="9" y1="17" x2="15" y2="17" />
        </svg>
    );
}

function CloudIcon() {
    return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
    );
}

const services = [
    { icon: <CodeIcon />, titleKey: 'services.items.0.title', descriptionKey: 'services.items.0.description' },
    { icon: <MobileIcon />, titleKey: 'services.items.1.title', descriptionKey: 'services.items.1.description' },
    { icon: <BrainIcon />, titleKey: 'services.items.2.title', descriptionKey: 'services.items.2.description' },
    { icon: <CloudIcon />, titleKey: 'services.items.3.title', descriptionKey: 'services.items.3.description' },
];

export default function ServicesSection() {
    const { t } = useI18n();
    const { ref, controls } = useScrollAnimation();
    const prefersReducedMotion = useReducedMotion();

    return (
        <section id="services" className="py-20 px-4 relative">
            <div ref={ref} className="max-w-6xl mx-auto">
                {/* Section Title */}
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center gradient-text mb-14"
                    variants={prefersReducedMotion ? reducedVariants : cardVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {t('services.title')}
                </motion.h2>

                {/* Service Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={prefersReducedMotion ? undefined : containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {services.map((service) => (
                        <motion.div key={service.titleKey} variants={prefersReducedMotion ? reducedVariants : cardVariants}>
                            <ServiceCard
                                icon={service.icon}
                                titleKey={service.titleKey}
                                descriptionKey={service.descriptionKey}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
