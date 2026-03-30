'use client';

import { useState, useRef } from 'react';
import { useProjects } from '@/contexts/ProjectContext';
import { useI18n } from '@/contexts/I18nContext';
import { Folder, Plus, MoreVertical, Settings, Trash2, Upload, Loader2 } from 'lucide-react';
import { processObsidianFiles } from '@/lib/obsidianImporter';
import { setLocalStorage } from '@/lib/workspaceStorage';

export default function ProjectList() {
  const { state, createProject, deleteProject } = useProjects();
  const { t } = useI18n();
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createProject(newTitle.trim(), newDesc.trim());
    setIsCreating(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsImporting(true);
    try {
      // Get the vault name from the first file's root directory name
      const firstPath = files[0].webkitRelativePath || '';
      const vaultName = firstPath.split('/')[0] || 'Imported Vault';

      const importedData = await processObsidianFiles(files, vaultName);
      
      const newProject = createProject(importedData.projectName, 'Imported from Obsidian');
      
      // Save the workspace data directly to localStorage so it's loaded when switching
      const storageKey = `noteflow_workspace_${newProject.id}`;
      setLocalStorage(storageKey, {
        notes: importedData.notes,
        folders: importedData.folders,
        tags: importedData.tags,
        selectedNoteId: importedData.notes.length > 0 ? importedData.notes[0].id : null,
        selectedFolderId: 'inbox',
        searchQuery: ''
      });

    } catch (error) {
      console.error('Import failed', error);
      alert('Failed to import vault.');
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('projects.myVaults')}</h1>
            <p className="text-white/40 text-sm">{t('projects.selectVault')}</p>
          </div>
          <div className="flex items-center gap-3">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              className="hidden"
              // @ts-ignore - webkitdirectory is non-standard but widely supported
              webkitdirectory=""
              directory=""
              multiple
            />
            <button
              onClick={handleImportClick}
              disabled={isImporting}
              className="flex items-center gap-2 bg-white/5 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              {isImporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {t('import.importNotes')}
            </button>
            <button
              onClick={() => setIsCreating(true)}
              disabled={isImporting}
              className="flex items-center gap-2 bg-linear-to-r from-[#7C3AED] to-[#06B6D4] text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              {t('projects.newVault')}
            </button>
          </div>
        </div>

        {isCreating && (
          <form onSubmit={handleCreate} className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl max-w-md">
            <h2 className="text-lg font-semibold mb-4">{t('projects.newVault')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/60 mb-1">{t('projects.vaultName')}</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
                  autoFocus
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-1">{t('projects.descriptionOpt')}</label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
              <div className="pt-2 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-sm text-white/60 hover:text-white"
                >
                  {t('projects.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-violet-600 hover:bg-violet-500 rounded-lg font-semibold"
                >
                  {t('projects.create')}
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.projects.map((project) => (
            <a
              key={project.id}
              href={`/workspace/${project.id}`}
              className="group relative bg-[#0D0F14] border border-white/5 hover:border-violet-500/50 rounded-2xl p-6 transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] block cursor-pointer"
            >
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (confirm(t('projects.deleteConfirm'))) {
                      deleteProject(project.id);
                    }
                  }}
                  className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 border border-white/10 flex items-center justify-center mb-4">
                <span className="text-2xl">{project.icon || '📁'}</span>
              </div>
              
              <h3 className="text-lg font-bold mb-2 group-hover:text-violet-300 transition-colors">
                {project.name}
              </h3>
              
              <p className="text-sm text-white/40 mb-6 line-clamp-2 min-h-[40px]">
                {project.description || 'No description provided.'}
              </p>
              
              <div className="flex items-center justify-between text-xs text-white/30 border-t border-white/5 pt-4">
                <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                <span className="text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('projects.openVault')}
                </span>
              </div>
            </a>
          ))}
        </div>
        
        {state.projects.length === 0 && !isCreating && (
          <div className="text-center py-20 bg-[#0D0F14] rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-2">{t('projects.noVaults')}</h3>
            <p className="text-white/40 mb-6">{t('projects.createFirstVault')}</p>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              {t('projects.newVault')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
