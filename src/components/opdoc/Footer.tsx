'use client';

/*
 * NoteFlow AI — Footer
 * Style: Neo-Brutalist SaaS × Obsidian Dark Mode
 */

import { Zap, ExternalLink, Share2, Mail } from 'lucide-react';

interface FooterProps {
  lang: 'ko' | 'en';
}

const t = {
  ko: {
    tagline: '그냥 쓰세요. AI가 정리합니다.',
    product: '제품',
    company: '회사',
    links: {
      product: [
        { label: '기능 소개', href: '#features' },
        { label: '작동 방식', href: '#how-it-works' },
        { label: '요금제', href: '#pricing' },
        { label: '대시보드 체험', href: '/dashboard' },
      ],
      company: [
        { label: '개인정보처리방침', href: '#' },
        { label: '이용약관', href: '#' },
        { label: '문의하기', href: '#' },
        { label: '로드맵', href: '#' },
      ],
    },
    copyright: '© 2025 NoteFlow AI. All rights reserved.',
    madeWith: 'Made with ♥ for knowledge workers',
  },
  en: {
    tagline: 'Just write. AI organizes.',
    product: 'Product',
    company: 'Company',
    links: {
      product: [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Try Dashboard', href: '/dashboard' },
      ],
      company: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Contact', href: '#' },
        { label: 'Roadmap', href: '#' },
      ],
    },
    copyright: '© 2025 NoteFlow AI. All rights reserved.',
    madeWith: 'Made with ♥ for knowledge workers',
  },
};

export default function Footer({ lang }: FooterProps) {
  const tx = t[lang];

  const scrollTo = (href: string) => {
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-white/5 bg-[#0A0C12]">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span
                className="font-bold text-lg tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="gradient-text">NoteFlow</span>
                <span className="text-white/80"> AI</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">{tx.tagline}</p>
            <div className="flex items-center gap-3">
              {[
                { Icon: ExternalLink, href: '#' },
                { Icon: Share2, href: '#' },
                { Icon: Mail, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <div
              className="text-sm font-semibold text-white mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {tx.product}
            </div>
            <ul className="space-y-2.5">
              {tx.links.product.map((link, i) => (
                <li key={i}>
                  {link.href.startsWith('#') ? (
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-sm text-white/40 hover:text-white transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <div
              className="text-sm font-semibold text-white mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {tx.company}
            </div>
            <ul className="space-y-2.5">
              {tx.links.company.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">{tx.copyright}</p>
          <p className="text-xs text-white/25">{tx.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}
