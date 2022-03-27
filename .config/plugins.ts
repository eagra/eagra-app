import react from '@vitejs/plugin-react';
// import wasmLoader from 'esbuild-plugin-wasm';
import wasm from 'vite-plugin-wasm';
import { UserConfig } from 'vite';

export const plugins: UserConfig['plugins'] = [react(), wasm()];
