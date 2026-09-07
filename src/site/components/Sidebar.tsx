import { ExternalLink, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { MotionNavItem } from "./MotionNavItem";

type SidebarProps = {
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  onTriggerToast: (variant: string) => void;
};

export function Sidebar({
  mobileMenuOpen,
  onCloseMobileMenu,
  onTriggerToast,
}: SidebarProps) {
  const [hoveredTrigger, setHoveredTrigger] = useState<string | null>(null);

  const navLinks = [
    { href: "#overview", label: "Overview" },
    { href: "#playground", label: "Playground" },
    { href: "#quickstart", label: "Quickstart & Setup" },
    { href: "#animations", label: "Animation Components" },
    { href: "#api", label: "API Reference" },
  ];

  const triggerButtons = [
    { id: "action", label: "Action", badge: "active" },
    { id: "promise", label: "Promise", badge: "async" },
    { id: "success", label: "Success", badge: "status" },
    { id: "tailwind", label: "Tailwind", badge: "style" },
    { id: "variant", label: "Dynamic", badge: "state" },
  ];

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
        className={`fixed top-14 bottom-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col justify-between border-r border-neutral-200/80 bg-white p-4 pb-8 transition-transform duration-200 ease-out dark:border-neutral-800/80 dark:bg-[#09090b] lg:sticky lg:top-14 lg:bottom-auto lg:z-30 lg:flex lg:h-[calc(100vh-3.5rem)] lg:w-60 lg:translate-x-0 lg:bg-transparent lg:py-6 lg:pl-2 lg:pr-4 hover:border-neutral-300 lg:dark:bg-transparent dark:hover:border-neutral-700/80 ${
          mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="flex-1 space-y-6 overflow-y-auto pr-2 text-sm">
          {/* Navigation Section */}
          <div>
            <div className="px-2.5 text-sm font-semibold tracking-tight text-neutral-950 dark:text-white">
              Documentation
            </div>
            <nav className="mt-2 space-y-0.5">
              {navLinks.map((item) => (
                <MotionNavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  onClick={onCloseMobileMenu}
                />
              ))}
            </nav>
          </div>

          {/* Quick Examples */}
          <div>
            <div className="px-2.5 text-sm font-semibold tracking-tight text-neutral-950 dark:text-white">
              Examples
            </div>
            <div className="mt-2 space-y-0.5">
              {triggerButtons.map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => onTriggerToast(btn.id)}
                  onMouseEnter={() => setHoveredTrigger(btn.id)}
                  onMouseLeave={() => setHoveredTrigger(null)}
                  className="group relative flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-transform ${
                        hoveredTrigger === btn.id
                          ? "scale-125 bg-neutral-900 dark:bg-white"
                          : "bg-neutral-300 dark:bg-neutral-700"
                      }`}
                    />
                    <span>{btn.label}</span>
                  </span>

                  <span className="rounded bg-neutral-100 px-2 py-0.5 font-mono text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    {btn.badge}
                  </span>

                  {/* Right-Side Curved Breakout Indicator */}
                  {hoveredTrigger === btn.id && (
                    <motion.span
                      layoutId="sidebar-trigger-curve"
                      initial={{ opacity: 0, x: -3, scaleY: 0.4 }}
                      animate={{ opacity: 1, x: 0, scaleY: 1 }}
                      exit={{ opacity: 0, x: 3, scaleY: 0.4 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 26,
                      }}
                      className="absolute right-0 h-4 w-1 rounded-l-full rounded-r-md bg-neutral-900 shadow-[0_0_8px_rgba(0,0,0,0.25)] dark:bg-white dark:shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    />
                  )}
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
