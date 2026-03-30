/*
 * NoteFlow AI — Workspace Sidebar
 * 폴더, 노트, 태그 네비게이션
 */

import { useState } from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { useProjects } from '@/contexts/ProjectContext';
import { useI18n } from '@/contexts/I18nContext';
import { useAISettings } from '@/contexts/AISettingsContext';
import { Folder, ChevronDown, Plus, FileText, Tag, Search, ArrowLeft, Radio } from 'lucide-react';
import { NewNoteDialog } from '@/components/workspace/NewNoteDialog';

export default function WorkspaceSidebar() {
  const { state, createNote, selectNote, selectFolder, createFolder } = useWorkspace();
  const { state: projectState } = useProjects();
  const { state: aiState } = useAISettings();
  const { t } = useI18n();
  
  const currentProject = projectState.projects.find(p => p.id === projectState.selectedProjectId) || projectState.projects[0] || { name: 'Workspace', icon: '📁' };
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['inbox']));
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [dialogFolderId, setDialogFolderId] = useState('inbox');

  const toggleFolder = (id: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedFolders(newExpanded);
  };

  const notesInFolder = (folderId: string) => state.notes.filter((n) => n.folderId === folderId);

  const handleCreateNote = (folderId: string) => {
    setDialogFolderId(folderId);
    setIsNewNoteOpen(true);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <a href="/workspace" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-semibold mb-3">
          <ArrowLeft className="w-3 h-3" />
          {t('workspace.backToVaults')}
        </a>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-linear-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-xs">
            {currentProject.icon}
          </div>
          <h2 className="font-bold text-white text-sm truncate">{currentProject.name}</h2>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder={t('workspace.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/20"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {/* Folders */}
        {state.folders.map((folder) => {
          const notesCount = notesInFolder(folder.id).length;
          const isExpanded = expandedFolders.has(folder.id);

          return (
            <div key={folder.id}>
              {/* Folder Button */}
              <button
                onClick={() => {
                  selectFolder(folder.id);
                  toggleFolder(folder.id);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  state.selectedFolderId === folder.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Folder className="w-4 h-4 shrink-0" />
                  <span className="text-sm truncate">{folder.name}</span>
                  <span className="text-xs text-white/40 shrink-0">{notesCount}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Notes in Folder */}
              {isExpanded && (
                <div className="ml-4 space-y-1 mt-1">
                  {notesInFolder(folder.id).map((note) => (
                    <button
                      key={note.id}
                      onClick={() => selectNote(note.id)}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors truncate ${
                        state.selectedNoteId === note.id
                          ? 'bg-white/10 text-white'
                          : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                      }`}
                    >
                      <FileText className="w-3 h-3 shrink-0" />
                      <span className="truncate">{note.title}</span>
                      {note.isProcessing && (
                        <span className="text-xs text-violet-400 animate-pulse shrink-0">⚡</span>
                      )}
                    </button>
                  ))}

                  {/* Add Note Button */}
                  <button
                    onClick={() => handleCreateNote(folder.id)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{t('workspace.newNote')}</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Tags Section */}
      <div className="border-t border-white/5 p-3">
        <h3 className="text-xs font-semibold text-white/60 mb-2 px-3">{t('workspace.tags')}</h3>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {state.tags.slice(0, 10).map((tag) => (
            <button
              key={tag.id}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Tag className="w-3 h-3" />
              <span className="truncate">{tag.name}</span>
              <span className="text-white/30 text-xs ml-auto">{tag.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-white/5 p-3 space-y-3">
        {/* AI Status Indicator */}
        <div className="flex items-center justify-between text-xs px-2">
          <span className="text-white/40 flex items-center gap-1.5">
            <Radio className="w-3 h-3" />
            {t('workspace.aiStatus')}
          </span>
          <div className="flex items-center gap-1.5">
            {aiState.isConnectedBase ? (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {aiState.ollamaModel}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                Offline
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => createFolder(t('workspace.newFolder'))}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t('workspace.newFolder')}
        </button>
      </div>

      <NewNoteDialog open={isNewNoteOpen} onOpenChange={setIsNewNoteOpen} folderId={dialogFolderId} />
    </div>
  );
}
