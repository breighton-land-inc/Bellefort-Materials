import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // Ensure this matches your GitHub repository name exactly
  base: '/Bellefort-Materials/', 
})