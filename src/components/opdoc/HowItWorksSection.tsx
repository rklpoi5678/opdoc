'use client';

/*
 * NoteFlow AI — How It Works Section
 * Style: Neo-Brutalist SaaS × Obsidian Dark Mode
 * Step-by-step flow with animated connector lines
 */

import { FileText, Brain, FolderOpen, Search } from 'lucide-react';

interface HowItWorksSectionProps {
  lang: 'ko' | 'en';
}

const t = {
  ko: {
    badge: '작동 방식',
    title: '4단계로 완성되는\n자동 노트 정리',
    steps: [
      {
        number: '01',
        icon: FileText,
        title: '그냥 작성하세요',
        desc: 'Obsidian에서 평소처럼 노트를 작성합니다. 태그나 폴더를 신경 쓸 필요가 없습니다.',
        detail: '모든 새 파일은 자동으로 Inbox/ 폴더에 저장됩니다',
        color: 'violet',
      },
      {
        number: '02',
        icon: Brain,
        title: 'AI가 내용을 분석',
        desc: '저장 즉시 로컬 AI(Ollama)가 문서를 읽고 의미를 벡터화합니다.',
        detail: '임베딩 모델로 문장의 의미를 수치화 → 카테고리 분류',
        color: 'cyan',
      },
      {
        number: '03',
        icon: FolderOpen,
        title: '자동 분류 & 정리',
        desc: 'YAML 프론트매터가 자동 생성되고, 파일이 적절한 폴더로 이동합니다.',
        detail: '내부 링크 보존 → Dead Link 없이 안전한 이동',
        color: 'emerald',
      },
      {
        number: '04',
        icon: Search,
        title: '의미 기반 검색',
        desc: '정리된 노트들을 키워드가 아닌 의미로 검색합니다. MOC가 자동 업데이트됩니다.',
        detail: 'RAG 기반 검색 + 3줄 요약 자동 생성',
        color: 'amber',
      },
    ],
  },
  en: {
    badge: 'How It Works',
    title: '4 steps to\nautomatic note organization',
    steps: [
      {
        number: '01',
        icon: FileText,
        title: 'Just Write',
        desc: 'Write notes in Obsidian as usual. No need to worry about tags or folders.',
        detail: 'All new files automatically land in Inbox/ folder',
        color: 'violet',
      },
      {
        number: '02',
        icon: Brain,
        title: 'AI Analyzes Content',
        desc: 'Upon save, local AI (Ollama) reads the document and vectorizes its meaning.',
        detail: 'Embedding model converts meaning to numbers → category classification',
        color: 'cyan',
      },
      {
        number: '03',
        icon: FolderOpen,
        title: 'Auto-Sort & Organize',
        desc: 'YAML frontmatter is auto-generated and the file moves to the right folder.',
        detail: 'Internal links preserved → safe move without Dead Links',
        color: 'emerald',
      },
      {
        number: '04',
        icon: Search,
        title: 'Semantic Search',
        desc: 'Search organized notes by meaning, not keywords. MOC auto-updates.',
        detail: 'RAG-based search + auto 3-line summary generation',
        color: 'amber',
      },
    ],
  },
};

const colorMap: Record<string, { text: string; border: string; bg: string; glow: string }> = {
  violet: {
    text: '#a78bfa',
    border: 'rgba(124,58,237,0.3)',
    bg: 'rgba(124,58,237,0.1)',
    glow: 'rgba(124,58,237,0.2)',
  },
  cyan: {
    text: '#67e8f9',
    border: 'rgba(6,182,212,0.3)',
    bg: 'rgba(6,182,212,0.1)',
    glow: 'rgba(6,182,212,0.2)',
  },
  emerald: {
    text: '#6ee7b7',
    border: 'rgba(16,185,129,0.3)',
    bg: 'rgba(16,185,129,0.1)',
    glow: 'rgba(16,185,129,0.2)',
  },
  amber: {
    text: '#fcd34d',
    border: 'rgba(245,158,11,0.3)',
    bg: 'rgba(245,158,11,0.1)',
    glow: 'rgba(245,158,11,0.2)',
  },
};

export default function HowItWorksSection({ lang }: HowItWorksSectionProps) {
  const tx = t[lang];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium mb-4">
            <Brain className="w-3 h-3" />
            {tx.badge}
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black text-white whitespace-pre-line"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {tx.title}
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-linear-to-r from-violet-500/30 via-cyan-500/30 to-amber-500/30" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tx.steps.map((step, i) => {
              const Icon = step.icon;
              const colors = colorMap[step.color];

              return (
                <div key={i} className="relative flex flex-col items-center text-center group">
                  {/* Step number + icon */}
                  <div className="relative mb-6">
                    {/* Outer ring */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                        boxShadow: `0 0 20px ${colors.glow}`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: colors.text }} />
                    </div>
                    {/* Step number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                      style={{
                        background: `linear-gradient(135deg, ${colors.border}, ${colors.bg})`,
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-lg font-bold text-white mb-3"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{step.desc}</p>

                  {/* Detail pill */}
                  <div
                    className="px-3 py-1.5 rounded-lg text-xs font-mono leading-relaxed"
                    style={{
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                  >
                    {step.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Processing Visual */}
        <div className="mt-20 relative rounded-2xl overflow-hidden border border-white/5">
          <div className="absolute inset-0 bg-linear-to-r from-violet-950/50 via-transparent to-cyan-950/50" />
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663489977328/ZLNwnDmimqyVxJ9yWfz9pB/ai-processing-K5hzj2dzRcZ7653rMHspu2.webp"
            alt="AI Processing Flow"
            className="w-full object-cover"
            style={{ maxHeight: '280px', objectPosition: 'center' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p
                className="text-2xl font-black text-white mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {lang === 'ko'
                  ? '문서 → AI 분석 → 정리된 지식'
                  : 'Document → AI Analysis → Organized Knowledge'}
              </p>
              <p className="text-white/50 text-sm">
                {lang === 'ko'
                  ? '모든 처리가 내 PC에서 완료됩니다'
                  : 'All processing happens on your PC'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
