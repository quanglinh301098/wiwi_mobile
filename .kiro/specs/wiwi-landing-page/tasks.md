# Kế hoạch Triển khai - WiWi Landing Page

## Task 1: Khởi tạo dự án và cấu hình cơ bản

- [x] 1.1 Khởi tạo dự án Next.js 14+ với App Router, React 18, TypeScript, TailwindCSS
- [x] 1.2 Cài đặt dependencies: framer-motion, zod, react-hook-form, @tsparticles/react
- [x] 1.3 Cấu hình TailwindCSS với dark theme colors (#0a0a0f, #0d1117), neon gradient colors (#8b5cf6, #3b82f6, #06b6d4), font Inter
- [x] 1.4 Tạo file `src/app/globals.css` với base styles, glassmorphism utilities, glow effects, smooth scrolling
- [x] 1.5 Tạo cấu trúc thư mục: components/layout, components/sections, components/ui, components/providers, hooks, lib, locales, types
- [x] 1.6 Tạo file `src/types/index.ts` với các type definitions (Locale, LocaleMessages, ContactFormData, etc.)

## Task 2: Hệ thống đa ngôn ngữ (i18n)

- [x] 2.1 Tạo file `src/locales/vi.json` với toàn bộ nội dung Tiếng Việt cho tất cả sections
- [x] 2.2 Tạo file `src/locales/en.json` với toàn bộ nội dung Tiếng Anh cho tất cả sections
- [x] 2.3 Tạo `src/lib/i18n.ts` với logic core: load locale messages, hàm translate `t(key)` hỗ trợ nested keys
- [x] 2.4 Tạo `src/components/providers/I18nProvider.tsx` với React Context, localStorage persistence (key: wiwi-locale), default locale 'vi'
- [x] 2.5 Tạo `src/hooks/useI18n.ts` hook để consume I18nContext

## Task 3: UI Components cơ bản

- [x] 3.1 Tạo `src/components/ui/GlassCard.tsx` - component wrapper với glassmorphism effect (bg-white/5, backdrop-blur-md, border-white/10)
- [x] 3.2 Tạo `src/components/ui/CTAButton.tsx` - button với glow effect, gradient hover, variants (primary/secondary)
- [x] 3.3 Tạo `src/components/ui/LoadingScreen.tsx` - màn hình loading với logo WiWi, pulse/glow animation, fade-out
- [x] 3.4 Tạo `src/components/ui/InteractiveCursor.tsx` - custom cursor với glow effect, chỉ hiển thị trên desktop, requestAnimationFrame tracking
- [x] 3.5 Tạo `src/components/ui/ParticleBackground.tsx` - particle effect sử dụng tsparticles hoặc CSS animated gradient fallback
- [x] 3.6 Tạo `src/hooks/useScrollAnimation.ts` - hook sử dụng Framer Motion useInView cho scroll-triggered animations

## Task 4: Navigation Header

- [x] 4.1 Tạo `src/components/layout/NavigationHeader.tsx` - sticky header với logo WiWi, nav links, nút chuyển ngôn ngữ EN/VI
- [x] 4.2 Implement smooth scroll khi click nav links (scrollIntoView behavior smooth)
- [x] 4.3 Implement glassmorphism effect khi scroll (backdrop-blur khi scrollY > 0)
- [x] 4.4 Implement hamburger menu cho mobile (< 768px) với Framer Motion animation open/close

## Task 5: Hero Section

- [x] 5.1 Tạo `src/components/sections/HeroSection.tsx` với tiêu đề gradient text, subheadline, 2 CTA buttons
- [x] 5.2 Tích hợp ParticleBackground làm nền động
- [x] 5.3 Implement staggered entrance animation (fade-in + slide-up) cho tiêu đề, mô tả, buttons qua Framer Motion variants

## Task 6: About Section

- [x] 6.1 Tạo `src/components/sections/AboutSection.tsx` với tiêu đề, mô tả WiWi, hình ảnh/đồ họa minh họa
- [x] 6.2 Implement scroll animation (fade-in từ trái/phải) và glassmorphism container

## Task 7: Services Section

- [x] 7.1 Tạo `src/components/ui/ServiceCard.tsx` với icon, title, description, glassmorphism, hover effects (glow border, scale 1.03, gradient shift)
- [x] 7.2 Tạo `src/components/sections/ServicesSection.tsx` với 4 ServiceCards (Custom Software, Web & Mobile, AI Solutions, Cloud & DevOps)
- [x] 7.3 Implement stagger scroll animation cho các ServiceCards

## Task 8: Projects Section

- [x] 8.1 Tạo `src/components/ui/ProjectCard.tsx` với image (next/image), title, description, technologies list, hover overlay + scale effect
- [x] 8.2 Tạo `src/components/sections/ProjectsSection.tsx` với grid layout (1 cột mobile, 2 cột tablet, 3-4 cột desktop), tối thiểu 4 ProjectCards
- [x] 8.3 Implement scroll animation cho ProjectCards

## Task 9: Why Choose Us Section

- [x] 9.1 Tạo `src/components/ui/AnimatedCounter.tsx` với logic đếm từ 0 đến target qua requestAnimationFrame, trigger bằng useInView
- [x] 9.2 Tạo `src/hooks/useAnimatedCounter.ts` - hook chứa logic đếm animation (duration 1.5-2.5s)
- [x] 9.3 Tạo `src/components/sections/WhyChooseUsSection.tsx` với 4 điểm mạnh (icon + mô tả) và AnimatedCounters (số dự án, khách hàng, năm kinh nghiệm, tỷ lệ hài lòng)

## Task 10: Testimonials Section

- [x] 10.1 Tạo `src/components/ui/TestimonialCard.tsx` với avatar, tên, chức vụ, công ty, nội dung đánh giá, glassmorphism style
- [x] 10.2 Tạo `src/components/sections/TestimonialsSection.tsx` với carousel: tối thiểu 3 testimonials, auto-play 5s, pause on hover/touch
- [x] 10.3 Implement swipe support (Framer Motion drag) trên mobile và navigation dots/arrows trên desktop

## Task 11: Contact Section

- [x] 11.1 Tạo `src/lib/validation.ts` với Zod schema cho ContactForm (fullName required, email required + format, phone optional, message required)
- [x] 11.2 Tạo `src/components/sections/ContactSection.tsx` với form fields (Họ tên, Email, SĐT, Tin nhắn), React Hook Form + Zod validation
- [x] 11.3 Implement glow border effect khi focus input, inline error messages, success animation sau submit

## Task 12: Footer

- [x] 12.1 Tạo `src/components/layout/Footer.tsx` với logo WiWi, thông tin liên hệ, liên kết mạng xã hội (hover glow + scale), bản quyền, dark theme tối giản

## Task 13: Layout và Page Assembly

- [x] 13.1 Tạo `src/app/layout.tsx` - RootLayout với I18nProvider, font Inter, metadata, dark theme body
- [x] 13.2 Tạo `src/app/page.tsx` - compose tất cả sections theo thứ tự: LoadingScreen, InteractiveCursor, NavigationHeader, Hero, About, Services, Projects, WhyChooseUs, Testimonials, Contact, Footer
- [x] 13.3 Implement lazy loading cho các section components và hình ảnh nằm ngoài viewport ban đầu

## Task 14: Responsive Design và Accessibility

- [x] 14.1 Kiểm tra và điều chỉnh responsive layout cho 3 breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
- [x] 14.2 Đảm bảo font size tối thiểu 16px trên mobile, touch targets tối thiểu 44x44px
- [x] 14.3 Implement prefers-reduced-motion: giảm/tắt animation khi user preference bật
- [x] 14.4 Kiểm tra keyboard navigation cho form, carousel, và navigation menu

## Task 15: Testing

- [x] 15.1 Cấu hình Vitest, React Testing Library, fast-check cho project
- [x] 15.2 Viết property-based tests cho i18n (Property 1: translation lookup, Property 2: locale persistence round-trip)
- [x] 15.3 Viết property-based tests cho Contact form validation (Property 3: required fields, Property 4: email format)
- [x] 15.4 Viết property-based test cho AnimatedCounter (Property 5: converges to target)
- [x] 15.5 Viết unit tests cho các components chính: NavigationHeader, HeroSection, ServiceCard, ProjectCard, TestimonialCarousel, ContactForm, Footer
