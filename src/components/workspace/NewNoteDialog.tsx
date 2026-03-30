import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { useI18n } from '@/contexts/I18nContext';

interface NewNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folderId?: string;
}

export function NewNoteDialog({ open, onOpenChange, folderId = 'inbox' }: NewNoteDialogProps) {
  const { createNote, selectNote } = useWorkspace();
  const { t } = useI18n();
  const [title, setTitle] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newNote = createNote(title.trim(), folderId);
    selectNote(newNote.id);
    onOpenChange(false);
    setTitle('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#0F1117] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{t('workspace.newNote')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreate} className="space-y-4 py-4">
          <div>
            <label className="block text-xs text-white/60 mb-2">{t('workspace.noteTitle')}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
              autoFocus
              required
            />
          </div>
          <DialogFooter className="sm:justify-end gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              {t('workspace.cancel')}
            </button>
            <button
              type="submit"
              className="bg-linear-to-r from-[#7C3AED] to-[#06B6D4] text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90"
            >
              {t('workspace.create')}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
