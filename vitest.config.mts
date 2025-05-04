import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'
/// <reference types="@vitest/browser/context" />

export default defineConfig(({mode}) => ({
  
  plugins: [react(), tsconfigPaths()],
  test: {
    env: loadEnv(mode, process.cwd(), ''),
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'next.config.mjs',
        'next-env.d.ts', 
        'vitest.config.mts',
        'postcss.config.mjs',
        'tailwind.config.ts',
        '**/node_modules/**',
        '**/dist/**',
        '**/.next/**',
        '**/__tests__/**', 
        '**/interfaces/**', 
        '**/redux/**', 
        '**/components/ui/**'
      ]
    },
  },
}))