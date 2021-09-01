import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import styleImport from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
  ],
  base: '/h5/hiLive/',
  build: {
    assetsDir: 'assets',
    outDir: 'dist/h5/hiLive/'
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    // proxy: {
    //   '/api': {
    //     target: 'http://172.21.1.155:8480',
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@img': path.resolve(__dirname, './src/assets/img'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@page': path.resolve(__dirname, './src/page'),
      '@store': path.resolve(__dirname, './src/store'),
      '@api': path.resolve(__dirname, './src/api'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@i18n': path.resolve(__dirname, './src/i18n'),
      '@native': path.resolve(__dirname, './src/native'),
      '@composables': path.resolve(__dirname, './src/composables'),
      '@src': path.resolve(__dirname, './src'),
    },
  }

})
