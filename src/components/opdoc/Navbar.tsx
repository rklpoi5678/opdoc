'use client';

/*
 * NoteFlow AI — Navbar Component
 * Style: Neo-Brutalist SaaS × Obsidian Dark Mode
 * Sticky top nav with gradient logo, language toggle, CTA button
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap } from 'lucide-react';
import { ThemeToggle } from '../ui/themeToggle';

interface NavbarProps {
  lang: 'ko' | 'en';
  onLangToggle: () => void;
  theme: 'dark' | 'light' | 'system';
}

const t = {
  ko: {
    features: '기능',
    howItWorks: '작동 방식',
    pricing: '요금제',
    dashboard: '대시보드 체험',
    cta: '무료로 시작하기',
    tagline: '스마트 노트 정리',
  },
  en: {
    features: 'Features',
    howItWorks: 'How It Works',
    pricing: 'Pricing',
    dashboard: 'Try Dashboard',
    cta: 'Start Free',
    tagline: 'Smart Note Organizer',
  },
};

export default function Navbar({ lang, onLangToggle, theme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const tx = t[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0F1117]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center shadow-lg group-hover:shadow-purple-500/30 transition-shadow">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span
              className="font-bold text-lg tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="gradient-text">NoteFlow</span>
              <span className="text-white/80"> AI</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollTo('features')}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {tx.features}
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {tx.howItWorks}
            </button>
            <button
              onClick={() => scrollTo('pricing')}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {tx.pricing}
            </button>
            <a
              href="/demo-dashboard"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {tx.dashboard}
            </a>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle initialTheme={theme} />
            {/* Language Toggle */}
            <button
              onClick={onLangToggle}
              className="text-xs font-mono px-3 py-1.5 rounded-md border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all"
            >
              {lang === 'ko' ? 'EN' : '한'}
            </button>
            <Button
              onClick={() => (window.location.href = '/login')}
              className="shimmer bg-linear-to-r from-[#7C3AED] to-[#06B6D4] hover:opacity-90 text-white border-0 text-sm font-semibold px-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {tx.cta}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0F1117]/95 backdrop-blur-xl border-b border-white/5 px-4 py-4 flex flex-col gap-3">
          <button
            onClick={() => scrollTo('features')}
            className="text-left text-sm text-white/70 hover:text-white py-2"
          >
            {tx.features}
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="text-left text-sm text-white/70 hover:text-white py-2"
          >
            {tx.howItWorks}
          </button>
          <button
            onClick={() => scrollTo('pricing')}
            className="text-left text-sm text-white/70 hover:text-white py-2"
          >
            {tx.pricing}
          </button>
          <a href="/dashboard" className="text-sm text-white/70 hover:text-white py-2">
            {tx.dashboard}
          </a>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onLangToggle}
              className="text-xs font-mono px-3 py-1.5 rounded-md border border-white/10 text-white/50"
            >
              {lang === 'ko' ? 'EN' : '한'}
            </button>
            <Button
              onClick={() => (window.location.href = '/login')}
              className="bg-linear-to-r from-[#7C3AED] to-[#06B6D4] text-white border-0 text-sm font-semibold"
            >
              {tx.cta}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
