'use client';

/*
 * NoteFlow AI — Hero Section
 * Style: Neo-Brutalist SaaS × Obsidian Dark Mode
 */

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Shield, Cpu, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  lang: 'ko' | 'en';
}

const t = {
  ko: {
    badge: '로컬 AI 기반 — 데이터가 내 PC를 떠나지 않습니다',
    headline1: '그냥 쓰세요.',
    headline2: 'AI가 정리합니다.',
    subheadline:
      'Obsidian 노트를 저장하는 순간, AI가 태그·폴더·프론트매터를 자동으로 완성합니다.\n관리 피로 없이 지식 축적에만 집중하세요.',
    cta1: '무료로 시작하기',
    cta2: '대시보드 체험',
    stat1: '10초',
    stat1Label: '평균 정리 시간',
    stat2: '100%',
    stat2Label: '로컬 처리',
    stat3: '0개',
    stat3Label: '수동 태그',
    typingTexts: [
      '회의록 작성 중...',
      'AI가 태그를 분석합니다...',
      '→ #업무 #회의 #Q2-기획',
      '폴더 이동: Projects/2025/',
      '프론트매터 자동 완성 ✓',
    ],
  },
  en: {
    badge: 'Local AI Powered — Your data never leaves your PC',
    headline1: 'Just write.',
    headline2: 'AI organizes.',
    subheadline:
      'The moment you save an Obsidian note, AI automatically fills in tags, folders, and frontmatter.\nFocus on building knowledge, not managing it.',
    cta1: 'Start Free',
    cta2: 'Try Dashboard',
    stat1: '10s',
    stat1Label: 'Avg. organize time',
    stat2: '100%',
    stat2Label: 'Local processing',
    stat3: '0',
    stat3Label: 'Manual tags',
    typingTexts: [
      'Writing meeting notes...',
      'AI analyzing content...',
      '→ #work #meeting #Q2-planning',
      'Moving to: Projects/2025/',
      'Frontmatter auto-filled ✓',
    ],
  },
};

function TypingDemo({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const current = texts[currentIndex];
    const speed = isDeleting ? 30 : 60;

    if (!isDeleting && displayed === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setCurrentIndex((i) => (i + 1) % texts.length);
    } else {
      timeoutRef.current = setTimeout(() => {
        setDisplayed((prev) =>
          isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1),
        );
      }, speed);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, isDeleting, currentIndex, texts]);

  const isSuccess = displayed.includes('✓');
  const isTag = displayed.startsWith('→');
  const isMoving = displayed.includes('Projects/') || displayed.includes('폴더 이동');

  return (
    <div className="font-mono text-sm">
      <span
        className={
          isSuccess
            ? 'text-emerald-400'
            : isTag
              ? 'text-violet-400'
              : isMoving
                ? 'text-cyan-400'
                : 'text-white/80'
        }
      >
        {displayed}
      </span>
      <span className="animate-type-cursor text-violet-400 ml-0.5">|</span>
    </div>
  );
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const tx = t[lang];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663489977328/ZLNwnDmimqyVxJ9yWfz9pB/hero-bg-aAoS6oU5PPCcEEZFUomWk4.webp)`,
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0F1117]/70 via-[#0F1117]/60 to-[#0F1117]" />
      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left: Copy */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium mb-6">
              <Shield className="w-3 h-3" />
              {tx.badge}
            </div>

            {/* Headline */}
            <h1
              className="text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] mb-6 tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="text-white">{tx.headline1}</span>
              <br />
              <span className="gradient-text">{tx.headline2}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl whitespace-pre-line">
              {tx.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                size="lg"
                className="shimmer bg-linear-to-r from-[#7C3AED] to-[#06B6D4] hover:opacity-90 text-white border-0 font-bold px-8 text-base h-12 glow-purple"
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

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { value: tx.stat1, label: tx.stat1Label, icon: <Cpu className="w-4 h-4" /> },
                { value: tx.stat2, label: tx.stat2Label, icon: <Shield className="w-4 h-4" /> },
                { value: tx.stat3, label: tx.stat3Label, icon: <Sparkles className="w-4 h-4" /> },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-violet-400 mb-1">
                    {stat.icon}
                    <span
                      className="text-2xl font-black text-white"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-xs text-white/40">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Demo Card */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 bg-linear-to-r from-violet-600/20 to-cyan-500/20 rounded-2xl blur-xl" />

              {/* Main demo card */}
              <div className="relative gradient-border bg-[#1A1D27] rounded-2xl overflow-hidden shadow-2xl">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0F1117]/50">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-3 text-xs text-white/30 font-mono">
                    ~/vault/Inbox/meeting-notes.md
                  </span>
                </div>

                {/* Editor content */}
                <div className="p-5 font-mono text-sm">
                  {/* YAML Frontmatter */}
                  <div className="bg-[#0F1117]/60 rounded-lg p-4 mb-4 border border-white/5">
                    <div className="text-white/30 mb-2">---</div>
                    <div className="space-y-1.5">
                      <div>
                        <span className="text-cyan-400">title: </span>
                        <span className="text-emerald-300">"Q2 기획 회의록"</span>
                      </div>
                      <div>
                        <span className="text-cyan-400">date: </span>
                        <span className="text-white/60">2025-03-29</span>
                      </div>
                      <div className="flex items-start gap-1">
                        <span className="text-cyan-400">tags: </span>
                        <div className="flex flex-wrap gap-1">
                          {['#업무', '#회의', '#Q2-기획', '#마케팅'].map((tag) => (
                            <span key={tag} className="tag-badge">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-cyan-400">category: </span>
                        <span className="text-violet-300">Projects</span>
                      </div>
                      <div>
                        <span className="text-cyan-400">status: </span>
                        <span className="text-yellow-300">draft</span>
                      </div>
                      <div>
                        <span className="text-cyan-400">importance: </span>
                        <span className="text-orange-300">high</span>
                      </div>
                    </div>
                    <div className="text-white/30 mt-2">---</div>
                  </div>

                  {/* Note content */}
                  <div className="space-y-2 text-white/50">
                    <div className="text-white/80 font-semibold text-base">## Q2 기획 회의록</div>
                    <div className="text-white/40 text-xs">*2025년 3월 29일 오후 2시*</div>
                    <div className="mt-2">오늘 회의에서 다음 분기 마케팅 전략을 논의했다...</div>
                  </div>

                  {/* AI Status Bar */}
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
                      <span className="text-xs text-emerald-400 font-semibold">
                        {lang === 'ko' ? 'NoteFlow AI 처리 완료' : 'NoteFlow AI processed'}
                      </span>
                    </div>
                    <TypingDemo texts={tx.typingTexts} />
                  </div>
                </div>

                {/* Dashboard mockup image */}
                <div className="px-5 pb-5">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663489977328/ZLNwnDmimqyVxJ9yWfz9pB/dashboard-mockup-FncsPoJgo3GgsAa9kHK25m.webp"
                    alt="NoteFlow AI Dashboard"
                    className="rounded-lg border border-white/10 w-full object-cover"
                    style={{ maxHeight: '180px', objectPosition: 'top' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#0F1117] to-transparent pointer-events-none" />
    </section>
  );
}
