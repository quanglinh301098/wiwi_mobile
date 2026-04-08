'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ProjectCard from '@/components/ui/ProjectCard';

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

const projects = [
    {
        image: '',
        titleKey: 'projects.items.0.title',
        descriptionKey: 'projects.items.0.description',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    },
    {
        image: '',
        titleKey: 'projects.items.1.title',
        descriptionKey: 'projects.items.1.description',
        technologies: ['React Native', 'Firebase', 'GraphQL'],
    },
    {
        image: '',
        titleKey: 'projects.items.2.title',
        descriptionKey: 'projects.items.2.description',
        technologies: ['Python', 'TensorFlow', 'AWS', 'React'],
    },
    {
        image: '',
        titleKey: 'projects.items.3.title',
        descriptionKey: 'projects.items.3.description',
        technologies: ['Kubernetes', 'Go', 'gRPC', 'AWS'],
    },
];

export default function ProjectsSection() {
    const { t } = useI18n();
    const { ref, controls } = useScrollAnimation();
    const prefersReducedMotion = useReducedMotion();

    return (
        <section id="projects" className="py-20 px-4 relative">
            <div ref={ref} className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center gradient-text mb-14"
                    variants={prefersReducedMotion ? reducedVariants : cardVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {t('projects.title')}
                </motion.h2>

                {/* Project Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={prefersReducedMotion ? undefined : containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {projects.map((project) => (
                        <motion.div key={project.titleKey} variants={prefersReducedMotion ? reducedVariants : cardVariants}>
                            <ProjectCard
                                image={project.image}
                                titleKey={project.titleKey}
                                descriptionKey={project.descriptionKey}
                                technologies={project.technologies}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
