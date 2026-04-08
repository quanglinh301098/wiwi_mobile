'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

const NAV_ITEMS = [
    { id: 'about', labelKey: 'nav.about' },
    { id: 'services', labelKey: 'nav.services' },
    { id: 'projects', labelKey: 'nav.projects' },
    { id: 'why-us', labelKey: 'nav.whyUs' },
    { id: 'testimonials', labelKey: 'nav.testimonials' },
    { id: 'contact', labelKey: 'nav.contact' },
];

export default function NavigationHeader() {
    const { t, locale, setLocale } = useI18n();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    // Glassmorphism effect on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavClick = (sectionId: string) => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
        setMenuOpen(false);
    };

    const toggleLocale = () => {
        setLocale(locale === 'vi' ? 'en' : 'vi');
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-dark-primary/70 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
                : 'bg-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-2xl font-bold gradient-text cursor-pointer min-w-[44px] min-h-[44px] flex items-center focus-visible:outline-2 focus-visible:outline-neon-purple focus-visible:outline-offset-2"
                >
                    WiWi
                </button>

                {/* Desktop Nav Links */}
                <ul className="hidden md:flex items-center gap-1">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => handleNavClick(item.id)}
                                className="px-3 py-2 text-base md:text-sm text-text-secondary hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5 cursor-pointer min-h-[44px] inline-flex items-center focus-visible:outline-2 focus-visible:outline-neon-purple focus-visible:outline-offset-2"
                            >
                                {t(item.labelKey)}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Right side: Language toggle + Hamburger */}
                <div className="flex items-center gap-2">
                    {/* Language Toggle */}
                    <button
                        onClick={toggleLocale}
                        className="px-3 py-1.5 text-base md:text-sm font-medium rounded-full border border-white/20 text-text-secondary hover:text-white hover:border-neon-purple transition-all duration-200 cursor-pointer min-w-[44px] min-h-[44px] inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-neon-purple focus-visible:outline-offset-2"
                    >
                        {locale === 'vi' ? 'EN' : 'VI'}
                    </button>

                    {/* Hamburger Button - Mobile only */}
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="md:hidden flex flex-col items-center justify-center gap-1.5 min-w-[44px] min-h-[44px] cursor-pointer focus-visible:outline-2 focus-visible:outline-neon-purple focus-visible:outline-offset-2"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        <motion.span
                            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            className="block w-6 h-0.5 bg-white rounded-full"
                            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                        />
                        <motion.span
                            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="block w-6 h-0.5 bg-white rounded-full"
                            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                        />
                        <motion.span
                            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            className="block w-6 h-0.5 bg-white rounded-full"
                            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                        />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden bg-dark-primary/90 backdrop-blur-xl border-b border-white/10"
                    >
                        <ul className="flex flex-col px-4 py-4 gap-1">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleNavClick(item.id)}
                                        className="w-full text-left px-4 py-3 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200 cursor-pointer min-h-[44px] focus-visible:outline-2 focus-visible:outline-neon-purple focus-visible:outline-offset-2"
                                    >
                                        {t(item.labelKey)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
