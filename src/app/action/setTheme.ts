'use server';

import { requestInfo } from 'rwsdk/worker';

export async function setTheme(theme: 'dark' | 'light' | 'system') {
  requestInfo.response.headers.set(
    'set-cookie',
    `theme=${theme}; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`,
  );
}
