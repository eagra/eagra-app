import { UserConfig } from 'vite';
import { reactShim } from './reactShim';

export const buildConfig: UserConfig['esbuild'] = {
  jsxInject: reactShim,
  jsxFactory: 'jsx',
  jsxFragment: 'Fragment',
};
