'use client';

interface TestimonialCardProps {
    name: string;
    position: string;
    company: string;
    content: string;
    avatar: string;
}

/** Extract initials from a name (first letter of first two words) */
function getInitials(name: string): string {
    return name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();
}

export default function TestimonialCard({
    name,
    position,
    company,
    content,
    avatar,
}: TestimonialCardProps) {
    const initials = avatar || getInitials(name);

    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 select-none">
            {/* Quote icon */}
            <svg
                className="w-8 h-8 text-neon-purple/40 mb-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M11.3 2.6C6.1 5.1 3 9.7 3 15v5.4c0 .9.7 1.6 1.6 1.6h4.8c.9 0 1.6-.7 1.6-1.6V16c0-.9-.7-1.6-1.6-1.6H6.2c0-3.2 2.2-6.2 5.1-7.5l-.9-1.3-.1-.1v-.1l1-2.8zm10 0C16.1 5.1 13 9.7 13 15v5.4c0 .9.7 1.6 1.6 1.6h4.8c.9 0 1.6-.7 1.6-1.6V16c0-.9-.7-1.6-1.6-1.6h-3.2c0-3.2 2.2-6.2 5.1-7.5l-1-4.3z" />
            </svg>

            {/* Testimonial content */}
            <p className="text-text-secondary text-base leading-relaxed mb-6 italic">
                &ldquo;{content}&rdquo;
            </p>

            {/* Author info */}
            <div className="flex items-center gap-4">
                {/* Avatar with gradient background showing initials */}
                <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-white font-bold text-sm shrink-0"
                    aria-hidden="true"
                >
                    {initials}
                </div>
                <div>
                    <p className="text-text-primary font-semibold text-base">
                        {name}
                    </p>
                    <p className="text-text-muted text-sm md:text-xs">
                        {position}, {company}
                    </p>
                </div>
            </div>
        </div>
    );
}
