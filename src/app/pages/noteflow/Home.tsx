"use client";

/*
 * NoteFlow AI — Home / Landing Page
 * Style: Neo-Brutalist SaaS × Obsidian Dark Mode
 * Sections: Navbar → Hero → Features → HowItWorks → Pricing → Footer
 */

import { useState } from "react";
import Navbar from "@/app/components/noteflow/Navbar";
import HeroSection from "@/app/components/noteflow/HeroSection";
import FeaturesSection from "@/app/components/noteflow/FeaturesSection";
import HowItWorksSection from "@/app/components/noteflow/HowItWorksSection";
import PricingSection from "@/app/components/noteflow/PricingSection";
import TechStackSection from "@/app/components/noteflow/TechStackSection";
import CTASection from "@/app/components/noteflow/CTASection";
import Footer from "@/app/components/noteflow/Footer";

export default function Home() {
  const [lang, setLang] = useState<"ko" | "en">("ko");

  const toggleLang = () => setLang((l) => (l === "ko" ? "en" : "ko"));

  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      <Navbar lang={lang} onLangToggle={toggleLang} />
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
