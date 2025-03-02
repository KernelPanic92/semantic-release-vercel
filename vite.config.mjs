import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import checker from "vite-plugin-checker";

export default defineConfig({
  test: {
    includeSource: ['src/**/*.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['lcov'],
      cleanOnRerun: true,
    },
  },
  build: {
    lib: {
      name: "index",
      entry: [resolve(__dirname, "src/index.ts")],
      formats: ["es"],
      tsconfigPath: "tsconfig.json",
      treeshake: true,
    },
    rollupOptions: {
      output: {
        format: "es",
        dir: "dist",
        preserveModules: true,
        exports: "named",
      },
    },
    tsconfigPath: "tsconfig.json",
    emptyOutDir: true,
    minify: false,
    manifest: true,
    sourcemap: true,
    outDir: "dist",
    ssrEmitAssets: true,
    write: true,
    reportCompressedSize: true,
    cssMinify: false,
    ssr: true,
    ssrManifest: false,
    chunkSizeWarningLimit: 500,
    commonjsOptions: {
      sourceMap: true,
      strictRequires: true,
    },
  },
  plugins: [
    checker({
      typescript: true,
    }),
    dts({
      include: ["src/"],
      tsconfigPath: "tsconfig.json",
    }),
  ],
});
