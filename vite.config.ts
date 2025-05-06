import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig(({ isSsrBuild }) => ({
  build: {
    rollupOptions: isSsrBuild
      ? {
          input: "./server/app.ts",
        }
      : undefined,
  },
  plugins: [
    tailwindcss(), 
    reactRouter(), 
    tsconfigPaths(),
    nodePolyfills({
      // Whether to polyfill specific nodejs globals and modules
      include: ['fs', 'path'],
      // Whether to polyfill `node:` protocol imports
      protocolImports: true,
    }),
  ],
}));
