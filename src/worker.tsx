import { layout, render, route } from 'rwsdk/router';
import { defineApp } from 'rwsdk/worker';

import { Document } from '@/app/document';
import { setCommonHeaders } from '@/app/headers';
import Home from '@/app/pages/Home';
import DemoDashboard from '@/app/pages/demo/Dashboard';
import LoginPage from '@/app/pages/auth/login';
import NotFound from '@/app/pages/NotFound';
import Workspace from './app/pages/opdoc/Workspace';
import ProjectList from './app/pages/opdoc/ProjectList';
import { WorkspaceLayout } from './app/pages/opdoc/WorkspaceLayout';
import { ProjectProvider } from './contexts/ProjectContext';
import { Providers } from '@/app/providers';

export type AppContext = {
  theme?: 'dark' | 'light' | 'system';
};

export default defineApp([
  setCommonHeaders(),
  ({ ctx, request }) => {
    // setup ctx here
    const cookie = request.headers.get('cookie');
    const match = cookie?.match(/theme=([^;]+)/);
    ctx.theme = (match?.[1] as 'dark' | 'light' | 'system') || 'system';
  },
  render(Document, [
    layout(Providers, [
      route('/', Home),
      route('/login', LoginPage),
      route('/demo-dashboard', DemoDashboard),
      layout(ProjectProvider, [
        route('/workspace', ProjectList),
        layout(WorkspaceLayout, [route('/workspace/:projectId', Workspace)]),
      ]),
      route('/404', NotFound),
      route('*', NotFound),
    ]),
  ]),
]);
