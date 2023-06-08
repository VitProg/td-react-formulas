import { defineConfig } from 'vite'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.tsx",
    })
  ],
  server: {
    port: 3000,
    hmr: {overlay: true},
  },
})
