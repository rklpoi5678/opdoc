'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ollamaService } from '@/lib/ollamaService';

export type AIMode = 'local' | 'byok' | 'disabled';

interface AISettingsState {
  mode: AIMode;
  ollamaModel: string;
  apiKey: string;
  isConnectedBase: boolean;
  availableModels: string[];
}

interface AISettingsContextType {
  state: AISettingsState;
  setMode: (mode: AIMode) => void;
  setOllamaModel: (model: string) => void;
  setApiKey: (key: string) => void;
  checkConnection: () => Promise<void>;
}

const AISettingsContext = createContext<AISettingsContextType | undefined>(undefined);
const STORAGE_KEY = 'noteflow_ai_settings';

export function AISettingsProvider({ children }: { children?: ReactNode }) {
  const [state, setState] = useState<AISettingsState>({
    mode: 'local',
    ollamaModel: 'llama3', // Default
    apiKey: '',
    isConnectedBase: false,
    availableModels: [],
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(prev => ({ ...prev, ...parsed, isConnectedBase: false })); // Always recheck connection
      } catch (e) {
        console.error('Failed to parse AI settings', e);
      }
    }
  }, []);

  // Save changes
  useEffect(() => {
    if (isMounted) {
      const toSave = {
        mode: state.mode,
        ollamaModel: state.ollamaModel,
        apiKey: state.apiKey,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    }
  }, [state.mode, state.ollamaModel, state.apiKey, isMounted]);

  // Initial connection check
  useEffect(() => {
    if (isMounted && state.mode === 'local') {
      checkConnection();
    }
  }, [isMounted, state.mode]);

  const checkConnection = async () => {
    try {
      const { connected, models } = await ollamaService.checkConnection();
      setState(prev => ({
        ...prev,
        isConnectedBase: connected,
        availableModels: models,
        ollamaModel: models.includes(prev.ollamaModel) ? prev.ollamaModel : (models[0] || 'llama3')
      }));
    } catch (error) {
      setState(prev => ({ ...prev, isConnectedBase: false, availableModels: [] }));
    }
  };

  const setMode = (mode: AIMode) => setState(prev => ({ ...prev, mode }));
  const setOllamaModel = (ollamaModel: string) => setState(prev => ({ ...prev, ollamaModel }));
  const setApiKey = (apiKey: string) => setState(prev => ({ ...prev, apiKey }));

  return (
    <AISettingsContext.Provider value={{ state, setMode, setOllamaModel, setApiKey, checkConnection }}>
      {children}
    </AISettingsContext.Provider>
  );
}

export function useAISettings() {
  const context = useContext(AISettingsContext);
  if (!context) {
    throw new Error('useAISettings must be used within AISettingsProvider');
  }
  return context;
}
