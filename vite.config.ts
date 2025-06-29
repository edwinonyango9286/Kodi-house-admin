import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react()],
    server: {
      port: 6064,
      open: true,
      host:true,
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    },
  }
})