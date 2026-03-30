'use client';

/*
 * Opdoc — Home / Landing Page
 * Style: Neo-Brutalist SaaS × Obsidian Dark Mode
 * Sections: Navbar → Hero → Features → HowItWorks → Pricing → Footer
 */

import { useState } from 'react';
import Navbar from '@/components/opdoc/Navbar';
import HeroSection from '@/components/opdoc/HeroSection';
import FeaturesSection from '@/components/opdoc/FeaturesSection';
import HowItWorksSection from '@/components/opdoc/HowItWorksSection';
import PricingSection from '@/components/opdoc/PricingSection';
import TechStackSection from '@/components/opdoc/TechStackSection';
import CTASection from '@/components/opdoc/CTASection';
import Footer from '@/components/opdoc/Footer';
import { RequestInfo } from 'rwsdk/worker';

export default function Home({ ctx }: RequestInfo) {
  const [lang, setLang] = useState<'ko' | 'en'>('ko');

  const toggleLang = () => setLang((l) => (l === 'ko' ? 'en' : 'ko'));

  const theme = ctx?.theme || 'system';

  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      <Navbar lang={lang} onLangToggle={toggleLang} theme={theme} />
      <HeroSection lang={lang} />
      <FeaturesSection lang={lang} />
      <HowItWorksSection lang={lang} />
      <PricingSection lang={lang} />
      <TechStackSection lang={lang} />
      <CTASection lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}
