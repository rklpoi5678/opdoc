import type { LayoutProps } from 'rwsdk/router';
import { WorkspaceProvider } from '@/contexts/WorkspaceContext';

export function WorkspaceLayout({ children, requestInfo }: LayoutProps) {
  const projectId = requestInfo?.params?.projectId as string || 'default';
  return <WorkspaceProvider projectId={projectId}>{children}</WorkspaceProvider>;
}
