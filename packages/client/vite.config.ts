import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 4000,
    proxy: {
      "/graphql": "http://localhost:3000/graphql",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // antv: ['@ant-design/plots'],
          // antd: [
          //   'antd',
          //   '@ant-design/cssinjs',
          //   '@ant-design/icons',
          //   '@ant-design/pro-layout',
          // ],
          react: ["react", "react-dom", "react-router", "react-router-dom"],
          // apollo: ['@apollo/client', 'graphql'],
        },
      },
    },
  },
})
