'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export default function InteractiveCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    const rafRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Detect touch device
        const isTouchDevice =
            'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
            setIsTouch(true);
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            if (!visible) setVisible(true);
        };

        const handleMouseLeave = () => setVisible(false);
        const handleMouseEnter = () => setVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        const animate = () => {
            setPosition((prev) => ({
                x: prev.x + (mouseRef.current.x - prev.x) * 0.15,
                y: prev.y + (mouseRef.current.y - prev.y) * 0.15,
            }));
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            cancelAnimationFrame(rafRef.current);
        };
    }, [visible]);

    if (isTouch) return null;

    return (
        <div
            className="pointer-events-none fixed inset-0 z-[9998]"
            aria-hidden="true"
        >
            <div
                className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200"
                style={{
                    left: position.x,
                    top: position.y,
                    background:
                        'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)',
                    boxShadow:
                        '0 0 20px rgba(139,92,246,0.3), 0 0 40px rgba(59,130,246,0.15)',
                    opacity: visible ? 1 : 0,
                }}
            />
        </div>
    );
}
