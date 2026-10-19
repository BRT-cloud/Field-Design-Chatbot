import { defineConfig } from 'vite';

export default defineConfig({
  // 상대 경로 기본 설정: GitHub Pages, 서브디렉토리, 로컬 인트라넷 어디서든 유연하게 작동
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('curriculum-data.js')) {
            return 'curriculum-data';
          }
          if (id.includes('jszip')) {
            return 'jszip-vendor';
          }
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
});
