import { render, route } from 'rwsdk/router';
import { defineApp } from 'rwsdk/worker';

import { Document } from '@/app/document';
import { setCommonHeaders } from '@/app/headers';
import NoteFlowHome from '@/app/pages/noteflow/Home';
import NoteFlowDashboard from '@/app/pages/noteflow/Dashboard';
import NoteFlowNotFound from '@/app/pages/noteflow/NotFound';

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
  render(Document, [
    route('/', () => <NoteFlowHome />),
    route('/dashboard', () => <NoteFlowDashboard />),
    route('/404', () => <NoteFlowNotFound />),
    route('*', () => <NoteFlowNotFound />),
  ]),
]);
