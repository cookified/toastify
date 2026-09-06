import { motion } from "motion/react";
import type { ToastAnimationProps } from "../types";
import { defaultSpring } from "./constants";

/**
 * FadeAnimation
 * Minimalist in-place fade & scale animation.
 */
export function FadeAnimation({
  index,
  position,
  isDismissing,
  onDismiss,
  springConfig = defaultSpring,
  children,
}: ToastAnimationProps) {
  const isTop = position.startsWith("top");

  const stackStep = 66;
  const targetY = isTop ? index * stackStep : -index * stackStep;

  return (
    <motion.article
      role="status"
      aria-live="polite"
      initial={{
        opacity: 0,
        scale: 0.9,
        y: targetY,
        filter: "blur(4px)",
      }}
      animate={{
        opacity: isDismissing ? 0 : 1,
        scale: isDismissing ? 0.9 : 1,
        y: targetY,
        filter: isDismissing ? "blur(4px)" : "blur(0px)",
        zIndex: 50 - index,
        pointerEvents: !isDismissing ? "auto" : "none",
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
        filter: "blur(4px)",
        transition: {
          duration: 0.22,
          ease: "easeOut",
        },
      }}
      transition={{
        type: "spring",
        ...springConfig,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 60 || Math.abs(info.velocity.x) > 500) {
          onDismiss();
        }
      }}
      className="absolute h-14 w-full select-none cursor-grab active:cursor-grabbing"
      style={{
        [isTop ? "top" : "bottom"]: 0,
        left: 0,
        right: 0,
      }}
    >
      {children}
    </motion.article>
  );
}
