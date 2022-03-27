import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { UserConfig } from 'vite';

export const plugins: UserConfig['plugins'] = [
  react(),
  wasm(),
  topLevelAwait(),
];
