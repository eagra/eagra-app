import { defineConfig } from 'vite';
import { buildConfig, plugins } from '.';

export default defineConfig({
  esbuild: {
    ...buildConfig,
  },
  plugins,
  envPrefix: 'EAGRA_'
});
