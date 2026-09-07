import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { CodeBlock } from "./CodeBlock";

type PackageManager = "pnpm" | "npm" | "bun";

const installCommands: Record<PackageManager, string> = {
  pnpm: "pnpm add @cookified/toastify motion",
  npm: "npm i @cookified/toastify motion",
  bun: "bun add @cookified/toastify motion",
};

const nextjsSetupSnippet = `// app/layout.tsx (Next.js App Router)
import { Toaster } from "@cookified/toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Toastify works seamlessly in Next.js App Router & Pages Router */}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}`;

const reactSetupSnippet = `// App.tsx (Vite / React 18 / React 19 / Remix)
import { Toaster, toast } from "@cookified/toastify";

export default function App() {
  return (
    <div>
      <button onClick={() => toast.success("Event dispatched!")}>
        Fire Toast
      </button>
      <Toaster position="bottom-right" />
    </div>
  );
}`;

export function Quickstart() {
  const [pm, setPm] = useState<PackageManager>("pnpm");
  const [copied, setCopied] = useState(false);
  const [activeFrameworkTab, setActiveFrameworkTab] = useState<
    "nextjs" | "react"
  >("nextjs");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommands[pm]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-neutral-950 dark:text-white">
          Quickstart &amp; Setup
        </h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Add the toaster to your root layout and trigger notifications from
          anywhere.
        </p>
      </div>

      {/* Step 1: Install Dependencies */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-neutral-900 dark:text-white">
          1. Install package and peer dependencies:
        </div>
        <div className="overflow-hidden rounded-xl border border-neutral-200/90 bg-[#0d0d0f] text-white shadow-md dark:border-neutral-800">
          <div className="flex items-center justify-between border-b border-neutral-800/80 bg-[#121215] px-3 py-2 text-xs">
            <div className="flex gap-1 rounded-lg bg-neutral-900 p-0.5">
              {(["pnpm", "npm", "bun"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPm(m)}
                  className={`cursor-pointer rounded px-2.5 py-0.5 font-mono text-xs transition-colors ${
                    pm === m
                      ? "bg-neutral-800 text-white font-medium shadow-xs"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs text-neutral-400 hover:text-white"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400 font-mono">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3.5 font-mono text-xs text-emerald-400">
            <code>{installCommands[pm]}</code>
          </div>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Built on Motion as a feature: Toastify leverages Motion (
          <code className="font-mono text-neutral-700 dark:text-neutral-300">
            motion
          </code>
          ) for authentic spring physics, fluid stack compression, and gesture
          dismissal without redundant animation runtimes.
        </p>
      </div>

      {/* Step 2: Add Toaster to Root */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-neutral-900 dark:text-white">
            2. Add Toaster to your application root:
          </div>

          {/* Framework Tab Switcher */}
          <div className="flex gap-1 rounded-lg border border-neutral-200 bg-neutral-100 p-0.5 text-xs dark:border-neutral-800 dark:bg-neutral-900">
            <button
              type="button"
              onClick={() => setActiveFrameworkTab("nextjs")}
              className={`cursor-pointer rounded px-2.5 py-0.5 transition-colors ${
                activeFrameworkTab === "nextjs"
                  ? "bg-white font-medium text-neutral-950 shadow-xs dark:bg-[#1f1f23] dark:text-white"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              Next.js
            </button>
            <button
              type="button"
              onClick={() => setActiveFrameworkTab("react")}
              className={`cursor-pointer rounded px-2.5 py-0.5 transition-colors ${
                activeFrameworkTab === "react"
                  ? "bg-white font-medium text-neutral-950 shadow-xs dark:bg-[#1f1f23] dark:text-white"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              React / Vite
            </button>
          </div>
        </div>

        <CodeBlock
          code={
            activeFrameworkTab === "nextjs"
              ? nextjsSetupSnippet
              : reactSetupSnippet
          }
          filename={
            activeFrameworkTab === "nextjs" ? "app/layout.tsx" : "src/App.tsx"
          }
        />
      </div>

      {/* Step 3: Trigger anywhere */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-neutral-900 dark:text-white">
          3. Dispatch notifications from any component:
        </div>
        <CodeBlock
          code={`import { toast } from "@cookified/toastify";

// Basic notification
toast("Profile updated", {
  description: "Changes saved to your workspace",
  action: {
    label: "Undo",
    onClick: () => revertProfile(),
  },
});`}
          filename="UserActions.tsx"
        />
      </div>

      {/* Step 4: Create custom states */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-neutral-900 dark:text-white">
          4. Create custom states (optional):
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          Define reusable notification states once with your own icons, styling,
          or duration:
        </p>
        <CodeBlock
          code={`import { toast } from "@cookified/toastify";
import { Sparkles } from "lucide-react"; // works with Lucide, Heroicons, or any custom SVG

// Define a custom state once
const toastAi = toast.variant({
  icon: <Sparkles className="w-4 h-4 text-amber-400" />,
  duration: 4000,
  className: "border-amber-500/30",
});

// Dispatch anywhere across your app
toastAi("Model synthesized", {
  description: "Generated 12 UI variations",
});`}
          filename="notifications.ts"
        />
      </div>

      {/* Step 5: Customizing Theme and Colors */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-neutral-900 dark:text-white">
          5. Themes &amp; color customization:
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          Switch themes via the{" "}
          <code className="font-mono text-neutral-800 dark:text-neutral-200">
            theme
          </code>{" "}
          prop or style toast cards globally and per-toast:
        </p>
        <CodeBlock
          code={`// 1. Theme switching on Toaster
<Toaster theme="system" /> // "light" | "dark" | "system"

// 2. Global styling via toastOptions
<Toaster
  toastOptions={{
    className: "bg-zinc-950 text-zinc-100 border-zinc-800",
    style: { backgroundColor: "#09090b" },
  }}
/>

// 3. Per-toast colors & styles
toast("Deployment Finished", {
  className: "bg-emerald-950/80 text-emerald-100 border-emerald-800",
  style: { borderColor: "#10b981" },
});`}
          filename="ThemeExample.tsx"
        />
      </div>
    </div>
  );
}
