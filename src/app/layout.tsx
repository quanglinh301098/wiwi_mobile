import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import I18nProvider from '@/components/providers/I18nProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WiWi - Giải pháp Công nghệ Đột phá',
  description:
    'WiWi cung cấp các giải pháp công nghệ tiên tiến: phát triển phần mềm tùy chỉnh, ứng dụng web & mobile, AI, và Cloud & DevOps.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="bg-dark-primary text-text-primary font-sans antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
