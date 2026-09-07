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
import {
  Toaster,
  toast,
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

  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [position, setPosition] = useState<ToastPosition>("bottom-right");
  const [animation, setAnimation] = useState<AnimationPreset>("stack");
  const [selectedVariant, setSelectedVariant] = useState<ToastVariant>("action");
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
        Math.max(y, window.innerHeight - y)
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
          }
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

  const triggerToast = (variant: string) => {
    switch (variant) {
      case "action":
        toast("Event scheduled", {
          description: "Monday, January at 4:00 PM",
          action: {
            label: "Undo",
            onClick: () => toast("Event restored"),
          },
          cancel: {
            label: "Dismiss",
            onClick: () => console.log("Dismissed"),
          },
        });
        break;
      case "promise":
        toast
          .promise(
            new Promise<{ id: string }>((resolve, reject) => {
              setTimeout(() => {
                if (Math.random() > 0.3) {
                  resolve({ id: "DOC-8921" });
                } else {
                  reject(new Error("Upload timed out"));
                }
              }, 1800);
            }),
            {
              loading: "Uploading document...",
              success: "Uploaded successfully",
              error: "Failed to upload document",
              action: {
                label: "View",
                onClick: () => console.log("Viewing upload"),
              },
            },
          )
          .catch(() => {});
        break;
      case "success":
        toast.success("Payment confirmed", {
          description: "Receipt #4092 emailed to your account",
        });
        break;
      case "custom-icon":
        toast("AI Model Ready", {
          description: "Synthesized 12 variations in 0.4s",
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ),
          action: {
            label: "Inspect",
            onClick: () => toast("AI Inspector opened"),
          },
        });
        break;
      case "tailwind":
        toast("Invoice Paid", {
          description: "Transferred $1,420 to Stripe account",
          className: "bg-emerald-950 text-emerald-100 border-emerald-800",
          action: {
            label: "Receipt",
            onClick: () => toast("Receipt #9102 ready"),
          },
        });
        break;
      case "variant": {
        const streakToast = toast.variant({
          duration: 4000,
          className: "border-orange-500/30",
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f97316"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
          ),
        });
        streakToast("7-Day Streak!", {
          description: "Keep up the momentum today",
        });
        break;
      }
      case "error":
        toast.error("Deployment failed", {
          description: "Missing environment variable API_SECRET",
          action: {
            label: "Retry",
            onClick: () => triggerToast("error"),
          },
        });
        break;
      case "headless":
        toast.custom((id) => (
          <div className="flex h-14 w-full items-center justify-between gap-3 rounded-xl border border-neutral-700 bg-neutral-900 px-4 text-xs font-medium text-white shadow-xl">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-white font-bold text-[10px]">
                ★
              </span>
              <span>Custom Headless JSX Notification</span>
            </div>
            <button
              type="button"
              onClick={() => toast.dismiss(id)}
              className="cursor-pointer rounded px-2 py-0.5 text-neutral-400 hover:text-white"
            >
              Close
            </button>
          </div>
        ));
        break;
      case "neutral":
      default:
        toast("File archived", {
          description: "Moved to trash folder. You can restore it anytime.",
        });
        break;
    }
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-[#fafafa] text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white dark:bg-[#09090b] dark:text-[#f4f4f5] dark:selection:bg-white dark:selection:text-black font-sans">
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
          <LandingPage
            onNavigateDocs={() => handleNavigate("docs")}
            onFireToast={triggerToast}
          />
        ) : (
          /* View 2: 3-Column Separable Documentation Workspace */
          <div className="mx-auto flex max-w-[1440px] px-0 lg:px-4">
            {/* Column 1: Left Sidebar */}
            <Sidebar
              mobileMenuOpen={mobileMenuOpen}
              onCloseMobileMenu={() => setMobileMenuOpen(false)}
              onTriggerToast={triggerToast}
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
                  <span className="text-neutral-900 dark:text-white font-medium">Toastify</span>
                </div>

                <h1 className="text-2xl font-medium tracking-tight text-neutral-950 sm:text-3xl dark:text-white">
                  A delightful toast component for React.
                </h1>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  An extensible toast notification system with stack transitions and modular animations.
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
                  onFireToast={triggerToast}
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

        {/* Circular Theme Ripple Overlay (Bulletproof Fallback) */}
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
                  Math.max(themeRipple.y, window.innerHeight - themeRipple.y)
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

        {/* Runtime Toaster (always mounted and responsive to current animation & position) */}
        <Toaster
          position={position}
          animation={animation}
          theme={isDark ? "dark" : "light"}
          duration={3500}
        />
      </div>
    </div>
  );
}

export default App;