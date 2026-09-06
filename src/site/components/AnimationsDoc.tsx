import { Code2, Layers, MoveRight, Play, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast, type AnimationPreset } from "../../toastify";
import { CodeBlock } from "./CodeBlock";

type AnimationsDocProps = {
  activeAnimation?: AnimationPreset;
  onChangeAnimation?: (preset: AnimationPreset) => void;
};

type PresetDetail = {
  id: AnimationPreset | "custom";
  name: string;
  summary: string;
  stiffness: number;
  damping: number;
  filename: string;
  codeSnippet: string;
};

const presetDetails: Record<AnimationPreset | "custom", PresetDetail> = {
  stack: {
    id: "stack",
    name: "Folder Stack",
    summary: "Cards compress with spring mass and scale reduction. Hovering expands the stack effortlessly.",
    stiffness: 260,
    damping: 24,
    filename: "FolderStackExample.tsx",
    codeSnippet: `// Using built-in Folder Stack preset
import { Toaster, toast } from "@cookified/toastify";

// Mount the toaster:
<Toaster animation="stack" position="bottom-right" />

// Trigger notification:
toast("Folder Stack", {
  description: "Cards compress with spring mass. Hover to fan open.",
});`,
  },
  slide: {
    id: "slide",
    name: "Slide Preset",
    summary: "Lateral edge entrance with velocity damping and interactive swipe-to-dismiss gesture.",
    stiffness: 320,
    damping: 28,
    filename: "SlideExample.tsx",
    codeSnippet: `// Using Slide preset
import { Toaster, toast } from "@cookified/toastify";

// Mount the toaster:
<Toaster animation="slide" position="bottom-right" />

// Trigger notification:
toast("Slide Preset", {
  description: "Directional entrance with swipe gesture and unstacked layout.",
});`,
  },
  fade: {
    id: "fade",
    name: "Fade Preset",
    summary: "In-place gentle dissolve with subtle blur-to-focus and micro scale transitions.",
    stiffness: 280,
    damping: 26,
    filename: "FadeExample.tsx",
    codeSnippet: `// Using Fade preset
import { Toaster, toast } from "@cookified/toastify";

// Mount the toaster:
<Toaster animation="fade" position="bottom-right" />

// Trigger notification:
toast("Fade Preset", {
  description: "In-place gentle dissolve with soft blur transition.",
});`,
  },
  custom: {
    id: "custom",
    name: "Custom Component",
    summary: "Drop any custom Motion component straight into <Toaster animation={CustomComponent} />.",
    stiffness: 350,
    damping: 22,
    filename: "CustomScaleAnimation.tsx",
    codeSnippet: `import { motion } from "motion/react";
import type { ToastAnimationProps } from "@cookified/toastify";

export function CustomScaleAnimation({
  children,
  index,
  isDismissing,
}: ToastAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{
        opacity: isDismissing ? 0 : 1,
        scale: isDismissing ? 0.85 : 1 - index * 0.05,
        y: isDismissing ? 30 : index * 8,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

// Pass directly to Toaster:
<Toaster animation={CustomScaleAnimation} />`,
  },
};

export function AnimationsDoc({
  activeAnimation = "stack",
  onChangeAnimation,
}: AnimationsDocProps) {
  const [selectedTab, setSelectedTab] = useState<AnimationPreset | "custom">(activeAnimation);
  const [isVisualizerHovered, setIsVisualizerHovered] = useState(false);

  const current = presetDetails[selectedTab];

  const handleSelectTab = (tab: AnimationPreset | "custom") => {
    setSelectedTab(tab);
    if (tab !== "custom" && onChangeAnimation) {
      onChangeAnimation(tab);
    }
  };

  const firePreviewToast = () => {
    if (selectedTab !== "custom" && onChangeAnimation) {
      onChangeAnimation(selectedTab);
    }

    if (selectedTab === "stack") {
      toast("Folder Stack", {
        description: "Cards compress with spring mass. Hover to fan open.",
      });
    } else if (selectedTab === "slide") {
      toast("Slide Preset", {
        description: "Directional entrance with swipe gesture and unstacked layout.",
      });
    } else if (selectedTab === "fade") {
      toast("Fade Preset", {
        description: "In-place gentle dissolve with soft blur transition.",
      });
    } else {
      toast("Custom Component", {
        description: "Fired with custom pluggable motion stage.",
      });
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-neutral-950 dark:text-white">
          Pluggable Animation System
        </h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Every animation is an isolated Motion component. Select a built-in preset or supply your own custom animation.
        </p>
      </div>

      {/* Design-Cracked Interactive Animation Studio */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-xs dark:border-neutral-800/90 dark:bg-[#101013]">
        {/* Top Segmented Navigation Dock */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/80 bg-neutral-50/70 p-3 sm:px-4 dark:border-neutral-800/80 dark:bg-[#141418]/80">
          <div className="flex flex-wrap items-center gap-1 rounded-xl border border-neutral-200 bg-neutral-200/50 p-1 dark:border-neutral-800 dark:bg-neutral-900/80">
            {(
              [
                { id: "stack", label: "Folder Stack", icon: Layers },
                { id: "slide", label: "Slide", icon: MoveRight },
                { id: "fade", label: "Fade", icon: Sparkles },
                { id: "custom", label: "Custom Component", icon: Code2 },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const isCurrent = selectedTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectTab(item.id)}
                  className={`group relative flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    isCurrent
                      ? "text-neutral-950 dark:text-white"
                      : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                  }`}
                >
                  {isCurrent && (
                    <motion.div
                      layoutId="active-preset-studio-pill"
                      className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-[#202024]"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">
                    <Icon size={14} />
                  </span>
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={firePreviewToast}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-neutral-950 px-3.5 py-1.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            <Play size={12} className="fill-current" />
            <span>Test In Toaster</span>
          </button>
        </div>

        {/* Studio Content: Visualizer & Specs */}
        <div className="p-4 sm:p-6 space-y-4">
          <div>
            <h3 className="text-base font-semibold text-neutral-950 dark:text-white">
              {current.name}
            </h3>
            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
              {current.summary}
            </p>
          </div>

          {/* Live Miniature Physics Stage */}
          <div
            onMouseEnter={() => setIsVisualizerHovered(true)}
            onMouseLeave={() => setIsVisualizerHovered(false)}
            className="canvas-grid relative flex h-48 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-neutral-200/90 bg-neutral-50/50 p-4 transition-colors hover:border-neutral-300 dark:border-neutral-800/90 dark:bg-[#0c0c0e] dark:hover:border-neutral-700"
            onClick={firePreviewToast}
          >
            <div className="relative h-24 w-64 sm:w-72">
              {/* Card 2 (Back) */}
              <motion.div
                animate={
                  selectedTab === "stack"
                    ? {
                        y: isVisualizerHovered ? -24 : -12,
                        scale: isVisualizerHovered ? 1 : 0.9,
                        opacity: isVisualizerHovered ? 1 : 0.6,
                      }
                    : selectedTab === "slide"
                      ? {
                          x: isVisualizerHovered ? 0 : 20,
                          y: -28,
                          opacity: 0.8,
                          scale: 0.98,
                        }
                      : selectedTab === "fade"
                        ? {
                            y: -26,
                            opacity: isVisualizerHovered ? 0.9 : 0.5,
                            scale: 0.96,
                          }
                        : {
                            scale: isVisualizerHovered ? 1.05 : 0.92,
                            y: -16,
                            opacity: 0.7,
                          }
                }
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                className="absolute inset-0 rounded-lg border border-neutral-300 bg-white/70 p-2 shadow-xs dark:border-neutral-700 dark:bg-[#1a1a1e]/80"
              >
                <div className="h-2 w-16 rounded bg-neutral-200 dark:bg-neutral-700" />
              </motion.div>

              {/* Card 1 (Middle) */}
              <motion.div
                animate={
                  selectedTab === "stack"
                    ? {
                        y: isVisualizerHovered ? -12 : -6,
                        scale: isVisualizerHovered ? 1 : 0.95,
                        opacity: isVisualizerHovered ? 1 : 0.85,
                      }
                    : selectedTab === "slide"
                      ? {
                          x: isVisualizerHovered ? 0 : 10,
                          y: -14,
                          opacity: 0.9,
                          scale: 0.99,
                        }
                      : selectedTab === "fade"
                        ? {
                            y: -13,
                            opacity: isVisualizerHovered ? 0.95 : 0.75,
                            scale: 0.98,
                          }
                        : {
                            scale: isVisualizerHovered ? 1.02 : 0.96,
                            y: -8,
                            opacity: 0.85,
                          }
                }
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                className="absolute inset-0 rounded-lg border border-neutral-300 bg-white/90 p-2 shadow-sm dark:border-neutral-700 dark:bg-[#1e1e22]"
              >
                <div className="h-2 w-24 rounded bg-neutral-200 dark:bg-neutral-700" />
              </motion.div>

              {/* Card 0 (Front) */}
              <motion.div
                animate={
                  selectedTab === "stack"
                    ? {
                        y: 0,
                        scale: 1,
                        opacity: 1,
                      }
                    : selectedTab === "slide"
                      ? {
                          x: 0,
                          y: 0,
                          scale: 1,
                          opacity: 1,
                        }
                      : {
                          y: 0,
                          scale: 1,
                          opacity: 1,
                        }
                }
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                className="absolute inset-0 flex items-center justify-between rounded-lg border border-neutral-300 bg-white p-3 shadow-md dark:border-neutral-600 dark:bg-[#222228]"
              >
                <div className="space-y-1">
                  <div className="text-xs font-medium text-neutral-900 dark:text-white">
                    {current.name} Active
                  </div>
                  <div className="h-1.5 w-20 rounded bg-neutral-200 dark:bg-neutral-700" />
                </div>
                <span className="rounded bg-sky-500/10 px-1.5 py-0.5 font-mono text-[10px] text-sky-600 dark:text-sky-400">
                  Live
                </span>
              </motion.div>
            </div>
          </div>

          {/* Physics Metrics Readout */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200/80 pt-3 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
            <div className="flex items-center gap-4 font-mono text-xs">
              <span>Stiffness: <strong className="text-neutral-900 dark:text-white">{current.stiffness}</strong></span>
              <span>Damping: <strong className="text-neutral-900 dark:text-white">{current.damping}</strong></span>
            </div>
            <span className="text-xs">Click canvas to test in toaster</span>
          </div>
        </div>

        {/* Usage Code: Syntax-Highlighted & Zero-Truncation CodeBlock */}
        <div className="border-t border-neutral-200/80 dark:border-neutral-800/80">
          <CodeBlock code={current.codeSnippet} filename={current.filename} />
        </div>
      </div>
    </div>
  );
}
