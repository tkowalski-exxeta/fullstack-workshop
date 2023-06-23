/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
    proxy: {
      "/graphql": "http://localhost:3000/graphql",
    },
  },
  plugins: [react()],

  test: {
    globals: true,
    environment: 'jsdom',
    include: ["tests/unit/**/*.test.ts(x)"],
    // exclude: ["*.spec.ts"],
    setupFiles: ['./tests/setup.ts'],
  },
});
