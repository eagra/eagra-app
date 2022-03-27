import { defineConfig } from 'vite';
import { buildConfig, plugins } from './.config';

export default defineConfig({
  esbuild: {
    ...buildConfig,
  },
  plugins,
});
