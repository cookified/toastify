import { ExternalLink, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { ToastVariant } from "./Playground";
import { MotionNavItem } from "./MotionNavItem";
import { siteNavLinks } from "../navigation";
import { CloverLogo } from "./CloverLogo";

type SidebarProps = {
  mobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
  onTriggerToast: (variant: ToastVariant) => void;
  onNavigate?: (page: "home" | "docs", sectionId?: string) => void;
  className?: string;
};

const triggerButtons = [
  { id: "action" as const, label: "Action", badge: "active" },
  { id: "promise" as const, label: "Promise", badge: "async" },
  { id: "success" as const, label: "Success", badge: "status" },
  { id: "tailwind" as const, label: "Tailwind", badge: "style" },
  { id: "variant" as const, label: "Dynamic", badge: "state" },
];

export function Sidebar({
  mobileMenuOpen = false,
  onCloseMobileMenu,
  onTriggerToast,
  onNavigate,
  className = "",
}: SidebarProps) {
  const [hoveredTrigger, setHoveredTrigger] = useState<string | null>(null);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={onCloseMobileMenu}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col justify-between border-r border-neutral-200/80 bg-white/95 p-4 pb-6 backdrop-blur-xl transition-transform duration-200 ease-out dark:border-neutral-800/80 dark:bg-[#09090b]/95 lg:sticky lg:top-14 lg:z-30 lg:h-[calc(100vh-3.5rem)] lg:w-60 lg:translate-x-0 lg:bg-transparent lg:py-6 lg:pl-2 lg:pr-4 hover:border-neutral-300 dark:hover:border-neutral-700/80 shrink-0 ${
          mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        } ${className}`}
      >
        {/* Mobile-only Header Row with Brand & Close Button */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-neutral-800/80 lg:hidden">
          <div className="flex items-center gap-2">
            <CloverLogo size={20} />
            <span className="text-sm font-semibold tracking-tight text-neutral-950 dark:text-white">Toastify</span>
          </div>
          <button
            type="button"
            onClick={onCloseMobileMenu}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-neutral-200 bg-neutral-100 text-neutral-600 transition-colors hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            aria-label="Close navigation sidebar"
          >
            <X size={14} />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto pr-2 text-sm mt-3 lg:mt-0">
          {/* Navigation Section */}
          <div>
            <div className="px-2.5 text-sm font-semibold tracking-tight text-neutral-950 dark:text-white">Documentation</div>
            <nav className="mt-2 space-y-0.5">
              {siteNavLinks.map((item) => (
                <MotionNavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  onClick={() => {
                    onNavigate?.("docs", item.href);
                    onCloseMobileMenu?.();
                  }}
                />
              ))}
            </nav>
          </div>

          {/* Quick Examples */}
          <div>
            <div className="px-2.5 text-sm font-semibold tracking-tight text-neutral-950 dark:text-white">Examples</div>
            <div className="mt-2 space-y-0.5">
              {triggerButtons.map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => {
                    onTriggerToast(btn.id);
                    onCloseMobileMenu?.();
                  }}
                  onMouseEnter={() => setHoveredTrigger(btn.id)}
                  onMouseLeave={() => setHoveredTrigger(null)}
                  className="group relative flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm text-neutral-600 transition-all duration-200 hover:text-neutral-950 active:scale-[0.98] dark:text-neutral-400 dark:hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        hoveredTrigger === btn.id
                          ? "scale-125 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                          : "bg-neutral-300 dark:bg-neutral-700"
                      }`}
                    />
                    <span>{btn.label}</span>
                  </span>

                  <span className="rounded bg-neutral-100 px-2 py-0.5 font-mono text-xs text-neutral-600 transition-colors group-hover:bg-neutral-200/70 dark:bg-neutral-800 dark:text-neutral-300 dark:group-hover:bg-neutral-700/60">
                    {btn.badge}
                  </span>

                  {/* Right-Side Curved Breakout Indicator */}
                  <AnimatePresence>
                    {hoveredTrigger === btn.id && (
                      <motion.span
                        layoutId="sidebar-trigger-curve"
                        initial={{ opacity: 0, x: -3, scaleY: 0.4 }}
                        animate={{ opacity: 1, x: 0, scaleY: 1 }}
                        exit={{ opacity: 0, x: 3, scaleY: 0.4 }}
                        transition={{ type: "spring", stiffness: 380, damping: 26 }}
                        className="absolute right-0 h-4 w-1 rounded-l-full rounded-r-md bg-gradient-to-b from-emerald-500 to-amber-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      />
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Docked Footer (Protected from bottom overflow on mobile) */}
        <div className="mt-4 shrink-0 border-t border-neutral-200/80 pt-4 dark:border-neutral-800/80 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-neutral-900 dark:text-white">
            <Sparkles size={13} className="text-neutral-500" />
            <span>Toastify by Cookified</span>
          </div>
          <a
            href="https://github.com/cookified/toastify"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
          >
            <span>github.com/cookified/toastify</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </aside>
    </>
  );
}
