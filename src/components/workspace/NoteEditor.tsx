/*
 * NoteFlow AI — Note Editor
 * 마크다운 에디터 + 실시간 프리뷰 + AI 자동 정리
 */

import { useState, useEffect } from 'react';
import { useWorkspace, type Note } from '@/contexts/WorkspaceContext';
import { useI18n } from '@/contexts/I18nContext';
import { useAISettings } from '@/contexts/AISettingsContext';
import { Sparkles, Eye, Code, Loader2 } from 'lucide-react';

interface NoteEditorProps {
  note: Note;
}

export default function NoteEditor({ note }: NoteEditorProps) {
  const { updateNote, processNoteWithAI } = useWorkspace();
  const { state: aiState } = useAISettings();
  const { t } = useI18n();
  const [content, setContent] = useState(note.content);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content !== note.content) {
        setIsSaving(true);
        updateNote(note.id, { content });
        setLastSaved(new Date());
        setTimeout(() => setIsSaving(false), 500);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [content, note.id, note.content, updateNote]);

  const handleProcessWithAI = () => {
    processNoteWithAI(note.id, aiState.ollamaModel);
  };

  const renderMarkdown = (md: string) => {
    // 간단한 마크다운 렌더링
    let html = md
      .replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(
        /`(.*?)`/g,
        '<code class="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>',
      )
      .replace(/\n\n/g, '</p><p class="mb-3">');

    return `<p class="mb-3">${html}</p>`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Frontmatter Display */}
      <div className="px-6 py-4 border-b border-white/5 bg-[#0F1117]/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {note.frontmatter.category && (
              <span className="text-xs px-2 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                {note.frontmatter.category}
              </span>
            )}
            <span
              className={`text-xs px-2 py-1 rounded-full border ${
                note.frontmatter.status === 'draft'
                  ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}
            >
              {note.frontmatter.status}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
              ⭐ {note.frontmatter.importance}/5
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isSaving && (
              <span className="text-xs text-white/40 flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                {t('editor.saving')}
              </span>
            )}
            {lastSaved && !isSaving && (
              <span className="text-xs text-white/40">{t('editor.savedAt')} {lastSaved.toLocaleTimeString()}</span>
            )}
            <button
              onClick={handleProcessWithAI}
              disabled={note.isProcessing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-linear-to-r from-[#7C3AED]/20 to-[#06B6D4]/20 text-white hover:opacity-80 disabled:opacity-50 transition-all text-xs font-semibold"
            >
              {note.isProcessing ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  {t('editor.processing')}
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3" />
                  {t('editor.processStart')}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tags */}
        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/20 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Editor/Preview Toggle */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <button
          onClick={() => setIsPreview(false)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            !isPreview
              ? 'bg-white/10 text-white'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Code className="w-4 h-4" />
          {t('editor.edit')}
        </button>
        <button
          onClick={() => setIsPreview(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            isPreview ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Eye className="w-4 h-4" />
          {t('editor.preview')}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex">
        {/* Editor */}
        <div className={`${isPreview ? 'hidden' : 'flex-1'} flex flex-col`}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('editor.placeholder')}
            className="flex-1 px-6 py-4 bg-transparent text-white font-mono text-sm resize-none focus:outline-none placeholder-white/20"
            spellCheck="false"
          />
        </div>

        {/* Preview */}
        {isPreview && (
          <div className="flex-1 overflow-y-auto px-6 py-4 prose prose-invert max-w-none">
            <div
              className="text-white/80 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(content) || `<p class="text-white/40">${t('editor.noContent')}</p>`,
              }}
            />
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="px-6 py-2 border-t border-white/5 bg-[#0F1117]/50 flex items-center justify-between text-xs text-white/40">
        <div className="flex items-center gap-4">
          <span>{note.wordCount} {t('editor.words')}</span>
          <span>{note.readingTimeMin} {t('editor.minRead')}</span>
        </div>
        <span>{t('editor.lastModified')} {new Date(note.frontmatter.updatedAt).toLocaleString()}</span>
      </div>
    </div>
  );
}
