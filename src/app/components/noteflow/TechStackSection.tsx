'use client';

/*
 * NoteFlow AI — Tech Stack Section
 * Style: Neo-Brutalist SaaS × Obsidian Dark Mode
 * Shows the technical architecture in a visual way
 */

interface TechStackSectionProps {
  lang: 'ko' | 'en';
}

const t = {
  ko: {
    badge: '기술 스택',
    title: '엔터프라이즈급\n아키텍처',
    sub: '처음부터 AI-Ready로 설계된 시스템. 로컬부터 클라우드까지 유연하게 확장됩니다.',
    layers: [
      {
        name: '프론트엔드',
        color: 'violet',
        items: ['React / Next.js', 'Tailwind CSS', 'Electron (예정)', 'Wouter'],
      },
      {
        name: '백엔드',
        color: 'cyan',
        items: ['Express.js', 'Next.js API Routes', 'RedwoodSDK', 'Cloudflare Workers'],
      },
      {
        name: 'AI / ML',
        color: 'emerald',
        items: ['Ollama (로컬)', 'OpenAI GPT-4o', 'Anthropic Claude', 'nomic-embed-text'],
      },
      {
        name: '데이터베이스',
        color: 'amber',
        items: ['Supabase', 'pgvector', 'Managed Postgres', '벡터 인덱스'],
      },
      {
        name: '임포트',
        color: 'pink',
        items: ['notion-to-md (커스텀)', 'Markdown 파서', 'YAML 프론트매터', '표준 포맷 변환'],
      },
      {
        name: '결제 / 배포',
        color: 'blue',
        items: ['Paddle', 'Wise / Payoneer', 'GitLab CI/CD', 'Render / Cloudflare'],
      },
    ],
  },
  en: {
    badge: 'Tech Stack',
    title: 'Enterprise-grade\nArchitecture',
    sub: 'Designed AI-Ready from the ground up. Scales flexibly from local to cloud.',
    layers: [
      {
        name: 'Frontend',
        color: 'violet',
        items: ['React / Next.js', 'Tailwind CSS', 'Electron (planned)', 'Wouter'],
      },
      {
        name: 'Backend',
        color: 'cyan',
        items: ['Express.js', 'Next.js API Routes', 'RedwoodSDK', 'Cloudflare Workers'],
      },
      {
        name: 'AI / ML',
        color: 'emerald',
        items: ['Ollama (local)', 'OpenAI GPT-4o', 'Anthropic Claude', 'nomic-embed-text'],
      },
      {
        name: 'Database',
        color: 'amber',
        items: ['Supabase', 'pgvector', 'Managed Postgres', 'Vector Index'],
      },
      {
        name: 'Import',
        color: 'pink',
        items: ['notion-to-md (custom)', 'Markdown Parser', 'YAML Frontmatter', 'Standard Format'],
      },
      {
        name: 'Payments / Deploy',
        color: 'blue',
        items: ['Paddle', 'Wise / Payoneer', 'GitLab CI/CD', 'Render / Cloudflare'],
      },
    ],
  },
};

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  violet: {
    bg: 'rgba(124,58,237,0.08)',
    border: 'rgba(124,58,237,0.2)',
    text: '#a78bfa',
    dot: '#7C3AED',
  },
  cyan: {
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.2)',
    text: '#67e8f9',
    dot: '#06B6D4',
  },
  emerald: {
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
    text: '#6ee7b7',
    dot: '#10B981',
  },
  amber: {
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
    text: '#fcd34d',
    dot: '#F59E0B',
  },
  pink: {
    bg: 'rgba(236,72,153,0.08)',
    border: 'rgba(236,72,153,0.2)',
    text: '#f9a8d4',
    dot: '#EC4899',
  },
  blue: {
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.2)',
    text: '#93c5fd',
    dot: '#3B82F6',
  },
};

export default function TechStackSection({ lang }: TechStackSectionProps) {
  const tx = t[lang];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0A0C12]/50 to-transparent pointer-events-none" />
      <div className="container relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-4">
            <span className="font-mono">{'</>'}</span>
            {tx.badge}
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black text-white whitespace-pre-line mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {tx.title}
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">{tx.sub}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {tx.layers.map((layer, i) => {
            const colors = colorMap[layer.color];
            return (
              <div
                key={i}
                className="rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div
                  className="text-xs font-bold mb-3 uppercase tracking-wider"
                  style={{ color: colors.text }}
                >
                  {layer.name}
                </div>
                <div className="space-y-1.5">
                  {layer.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: colors.dot }}
                      />
                      <span className="text-xs text-white/50 font-mono">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Architecture note */}
        <div className="mt-8 p-4 rounded-xl bg-white/3 border border-white/5 text-center">
          <p className="text-xs text-white/30 font-mono">
            {lang === 'ko'
              ? 'Clean Architecture 원칙으로 설계 → 향후 Electron 앱으로 패키징 시 React 코드 재사용 가능'
              : 'Designed with Clean Architecture → React code reusable when packaging as Electron app'}
          </p>
        </div>
      </div>
    </section>
  );
}
