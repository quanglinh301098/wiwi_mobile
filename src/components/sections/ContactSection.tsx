'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';

const fadeUp: Variants = {
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

export default function ContactSection() {
    const { t } = useI18n();
    const { ref, controls } = useScrollAnimation();
    const [submitted, setSubmitted] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: { fullName: '', email: '', phone: '', message: '' },
    });

    const onSubmit = (_data: ContactFormData) => {
        setSubmitted(true);
        reset();
    };

    const errorMessage = (field: keyof ContactFormData): string | undefined => {
        const err = errors[field];
        if (!err) return undefined;
        const msg = err.message;
        if (msg === 'required') {
            const map: Record<string, string> = {
                fullName: t('contact.errors.fullNameRequired'),
                email: t('contact.errors.emailRequired'),
                message: t('contact.errors.messageRequired'),
            };
            return map[field];
        }
        if (msg === 'invalid') return t('contact.errors.emailInvalid');
        return msg;
    };

    return (
        <section id="contact" className="py-20 px-4 relative">
            <div ref={ref} className="max-w-2xl mx-auto">
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center gradient-text mb-14"
                    variants={prefersReducedMotion ? reducedVariants : fadeUp}
                    initial="hidden"
                    animate={controls}
                >
                    {t('contact.title')}
                </motion.h2>

                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="glass-card p-8 text-center"
                        >
                            <div className="text-4xl mb-4">✓</div>
                            <p className="text-lg text-text-primary">
                                {t('contact.success')}
                            </p>
                            <button
                                type="button"
                                onClick={() => setSubmitted(false)}
                                className="mt-6 text-base text-text-secondary hover:text-neon-purple transition-colors min-h-[44px] inline-flex items-center justify-center"
                            >
                                ← {t('contact.submit')}
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit(onSubmit)}
                            variants={prefersReducedMotion ? reducedVariants : fadeUp}
                            initial="hidden"
                            animate={controls}
                            className="glass-card p-6 sm:p-8 space-y-5"
                            noValidate
                        >
                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullName" className="block text-base text-text-secondary mb-1.5">
                                    {t('contact.fullName')}
                                </label>
                                <input
                                    id="fullName"
                                    type="text"
                                    {...register('fullName')}
                                    className={`w-full rounded-lg bg-white/5 border px-4 py-3 text-white placeholder-text-muted outline-none transition-all input-glow focus-visible:ring-2 focus-visible:ring-neon-purple/50 ${errors.fullName ? 'border-red-500' : 'border-white/10'
                                        }`}
                                />
                                {errors.fullName && (
                                    <p className="mt-1 text-base text-red-400">{errorMessage('fullName')}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-base text-text-secondary mb-1.5">
                                    {t('contact.email')}
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    className={`w-full rounded-lg bg-white/5 border px-4 py-3 text-white placeholder-text-muted outline-none transition-all input-glow focus-visible:ring-2 focus-visible:ring-neon-purple/50 ${errors.email ? 'border-red-500' : 'border-white/10'
                                        }`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-base text-red-400">{errorMessage('email')}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-base text-text-secondary mb-1.5">
                                    {t('contact.phone')}
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    {...register('phone')}
                                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-text-muted outline-none transition-all input-glow focus-visible:ring-2 focus-visible:ring-neon-purple/50"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-base text-text-secondary mb-1.5">
                                    {t('contact.message')}
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    {...register('message')}
                                    className={`w-full rounded-lg bg-white/5 border px-4 py-3 text-white placeholder-text-muted outline-none transition-all resize-y input-glow focus-visible:ring-2 focus-visible:ring-neon-purple/50 ${errors.message ? 'border-red-500' : 'border-white/10'
                                        }`}
                                />
                                {errors.message && (
                                    <p className="mt-1 text-base text-red-400">{errorMessage('message')}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg font-semibold gradient-bg text-white hover:opacity-90 transition-opacity min-h-[44px] focus-visible:ring-2 focus-visible:ring-neon-purple focus-visible:ring-offset-2 focus-visible:ring-offset-dark-primary"
                            >
                                {t('contact.submit')}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
