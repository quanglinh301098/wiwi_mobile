import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// ── Mock framer-motion ──────────────────────────────────────────────
vi.mock('framer-motion', () => {
    const actual = React;
    return {
        motion: new Proxy(
            {},
            {
                get: (_target, prop: string) => {
                    // Return a forwardRef component for any HTML element (div, span, h1, etc.)
                    return actual.forwardRef(function MotionComponent(
                        { children, ...props }: Record<string, unknown>,
                        ref: React.Ref<HTMLElement>,
                    ) {
                        // Strip framer-motion-specific props
                        const htmlProps: Record<string, unknown> = {};
                        for (const [k, v] of Object.entries(props)) {
                            if (
                                ![
                                    'initial', 'animate', 'exit', 'variants', 'transition',
                                    'whileHover', 'whileInView', 'whileTap', 'whileFocus',
                                    'whileDrag', 'drag', 'dragConstraints', 'dragElastic',
                                    'onDragEnd', 'custom', 'layout', 'layoutId',
                                ].includes(k)
                            ) {
                                htmlProps[k] = v;
                            }
                        }
                        return actual.createElement(prop, { ...htmlProps, ref }, children as React.ReactNode);
                    });
                },
            },
        ),
        AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
        useReducedMotion: () => false,
        useInView: () => true,
        useAnimationControls: () => ({
            start: vi.fn(),
            set: vi.fn(),
            stop: vi.fn(),
        }),
    };
});

// ── Mock tsparticles ────────────────────────────────────────────────
vi.mock('@tsparticles/react', () => ({
    default: () => React.createElement('div', { 'data-testid': 'particles' }),
    initParticlesEngine: () => Promise.resolve(),
}));
vi.mock('@tsparticles/slim', () => ({
    loadSlim: () => Promise.resolve(),
}));

// ── Mock useI18n ────────────────────────────────────────────────────
const mockSetLocale = vi.fn();
const mockT = vi.fn((key: string) => key);
let mockLocale: 'vi' | 'en' = 'vi';

vi.mock('@/hooks/useI18n', () => ({
    useI18n: () => ({
        t: mockT,
        locale: mockLocale,
        setLocale: mockSetLocale,
    }),
}));

// ── Mock useScrollAnimation ─────────────────────────────────────────
vi.mock('@/hooks/useScrollAnimation', () => ({
    useScrollAnimation: () => ({
        ref: { current: null },
        isInView: true,
        controls: { start: vi.fn(), set: vi.fn(), stop: vi.fn() },
    }),
}));

// ── Mock useAnimatedCounter ─────────────────────────────────────────
vi.mock('@/hooks/useAnimatedCounter', () => ({
    useAnimatedCounter: (target: number) => ({
        count: target,
        ref: { current: null },
    }),
}));

// ── Mock react-hook-form + zod resolver ─────────────────────────────
vi.mock('@hookform/resolvers/zod', () => ({
    zodResolver: () => vi.fn(),
}));

// ── Imports ─────────────────────────────────────────────────────────
import NavigationHeader from '@/components/layout/NavigationHeader';
import HeroSection from '@/components/sections/HeroSection';
import ServiceCard from '@/components/ui/ServiceCard';
import ProjectCard from '@/components/ui/ProjectCard';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

beforeEach(() => {
    vi.clearAllMocks();
    mockLocale = 'vi';
    mockT.mockImplementation((key: string) => key);
});

// ── NavigationHeader ────────────────────────────────────────────────
describe('NavigationHeader', () => {
    it('renders without crashing', () => {
        render(<NavigationHeader />);
        expect(screen.getByText('WiWi')).toBeInTheDocument();
    });

    it('renders all nav links', () => {
        render(<NavigationHeader />);
        expect(mockT).toHaveBeenCalledWith('nav.about');
        expect(mockT).toHaveBeenCalledWith('nav.services');
        expect(mockT).toHaveBeenCalledWith('nav.projects');
        expect(mockT).toHaveBeenCalledWith('nav.whyUs');
        expect(mockT).toHaveBeenCalledWith('nav.testimonials');
        expect(mockT).toHaveBeenCalledWith('nav.contact');
    });

    it('renders language toggle button', () => {
        render(<NavigationHeader />);
        expect(screen.getByText('EN')).toBeInTheDocument();
    });

    it('renders hamburger menu button for mobile', () => {
        render(<NavigationHeader />);
        expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    });
});

// ── HeroSection ─────────────────────────────────────────────────────
describe('HeroSection', () => {
    it('renders without crashing', () => {
        render(<HeroSection />);
        expect(mockT).toHaveBeenCalledWith('hero.title');
        expect(mockT).toHaveBeenCalledWith('hero.subtitle');
    });

    it('renders at least 2 CTA buttons', () => {
        render(<HeroSection />);
        expect(mockT).toHaveBeenCalledWith('hero.ctaPrimary');
        expect(mockT).toHaveBeenCalledWith('hero.ctaSecondary');
        // Both CTA buttons should be rendered
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThanOrEqual(2);
    });
});

// ── ServiceCard ─────────────────────────────────────────────────────
describe('ServiceCard', () => {
    it('renders icon, title, and description', () => {
        const icon = <span data-testid="icon">🚀</span>;
        render(
            <ServiceCard
                icon={icon}
                titleKey="services.items.0.title"
                descriptionKey="services.items.0.description"
            />,
        );
        expect(screen.getByTestId('icon')).toBeInTheDocument();
        expect(mockT).toHaveBeenCalledWith('services.items.0.title');
        expect(mockT).toHaveBeenCalledWith('services.items.0.description');
    });
});

// ── ProjectCard ─────────────────────────────────────────────────────
describe('ProjectCard', () => {
    it('renders title, description, and technologies', () => {
        render(
            <ProjectCard
                image="/test.jpg"
                titleKey="projects.items.0.title"
                descriptionKey="projects.items.0.description"
                technologies={['React', 'Node.js', 'AWS']}
            />,
        );
        expect(mockT).toHaveBeenCalledWith('projects.items.0.title');
        expect(mockT).toHaveBeenCalledWith('projects.items.0.description');
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('Node.js')).toBeInTheDocument();
        expect(screen.getByText('AWS')).toBeInTheDocument();
    });
});

// ── TestimonialsSection ─────────────────────────────────────────────
describe('TestimonialsSection', () => {
    it('renders without crashing', () => {
        render(<TestimonialsSection />);
        expect(mockT).toHaveBeenCalledWith('testimonials.title');
    });

    it('renders navigation dots', () => {
        render(<TestimonialsSection />);
        const dots = screen.getAllByRole('tab');
        expect(dots.length).toBe(3);
    });

    it('renders prev/next arrow buttons', () => {
        render(<TestimonialsSection />);
        expect(screen.getByLabelText('Previous testimonial')).toBeInTheDocument();
        expect(screen.getByLabelText('Next testimonial')).toBeInTheDocument();
    });
});

// ── ContactSection ──────────────────────────────────────────────────
describe('ContactSection', () => {
    it('renders without crashing', () => {
        render(<ContactSection />);
        expect(mockT).toHaveBeenCalledWith('contact.title');
    });

    it('renders all form fields', () => {
        render(<ContactSection />);
        expect(screen.getByLabelText('contact.fullName')).toBeInTheDocument();
        expect(screen.getByLabelText('contact.email')).toBeInTheDocument();
        expect(screen.getByLabelText('contact.phone')).toBeInTheDocument();
        expect(screen.getByLabelText('contact.message')).toBeInTheDocument();
    });

    it('renders submit button', () => {
        render(<ContactSection />);
        expect(screen.getByRole('button', { name: 'contact.submit' })).toBeInTheDocument();
    });
});

// ── Footer ──────────────────────────────────────────────────────────
describe('Footer', () => {
    it('renders without crashing', () => {
        render(<Footer />);
        expect(screen.getByText('WiWi')).toBeInTheDocument();
    });

    it('renders contact info', () => {
        render(<Footer />);
        expect(screen.getByText('contact@wiwi.vn')).toBeInTheDocument();
        expect(mockT).toHaveBeenCalledWith('footer.address');
    });

    it('renders social links', () => {
        render(<Footer />);
        expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
        expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
        expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    });

    it('renders copyright', () => {
        render(<Footer />);
        expect(mockT).toHaveBeenCalledWith('footer.copyright');
    });
});
