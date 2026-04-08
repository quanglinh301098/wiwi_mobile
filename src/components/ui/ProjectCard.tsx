'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

interface ProjectCardProps {
    image: string;
    titleKey: string;
    descriptionKey: string;
    technologies: string[];
}

const gradients = [
    'from-neon-purple/40 via-neon-blue/30 to-neon-cyan/40',
    'from-neon-blue/40 via-neon-cyan/30 to-neon-purple/40',
    'from-neon-cyan/40 via-neon-purple/30 to-neon-blue/40',
    'from-neon-purple/40 via-neon-cyan/30 to-neon-blue/40',
];

export default function ProjectCard({ image, titleKey, descriptionKey, technologies }: ProjectCardProps) {
    const { t } = useI18n();
    const prefersReducedMotion = useReducedMotion();
    const gradientIndex = Math.abs(titleKey.charCodeAt(titleKey.length - 1)) % gradients.length;

    return (
        <motion.div
            className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-neon-purple/50 hover:shadow-[0_0_25px_rgba(139,92,246,0.3),0_0_50px_rgba(59,130,246,0.15)]"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
            transition={prefersReducedMotion ? undefined : { type: 'spring', stiffness: 300, damping: 20 }}
        >
            {/* Gradient Placeholder Image */}
            <div className={`relative aspect-video bg-gradient-to-br ${gradients[gradientIndex]} overflow-hidden`}>
                <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 200 120" fill="none">
                        <circle cx="40" cy="30" r="20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                        <circle cx="160" cy="80" r="30" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                        <line x1="20" y1="100" x2="180" y2="20" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                        <rect x="70" y="40" width="60" height="40" rx="4" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                    </svg>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-dark-primary/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-text-secondary text-base px-4 text-center leading-relaxed">
                        {t(descriptionKey)}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:gradient-text transition-all duration-300">
                    {t(titleKey)}
                </h3>

                <p className="text-text-secondary text-base leading-relaxed mb-4 line-clamp-2">
                    {t(descriptionKey)}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                        <span
                            key={tech}
                            className="text-sm md:text-xs px-2.5 py-1 rounded-full bg-white/10 text-neon-cyan border border-white/10 group-hover:border-neon-cyan/30 transition-colors duration-300"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
