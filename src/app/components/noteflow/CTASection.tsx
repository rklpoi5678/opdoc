'use client';

/*
 * NoteFlow AI — CTA Section
 * Style: Neo-Brutalist SaaS × Obsidian Dark Mode
 * Final call-to-action before footer
 */

import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

interface CTASectionProps {
  lang: 'ko' | 'en';
}

const t = {
  ko: {
    title: '지금 바로 시작하세요',
    sub: '설치 5분, 설정 없이 바로 사용. 첫 10개 파일은 무료입니다.',
    cta1: '무료로 시작하기',
    cta2: '대시보드 체험',
    note: '신용카드 불필요 · 언제든 취소 가능',
  },
  en: {
    title: 'Start right now',
    sub: '5-minute setup, no configuration needed. First 10 files are free.',
    cta1: 'Start Free',
    cta2: 'Try Dashboard',
    note: 'No credit card required · Cancel anytime',
  },
};

export default function CTASection({ lang }: CTASectionProps) {
  const tx = t[lang];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-linear-to-r from-violet-600/15 to-cyan-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container relative">
        <div
          className="max-w-3xl mx-auto text-center rounded-3xl p-12 relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.12) 100%)',
            border: '1px solid rgba(124,58,237,0.2)',
          }}
        >
          {/* Gradient border glow */}
          <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-violet-600/5 to-cyan-500/5" />

          <h2
            className="text-4xl lg:text-5xl font-black text-white mb-4 relative"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {tx.title}
          </h2>
          <p className="text-white/60 text-lg mb-8 relative">{tx.sub}</p>

          <div className="flex flex-wrap gap-4 justify-center relative">
            <Button
              size="lg"
              className="shimmer bg-linear-to-r from-[#7C3AED] to-[#06B6D4] hover:opacity-90 text-white border-0 font-bold px-10 text-base h-12 glow-purple"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              onClick={() =>
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              {tx.cta1}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <a href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white bg-white/5 hover:bg-white/10 font-semibold px-8 text-base h-12"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <Play className="w-4 h-4 mr-2 fill-current" />
                {tx.cta2}
              </Button>
            </a>
          </div>

          <p className="text-white/25 text-sm mt-6 relative">{tx.note}</p>
        </div>
      </div>
    </section>
  );
}
