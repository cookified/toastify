import { ArrowRight, Bell, Check, Copy, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type LandingPageProps = {
  onNavigateDocs: () => void;
  onFireToast: (variant: string) => void;
};

export function LandingPage({ onNavigateDocs, onFireToast }: LandingPageProps) {
  const [copied, setCopied] = useState(false);
  const installCmd = "npm i @cookified/toastify motion";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard fallback
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-between items-center px-4 sm:px-6">
      {/* Centered Modern Minimal Hero */}
      <div className="my-auto w-full max-w-[640px] text-center space-y-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 dark:text-white leading-[1.18]"
        >
          A delightful toast component for React.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 24,
            delay: 0.06,
          }}
          className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-[460px] mx-auto leading-relaxed"
        >
          Stack transitions, pluggable Motion presets, and effortless
          customization.
        </motion.p>

        {/* Action Buttons: Render Toast & Documentation */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 24,
            delay: 0.12,
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => onFireToast("action")}
            className="group flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-950 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            <Bell
              size={15}
              className="transition-transform group-hover:rotate-12"
            />
            <span>Render Toast</span>
          </motion.button>

          <button
            type="button"
            onClick={onNavigateDocs}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-neutral-200/90 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 shadow-2xs transition-colors hover:bg-neutral-50 hover:text-neutral-950 dark:border-neutral-800 dark:bg-[#141417] dark:text-neutral-300 dark:hover:bg-[#1c1c20] dark:hover:text-white"
          >
            <span>Documentation</span>
            <ArrowRight size={14} />
          </button>
        </motion.div>

        {/* Compact Terminal Install Command */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 24,
            delay: 0.18,
          }}
          className="pt-1 flex justify-center"
        >
          <div className="inline-flex items-center gap-2.5 rounded-lg border border-neutral-200/80 bg-neutral-100/70 px-3.5 py-1.5 font-mono text-xs text-neutral-700 dark:border-neutral-800/80 dark:bg-[#131316] dark:text-neutral-300">
            <span className="text-neutral-400 select-none">$</span>
            <span>{installCmd}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="cursor-pointer text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
              aria-label="Copy install command"
            >
              {copied ? (
                <Check size={13} className="text-emerald-500" />
              ) : (
                <Copy size={13} />
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Minimal Footer */}
      <footer className="border-t border-neutral-200/80 py-5 px-4 text-center text-xs text-neutral-500 dark:border-neutral-800/80 dark:text-neutral-400 w-full">
        <div className="flex items-center justify-center gap-4">
          <span>Cookified Open Source</span>
          <span>·</span>
          <button
            type="button"
            onClick={onNavigateDocs}
            className="cursor-pointer text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white"
          >
            Documentation
          </button>
          <span>·</span>
          <a
            href="https://github.com/cookified/toastify"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white"
          >
            <span>GitHub</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </footer>
    </div>
  );
}
