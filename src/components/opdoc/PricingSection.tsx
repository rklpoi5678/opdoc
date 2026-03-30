'use client';

/*
 * NoteFlow AI — Pricing Section
 * Style: Neo-Brutalist SaaS × Obsidian Dark Mode
 * 3-tier pricing: Free / Developer (BYOK) / Pro (Managed AI)
 * Payment: Paddle
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Zap, Code, Crown } from 'lucide-react';
import { toast } from 'sonner';

interface PricingSectionProps {
  lang: 'ko' | 'en';
}

const t = {
  ko: {
    badge: '요금제',
    title: '당신에게 맞는\n플랜을 선택하세요',
    sub: '모든 플랜은 Paddle로 안전하게 결제됩니다. 언제든지 취소 가능합니다.',
    monthly: '월간',
    yearly: '연간',
    yearlyDiscount: '20% 할인',
    plans: [
      {
        name: 'Free',
        icon: Zap,
        price: { monthly: '₩0', yearly: '₩0' },
        period: '영구 무료',
        desc: '개인 사용자를 위한 기본 기능',
        badge: null,
        color: 'default',
        features: [
          '마크다운 파일 10개 임포트',
          '기본 태그 자동화',
          'Inbox → 폴더 자동 분류',
          '로컬 AI (Ollama) 지원',
          '한국어 & 영어 지원',
        ],
        cta: '무료로 시작하기',
        ctaVariant: 'outline' as const,
      },
      {
        name: 'Developer',
        icon: Code,
        price: { monthly: '₩9,900', yearly: '₩7,900' },
        period: '/ 월',
        desc: '자신의 API 키로 모든 기능 사용',
        badge: 'BYOK',
        color: 'violet',
        features: [
          '무제한 파일 임포트',
          '프론트매터 전체 자동화',
          '의미 기반 시맨틱 검색',
          'MOC 자동 업데이트',
          'Notion 임포트 지원',
          'OpenAI / Anthropic API 연동',
          '로컬 AI (Ollama) 지원',
          '우선 지원',
        ],
        cta: 'Developer 시작하기',
        ctaVariant: 'default' as const,
      },
      {
        name: 'Pro',
        icon: Crown,
        price: { monthly: '₩29,900', yearly: '₩23,900' },
        period: '/ 월',
        desc: '키 설정 없이 최강 AI 모델 바로 사용',
        badge: '추천',
        color: 'gradient',
        features: [
          'Developer 플랜 모든 기능 포함',
          'API 키 불필요 (Managed AI)',
          'GPT-4o / Claude 3.5 Sonnet',
          '최우선 처리 속도',
          '고급 벡터 인덱싱',
          '팀 협업 기능 (최대 5명)',
          '전용 고객 지원',
          'Electron 앱 베타 액세스',
        ],
        cta: 'Pro 시작하기',
        ctaVariant: 'default' as const,
      },
    ],
    faq: [
      {
        q: 'API 키가 없어도 사용할 수 있나요?',
        a: 'Free와 Developer 플랜은 로컬 Ollama를 지원합니다. Pro 플랜은 API 키 없이 바로 사용 가능합니다.',
      },
      {
        q: '데이터가 외부로 전송되나요?',
        a: '로컬 모드에서는 데이터가 절대 외부로 전송되지 않습니다. BYOK 모드에서는 사용자가 선택한 AI 제공사로만 전송됩니다.',
      },
      {
        q: '언제든지 취소할 수 있나요?',
        a: '네, Paddle을 통해 언제든지 구독을 취소할 수 있습니다. 취소 후에도 남은 기간은 사용 가능합니다.',
      },
    ],
  },
  en: {
    badge: 'Pricing',
    title: 'Choose the plan\nthat fits you',
    sub: 'All plans are securely processed via Paddle. Cancel anytime.',
    monthly: 'Monthly',
    yearly: 'Yearly',
    yearlyDiscount: '20% off',
    plans: [
      {
        name: 'Free',
        icon: Zap,
        price: { monthly: '$0', yearly: '$0' },
        period: 'forever free',
        desc: 'Basic features for personal use',
        badge: null,
        color: 'default',
        features: [
          'Import 10 markdown files',
          'Basic tag automation',
          'Inbox → folder auto-sort',
          'Local AI (Ollama) support',
          'Korean & English support',
        ],
        cta: 'Start Free',
        ctaVariant: 'outline' as const,
      },
      {
        name: 'Developer',
        icon: Code,
        price: { monthly: '$7.99', yearly: '$6.39' },
        period: '/ month',
        desc: 'All features with your own API key',
        badge: 'BYOK',
        color: 'violet',
        features: [
          'Unlimited file imports',
          'Full frontmatter automation',
          'Semantic vector search',
          'MOC auto-update',
          'Notion import support',
          'OpenAI / Anthropic API',
          'Local AI (Ollama) support',
          'Priority support',
        ],
        cta: 'Start Developer',
        ctaVariant: 'default' as const,
      },
      {
        name: 'Pro',
        icon: Crown,
        price: { monthly: '$24.99', yearly: '$19.99' },
        period: '/ month',
        desc: 'Strongest AI models, no key setup needed',
        badge: 'Recommended',
        color: 'gradient',
        features: [
          'Everything in Developer',
          'No API key needed (Managed AI)',
          'GPT-4o / Claude 3.5 Sonnet',
          'Fastest processing priority',
          'Advanced vector indexing',
          'Team collaboration (up to 5)',
          'Dedicated support',
          'Electron app beta access',
        ],
        cta: 'Start Pro',
        ctaVariant: 'default' as const,
      },
    ],
    faq: [
      {
        q: 'Can I use it without an API key?',
        a: 'Free and Developer plans support local Ollama. Pro plan works immediately without any API key.',
      },
      {
        q: 'Is my data sent externally?',
        a: 'In local mode, data never leaves your machine. In BYOK mode, data is only sent to the AI provider you choose.',
      },
      {
        q: 'Can I cancel anytime?',
        a: "Yes, you can cancel your subscription anytime via Paddle. You'll retain access for the remaining period.",
      },
    ],
  },
};

export default function PricingSection({ lang }: PricingSectionProps) {
  const tx = t[lang];
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const handleCTA = (planName: string) => {
    toast.info(
      lang === 'ko'
        ? `${planName} 플랜 — 곧 출시됩니다! 얼리버드 등록을 해주세요.`
        : `${planName} plan — Coming soon! Register for early access.`,
      { duration: 3000 },
    );
  };

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-violet-950/8 to-transparent pointer-events-none" />
      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium mb-4">
            <Crown className="w-3 h-3" />
            {tx.badge}
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black text-white mb-4 whitespace-pre-line"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {tx.title}
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">{tx.sub}</p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-1 mt-6 p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                billing === 'monthly'
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {tx.monthly}
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                billing === 'yearly'
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {tx.yearly}
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/20">
                {tx.yearlyDiscount}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tx.plans.map((plan, i) => {
            const Icon = plan.icon;
            const isGradient = plan.color === 'gradient';
            const isViolet = plan.color === 'violet';

            return (
              <div
                key={i}
                className={`relative rounded-2xl p-6 flex flex-col transition-all duration-300 hover:scale-[1.02] ${
                  isGradient ? 'glow-purple' : ''
                }`}
                style={{
                  background: isGradient
                    ? 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.15) 100%)'
                    : 'rgba(26, 29, 39, 0.8)',
                  border: isGradient
                    ? '1px solid rgba(124,58,237,0.4)'
                    : isViolet
                      ? '1px solid rgba(124,58,237,0.2)'
                      : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Recommended badge */}
                {plan.badge && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold ${
                      isGradient
                        ? 'bg-linear-to-r from-[#7C3AED] to-[#06B6D4] text-white'
                        : 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Plan header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: isGradient
                        ? 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.3))'
                        : 'rgba(255,255,255,0.06)',
                      border: isGradient
                        ? '1px solid rgba(124,58,237,0.3)'
                        : '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{
                        color: isGradient ? '#a78bfa' : isViolet ? '#a78bfa' : '#94a3b8',
                      }}
                    />
                  </div>
                  <div>
                    <div
                      className="font-black text-white text-lg"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {plan.name}
                    </div>
                    <div className="text-xs text-white/40">{plan.desc}</div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-4xl font-black"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: isGradient ? '#a78bfa' : 'white',
                      }}
                    >
                      {plan.price[billing]}
                    </span>
                    <span className="text-white/40 text-sm">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: isGradient ? '#a78bfa' : '#6ee7b7' }}
                      />
                      <span className="text-sm text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  onClick={() => handleCTA(plan.name)}
                  variant={plan.ctaVariant}
                  className={`w-full font-bold ${
                    isGradient
                      ? 'shimmer bg-linear-to-r from-[#7C3AED] to-[#06B6D4] text-white border-0 hover:opacity-90'
                      : isViolet
                        ? 'bg-violet-600/20 text-violet-300 border-violet-500/30 hover:bg-violet-600/30'
                        : 'border-white/10 text-white/60 hover:text-white hover:border-white/20'
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {plan.cta}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Paddle badge */}
        <div className="text-center mt-8">
          <span className="text-xs text-white/30 font-mono">
            {lang === 'ko'
              ? '결제는 Paddle을 통해 안전하게 처리됩니다 · Wise / Payoneer 수취 지원'
              : 'Payments securely processed via Paddle · Wise / Payoneer payout supported'}
          </span>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h3
            className="text-xl font-bold text-white text-center mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            FAQ
          </h3>
          <div className="space-y-4">
            {tx.faq.map((item, i) => (
              <div key={i} className="rounded-xl p-5 bg-white/3 border border-white/5">
                <div className="font-semibold text-white mb-2 text-sm">{item.q}</div>
                <div className="text-white/50 text-sm leading-relaxed">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
