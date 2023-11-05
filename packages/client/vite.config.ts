import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/graphql": "http://localhost:3000/graphql",
    },
  },
  plugins: [
    react({
      plugins: [
        [
          "@graphql-codegen/client-preset-swc-plugin",
          { artifactDirectory: "./src/gql", gqlTagName: "graphql" },
        ],
      ],
    }),
  ],
})
