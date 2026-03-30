'use client';

/*
 * NoteFlow AI — Dashboard Demo Page
 * Style: Neo-Brutalist SaaS × Obsidian Dark Mode
 * Interactive demo: File tree, AI processing, tag automation, import flow
 */

import { useState, useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Zap,
  ChevronRight,
  ChevronDown,
  FileText,
  Folder,
  FolderOpen,
  Tag,
  Search,
  Upload,
  Settings,
  Home,
  BarChart2,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  X,
  Cpu,
  Shield,
  Sparkles,
  ArrowRight,
  Globe,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  tags?: string[];
  status?: 'draft' | 'final' | 'processing';
  category?: string;
  importance?: 'high' | 'medium' | 'low';
  summary?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const initialTree: FileNode[] = [
  {
    id: 'inbox',
    name: '📥 Inbox',
    type: 'folder',
    children: [
      {
        id: 'f1',
        name: 'Q2 기획 회의록.md',
        type: 'file',
        status: 'processing',
        tags: [],
        category: '',
      },
      {
        id: 'f2',
        name: '머신러닝 기초 정리.md',
        type: 'file',
        status: 'draft',
        tags: [],
        category: '',
      },
    ],
  },
  {
    id: 'projects',
    name: '📁 Projects',
    type: 'folder',
    children: [
      {
        id: 'f3',
        name: 'NoteFlow AI 로드맵.md',
        type: 'file',
        status: 'final',
        tags: ['#프로젝트', '#AI', '#로드맵'],
        category: 'Projects',
        importance: 'high',
        summary:
          'NoteFlow AI의 2025년 개발 로드맵. 로컬 AI 통합, Notion 임포트, Electron 앱 순서로 진행 예정.',
      },
      {
        id: 'f4',
        name: '마케팅 전략 2025.md',
        type: 'file',
        status: 'final',
        tags: ['#마케팅', '#전략', '#2025'],
        category: 'Projects',
        importance: 'high',
        summary: '2025년 마케팅 전략 문서. SNS 채널 확장, 콘텐츠 마케팅, 파트너십 프로그램 포함.',
      },
    ],
  },
  {
    id: 'study',
    name: '📚 Study',
    type: 'folder',
    children: [
      {
        id: 'f5',
        name: '벡터 데이터베이스 개요.md',
        type: 'file',
        status: 'final',
        tags: ['#학습', '#벡터DB', '#pgvector'],
        category: 'Study',
        importance: 'medium',
        summary: 'pgvector와 Pinecone 비교 분석. 로컬 환경에서 벡터 검색을 구현하는 방법 정리.',
      },
    ],
  },
  {
    id: 'daily',
    name: '📅 Daily',
    type: 'folder',
    children: [
      {
        id: 'f6',
        name: '2025-03-29.md',
        type: 'file',
        status: 'final',
        tags: ['#일기', '#데일리'],
        category: 'Daily',
        importance: 'low',
        summary: '오늘의 작업 로그. NoteFlow AI 대시보드 개발 완료, 다음 단계 계획 수립.',
      },
    ],
  },
];

const processedFile: FileNode = {
  id: 'f1',
  name: 'Q2 기획 회의록.md',
  type: 'file',
  status: 'final',
  tags: ['#업무', '#회의', '#Q2-기획', '#마케팅'],
  category: 'Projects',
  importance: 'high',
  summary:
    '2025년 Q2 마케팅 기획 회의 내용. 신규 채널 론칭, 예산 배분, KPI 설정에 대한 팀 합의 사항 포함.',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function FileTreeNode({
  node,
  depth = 0,
  selectedId,
  onSelect,
}: {
  node: FileNode;
  depth?: number;
  selectedId: string | null;
  onSelect: (node: FileNode) => void;
}) {
  const [open, setOpen] = useState(depth === 0);
  const isSelected = selectedId === node.id;

  if (node.type === 'folder') {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left text-sm transition-colors hover:bg-white/5 ${
            open ? 'text-white' : 'text-white/60'
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {open ? (
            <ChevronDown className="w-3.5 h-3.5 text-white/30 shrink-0" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-white/30 shrink-0" />
          )}
          {open ? (
            <FolderOpen className="w-4 h-4 text-amber-400 shrink-0" />
          ) : (
            <Folder className="w-4 h-4 text-amber-400/60 shrink-0" />
          )}
          <span className="truncate">{node.name}</span>
          {node.children && (
            <span className="ml-auto text-xs text-white/20 font-mono">{node.children.length}</span>
          )}
        </button>
        {open && node.children && (
          <div>
            {node.children.map((child) => (
              <FileTreeNode
                key={child.id}
                node={child}
                depth={depth + 1}
                selectedId={selectedId}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const statusColor =
    node.status === 'final'
      ? 'text-emerald-400'
      : node.status === 'processing'
        ? 'text-amber-400'
        : 'text-white/40';

  return (
    <button
      onClick={() => onSelect(node)}
      className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left text-sm transition-all ${
        isSelected
          ? 'bg-violet-500/15 text-white border border-violet-500/20'
          : 'hover:bg-white/5 text-white/60 hover:text-white/80'
      }`}
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
    >
      <FileText className={`w-3.5 h-3.5 shrink-0 ${statusColor}`} />
      <span className="truncate text-xs">{node.name}</span>
      {node.status === 'processing' && (
        <RefreshCw className="w-3 h-3 ml-auto text-amber-400 animate-spin shrink-0" />
      )}
    </button>
  );
}

function AIProcessingPanel({ file, lang }: { file: FileNode; lang: 'ko' | 'en' }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const steps =
    lang === 'ko'
      ? [
          '파일 읽는 중...',
          '텍스트 임베딩 생성 중...',
          '카테고리 분류 중...',
          '태그 추출 중...',
          '중복 태그 병합 중...',
          '프론트매터 작성 중...',
          '폴더 이동 결정 중...',
          '✓ 정리 완료!',
        ]
      : [
          'Reading file...',
          'Generating text embeddings...',
          'Classifying category...',
          'Extracting tags...',
          'Merging duplicate tags...',
          'Writing frontmatter...',
          'Deciding folder move...',
          '✓ Organization complete!',
        ];

  useEffect(() => {
    setStep(0);
    setDone(false);
    intervalRef.current = setInterval(() => {
      setStep((s) => {
        if (s >= steps.length - 1) {
          clearInterval(intervalRef.current);
          setDone(true);
          return s;
        }
        return s + 1;
      });
    }, 500);
    return () => clearInterval(intervalRef.current);
  }, [file.id]);

  return (
    <div className="rounded-xl bg-[#0F1117]/80 border border-white/5 p-4 font-mono text-xs">
      <div className="flex items-center gap-2 mb-3">
        <Cpu className="w-3.5 h-3.5 text-violet-400" />
        <span className="text-violet-300 font-semibold">
          {lang === 'ko' ? 'NoteFlow AI 처리 로그' : 'NoteFlow AI Processing Log'}
        </span>
        {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-auto" />}
      </div>
      <div className="space-y-1">
        {steps.slice(0, step + 1).map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 ${
              i === step && !done
                ? 'text-amber-300'
                : s.startsWith('✓')
                  ? 'text-emerald-400'
                  : 'text-white/40'
            }`}
          >
            <span className="text-white/20">{String(i + 1).padStart(2, '0')}</span>
            <span>{s}</span>
            {i === step && !done && <span className="animate-type-cursor text-amber-400">|</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [tree, setTree] = useState<FileNode[]>(initialTree);
  const [activeTab, setActiveTab] = useState<'editor' | 'import' | 'search'>('editor');
  const [searchQuery, setSearchQuery] = useState('');
  const [importStep, setImportStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<string[]>([]);

  const toggleLang = () => setLang((l) => (l === 'ko' ? 'en' : 'ko'));

  const tx = {
    ko: {
      title: '대시보드',
      subtitle: 'Opdoc데모',
      backToHome: '홈으로',
      fileTree: '파일 트리',
      editor: '에디터',
      import: '임포트',
      search: '검색',
      noFileSelected: '파일을 선택하세요',
      noFileDesc: '왼쪽 파일 트리에서 노트를 선택하면 AI 분석 결과를 확인할 수 있습니다.',
      frontmatter: '프론트매터 (자동 생성)',
      aiSummary: 'AI 3줄 요약',
      tags: '자동 태그',
      category: '카테고리',
      status: '상태',
      importance: '중요도',
      aiLog: 'AI 처리 로그',
      importTitle: '노트 임포트',
      importDesc: '기존 Obsidian 볼트 또는 Notion 데이터를 가져옵니다.',
      importSteps: ['소스 선택', '파일 분석', '변환 중', '완료'],
      importObsidian: 'Obsidian 볼트 선택',
      importNotion: 'Notion 연동',
      importProgress: '변환 진행률',
      importFiles: [
        '회의록_2024.md',
        '프로젝트_계획서.md',
        '학습_노트.md',
        '일기_모음.md',
        '아이디어_메모.md',
      ],
      importDone: '임포트 완료! 5개 파일이 AI-Ready 포맷으로 변환되었습니다.',
      searchPlaceholder: '의미로 검색하세요... (예: 마케팅 전략)',
      searchResults: '검색 결과',
      searchHint: '벡터 임베딩 기반 시맨틱 검색',
      settings: '설정',
      aiModel: 'AI 모델',
      localMode: '로컬 모드 (Ollama)',
      byokMode: 'BYOK 모드',
      processBtn: 'AI 자동 정리 실행',
      processing: '처리 중...',
    },
    en: {
      title: 'Dashboard',
      subtitle: 'Opdoc Demo',
      backToHome: 'Back to Home',
      fileTree: 'File Tree',
      editor: 'Editor',
      import: 'Import',
      search: 'Search',
      noFileSelected: 'Select a file',
      noFileDesc: 'Select a note from the file tree on the left to view AI analysis results.',
      frontmatter: 'Frontmatter (Auto-generated)',
      aiSummary: 'AI 3-Line Summary',
      tags: 'Auto Tags',
      category: 'Category',
      status: 'Status',
      importance: 'Importance',
      aiLog: 'AI Processing Log',
      importTitle: 'Import Notes',
      importDesc: 'Import from existing Obsidian vault or Notion data.',
      importSteps: ['Select Source', 'Analyze Files', 'Converting', 'Done'],
      importObsidian: 'Select Obsidian Vault',
      importNotion: 'Connect Notion',
      importProgress: 'Conversion Progress',
      importFiles: [
        'meeting_notes_2024.md',
        'project_plan.md',
        'study_notes.md',
        'diary_collection.md',
        'idea_memo.md',
      ],
      importDone: 'Import complete! 5 files converted to AI-Ready format.',
      searchPlaceholder: 'Search by meaning... (e.g. marketing strategy)',
      searchResults: 'Search Results',
      searchHint: 'Semantic search powered by vector embeddings',
      settings: 'Settings',
      aiModel: 'AI Model',
      localMode: 'Local Mode (Ollama)',
      byokMode: 'BYOK Mode',
      processBtn: 'Run AI Auto-Organize',
      processing: 'Processing...',
    },
  }[lang];

  const handleProcessFile = () => {
    if (!selectedFile || selectedFile.status === 'final') return;
    setIsProcessing(true);
    setTimeout(() => {
      setTree((prev) =>
        prev.map((folder) => {
          if (folder.id === 'inbox') {
            return {
              ...folder,
              children: folder.children?.filter((f) => f.id !== 'f1'),
            };
          }
          if (folder.id === 'projects') {
            return {
              ...folder,
              children: [...(folder.children || []), processedFile],
            };
          }
          return folder;
        }),
      );
      setSelectedFile(processedFile);
      setProcessedFiles((p) => [...p, 'f1']);
      setIsProcessing(false);
      toast.success(
        lang === 'ko'
          ? '✓ AI 정리 완료! Projects/ 폴더로 이동했습니다.'
          : '✓ AI organization complete! Moved to Projects/ folder.',
        { duration: 3000 },
      );
    }, 4000);
  };

  const handleImport = () => {
    if (importStep >= 3) {
      setImportStep(0);
      return;
    }
    setImportStep((s) => s + 1);
    if (importStep === 2) {
      toast.success(tx.importDone, { duration: 4000 });
    }
  };

  const searchResults = searchQuery
    ? [
        {
          file: 'NoteFlow AI 로드맵.md',
          score: 0.94,
          snippet: '2025년 개발 로드맵. 로컬 AI 통합, Notion 임포트...',
          tags: ['#프로젝트', '#AI'],
        },
        {
          file: '마케팅 전략 2025.md',
          score: 0.87,
          snippet: 'SNS 채널 확장, 콘텐츠 마케팅, 파트너십 프로그램...',
          tags: ['#마케팅', '#전략'],
        },
        {
          file: 'Q2 기획 회의록.md',
          score: 0.82,
          snippet: 'Q2 마케팅 기획 회의 내용. 신규 채널 론칭...',
          tags: ['#업무', '#회의'],
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex flex-col">
      {/* Top Bar */}
      <header className="h-12 border-b border-white/5 bg-[#0A0C12]/80 backdrop-blur-xl flex items-center px-4 gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-linear-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center">
            <Zap className="w-3 h-3 text-white" fill="white" />
          </div>
          <span className="font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <span className="gradient-text">Opdoc</span>
            <span className="text-white/60"> AI</span>
          </span>
        </div>
        <div className="w-px h-4 bg-white/10" />
        <span className="text-xs text-white/40">{tx.subtitle}</span>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="text-xs font-mono px-2 py-1 rounded border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all"
          >
            {lang === 'ko' ? 'EN' : '한'}
          </button>
          <a href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-white/40 hover:text-white h-7"
            >
              <Home className="w-3.5 h-3.5 mr-1.5" />
              {tx.backToHome}
            </Button>
          </a>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar — File Tree */}
        <aside className="w-56 border-r border-white/5 bg-[#0D0F14] flex flex-col shrink-0 overflow-hidden">
          {/* Sidebar Nav Icons */}
          <div className="flex border-b border-white/5">
            {[
              { icon: FileText, tab: 'editor', label: tx.editor },
              { icon: Upload, tab: 'import', label: tx.import },
              { icon: Search, tab: 'search', label: tx.search },
            ].map(({ icon: Icon, tab, label }) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs transition-colors ${
                  activeTab === tab
                    ? 'text-violet-400 border-b-2 border-violet-500'
                    : 'text-white/30 hover:text-white/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="text-[10px]">{label}</span>
              </button>
            ))}
          </div>

          {/* File Tree */}
          {activeTab === 'editor' && (
            <div className="flex-1 overflow-y-auto p-2">
              <div className="text-[10px] font-semibold text-white/20 uppercase tracking-wider px-2 mb-2">
                {tx.fileTree}
              </div>
              {tree.map((node) => (
                <FileTreeNode
                  key={node.id}
                  node={node}
                  selectedId={selectedFile?.id ?? null}
                  onSelect={setSelectedFile}
                />
              ))}
            </div>
          )}

          {/* Import Panel */}
          {activeTab === 'import' && (
            <div className="flex-1 overflow-y-auto p-3">
              <div className="text-xs font-semibold text-white mb-3">{tx.importTitle}</div>
              <p className="text-[11px] text-white/40 mb-4 leading-relaxed">{tx.importDesc}</p>

              <div className="space-y-2 mb-4">
                <button
                  onClick={() =>
                    toast.info(
                      lang === 'ko' ? '파일 선택 다이얼로그 — 데모 환경' : 'File dialog — demo env',
                    )
                  }
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs hover:bg-violet-500/15 transition-colors"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  {tx.importObsidian}
                </button>
                <button
                  onClick={() =>
                    toast.info(
                      lang === 'ko' ? 'Notion OAuth — 데모 환경' : 'Notion OAuth — demo env',
                    )
                  }
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs hover:bg-cyan-500/15 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {tx.importNotion}
                </button>
              </div>

              {/* Progress simulation */}
              <div className="space-y-2">
                <div className="text-[10px] text-white/30 uppercase tracking-wider">
                  {tx.importProgress}
                </div>
                {tx.importFiles.map((file, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        i < importStep
                          ? 'bg-emerald-400'
                          : i === importStep
                            ? 'bg-amber-400 animate-pulse'
                            : 'bg-white/10'
                      }`}
                    />
                    <span
                      className={`text-[11px] truncate ${
                        i < importStep
                          ? 'text-emerald-400/70'
                          : i === importStep
                            ? 'text-amber-300'
                            : 'text-white/25'
                      }`}
                    >
                      {file}
                    </span>
                  </div>
                ))}
                <Button
                  size="sm"
                  onClick={handleImport}
                  className="w-full mt-2 text-xs bg-linear-to-r from-[#7C3AED] to-[#06B6D4] text-white border-0 h-7"
                >
                  {importStep >= 3
                    ? lang === 'ko'
                      ? '다시 시뮬레이션'
                      : 'Simulate Again'
                    : importStep === 0
                      ? lang === 'ko'
                        ? '임포트 시작'
                        : 'Start Import'
                      : lang === 'ko'
                        ? '다음 단계'
                        : 'Next Step'}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Search Panel */}
          {activeTab === 'search' && (
            <div className="flex-1 overflow-y-auto p-3">
              <div className="text-xs font-semibold text-white mb-3">{tx.search}</div>
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={tx.searchPlaceholder}
                  className="w-full pl-7 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-white/20 focus:outline-none focus:border-violet-500/40"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="text-[10px] text-white/20 mb-3 font-mono">{tx.searchHint}</div>
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  {searchResults.map((r, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-white/3 border border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-medium text-white truncate">
                          {r.file}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 shrink-0 ml-1">
                          {(r.score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-[10px] text-white/35 leading-relaxed">{r.snippet}</p>
                      <div className="flex gap-1 mt-1.5 flex-wrap">
                        {r.tags.map((tag) => (
                          <span key={tag} className="tag-badge text-[9px] py-0.5 px-1.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {searchQuery && searchResults.length === 0 && (
                <div className="text-center py-6 text-white/20 text-xs">
                  {lang === 'ko' ? '검색 결과 없음' : 'No results found'}
                </div>
              )}
            </div>
          )}

          {/* Bottom: AI Model Status */}
          <div className="border-t border-white/5 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
              <span className="text-[10px] text-emerald-400 font-semibold">
                {lang === 'ko' ? '로컬 AI 활성' : 'Local AI Active'}
              </span>
            </div>
            <div className="text-[10px] text-white/25 font-mono">Ollama · nomic-embed-text</div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'editor' && (
            <>
              {selectedFile ? (
                <div className="p-6 max-w-3xl">
                  {/* File header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1
                        className="text-xl font-bold text-white mb-1"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {selectedFile.name}
                      </h1>
                      <div className="flex items-center gap-2">
                        {selectedFile.status === 'final' && (
                          <span className="flex items-center gap-1 text-xs text-emerald-400">
                            <CheckCircle2 className="w-3 h-3" />
                            {lang === 'ko' ? '정리 완료' : 'Organized'}
                          </span>
                        )}
                        {selectedFile.status === 'processing' && (
                          <span className="flex items-center gap-1 text-xs text-amber-400">
                            <Clock className="w-3 h-3" />
                            {lang === 'ko' ? '처리 대기' : 'Pending'}
                          </span>
                        )}
                        {selectedFile.status === 'draft' && (
                          <span className="flex items-center gap-1 text-xs text-white/40">
                            <AlertCircle className="w-3 h-3" />
                            {lang === 'ko' ? '미정리' : 'Unorganized'}
                          </span>
                        )}
                        {selectedFile.category && (
                          <span className="text-xs text-white/30">→ {selectedFile.category}/</span>
                        )}
                      </div>
                    </div>
                    {(selectedFile.status === 'processing' || selectedFile.status === 'draft') && (
                      <Button
                        onClick={handleProcessFile}
                        disabled={isProcessing}
                        size="sm"
                        className="shimmer bg-linear-to-r from-[#7C3AED] to-[#06B6D4] text-white border-0 text-xs font-semibold"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-3 h-3 mr-1.5 animate-spin" />
                            {tx.processing}
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3 mr-1.5" />
                            {tx.processBtn}
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {/* AI Processing Log (when processing) */}
                  {isProcessing && (
                    <div className="mb-6">
                      <AIProcessingPanel file={selectedFile} lang={lang} />
                    </div>
                  )}

                  {/* Frontmatter */}
                  {selectedFile.status === 'final' && (
                    <div className="space-y-4">
                      {/* YAML Block */}
                      <div className="rounded-xl bg-[#0F1117]/80 border border-white/5 overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-[#0A0C12]/50">
                          <Tag className="w-3.5 h-3.5 text-violet-400" />
                          <span className="text-xs font-semibold text-white/70">
                            {tx.frontmatter}
                          </span>
                          <span className="ml-auto text-[10px] font-mono text-emerald-400">
                            ✓ AI generated
                          </span>
                        </div>
                        <div className="p-4 font-mono text-xs space-y-2">
                          <div className="text-white/30">---</div>
                          <div>
                            <span className="text-cyan-400">title: </span>
                            <span className="text-emerald-300">
                              "{selectedFile.name.replace('.md', '')}"
                            </span>
                          </div>
                          <div>
                            <span className="text-cyan-400">date: </span>
                            <span className="text-white/50">2025-03-29</span>
                          </div>
                          <div className="flex items-start gap-1 flex-wrap">
                            <span className="text-cyan-400">tags: </span>
                            <div className="flex flex-wrap gap-1">
                              {(selectedFile.tags || []).map((tag) => (
                                <span key={tag} className="tag-badge">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-cyan-400">category: </span>
                            <span className="text-violet-300">{selectedFile.category}</span>
                          </div>
                          <div>
                            <span className="text-cyan-400">status: </span>
                            <span className="text-yellow-300">{selectedFile.status}</span>
                          </div>
                          <div>
                            <span className="text-cyan-400">importance: </span>
                            <span
                              className={
                                selectedFile.importance === 'high'
                                  ? 'text-red-300'
                                  : selectedFile.importance === 'medium'
                                    ? 'text-yellow-300'
                                    : 'text-white/40'
                              }
                            >
                              {selectedFile.importance}
                            </span>
                          </div>
                          <div className="text-white/30">---</div>
                        </div>
                      </div>

                      {/* AI Summary */}
                      {selectedFile.summary && (
                        <div className="rounded-xl bg-[#0F1117]/80 border border-white/5 p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-xs font-semibold text-white/70">
                              {tx.aiSummary}
                            </span>
                          </div>
                          <p className="text-sm text-white/60 leading-relaxed">
                            {selectedFile.summary}
                          </p>
                        </div>
                      )}

                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          {
                            label: tx.tags,
                            value: `${(selectedFile.tags || []).length}개`,
                            icon: Tag,
                            color: 'violet',
                          },
                          {
                            label: tx.category,
                            value: selectedFile.category || '-',
                            icon: Folder,
                            color: 'cyan',
                          },
                          {
                            label: tx.importance,
                            value: selectedFile.importance || '-',
                            icon: BarChart2,
                            color: selectedFile.importance === 'high' ? 'red' : 'amber',
                          },
                        ].map((stat, i) => (
                          <div
                            key={i}
                            className="rounded-xl bg-[#0F1117]/80 border border-white/5 p-3 text-center"
                          >
                            <stat.icon className="w-4 h-4 mx-auto mb-1.5 text-white/30" />
                            <div className="text-sm font-bold text-white">{stat.value}</div>
                            <div className="text-[10px] text-white/30 mt-0.5">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Unprocessed file hint */}
                  {(selectedFile.status === 'draft' || selectedFile.status === 'processing') &&
                    !isProcessing && (
                      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 text-center">
                        <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                        <p className="text-sm text-amber-300 font-semibold mb-1">
                          {lang === 'ko'
                            ? '아직 정리되지 않은 파일입니다'
                            : "This file hasn't been organized yet"}
                        </p>
                        <p className="text-xs text-white/40">
                          {lang === 'ko'
                            ? "'AI 자동 정리 실행' 버튼을 눌러 태그와 폴더를 자동으로 설정하세요."
                            : "Click 'Run AI Auto-Organize' to automatically set tags and folders."}
                        </p>
                      </div>
                    )}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-7 h-7 text-violet-400" />
                    </div>
                    <h3
                      className="text-lg font-bold text-white mb-2"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {tx.noFileSelected}
                    </h3>
                    <p className="text-sm text-white/40 max-w-xs">{tx.noFileDesc}</p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Import tab main content */}
          {activeTab === 'import' && (
            <div className="p-6 max-w-2xl">
              <h2
                className="text-2xl font-black text-white mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {tx.importTitle}
              </h2>
              <p className="text-white/50 text-sm mb-8">{tx.importDesc}</p>

              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-8">
                {tx.importSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        i < importStep
                          ? 'bg-emerald-500 text-white'
                          : i === importStep
                            ? 'bg-linear-to-r from-[#7C3AED] to-[#06B6D4] text-white'
                            : 'bg-white/5 text-white/30'
                      }`}
                    >
                      {i < importStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className={`text-xs ${i <= importStep ? 'text-white' : 'text-white/30'}`}>
                      {step}
                    </span>
                    {i < tx.importSteps.length - 1 && (
                      <div
                        className={`w-8 h-px ${
                          i < importStep ? 'bg-emerald-500/50' : 'bg-white/10'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Import content area */}
              <div className="rounded-2xl border border-white/5 bg-[#1A1D27]/50 p-6">
                {importStep === 0 && (
                  <div className="text-center py-8">
                    <Upload className="w-12 h-12 text-violet-400 mx-auto mb-4" />
                    <p className="text-white/60 text-sm mb-6">
                      {lang === 'ko'
                        ? 'Obsidian 볼트 폴더 또는 Notion 내보내기 파일을 선택하세요'
                        : 'Select your Obsidian vault folder or Notion export file'}
                    </p>
                    <Button
                      onClick={handleImport}
                      className="shimmer bg-linear-to-r from-[#7C3AED] to-[#06B6D4] text-white border-0 font-bold"
                    >
                      {lang === 'ko' ? '임포트 시작하기' : 'Start Import'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
                {importStep === 1 && (
                  <div>
                    <p className="text-sm text-white/60 mb-4">
                      {lang === 'ko' ? '파일 분석 중...' : 'Analyzing files...'}
                    </p>
                    <div className="space-y-2">
                      {tx.importFiles.map((file, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-2.5 rounded-lg bg-white/3"
                        >
                          <FileText className="w-4 h-4 text-white/30" />
                          <span className="text-sm text-white/60 flex-1">{file}</span>
                          <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={handleImport}
                      className="mt-4 w-full bg-violet-600/20 text-violet-300 border border-violet-500/30 hover:bg-violet-600/30"
                    >
                      {lang === 'ko' ? '변환 시작' : 'Start Conversion'}
                    </Button>
                  </div>
                )}
                {importStep === 2 && (
                  <div>
                    <p className="text-sm text-white/60 mb-4">
                      {lang === 'ko'
                        ? 'AI-Ready 포맷으로 변환 중...'
                        : 'Converting to AI-Ready format...'}
                    </p>
                    <div className="space-y-2">
                      {tx.importFiles.map((file, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-2.5 rounded-lg bg-white/3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm text-emerald-400/70 flex-1">{file}</span>
                          <span className="text-[10px] font-mono text-emerald-400">✓</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={handleImport}
                      className="mt-4 w-full shimmer bg-linear-to-r from-[#7C3AED] to-[#06B6D4] text-white border-0 font-bold"
                    >
                      {lang === 'ko' ? '완료 확인' : 'Confirm Complete'}
                    </Button>
                  </div>
                )}
                {importStep >= 3 && (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                    <p
                      className="text-lg font-bold text-white mb-2"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {lang === 'ko' ? '임포트 완료!' : 'Import Complete!'}
                    </p>
                    <p className="text-white/50 text-sm mb-6">{tx.importDone}</p>
                    <Button
                      onClick={handleImport}
                      variant="outline"
                      className="border-white/10 text-white/60 hover:text-white"
                    >
                      {lang === 'ko' ? '다시 시뮬레이션' : 'Simulate Again'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Search tab main content */}
          {activeTab === 'search' && (
            <div className="p-6 max-w-2xl">
              <h2
                className="text-2xl font-black text-white mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {tx.search}
              </h2>
              <p className="text-white/50 text-sm mb-6">{tx.searchHint}</p>
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={tx.searchPlaceholder}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/40 focus:bg-white/8 transition-all"
                />
              </div>
              {searchResults.length > 0 && (
                <div className="space-y-3">
                  <div className="text-xs text-white/30 font-mono">
                    {searchResults.length} {lang === 'ko' ? '개 결과' : 'results'}
                  </div>
                  {searchResults.map((r, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[#1A1D27]/80 border border-white/5 hover:border-violet-500/20 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-white">{r.file}</span>
                        <div className="flex items-center gap-1">
                          <div
                            className="h-1.5 rounded-full bg-linear-to-r from-[#7C3AED] to-[#06B6D4]"
                            style={{ width: `${r.score * 60}px` }}
                          />
                          <span className="text-xs font-mono text-emerald-400">
                            {(r.score * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed mb-3">{r.snippet}</p>
                      <div className="flex gap-1.5 flex-wrap">
                        {r.tags.map((tag) => (
                          <span key={tag} className="tag-badge">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!searchQuery && (
                <div className="text-center py-12">
                  <Search className="w-10 h-10 text-white/10 mx-auto mb-3" />
                  <p className="text-white/30 text-sm">
                    {lang === 'ko' ? '검색어를 입력하세요' : 'Enter a search query'}
                  </p>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Right Panel — Settings / Stats */}
        <aside className="w-52 border-l border-white/5 bg-[#0D0F14] p-4 shrink-0 hidden xl:flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-3.5 h-3.5 text-white/30" />
              <span className="text-xs font-semibold text-white/50">{tx.settings}</span>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-1.5 mb-1">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span className="text-[11px] font-semibold text-emerald-300">{tx.localMode}</span>
                </div>
                <div className="text-[10px] text-white/30 font-mono">nomic-embed-text</div>
              </div>
              <button
                onClick={() =>
                  toast.info(
                    lang === 'ko' ? 'API 키 설정 — 데모 환경' : 'API key settings — demo env',
                  )
                }
                className="w-full p-2.5 rounded-lg bg-white/3 border border-white/5 hover:bg-white/5 transition-colors text-left"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Cpu className="w-3 h-3 text-violet-400" />
                  <span className="text-[11px] font-semibold text-white/50">{tx.byokMode}</span>
                </div>
                <div className="text-[10px] text-white/20">OpenAI / Anthropic</div>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div>
            <div className="text-[10px] font-semibold text-white/20 uppercase tracking-wider mb-3">
              {lang === 'ko' ? '통계' : 'Stats'}
            </div>
            <div className="space-y-2">
              {[
                { label: lang === 'ko' ? '총 파일' : 'Total Files', value: '7' },
                { label: lang === 'ko' ? '정리 완료' : 'Organized', value: '5' },
                { label: lang === 'ko' ? '자동 태그' : 'Auto Tags', value: '18' },
                { label: lang === 'ko' ? '처리 대기' : 'Pending', value: '2' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[11px] text-white/30">{stat.label}</span>
                  <span
                    className="text-sm font-bold text-white"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-auto">
            <button
              onClick={() =>
                toast.info(lang === 'ko' ? '전체 재분류 — 데모 환경' : 'Re-classify all — demo env')
              }
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs hover:bg-violet-500/15 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              {lang === 'ko' ? '전체 재분류' : 'Re-classify All'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
