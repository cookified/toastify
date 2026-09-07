import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcCss = path.resolve(__dirname, "../src/toastify/styles.css");
const srcShadcn = path.resolve(__dirname, "../src/toastify/shadcn-theme.css");
const libDir = path.resolve(__dirname, "../lib");

if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

// 1. Copy standalone CSS files
fs.copyFileSync(srcCss, path.join(libDir, "styles.css"));
fs.copyFileSync(srcCss, path.join(libDir, "index.css"));
if (fs.existsSync(srcShadcn)) {
  fs.copyFileSync(srcShadcn, path.join(libDir, "shadcn-theme.css"));
}
console.log("⚡️ Postbuild: CSS copied to lib/styles.css, lib/index.css, and lib/shadcn-theme.css");

// 2. Ensure "use client"; directive at top of bundles for Next.js App Router
const banner = '"use client";\n';
const jsPath = path.join(libDir, "index.js");
const cjsPath = path.join(libDir, "index.cjs");

if (fs.existsSync(jsPath)) {
  const content = fs.readFileSync(jsPath, "utf-8");
  if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
    fs.writeFileSync(jsPath, banner + content, "utf-8");
    console.log("⚡️ Injected 'use client'; banner to lib/index.js");
  }
}

if (fs.existsSync(cjsPath)) {
  const content = fs.readFileSync(cjsPath, "utf-8");
  if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
    fs.writeFileSync(cjsPath, banner + content, "utf-8");
    console.log("⚡️ Injected 'use client'; banner to lib/index.cjs");
  }
}
