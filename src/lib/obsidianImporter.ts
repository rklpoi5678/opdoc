import { Note, Folder } from '@/contexts/WorkspaceContext';

export interface ImportedVault {
  projectName: string;
  folders: Folder[];
  notes: Note[];
  tags: string[];
}

/**
 * Parses simple YAML frontmatter.
 * Doesn't support nested objects or complex arrays currently,
 * but handles tags: [a, b] or tags:\n - a\n - b
 */
function parseFrontmatter(text: string): { frontmatter: any; body: string } {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: text };

  const frontmatterText = match[1];
  const body = match[2];
  const frontmatter: any = {};

  const lines = frontmatterText.split('\n');
  let currentKey = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Matches `key: value` or `key:`
    const kvMatch = trimmed.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      const val = kvMatch[2].trim();
      
      if (val.startsWith('[')) {
        // e.g. tags: [a, b]
        const items = val.replace(/^\[|\]$/g, '').split(',').map(s => s.trim()).filter(Boolean);
        frontmatter[currentKey] = items;
      } else if (val === '') {
        // e.g. tags:
        //       - a
        frontmatter[currentKey] = [];
      } else {
        frontmatter[currentKey] = val.replace(/^['"]|['"]$/g, ''); // strip quotes
      }
    } else if (trimmed.startsWith('-') && currentKey && Array.isArray(frontmatter[currentKey])) {
      // List item
      frontmatter[currentKey].push(trimmed.substring(1).trim().replace(/^['"]|['"]$/g, ''));
    }
  }

  return { frontmatter, body };
}

export async function processObsidianFiles(files: File[], projectName: string): Promise<ImportedVault> {
  const foldersMap = new Map<string, string>(); // path -> id
  const folders: Folder[] = [];
  const notes: Note[] = [];
  const allTags = new Set<string>();

  // Add default inbox
  foldersMap.set('', 'inbox');
  folders.push({ id: 'inbox', name: 'Inbox', slug: 'inbox', parentId: null, icon: '📥', count: 0 });

  for (const file of files) {
    if (!file.name.endsWith('.md')) continue;

    // WebKit path mapping
    // e.g., "VaultName/Folder/Subfolder/note.md"
    const parts = file.webkitRelativePath.split('/');
    parts.shift(); // remove root 'VaultName' dir
    const fileName = parts.pop() || file.name;
    const folderPath = parts.join('/');

    let folderId = 'inbox';
    if (folderPath) {
      if (!foldersMap.has(folderPath)) {
        const newFolderId = `folder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        foldersMap.set(folderPath, newFolderId);
        folders.push({
          id: newFolderId,
          name: parts[parts.length - 1], // Last path segment is folder name
          slug: parts[parts.length - 1].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          parentId: null,
          icon: '📁',
          count: 0
        });
      }
      folderId = foldersMap.get(folderPath)!;
    }

    const text = await file.text();
    const { frontmatter, body } = parseFrontmatter(text);

    const title = frontmatter.title || fileName.replace(/\.md$/, '');
    
    // Process tags
    let rawTags: string[] = [];
    if (Array.isArray(frontmatter.tags)) rawTags = frontmatter.tags;
    else if (typeof frontmatter.tags === 'string') rawTags = frontmatter.tags.split(',').map((t: string) => t.trim());
    
    rawTags.forEach((t: string) => allTags.add(t));

    const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
    
    const note: Note = {
      id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      content: body,
      folderId,
      tags: rawTags,
      isProcessing: false,
      wordCount,
      readingTimeMin: Math.max(1, Math.ceil(wordCount / 200)),
      frontmatter: {
        category: frontmatter.category || 'General',
        status: frontmatter.status || 'draft',
        importance: frontmatter.importance || 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        relatedTopics: frontmatter.relatedTopics || [],
        summary: frontmatter.summary || '',
      }
    };
    
    notes.push(note);
  }

  // Update folder counts
  notes.forEach(note => {
    const f = folders.find(f => f.id === note.folderId);
    if (f) f.count = (f.count || 0) + 1;
  });

  return {
    projectName,
    folders,
    notes,
    tags: Array.from(allTags)
  };
}
