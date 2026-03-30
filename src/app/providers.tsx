'use client';

/**
 * opdoc App Providers
 * RedwoodSDK 전역 클라이언트 프로바이더 모음
 */

'use client';

import * as React from 'react';
import ErrorBoundary from '@/components/opdoc/ErrorBoundary';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { I18nProvider } from '@/contexts/I18nContext';
import { AISettingsProvider } from '@/contexts/AISettingsContext';

export function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <I18nProvider>
        <AISettingsProvider>
          <TooltipProvider>
            {children}
            <Toaster richColors closeButton position="bottom-right" />
          </TooltipProvider>
        </AISettingsProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}
