'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import TestimonialCard from '@/components/ui/TestimonialCard';

const AUTOPLAY_INTERVAL = 5000;
const TOTAL_ITEMS = 3;

const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
};

const reducedTitleVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } },
};

const slideVariants: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -300 : 300,
        opacity: 0,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
    }),
};

const reducedSlideVariants: Variants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0 } },
    exit: { opacity: 0, transition: { duration: 0 } },
};

function ArrowLeftIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
        </svg>
    );
}

function ArrowRightIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 6 15 12 9 18" />
        </svg>
    );
}

export default function TestimonialsSection() {
    const { t } = useI18n();
    const { ref, controls } = useScrollAnimation();

    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [paused, setPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const goTo = useCallback(
        (index: number) => {
            setDirection(index > current ? 1 : -1);
            setCurrent(index);
        },
        [current],
    );

    const next = useCallback(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % TOTAL_ITEMS);
    }, []);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + TOTAL_ITEMS) % TOTAL_ITEMS);
    }, []);

    // Auto-play with pause on hover/touch
    useEffect(() => {
        if (paused) return;
        const id = setInterval(next, AUTOPLAY_INTERVAL);
        return () => clearInterval(id);
    }, [paused, next]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                next();
            }
        },
        [prev, next],
    );

    // Swipe threshold
    const SWIPE_THRESHOLD = 50;

    const handleDragEnd = useCallback(
        (_: unknown, info: { offset: { x: number } }) => {
            if (info.offset.x < -SWIPE_THRESHOLD) {
                next();
            } else if (info.offset.x > SWIPE_THRESHOLD) {
                prev();
            }
        },
        [next, prev],
    );

    // Build testimonial data from i18n
    const testimonials = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
        name: t(`testimonials.items.${i}.name`),
        position: t(`testimonials.items.${i}.position`),
        company: t(`testimonials.items.${i}.company`),
        content: t(`testimonials.items.${i}.content`),
    }));

    const item = testimonials[current];

    return (
        <section id="testimonials" className="py-20 px-4 relative">
            <div ref={ref} className="max-w-3xl mx-auto">
                {/* Section Title */}
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center gradient-text mb-14"
                    variants={prefersReducedMotion ? reducedTitleVariants : titleVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {t('testimonials.title')}
                </motion.h2>

                {/* Carousel */}
                <div
                    ref={containerRef}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label={t('testimonials.title')}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onTouchStart={() => setPaused(true)}
                    onTouchEnd={() => setPaused(false)}
                    className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple/50 rounded-2xl"
                >
                    {/* Slide area */}
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={prefersReducedMotion ? reducedSlideVariants : slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                drag={prefersReducedMotion ? false : "x"}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.3}
                                onDragEnd={handleDragEnd}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`${current + 1} / ${TOTAL_ITEMS}`}
                                className="cursor-grab active:cursor-grabbing"
                            >
                                <TestimonialCard
                                    name={item.name}
                                    position={item.position}
                                    company={item.company}
                                    content={item.content}
                                    avatar=""
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Desktop arrow buttons */}
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous testimonial"
                        className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-text-primary hover:bg-white/10 hover:border-neon-purple/40 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-neon-purple focus-visible:outline-offset-2"
                    >
                        <ArrowLeftIcon />
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        aria-label="Next testimonial"
                        className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-text-primary hover:bg-white/10 hover:border-neon-purple/40 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-neon-purple focus-visible:outline-offset-2"
                    >
                        <ArrowRightIcon />
                    </button>
                </div>

                {/* Navigation dots */}
                <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial slides">
                    {Array.from({ length: TOTAL_ITEMS }, (_, i) => (
                        <button
                            key={i}
                            type="button"
                            role="tab"
                            aria-selected={i === current}
                            aria-label={`Go to testimonial ${i + 1}`}
                            onClick={() => goTo(i)}
                            className={`min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-neon-purple focus-visible:outline-offset-2 ${i === current
                                ? ''
                                : ''
                                }`}
                        >
                            <span className={`block rounded-full transition-all duration-300 ${i === current
                                ? 'bg-neon-purple w-6 h-2.5'
                                : 'bg-white/20 hover:bg-white/40 w-2.5 h-2.5'
                                }`} />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
