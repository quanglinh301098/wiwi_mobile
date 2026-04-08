'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, prefersReducedMotion ? 500 : 2000);
        return () => clearTimeout(timer);
    }, [prefersReducedMotion]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark-primary"
                >
                    <motion.div
                        animate={prefersReducedMotion ? undefined : {
                            scale: [1, 1.1, 1],
                            opacity: [1, 0.8, 1],
                        }}
                        transition={prefersReducedMotion ? undefined : {
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="text-5xl font-bold gradient-text pulse-glow rounded-2xl px-6 py-3"
                    >
                        WiWi
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
