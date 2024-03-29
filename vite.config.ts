import react from '@vitejs/plugin-react';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import mdPlugin  from 'vite-plugin-markdown';
import fs from 'fs-extra';

// Custom plugin to copy the "markdowns" directory
const CopyMarkdownsPlugin = {
  name: 'copy-markdowns',
  apply: 'build',
  generateBundle() {
    try {
      fs.copySync('./markdowns', './dist/markdowns');
      console.log('Markdowns directory copied successfully!');
    } catch (err) {
      console.error('Error copying markdowns directory:', err);
    }
  },
};

export default defineConfig({
  define: {
    'process.env.SANDPACK_BARE_COMPONENTS': 'false',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  plugins: [
    mdPlugin(),
    react({
      babel: {
        plugins: [
          'babel-plugin-macros',
          [
            '@emotion/babel-plugin-jsx-pragmatic',
            {
              export: 'jsx',
              import: '__cssprop',
              module: '@emotion/react',
            },
          ],
          ['@babel/plugin-transform-react-jsx', { pragma: '__cssprop' }, 'twin.macro'],
        ],
      },
    }),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
      scale: 1.2,
    }),
    CopyMarkdownsPlugin, 
  ],
  assetsInclude: ["**/*.md"],
});
