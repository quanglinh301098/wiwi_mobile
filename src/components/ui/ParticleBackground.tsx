'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

function CSSFallback() {
    return (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="animated-gradient absolute inset-0 opacity-50" />
        </div>
    );
}

export default function ParticleBackground() {
    const [ready, setReady] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        })
            .then(() => setReady(true))
            .catch(() => setError(true));
    }, []);

    const options: ISourceOptions = useMemo(
        () => ({
            fullScreen: false,
            fpsLimit: 60,
            particles: {
                color: { value: ['#8b5cf6', '#3b82f6', '#06b6d4'] },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: 'none' as const,
                    outModes: { default: 'out' as const },
                },
                number: {
                    value: 40,
                    density: { enable: true },
                },
                opacity: {
                    value: { min: 0.1, max: 0.4 },
                    animation: { enable: true, speed: 0.5, sync: false },
                },
                size: {
                    value: { min: 1, max: 3 },
                },
                links: {
                    enable: true,
                    color: '#8b5cf6',
                    opacity: 0.1,
                    distance: 150,
                },
            },
            detectRetina: true,
        }),
        []
    );

    if (error) return <CSSFallback />;
    if (!ready) return <CSSFallback />;

    return (
        <Particles
            className="absolute inset-0"
            options={options}
        />
    );
}
