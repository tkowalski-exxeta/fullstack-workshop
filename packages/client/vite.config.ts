/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
    proxy: {
      "/graphql": "http://localhost:3000/graphql",
    },
  },
  plugins: [
    react({
      // plugins: [
      //   [
      //     "@graphql-codegen/client-preset-swc-plugin",
      //     { artifactDirectory: "./src/gql", gqlTagName: "graphql" },
      //   ],
      // ],
    }),
  ],

  test: {
    globals: true,
    environment: "jsdom",
    include: ["tests/unit/**/*.test.ts(x)"],
    setupFiles: ["./tests/setup.ts"],
  },
});
