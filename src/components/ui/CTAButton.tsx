'use client';

interface CTAButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
    className?: string;
}

export default function CTAButton({
    children,
    variant = 'primary',
    onClick,
    className = '',
}: CTAButtonProps) {
    const baseStyles =
        'relative px-8 py-3 rounded-full font-semibold text-base tracking-wide transition-all duration-300 cursor-pointer min-w-[44px] min-h-[44px] inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-neon-purple focus-visible:outline-offset-2';

    const primaryStyles =
        'bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.5),0_0_50px_rgba(59,130,246,0.3)] hover:scale-105';

    const secondaryStyles =
        'bg-transparent border border-white/20 text-white hover:border-neon-purple hover:shadow-[0_0_20px_rgba(139,92,246,0.3),0_0_40px_rgba(59,130,246,0.15)] hover:scale-105';

    const variantStyles = variant === 'primary' ? primaryStyles : secondaryStyles;

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variantStyles} ${className}`}
        >
            {children}
        </button>
    );
}
