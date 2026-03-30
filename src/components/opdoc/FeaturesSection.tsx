'use client';

/*
 * NoteFlow AI — Features Section (Bento Grid)
 * Style: Neo-Brutalist SaaS × Obsidian Dark Mode
 * Bento grid layout with animated feature cards
 */

import { useState } from 'react';
import { Shield, FolderSync, Tag, Search, Download, Globe, Cpu, Zap } from 'lucide-react';

interface FeaturesSectionProps {
  lang: 'ko' | 'en';
}

const t = {
  ko: {
    sectionBadge: '핵심 기능',
    sectionTitle: '지식 관리의 모든 것을\nAI가 대신합니다',
    sectionSub: '태그 정리부터 폴더 분류, 의미 검색까지 — 당신은 그냥 쓰기만 하면 됩니다.',
    features: [
      {
        icon: Shield,
        title: '로컬 AI 처리',
        desc: 'Ollama 기반으로 모든 추론이 내 PC에서 실행됩니다. 민감한 노트가 외부 서버로 전송되지 않습니다.',
        badge: '프라이버시 보호',
        color: 'violet',
        size: 'large',
        detail: 'Ollama + 임베딩 모델로 완전 오프라인 동작',
      },
      {
        icon: Tag,
        title: '프론트매터 자동화',
        desc: '저장 즉시 category, status, importance, related_topics를 AI가 판단해 YAML에 기입합니다.',
        badge: 'NO-Enum 원칙',
        color: 'cyan',
        size: 'medium',
        detail: '유연한 문자열 태그 시스템으로 확장성 확보',
      },
      {
        icon: FolderSync,
        title: 'Inbox → Archive 자동 분류',
        desc: '새 노트는 Inbox에 저장 후 AI가 Projects/, Study/, Daily/ 등으로 자동 이동합니다.',
        badge: 'Dead Link 방지',
        color: 'emerald',
        size: 'medium',
        detail: '내부 링크 보존으로 파일 이동 후에도 연결 유지',
      },
      {
        icon: Search,
        title: '의미 중심 검색',
        desc: '단순 키워드가 아닌 벡터 임베딩 기반 시맨틱 검색으로 관련 노트를 정확하게 찾습니다.',
        badge: 'RAG 기반',
        color: 'amber',
        size: 'medium',
        detail: '3줄 요약 자동 삽입 + MOC 자동 업데이트',
      },
      {
        icon: Download,
        title: 'Notion & Obsidian 임포트',
        desc: '기존 볼트나 Notion 데이터를 읽어 AI-Ready 표준 포맷으로 자동 변환합니다.',
        badge: '원클릭 마이그레이션',
        color: 'pink',
        size: 'medium',
        detail: 'notion-to-md 커스텀 래퍼로 데이터 정규화',
      },
      {
        icon: Globe,
        title: '한국어 & 영어 지원',
        desc: '한국어와 영어 노트를 모두 정확하게 분석하고 분류합니다.',
        badge: '다국어',
        color: 'blue',
        size: 'small',
        detail: '',
      },
      {
        icon: Cpu,
        title: 'BYOK 또는 로컬 선택',
        desc: 'OpenAI/Anthropic API 키를 직접 입력하거나 Ollama 로컬 모드를 선택할 수 있습니다.',
        badge: '유연한 AI 설정',
        color: 'violet',
        size: 'small',
        detail: '',
      },
      {
        icon: Zap,
        title: 'MOC 자동 업데이트',
        desc: '폴더에 파일이 추가되면 인덱스 파일(Map of Content)에 링크가 자동으로 추가됩니다.',
        badge: '지식 그래프',
        color: 'cyan',
        size: 'small',
        detail: '',
      },
    ],
  },
  en: {
    sectionBadge: 'Core Features',
    sectionTitle: 'AI handles everything\nabout knowledge management',
    sectionSub: 'From tag organization to folder sorting and semantic search — just write.',
    features: [
      {
        icon: Shield,
        title: 'Local AI Processing',
        desc: 'All inference runs on your PC via Ollama. Sensitive notes never leave your machine.',
        badge: 'Privacy First',
        color: 'violet',
        size: 'large',
        detail: 'Fully offline with Ollama + embedding models',
      },
      {
        icon: Tag,
        title: 'Frontmatter Automation',
        desc: 'Upon save, AI fills in category, status, importance, and related_topics into YAML.',
        badge: 'NO-Enum Principle',
        color: 'cyan',
        size: 'medium',
        detail: 'Flexible string-based tag system for scalability',
      },
      {
        icon: FolderSync,
        title: 'Inbox → Archive Auto-Sort',
        desc: 'New notes land in Inbox, then AI moves them to Projects/, Study/, Daily/, etc.',
        badge: 'Dead Link Prevention',
        color: 'emerald',
        size: 'medium',
        detail: 'Internal links preserved after file moves',
      },
      {
        icon: Search,
        title: 'Semantic Search',
        desc: 'Vector embedding-based search finds related notes accurately, not just keyword matches.',
        badge: 'RAG-Powered',
        color: 'amber',
        size: 'medium',
        detail: 'Auto 3-line summary + MOC auto-update',
      },
      {
        icon: Download,
        title: 'Notion & Obsidian Import',
        desc: 'Import existing vaults or Notion data and auto-convert to AI-Ready standard format.',
        badge: 'One-Click Migration',
        color: 'pink',
        size: 'medium',
        detail: 'Custom notion-to-md wrapper for data normalization',
      },
      {
        icon: Globe,
        title: 'Korean & English Support',
        desc: 'Accurately analyzes and categorizes notes in both Korean and English.',
        badge: 'Multilingual',
        color: 'blue',
        size: 'small',
        detail: '',
      },
      {
        icon: Cpu,
        title: 'BYOK or Local Mode',
        desc: 'Enter your OpenAI/Anthropic API key or choose Ollama local mode.',
        badge: 'Flexible AI Setup',
        color: 'violet',
        size: 'small',
        detail: '',
      },
      {
        icon: Zap,
        title: 'MOC Auto-Update',
        desc: 'When files are added to a folder, links are automatically added to the index (MOC).',
        badge: 'Knowledge Graph',
        color: 'cyan',
        size: 'small',
        detail: '',
      },
    ],
  },
};

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  violet: {
    bg: 'rgba(124, 58, 237, 0.08)',
    border: 'rgba(124, 58, 237, 0.2)',
    text: '#a78bfa',
    badge: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
  },
  cyan: {
    bg: 'rgba(6, 182, 212, 0.08)',
    border: 'rgba(6, 182, 212, 0.2)',
    text: '#67e8f9',
    badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
  },
  emerald: {
    bg: 'rgba(16, 185, 129, 0.08)',
    border: 'rgba(16, 185, 129, 0.2)',
    text: '#6ee7b7',
    badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  },
  amber: {
    bg: 'rgba(245, 158, 11, 0.08)',
    border: 'rgba(245, 158, 11, 0.2)',
    text: '#fcd34d',
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  },
  pink: {
    bg: 'rgba(236, 72, 153, 0.08)',
    border: 'rgba(236, 72, 153, 0.2)',
    text: '#f9a8d4',
    badge: 'bg-pink-500/10 text-pink-300 border-pink-500/20',
  },
  blue: {
    bg: 'rgba(59, 130, 246, 0.08)',
    border: 'rgba(59, 130, 246, 0.2)',
    text: '#93c5fd',
    badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  },
};

export default function FeaturesSection({ lang }: FeaturesSectionProps) {
  const tx = t[lang];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-violet-950/5 to-transparent pointer-events-none" />
      <div className="container relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium mb-4">
            <Zap className="w-3 h-3" />
            {tx.sectionBadge}
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black text-white mb-4 whitespace-pre-line"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {tx.sectionTitle}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">{tx.sectionSub}</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tx.features.map((feature, i) => {
            const Icon = feature.icon;
            const colors = colorMap[feature.color];
            const isHovered = hoveredIndex === i;
            const isLarge = feature.size === 'large';

            return (
              <div
                key={i}
                className={`relative rounded-2xl p-6 border transition-all duration-300 cursor-default ${
                  isLarge ? 'lg:col-span-2 lg:row-span-1' : ''
                } ${isHovered ? 'scale-[1.02] shadow-2xl' : 'scale-100'}`}
                style={{
                  background: isHovered ? colors.bg : 'rgba(26, 29, 39, 0.8)',
                  borderColor: isHovered ? colors.border : 'rgba(255,255,255,0.06)',
                  boxShadow: isHovered
                    ? `0 0 40px ${colors.bg}, 0 20px 60px rgba(0,0,0,0.3)`
                    : 'none',
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{
                    background: isHovered ? colors.bg : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isHovered ? colors.border : 'rgba(255,255,255,0.08)'}`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: colors.text }} />
                </div>

                {/* Badge */}
                <div
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border mb-3 ${colors.badge}`}
                >
                  {feature.badge}
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-bold text-white mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>

                {/* Detail (for large cards) */}
                {isLarge && feature.detail && (
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: colors.text }}
                      />
                      <span className="text-xs font-mono" style={{ color: colors.text }}>
                        {feature.detail}
                      </span>
                    </div>
                  </div>
                )}

                {/* Large card: show AI processing image */}
                {isLarge && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-white/5">
                    <img
                      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663489977328/ZLNwnDmimqyVxJ9yWfz9pB/local-privacy-h3pcBhkSULcvHR6M8wVYKW.webp"
                      alt="Local AI Privacy"
                      className="w-full object-cover"
                      style={{ maxHeight: '160px', objectPosition: 'center' }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
