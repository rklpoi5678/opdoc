'use client';

/**
 * Opdoc - Login Page
 * Style: Neo-Brutalist SaaS × Obsidian Dark Mode
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, Mail, ArrowRight, Lock } from 'lucide-react';
import { GithubLogo, GoogleLogo } from '@phosphor-icons/react';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast.success('로그인에 성공했습니다. 워크스페이스로 이동합니다.');
      window.location.href = '/workspace';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0F1117] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <a href="/" className="flex items-center gap-2 mb-2 group">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center shadow-lg group-hover:shadow-purple-500/30 transition-shadow">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span
              className="font-bold text-2xl tracking-tight text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="gradient-text">NoteFlow</span>
              <span className="text-white/80"> AI</span>
            </span>
          </a>
          <p className="text-white/40 text-sm">스마트한 지식 관리의 시작</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#1A1D27]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl">
          <h1
            className="text-2xl font-bold text-white mb-6 text-center"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            환영합니다
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="bg-white/5 border-white/10 text-white pl-10 h-11 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                  비밀번호
                </label>
                <a href="#" className="text-[10px] text-violet-400 hover:text-violet-300">
                  비밀번호 찾기
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white pl-10 h-11 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 shimmer bg-linear-to-r from-[#7C3AED] to-[#06B6D4] hover:opacity-90 text-white border-0 font-bold mt-2"
            >
              {isLoading ? '로그인 중...' : '로그인'}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-tighter">
              <span className="bg-[#1A1D27] px-2 text-white/20 font-semibold">
                또는 소셜 계정으로 로그인
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all text-xs h-10"
            >
              <GithubLogo className="w-4 h-4 mr-2" />
              Github
            </Button>
            <Button
              variant="outline"
              className="border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all text-xs h-10"
            >
              <GoogleLogo className="w-4 h-4 mr-2" />
              Google
            </Button>
          </div>

          <p className="mt-8 text-center text-xs text-white/30">
            계정이 없으신가요?{' '}
            <a href="#" className="text-violet-400 hover:text-violet-300 font-semibold">
              회원가입
            </a>
          </p>
        </div>

        {/* Footer links */}
        <div className="mt-8 flex justify-center gap-6 text-[10px] text-white/20 uppercase tracking-widest font-semibold font-mono">
          <a href="#" className="hover:text-white/40 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white/40 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-white/40 transition-colors">
            Help
          </a>
        </div>
      </div>
    </div>
  );
}
