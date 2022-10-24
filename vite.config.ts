import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import postcssNesting from "postcss-nested"
import postcssMixins from "postcss-mixins"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [postcssNesting, postcssMixins],
    },
  },
})
