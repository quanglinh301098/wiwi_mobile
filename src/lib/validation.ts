import { z } from 'zod';

export const contactFormSchema = z.object({
    fullName: z.string().trim().min(1, 'required'),
    email: z.string().trim().min(1, 'required').email('invalid'),
    phone: z.string().optional(),
    message: z.string().trim().min(1, 'required'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
