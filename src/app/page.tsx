'use client';

import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/ui/LoadingScreen';
import InteractiveCursor from '@/components/ui/InteractiveCursor';
import NavigationHeader from '@/components/layout/NavigationHeader';
import HeroSection from '@/components/sections/HeroSection';

// Lazy load sections below the fold
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'));
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection'));
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'));
const WhyChooseUsSection = dynamic(() => import('@/components/sections/WhyChooseUsSection'));
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'));
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'));
const Footer = dynamic(() => import('@/components/layout/Footer'));

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <InteractiveCursor />
      <NavigationHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
