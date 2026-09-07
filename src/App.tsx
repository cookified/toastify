import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { AnimationsDoc } from "./site/components/AnimationsDoc";
import { ApiReference } from "./site/components/ApiReference";
import { Header } from "./site/components/Header";
import { LandingPage } from "./site/components/LandingPage";
import { Playground, type ToastVariant } from "./site/components/Playground";
import { Quickstart } from "./site/components/Quickstart";
import { Sidebar } from "./site/components/Sidebar";
import { TableOfContents } from "./site/components/TableOfContents";
import { triggerDemoToast } from "./site/demo-toasts";
import {
  Toaster,
  toastStore,
  type AnimationPreset,
  type ToastPosition,
} from "./toastify";

const sectionTransition = {
  type: "spring" as const,
  stiffness: 180,
  damping: 24,
};

export function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "docs">(() => {
    const hash = window.location.hash;
    if (
      hash === "#docs" ||
      hash === "#overview" ||
      hash === "#playground" ||
      hash === "#quickstart" ||
      hash === "#animations" ||
      hash === "#api"
    ) {
      return "docs";
    }
    return "home";
  });

  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [position, setPosition] = useState<ToastPosition>("bottom-right");
  const [animation, setAnimation] = useState<AnimationPreset>("stack");
  const [selectedVariant, setSelectedVariant] =
    useState<ToastVariant>("action");
  const [activeToastsCount, setActiveToastsCount] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const [themeRipple, setThemeRipple] = useState<{
    x: number;
    y: number;
    isDark: boolean;
  } | null>(null);

  const handleToggleTheme = (event?: React.MouseEvent<HTMLButtonElement>) => {
    const isGoingDark = !isDark;
    const x = event?.clientX ?? window.innerWidth - 48;
    const y = event?.clientY ?? 28;
    const endRadius =
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      ) + 40;

    const doc = document as unknown as {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };

    if (typeof doc.startViewTransition === "function") {
      const transition = doc.startViewTransition(() => {
        setIsDark(isGoingDark);
        document.documentElement.classList.toggle("dark", isGoingDark);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 600,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      });
      return;
    }

    // Fallback circular spread animation for browsers without startViewTransition
    setThemeRipple({ x, y, isDark: isGoingDark });
    setIsDark(isGoingDark);
    document.documentElement.classList.toggle("dark", isGoingDark);
  };

  useEffect(() => {
    return toastStore.subscribe((toasts) => {
      setActiveToastsCount(toasts.length);
    });
  }, []);

  const handleNavigate = (page: "home" | "docs") => {
    setCurrentPage(page);
    window.location.hash = page === "docs" ? "#docs" : "#home";
    if (page === "home") {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="relative min-h-screen bg-[#fafafa] text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white dark:bg-[#09090b] dark:text-[#f4f4f5] dark:selection:bg-white dark:selection:text-black font-sans">
        {/* Subtle macOS Ambient Chromatic Glow (Infused Emerald to Amber) */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-emerald-500/[0.035] via-teal-500/[0.015] to-transparent blur-[140px] dark:from-emerald-500/[0.06] dark:via-teal-500/[0.025]" />
          <div className="absolute top-1/2 -left-32 h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-amber-500/[0.03] via-yellow-500/[0.015] to-transparent blur-[130px] dark:from-amber-500/[0.055] dark:via-yellow-500/[0.02]" />
        </div>

        {/* Sticky Header with Navigation Switcher */}
        <Header
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />

        {/* View 1: Main Landing Page */}
        {currentPage === "home" ? (
          <LandingPage onNavigateDocs={() => handleNavigate("docs")} />
        ) : (
          /* View 2: 3-Column Documentation Workspace */
          <div className="mx-auto flex max-w-[1440px] px-0 lg:px-4">
            {/* Column 1: Left Sidebar */}
            <Sidebar
              mobileMenuOpen={mobileMenuOpen}
              onCloseMobileMenu={() => setMobileMenuOpen(false)}
              onTriggerToast={triggerDemoToast}
            />

            {/* Column 2: Main Documentation Content */}
            <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-[800px] mx-auto space-y-12">
              {/* Overview Section */}
              <motion.section
                id="overview"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={sectionTransition}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <span>Cookified</span>
                  <span>/</span>
                  <span className="text-neutral-900 dark:text-white font-medium">
                    Toastify
                  </span>
                </div>

                <h1 className="text-2xl font-medium tracking-tight text-neutral-950 sm:text-3xl dark:text-white">
                  A delightful toast component for React.
                </h1>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  An extensible toast notification system with stack transitions
                  and modular animations.
                </p>
              </motion.section>

              {/* Interactive Stage Playground */}
              <motion.section
                id="playground"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={sectionTransition}
              >
                <Playground
                  selectedVariant={selectedVariant}
                  onSelectVariant={setSelectedVariant}
                  position={position}
                  onChangePosition={setPosition}
                  animation={animation}
                  onChangeAnimation={setAnimation}
                  activeCount={activeToastsCount}
                  onFireToast={triggerDemoToast}
                />
              </motion.section>

              {/* Quickstart Setup */}
              <motion.section
                id="quickstart"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={sectionTransition}
              >
                <Quickstart />
              </motion.section>

              {/* Animations Studio */}
              <motion.section
                id="animations"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={sectionTransition}
              >
                <AnimationsDoc
                  activeAnimation={animation}
                  onChangeAnimation={setAnimation}
                />
              </motion.section>

              {/* API Reference */}
              <motion.section
                id="api"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={sectionTransition}
              >
                <ApiReference />
              </motion.section>
            </main>

            {/* Column 3: Table of Contents */}
            <TableOfContents />
          </div>
        )}

        {/* Circular Theme Ripple Overlay */}
        {themeRipple && (
          <motion.div
            key={`${themeRipple.x}-${themeRipple.y}-${themeRipple.isDark}`}
            initial={{
              clipPath: `circle(0px at ${themeRipple.x}px ${themeRipple.y}px)`,
              opacity: 1,
            }}
            animate={{
              clipPath: `circle(${
                Math.hypot(
                  Math.max(themeRipple.x, window.innerWidth - themeRipple.x),
                  Math.max(themeRipple.y, window.innerHeight - themeRipple.y),
                ) + 60
              }px at ${themeRipple.x}px ${themeRipple.y}px)`,
              opacity: 0,
            }}
            transition={{
              clipPath: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3, delay: 0.35, ease: "easeInOut" },
            }}
            onAnimationComplete={() => setThemeRipple(null)}
            className="fixed inset-0 pointer-events-none z-[99998]"
            style={{
              backgroundColor: themeRipple.isDark ? "#09090b" : "#fafafa",
            }}
          />
        )}

        {/* Runtime Toaster */}
        <Toaster
          position={currentPage === "home" ? "bottom-center" : position}
          animation={animation}
          theme={isDark ? "dark" : "light"}
          duration={3500}
        />
      </div>
    </div>
  );
}

export default App;
