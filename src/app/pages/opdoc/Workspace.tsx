'use client';
/**
 *  Opdoc Workspace Page
 * 노트 정리 워크스페이스
 * 마크다운 에디터, 파일 트리, AI 자동 정리
 */

import { useState, useEffect } from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import WorkspaceSidebar from '@/components/workspace/WorkspaceSidebar';
import NoteEditor from '@/components/workspace/NoteEditor';
import { Menu, X, Download, Upload } from 'lucide-react';

import { useProjects } from '@/contexts/ProjectContext';
import { useI18n } from '@/contexts/I18nContext';
import { RequestInfo } from 'rwsdk/worker';
import { NewNoteDialog } from '@/components/workspace/NewNoteDialog';

export default function Workspace(props: any) {
  const params = props.params || props.requestInfo?.params;
  const ctx = props.ctx || props.requestInfo?.ctx;
  
  const { state, selectNote, selectFolder, createNote } = useWorkspace();
  const { state: projectState, selectProject } = useProjects();
  const { t } = useI18n();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check on mount
    window.addEventListener('resize', handleResize);
    
    // Sync selected project with param
    if (params?.projectId && params.projectId !== projectState.selectedProjectId) {
      selectProject(params.projectId as string);
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, [params?.projectId, projectState.selectedProjectId, selectProject]);

  if (!isMounted) {
    return <div className="min-h-screen bg-[#0F1117]" />; // Client-side mount placeholder
  }

  const selectedNote = state.notes.find((n) => n.id === state.selectedNoteId);

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } transition-all duration-300 bg-[#0F1117] border-r border-white/5 overflow-hidden flex flex-col`}
      >
        <WorkspaceSidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-white/5 bg-[#0F1117]/50 backdrop-blur-xl flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-sm font-semibold text-white">
                {selectedNote ? selectedNote.title : t('workspace.title')}
              </h1>
              <p className="text-xs text-white/40">
                {selectedNote
                  ? `${selectedNote.wordCount} ${t('editor.words')} • ${selectedNote.readingTimeMin} ${t('editor.minRead')}`
                  : t('workspace.selectPrompt')}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-white"
              title={t('import.exportNotes')}
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-white"
              title={t('import.importNotes')}
            >
              <Upload className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Editor Area */}
        <main className="flex-1 overflow-hidden">
          {selectedNote ? (
            <NoteEditor note={selectedNote} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-linear-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📝</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{t('workspace.welcome')}</h2>
                <p className="text-white/60 mb-6">
                  {t('workspace.selectPrompt')}
                </p>
                <button
                  onClick={() => setIsNewNoteOpen(true)}
                  className="bg-linear-to-r from-[#7C3AED] to-[#06B6D4] text-white font-semibold px-6 py-2 rounded-lg hover:opacity-90"
                >
                  {t('workspace.createFirstNote')}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      <NewNoteDialog open={isNewNoteOpen} onOpenChange={setIsNewNoteOpen} />

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
