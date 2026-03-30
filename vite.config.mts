import { defineConfig } from 'vite';
import { redwood } from 'rwsdk/vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  ssr: {
    noExternal: true,
  },
  environments: {
    ssr: {},
    worker: {
      resolve: {
        mainFields: ['module', 'browser', 'main'],
        conditions: ['workerd', 'worker', 'browser', 'import', 'require', 'default'],
      },
    },
  },
  plugins: [
    cloudflare({
      viteEnvironment: { name: 'worker' },
    }),
    redwood(),
    tailwindcss(),
  ],
});
