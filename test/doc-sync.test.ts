import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Documentation & code synchronization", () => {
  it("synchronizes Toaster default props in code and README", () => {
    const readmePath = path.resolve(__dirname, "../README.md");
    const readme = fs.readFileSync(readmePath, "utf-8");

    const toasterPath = path.resolve(__dirname, "../src/toastify/Toaster.tsx");
    const toasterCode = fs.readFileSync(toasterPath, "utf-8");

    // Match code defaults
    expect(toasterCode).toMatch(/position\s*=\s*["']bottom-right["']/);
    expect(toasterCode).toMatch(/duration\s*=\s*3500/);
    expect(toasterCode).toMatch(/visibleToasts\s*=\s*3/);
    expect(toasterCode).toMatch(/theme\s*=\s*["']system["']/);
    expect(toasterCode).toMatch(/closeButton\s*=\s*true/);
    expect(toasterCode).toMatch(/gap\s*=\s*14/);
    expect(toasterCode).toMatch(/offset\s*=\s*["']24px["']/);

    // Match README table defaults
    expect(readme).toContain('`"bottom-right"`');
    expect(readme).toContain('`3500`');
    expect(readme).toContain('`3`');
    expect(readme).toContain('`"system"`');
    expect(readme).toContain('`true`');
    expect(readme).toContain('`14`');
    expect(readme).toContain('`"24px"`');
  });
});
