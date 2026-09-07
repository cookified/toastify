import { describe, it, expect, beforeAll } from "vitest";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

describe("Production bundle integrity", () => {
  const rootDir = path.resolve(__dirname, "..");
  const libDir = path.resolve(rootDir, "lib");

  beforeAll(() => {
    if (
      !fs.existsSync(path.join(libDir, "index.js")) ||
      !fs.existsSync(path.join(libDir, "styles.css"))
    ) {
      execSync("npm run build:lib", {
        cwd: rootDir,
        stdio: "ignore",
      });
    }
  });

  it("injects 'use client'; directive in ESM and CJS bundles", () => {
    const esm = fs.readFileSync(path.join(libDir, "index.js"), "utf-8");
    const cjs = fs.readFileSync(path.join(libDir, "index.cjs"), "utf-8");

    expect(
      esm.startsWith('"use client";') || esm.startsWith("'use client';"),
    ).toBe(true);
    expect(
      cjs.startsWith('"use client";') || cjs.startsWith("'use client';"),
    ).toBe(true);
  });

  it("contains zero runtime imports of external icon libraries (lucide-react)", () => {
    const esm = fs.readFileSync(path.join(libDir, "index.js"), "utf-8");
    expect(esm).not.toContain("lucide-react");
  });

  it("ships valid, non-empty standalone CSS stylesheets", () => {
    const stylesCss = fs.readFileSync(path.join(libDir, "styles.css"), "utf-8");
    const indexCss = fs.readFileSync(path.join(libDir, "index.css"), "utf-8");
    const shadcnCss = fs.readFileSync(
      path.join(libDir, "shadcn-theme.css"),
      "utf-8",
    );

    expect(stylesCss.length).toBeGreaterThan(500);
    expect(indexCss.length).toBeGreaterThan(500);
    expect(shadcnCss.length).toBeGreaterThan(200);
    expect(stylesCss).toContain("--toastify-bg");
    expect(stylesCss).toContain(".toastify-toaster");
    expect(shadcnCss).toContain("--card");
  });
});
