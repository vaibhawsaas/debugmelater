import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import BentoFeatures from '@/components/home/BentoFeatures';
import StatsSection from '@/components/home/StatsSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import CategoriesSection from '@/components/home/CategoriesSection';
import VideoSection from '@/components/home/VideoSection';
import TechMarquee from '@/components/home/TechMarquee';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export const metadata: Metadata = {
  title: 'DebugMeLater — Premium 3D Websites & Source Code Marketplace',
  description:
    'Buy premium React, Next.js, and Three.js source code templates. Handcrafted for developers who don\'t settle. Starting at ₹99.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BentoFeatures />
      <StatsSection />
      <FeaturedProjects />
      <CategoriesSection />
      <VideoSection />
      <TechMarquee />
      <TestimonialsSection />
    </>
  );
}
