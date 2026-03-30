'use client';

import { Button } from '@/components/ui/button';
import { WarningCircleIcon, HouseIcon } from '@phosphor-icons/react';

export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0F1117]">
      <div className="w-full max-w-lg mx-4 text-center p-8">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse" />
            <WarningCircleIcon className="relative h-16 w-16 text-red-400" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-2">404</h1>

        <h2 className="text-xl font-semibold text-white/70 mb-4">Page Not Found</h2>

        <p className="text-white/40 mb-8 leading-relaxed">
          Sorry, the page you are looking for doesn't exist.
          <br />
          It may have been moved or deleted.
        </p>

        <Button
          onClick={handleGoHome}
          className="bg-linear-to-r from-[#7C3AED] to-[#06B6D4] text-white border-0 px-6 py-2.5 rounded-lg"
        >
          <HouseIcon className="w-4 h-4 mr-2" />
          Go Home
        </Button>
      </div>
    </div>
  );
}
