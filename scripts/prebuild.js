import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcCss = path.resolve(__dirname, "../src/toastify/styles.css");
const stylesTsPath = path.resolve(__dirname, "../src/toastify/styles.ts");

// Auto-generate src/toastify/styles.ts from styles.css (single source of truth)
const cssContent = fs.readFileSync(srcCss, "utf-8");
const stylesTsContent = `// Auto-generated from styles.css during build. Do not edit directly.
export const toastifyStyles = ${JSON.stringify(cssContent)};
`;
fs.writeFileSync(stylesTsPath, stylesTsContent, "utf-8");
console.log("⚡️ Prebuild: Generated src/toastify/styles.ts from styles.css");
