import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  outDir: "lib",
  tsconfig: "tsconfig.lib.json",
  external: ["react", "react-dom", "motion", /^motion\/.*/],
  treeshake: true,
  sourcemap: false,
});
