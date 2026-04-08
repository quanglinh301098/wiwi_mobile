'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

interface ServiceCardProps {
    icon: React.ReactNode;
    titleKey: string;
    descriptionKey: string;
}

export default function ServiceCard({ icon, titleKey, descriptionKey }: ServiceCardProps) {
    const { t } = useI18n();
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:scale-[1.03] hover:border-neon-purple/50 hover:shadow-[0_0_25px_rgba(139,92,246,0.3),0_0_50px_rgba(59,130,246,0.15)] hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
            transition={prefersReducedMotion ? undefined : { type: 'spring', stiffness: 300, damping: 20 }}
        >
            {/* Icon */}
            <div className="mb-5 text-4xl text-neon-purple group-hover:text-neon-cyan transition-colors duration-300">
                {icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:gradient-text transition-all duration-300">
                {t(titleKey)}
            </h3>

            {/* Description */}
            <p className="text-text-secondary text-base leading-relaxed">
                {t(descriptionKey)}
            </p>
        </motion.div>
    );
}
