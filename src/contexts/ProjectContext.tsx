'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Project {
  id: string;
  name: string;
  description: string;
  color?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectState {
  projects: Project[];
  selectedProjectId: string | null;
}

interface ProjectContextType {
  state: ProjectState;
  createProject: (name: string, description?: string, color?: string, icon?: string) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  selectProject: (id: string | null) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);
const STORAGE_KEY = 'noteflow_projects';

const DEFAULT_PROJECT: Project = {
  id: 'default',
  name: 'My Notes',
  description: 'Default vault for your notes',
  color: '#7C3AED',
  icon: '📝',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const getLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Local storage parse error', error);
      return null;
    }
  }
  return null;
};

const setLocalStorage = (key: string, value: object): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export function ProjectProvider({ children }: { children?: ReactNode }) {
  const [state, setState] = useState<ProjectState>({
    projects: [DEFAULT_PROJECT],
    selectedProjectId: null,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = getLocalStorage(STORAGE_KEY);
    if (saved && saved.projects && saved.projects.length > 0) {
      setState(saved);
    } else {
      setLocalStorage(STORAGE_KEY, state);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      setLocalStorage(STORAGE_KEY, state);
    }
  }, [state, isMounted]);

  const createProject = (name: string, description: string = '', color?: string, icon?: string): Project => {
    const newProject: Project = {
      id: `proj_${Date.now()}`,
      name,
      description,
      color,
      icon,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setState((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));

    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setState((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
      ),
    }));
  };

  const deleteProject = (id: string) => {
    setState((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
      selectedProjectId: prev.selectedProjectId === id ? null : prev.selectedProjectId,
    }));
  };

  const selectProject = (id: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedProjectId: id,
    }));
  };

  return (
    <ProjectContext.Provider
      value={{
        state,
        createProject,
        updateProject,
        deleteProject,
        selectProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectProvider');
  }
  return context;
}
