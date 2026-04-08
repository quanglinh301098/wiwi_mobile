export type Locale = 'vi' | 'en';

export interface LocaleMessages {
    nav: {
        about: string;
        services: string;
        projects: string;
        whyUs: string;
        testimonials: string;
        contact: string;
    };
    hero: {
        title: string;
        subtitle: string;
        ctaPrimary: string;
        ctaSecondary: string;
    };
    about: {
        title: string;
        description: string;
    };
    services: {
        title: string;
        items: Array<{
            title: string;
            description: string;
        }>;
    };
    projects: {
        title: string;
        items: Array<{
            title: string;
            description: string;
        }>;
    };
    whyUs: {
        title: string;
        points: Array<{
            title: string;
            description: string;
        }>;
        stats: Array<{
            value: number;
            suffix: string;
            label: string;
        }>;
    };
    testimonials: {
        title: string;
        items: Array<{
            name: string;
            position: string;
            company: string;
            content: string;
        }>;
    };
    contact: {
        title: string;
        fullName: string;
        email: string;
        phone: string;
        message: string;
        submit: string;
        success: string;
        errors: {
            fullNameRequired: string;
            emailRequired: string;
            emailInvalid: string;
            messageRequired: string;
        };
    };
    footer: {
        copyright: string;
        address: string;
    };
}

export interface ContactFormData {
    fullName: string;
    email: string;
    phone?: string;
    message: string;
}
