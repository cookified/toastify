import {
  BookOpen,
  ChevronRight,
  ExternalLink,
  Home,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { siteNavLinks } from "../navigation";
import { CloverLogo } from "./CloverLogo";
import type { ToastVariant } from "./Playground";

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  currentPage: "home" | "docs";
  onNavigate: (page: "home" | "docs", sectionId?: string) => void;
  onTriggerToast: (variant: ToastVariant) => void;
};

const triggerButtons: {
  id: ToastVariant;
  label: string;
  badge: string;
}[] = [
  { id: "action", label: "Action", badge: "active" },
  { id: "promise", label: "Promise", badge: "async" },
  { id: "success", label: "Success", badge: "status" },
  { id: "tailwind", label: "Tailwind", badge: "style" },
  { id: "variant", label: "Dynamic", badge: "state" },
];

export function MobileDrawer({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  onTriggerToast,
}: MobileDrawerProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
    document.body.style.overflow = "";
  }, [isOpen, onClose]);

  const handleNavClick = (page: "home" | "docs", sectionId?: string) => {
    onNavigate(page, sectionId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Frosted Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 flex w-[320px] max-w-[86vw] flex-col justify-between border-l border-neutral-200/80 bg-white/95 p-5 shadow-2xl backdrop-blur-2xl dark:border-neutral-800/80 dark:bg-[#0c0c0e]/95"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Top Brand Bar & Close Button */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80">
                <div className="flex items-center gap-2.5">
                  <CloverLogo size={22} />
                  <span className="text-[16px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                    Toastify
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100/80 text-neutral-700 transition-colors hover:bg-neutral-200 active:scale-95 dark:border-neutral-800 dark:bg-[#1a1a1e] dark:text-neutral-300 dark:hover:bg-neutral-800"
                  aria-label="Close navigation drawer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Navigation Area */}
              <div className="mt-4 space-y-6 overflow-y-auto max-h-[calc(100dvh-180px)] pr-1">
                {/* View Switcher: Home vs Docs */}
                <div className="space-y-1">
                  <div className="px-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    Pages
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-neutral-200/80 bg-neutral-100/70 p-1 dark:border-neutral-800 dark:bg-[#151518]">
                    <button
                      type="button"
                      onClick={() => handleNavClick("home")}
                      className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all ${
                        currentPage === "home"
                          ? "bg-white text-neutral-950 shadow-xs dark:bg-[#222228] dark:text-white"
                          : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                      }`}
                    >
                      <Home size={13} />
                      <span>Home</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavClick("docs")}
                      className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all ${
                        currentPage === "docs"
                          ? "bg-white text-neutral-950 shadow-xs dark:bg-[#222228] dark:text-white"
                          : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                      }`}
                    >
                      <BookOpen size={13} />
                      <span>Docs</span>
                    </button>
                  </div>
                </div>

                {/* Documentation Section Links */}
                <div className="space-y-1">
                  <div className="px-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    Documentation
                  </div>
                  <nav className="space-y-0.5">
                    {siteNavLinks.map((item) => (
                      <button
                        key={item.href}
                        type="button"
                        onClick={() => handleNavClick("docs", item.href)}
                        className="group flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 active:scale-[0.99] dark:text-neutral-300 dark:hover:bg-[#18181c] dark:hover:text-white"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 transition-transform group-hover:scale-125 group-hover:bg-emerald-500 dark:bg-neutral-700" />
                          <span>{item.label}</span>
                        </span>
                        <ChevronRight
                          size={13}
                          className="text-neutral-400 transition-transform group-hover:translate-x-0.5"
                        />
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Quick Examples */}
                <div className="space-y-1">
                  <div className="px-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    Test Examples
                  </div>
                  <div className="space-y-1">
                    {triggerButtons.map((btn) => (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => {
                          onTriggerToast(btn.id);
                          onClose();
                        }}
                        className="flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs text-neutral-600 transition-all hover:bg-neutral-100 hover:text-neutral-950 active:scale-[0.98] dark:text-neutral-400 dark:hover:bg-[#18181c] dark:hover:text-white"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                          <span>{btn.label}</span>
                        </span>
                        <span className="rounded bg-neutral-100 px-2 py-0.5 font-mono text-[10px] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                          {btn.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Actions */}
            <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
              <a
                href="https://github.com/cookified/toastify"
                target="_blank"
                rel="noreferrer"
                className="group flex w-full items-center justify-between rounded-xl border border-neutral-200/80 bg-neutral-100/80 p-2.5 text-xs font-medium text-neutral-800 transition-all hover:bg-neutral-200/80 dark:border-neutral-800 dark:bg-[#18181c] dark:text-neutral-200 dark:hover:bg-[#222228]"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon size={15} />
                  <span>GitHub Repository</span>
                </span>
                <ExternalLink
                  size={12}
                  className="text-neutral-400 transition-transform group-hover:translate-x-0.5"
                />
              </a>

              <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={11} className="text-emerald-500" />
                  <span>Toastify by Cookified</span>
                </span>
                <span className="font-mono">v1.0.4</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
