'use client';
/**
 * opdoc workspace context
 * 로컬 스토리지 기반 워크스페이스 상태 관리 (추후 DB연결)
 * 노트, 폴더, 태그, 프론트매터 관리
 */

/*
 * NoteFlow AI — Workspace Context
 * 로컬 스토리지 기반 워크스페이스 상태 관리
 * 노트, 폴더, 태그, 프론트매터 관리
 */

import { useState, useEffect, ReactNode, createContext, useContext } from 'react';
import { getLocalStorage, setLocalStorage } from '@/lib/workspaceStorage';
// import { ollamaService } from '@/lib/ollamaService';

export interface Note {
  id: string;
  title: string;
  slug: string;
  content: string;
  folderId: string;
  tags: string[];
  frontmatter: {
    category?: string;
    status: 'draft' | 'final' | 'archived';
    importance: 1 | 2 | 3 | 4 | 5 | 'medium';
    createdAt: string;
    updatedAt: string;
    relatedTopics?: string[];
    summary?: string;
  };
  wordCount: number;
  readingTimeMin: number;
  isProcessing?: boolean;
}

export interface Folder {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  color?: string;
  icon?: string;
  count?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  count: number;
}

export interface WorkspaceState {
  notes: Note[];
  folders: Folder[];
  tags: Tag[];
  selectedNoteId: string | null;
  selectedFolderId: string;
  searchQuery: string;
}

interface WorkspaceContextType {
  state: WorkspaceState;
  createNote: (title: string, folderId: string) => Note;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  createFolder: (name: string, parentId?: string) => Folder;
  deleteFolder: (id: string) => void;
  selectNote: (id: string | null) => void;
  selectFolder: (id: string) => void;
  setSearchQuery: (query: string) => void;
  processNoteWithAI: (noteId: string, model?: string) => Promise<void>;
  importMarkdownZip: (files: Array<{ name: string; content: string }>) => Promise<void>;
  exportNotes: () => string;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

const DEFAULT_FOLDERS: Folder[] = [
  {
    id: 'inbox',
    name: 'Inbox',
    slug: 'inbox',
    parentId: null,
    color: '#7C3AED',
    icon: '📥',
  },
  {
    id: 'projects',
    name: 'Projects',
    slug: 'projects',
    parentId: null,
    color: '#06B6D4',
    icon: '📁',
  },
  {
    id: 'archive',
    name: 'Archive',
    slug: 'archive',
    parentId: null,
    color: '#6B7280',
    icon: '📦',
  },
];

export function WorkspaceProvider({
  children,
  projectId,
}: {
  children: ReactNode;
  projectId: string;
}) {
  const [state, setState] = useState<WorkspaceState>({
    notes: [],
    folders: DEFAULT_FOLDERS,
    tags: [],
    selectedNoteId: null,
    selectedFolderId: 'inbox',
    searchQuery: '',
  });

  const [isMounted, setIsMounted] = useState(false);
  const storageKey = `noteflow_workspace_${projectId}`;

  // Load from localStorage on mount or when projectId changes
  useEffect(() => {
    setIsMounted(true);
    const saved = getLocalStorage(storageKey);
    if (saved) {
      try {
        const parsed = typeof saved === 'string' ? JSON.parse(saved) : saved;
        setState((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to parse saved workspace', e);
      }
    } else {
      // Reset state when switching to a new project without saved state
      setState({
        notes: [],
        folders: DEFAULT_FOLDERS,
        tags: [],
        selectedNoteId: null,
        selectedFolderId: 'inbox',
        searchQuery: '',
      });
    }
  }, [projectId]);

  useEffect(() => {
    if (isMounted) {
      setLocalStorage(storageKey, state);
    }
  }, [state, isMounted, storageKey]);

  const createNote = (title: string, folderId: string): Note => {
    const id = `note_${Date.now()}`;
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const newNote: Note = {
      id,
      title,
      slug,
      content: '',
      folderId,
      tags: [],
      frontmatter: {
        status: 'draft',
        importance: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      wordCount: 0,
      readingTimeMin: 0,
    };

    setState((prev) => ({
      ...prev,
      notes: [...prev.notes, newNote],
      selectedNoteId: id,
    }));

    return newNote;
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setState((prev) => ({
      ...prev,
      notes: prev.notes.map((note) =>
        note.id === id
          ? {
              ...note,
              ...updates,
              frontmatter: {
                ...note.frontmatter,
                ...updates.frontmatter,
                updatedAt: new Date().toISOString(),
              },
              wordCount: updates.content ? updates.content.split(/\s+/).length : note.wordCount,
              readingTimeMin: updates.content
                ? Math.ceil(updates.content.split(/\s+/).length / 200)
                : note.readingTimeMin,
            }
          : note,
      ),
    }));
  };

  const deleteNote = (id: string) => {
    setState((prev) => ({
      ...prev,
      notes: prev.notes.filter((note) => note.id !== id),
      selectedNoteId: null,
    }));
  };

  const createFolder = (name: string, parentId?: string): Folder => {
    const id = `folder_${Date.now()}`;
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const newFolder: Folder = {
      id,
      name,
      slug,
      parentId: parentId || null,
    };

    setState((prev) => ({
      ...prev,
      folders: [...prev.folders, newFolder],
    }));

    return newFolder;
  };

  const deleteFolder = (id: string) => {
    setState((prev) => ({
      ...prev,
      folders: prev.folders.filter((folder) => folder.id !== id),
      notes: prev.notes.map((note) =>
        note.folderId === id ? { ...note, folderId: 'inbox' } : note,
      ),
    }));
  };

  const selectNote = (id: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedNoteId: id,
    }));
  };

  const selectFolder = (id: string) => {
    setState((prev) => ({
      ...prev,
      selectedFolderId: id,
      selectedNoteId: null,
    }));
  };

  const setSearchQuery = (query: string) => {
    setState((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  };

  const processNoteWithAI = async (noteId: string) => {
    const note = state.notes.find((n) => n.id === noteId);
    if (!note) return;

    // AI 처리 시뮬레이션
    updateNote(noteId, { isProcessing: true });

    // 시뮬레이션: 프론트매터 자동 생성
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const categories = ['Work', 'Personal', 'Learning', 'Ideas', 'Projects'];
    const importance = Math.floor(Math.random() * 5) + 1;
    const autoTags = generateAutoTags(note.content);
    const category = categories[Math.floor(Math.random() * categories.length)];

    updateNote(noteId, {
      tags: autoTags,
      frontmatter: {
        ...note.frontmatter,
        category,
        importance: importance as 1 | 2 | 3 | 4 | 5,
        relatedTopics: autoTags,
      },
      isProcessing: false,
    });

    // 태그 업데이트
    setState((prev) => {
      const newTags = [...prev.tags];
      autoTags.forEach((tag) => {
        const existing = newTags.find((t) => t.slug === tag.toLowerCase());
        if (existing) {
          existing.count++;
        } else {
          newTags.push({
            id: `tag_${Date.now()}_${Math.random()}`,
            name: tag,
            slug: tag.toLowerCase(),
            count: 1,
          });
        }
      });
      return { ...prev, tags: newTags };
    });
  };

  const importMarkdownZip = async (files: Array<{ name: string; content: string }>) => {
    for (const file of files) {
      const title = file.name.replace('.md', '');
      const note = createNote(title, 'inbox');
      updateNote(note.id, { content: file.content });
      await processNoteWithAI(note.id);
    }
  };

  const exportNotes = (): string => {
    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      notes: state.notes,
      folders: state.folders,
      tags: state.tags,
    };
    return JSON.stringify(exportData, null, 2);
  };

  return (
    <WorkspaceContext.Provider
      value={{
        state,
        createNote,
        updateNote,
        deleteNote,
        createFolder,
        deleteFolder,
        selectNote,
        selectFolder,
        setSearchQuery,
        processNoteWithAI,
        importMarkdownZip,
        exportNotes,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within WorkspaceProvider');
  }
  return context;
}

// AI 태그 생성 헬퍼 함수
function generateAutoTags(content: string): string[] {
  const keywords = [
    'meeting',
    'project',
    'idea',
    'bug',
    'feature',
    'design',
    'marketing',
    'sales',
    'support',
    'research',
    'todo',
    'important',
  ];

  const contentLower = content.toLowerCase();
  const foundTags = keywords.filter((kw) => contentLower.includes(kw));

  // 추가 태그: 첫 문장에서 주요 단어 추출
  const firstSentence = content.split('\n')[0];
  const words = firstSentence
    .split(/\s+/)
    .filter((w) => w.length > 4)
    .slice(0, 2);

  const uniqueTags = Array.from(new Set([...foundTags, ...words]));
  return uniqueTags.slice(0, 5);
}
