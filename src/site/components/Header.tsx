import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

type HeaderProps = {
  isDark: boolean;
  onToggleTheme: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  currentPage: "home" | "docs";
  onNavigate: (page: "home" | "docs") => void;
};

export function Header({
  isDark,
  onToggleTheme,
  mobileMenuOpen,
  onToggleMobileMenu,
  currentPage,
  onNavigate,
}: HeaderProps) {
  // Motion scroll progress animation
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className="sticky top-0 z-40 h-14 border-b border-neutral-200/80 bg-white/85 backdrop-blur-md dark:border-neutral-800/80 dark:bg-[#09090b]/85">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 lg:px-6">
        {/* Left: Brand Identity & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {currentPage === "docs" && (
            <button
              type="button"
              onClick={onToggleMobileMenu}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 hover:bg-neutral-100 lg:hidden dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          )}

          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="flex cursor-pointer items-center transition-opacity hover:opacity-80"
          >
            <span className="text-[16px] font-semibold tracking-tight text-neutral-950 dark:text-white">
              Toastify
            </span>
          </button>
        </div>

        {/* Center: Navigation Page Switcher (Home vs Docs) */}
        <nav className="flex items-center gap-1 rounded-xl border border-neutral-200/90 bg-neutral-100/90 p-1 text-xs font-medium dark:border-neutral-800 dark:bg-[#141418]">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className={`relative cursor-pointer rounded-lg px-3.5 py-1 transition-colors ${
              currentPage === "home"
                ? "text-neutral-950 dark:text-white"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
            }`}
          >
            {currentPage === "home" && (
              <motion.div
                layoutId="header-nav-pill"
                className="absolute inset-0 rounded-lg bg-white shadow-2xs dark:bg-[#222228]"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
            <span className="relative z-10">Home</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("docs")}
            className={`relative cursor-pointer rounded-lg px-3.5 py-1 transition-colors ${
              currentPage === "docs"
                ? "text-neutral-950 dark:text-white"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
            }`}
          >
            {currentPage === "docs" && (
              <motion.div
                layoutId="header-nav-pill"
                className="absolute inset-0 rounded-lg bg-white shadow-2xs dark:bg-[#222228]"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              <span className="sm:hidden">Docs</span>
              <span className="hidden sm:inline">Documentation</span>
            </span>
          </button>
        </nav>

        {/* Right: GitHub & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            href="https://github.com/cookified/toastify"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200/90 bg-white px-2.5 py-1.5 text-xs font-medium text-neutral-700 shadow-2xs transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <GithubIcon size={14} />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <button
            type="button"
            onClick={(e) => onToggleTheme(e)}
            className="relative inline-flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            aria-label="Toggle visual theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? "dark" : "light"}
                initial={{ opacity: 0, rotate: -45, scale: 0.85 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.85 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Motion-Powered Spring Scroll Progress Bar (Only visible on Documentation page) */}
      {currentPage === "docs" && (
        <motion.div
          className="h-[2px] w-full origin-left bg-neutral-900 dark:bg-white"
          style={{ scaleX }}
        />
      )}
    </header>
  );
}
