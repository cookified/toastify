import { ArrowRight, Bell, Check, Copy, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "../../toastify";

const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring" as const, stiffness: 280, damping: 24, delay },
});

export function LandingPage({ onNavigateDocs }: { onNavigateDocs: () => void }) {
  const [copied, setCopied] = useState(false);
  const installCmd = "npm i @cookified/toastify motion";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] flex flex-col justify-between items-center px-4 sm:px-6">
      {/* macOS Ambient Chromatic Glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[600px] rounded-full bg-gradient-to-tr from-emerald-500/[0.04] via-teal-500/[0.02] to-amber-500/[0.04] blur-[130px] dark:from-emerald-500/[0.07] dark:via-teal-500/[0.03] dark:to-amber-500/[0.07]" />
      </div>

      {/* Centered Modern Minimal Hero */}
      <div className="my-auto w-full max-w-[640px] text-center space-y-6 py-12">
        <motion.h1 {...enter(0)} className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 dark:text-white leading-[1.18]">
          A delightful toast component for React.
        </motion.h1>

        <motion.p {...enter(0.06)} className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-[460px] mx-auto leading-relaxed">
          Stack transitions, pluggable Motion presets, and effortless customization.
        </motion.p>

        {/* Action Buttons: Render Toast & Documentation */}
        <motion.div {...enter(0.12)} className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* Render Toast with macOS Infused Interaction Blur */}
          <div className="group relative">
            <div className="pointer-events-none absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-500/0 via-teal-500/0 to-amber-500/0 opacity-0 blur-md transition-all duration-300 group-hover:from-emerald-500/35 group-hover:via-teal-500/20 group-hover:to-amber-500/35 group-hover:opacity-100 group-active:from-emerald-500/60 group-active:to-amber-500/60 group-active:opacity-100 group-active:blur-lg" />
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => toast("Welcome to Toastify", { description: "A delightful toast component for React." })}
              className="relative flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-950 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-900 active:shadow-[0_0_24px_rgba(16,185,129,0.35)] dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 dark:active:shadow-[0_0_24px_rgba(245,158,11,0.35)]"
            >
              <Bell size={15} className="transition-transform group-hover:rotate-12" />
              <span>Render Toast</span>
            </motion.button>
          </div>

          {/* Documentation with macOS subtle frosted blur */}
          <div className="group relative">
            <div className="pointer-events-none absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-500/0 to-amber-500/0 opacity-0 blur-md transition-all duration-300 group-hover:from-emerald-500/25 group-hover:to-amber-500/25 group-hover:opacity-100 group-active:opacity-80 group-active:blur-lg" />
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={onNavigateDocs}
              className="relative flex cursor-pointer items-center gap-1.5 rounded-xl border border-neutral-200/90 bg-white/90 backdrop-blur-md px-5 py-2.5 text-sm font-medium text-neutral-700 shadow-2xs transition-all hover:border-neutral-300 hover:text-neutral-950 dark:border-neutral-800 dark:bg-[#141417]/90 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:text-white"
            >
              <span>Documentation</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Compact Terminal Install Command */}
        <motion.div {...enter(0.18)} className="pt-1 flex justify-center">
          <div className="group/copy relative">
            <div className={`pointer-events-none absolute -inset-0.5 rounded-lg bg-gradient-to-r from-emerald-500/30 to-amber-500/30 blur-xs transition-opacity duration-300 ${copied ? "opacity-100" : "opacity-0 group-hover/copy:opacity-40"}`} />
            <div className="relative inline-flex items-center gap-2.5 rounded-lg border border-neutral-200/80 bg-neutral-100/80 backdrop-blur-md px-3.5 py-1.5 font-mono text-xs text-neutral-700 dark:border-neutral-800/80 dark:bg-[#131316]/80 dark:text-neutral-300">
              <span className="text-neutral-400 select-none">$</span>
              <span>{installCmd}</span>
              <button type="button" onClick={handleCopy} className="cursor-pointer text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors" aria-label="Copy install command">
                {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Minimal Footer */}
      <footer className="border-t border-neutral-200/80 py-5 px-4 text-center text-xs text-neutral-500 dark:border-neutral-800/80 dark:text-neutral-400 w-full">
        <div className="flex items-center justify-center gap-4">
          <span>Cookified Open Source</span>
          <span>·</span>
          <button type="button" onClick={onNavigateDocs} className="cursor-pointer text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white">
            Documentation
          </button>
          <span>·</span>
          <a href="https://github.com/cookified/toastify" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white">
            <span>GitHub</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </footer>
    </div>
  );
}
