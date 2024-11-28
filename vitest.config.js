import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    include: ['test/*.vue.test.js'],
    alias: {
      'country-flag-icons/vue/3x2': process.cwd() + '/vue/3x2',
      'country-flag-icons': process.cwd(),
    },
  },
})
