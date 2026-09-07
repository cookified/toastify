import type { AnimationPreset } from "../../toastify";

export type PresetDetail = {
  id: AnimationPreset | "custom";
  name: string;
  summary: string;
  stiffness: number;
  damping: number;
  exitDuration: string;
  filename: string;
  codeSnippet: string;
};

export const presetDetails: Record<AnimationPreset | "custom", PresetDetail> = {
  stack: {
    id: "stack",
    name: "Folder Stack",
    summary:
      "Cards compress with spring mass and scale reduction. Hovering expands the stack effortlessly.",
    stiffness: 220,
    damping: 26,
    exitDuration: "240ms",
    filename: "FolderStackExample.tsx",
    codeSnippet: `import { Toaster, toast } from "@cookified/toastify";

// Mount toaster with custom spring physics & auto-dismiss timing:
<Toaster
  animation="stack"
  position="bottom-right"
  duration={3500} // Auto-dismiss delay in ms (or false to stay indefinitely)
  springConfig={{
    stiffness: 220, // Spring tension: higher = snappier entrance
    damping: 26,    // Friction resistance: lower = springier
    mass: 1.0,      // Inertial mass during card fan-out
  }}
/>

// Trigger notification (with optional per-toast duration override):
toast("Folder Stack", {
  description: "Cards compress with spring mass. Hover to fan open.",
  duration: 4000,
});`,
  },
  slide: {
    id: "slide",
    name: "Slide Preset",
    summary:
      "Lateral edge entrance with velocity damping and interactive swipe-to-dismiss gesture.",
    stiffness: 320,
    damping: 28,
    exitDuration: "220ms",
    filename: "SlideExample.tsx",
    codeSnippet: `import { Toaster, toast } from "@cookified/toastify";

// Mount toaster with Slide preset & velocity dynamics:
<Toaster
  animation="slide"
  position="bottom-right"
  duration={3500}
  springConfig={{
    stiffness: 320, // Slide entry velocity
    damping: 28,    // Slide deceleration settling
  }}
/>

// Trigger notification with per-toast duration:
toast("Slide Preset", {
  description: "Directional entrance with swipe gesture and unstacked layout.",
  duration: 3000,
});`,
  },
  fade: {
    id: "fade",
    name: "Fade Preset",
    summary:
      "In-place gentle dissolve with subtle blur-to-focus and micro scale transitions.",
    stiffness: 280,
    damping: 26,
    exitDuration: "220ms",
    filename: "FadeExample.tsx",
    codeSnippet: `import { Toaster, toast } from "@cookified/toastify";

// Mount toaster with Fade preset & dissolve timing:
<Toaster
  animation="fade"
  position="bottom-right"
  duration={3000}
  springConfig={{
    stiffness: 280,
    damping: 26,
  }}
/>

// Trigger notification:
toast("Fade Preset", {
  description: "In-place gentle dissolve with soft blur transition.",
});`,
  },
  custom: {
    id: "custom",
    name: "Custom Component",
    summary:
      "Drop any custom Motion component straight into <Toaster animation={CustomComponent} />.",
    stiffness: 350,
    damping: 22,
    exitDuration: "Configurable",
    filename: "CustomScaleAnimation.tsx",
    codeSnippet: `import { motion } from "motion/react";
import type { ToastAnimationProps } from "@cookified/toastify";

// Define custom Motion wrapper with tailored entrance & exit timings:
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
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 22,
      }}
      exit={{
        opacity: 0,
        scale: 0.85,
        transition: {
          duration: 0.25,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Pass directly to Toaster with custom auto-dismiss duration:
<Toaster animation={CustomScaleAnimation} duration={4000} />`,
  },
};
