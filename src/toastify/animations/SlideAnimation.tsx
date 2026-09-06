import { motion } from "motion/react";
import type { ToastAnimationProps } from "../types";
import { defaultSpring } from "./constants";

/**
 * SlideAnimation
 * Classic horizontal edge-sliding animation.
 */
export function SlideAnimation({
  index,
  position,
  isDismissing,
  onDismiss,
  springConfig = defaultSpring,
  children,
}: ToastAnimationProps) {
  const isTop = position.startsWith("top");
  const isCenter = position.endsWith("center");
  const isLeft = position.endsWith("left");

  const stackStep = 66;
  const targetY = isTop ? index * stackStep : -index * stackStep;
  const entryX = isCenter ? 0 : isLeft ? -120 : 120;
  const exitX = isCenter ? 0 : isLeft ? -140 : 140;
  const initialY = isCenter ? (isTop ? targetY - 30 : targetY + 30) : targetY;

  return (
    <motion.article
      role="status"
      aria-live="polite"
      initial={{
        opacity: 0,
        x: entryX,
        y: initialY,
        scale: 0.95,
      }}
      animate={{
        opacity: isDismissing ? 0 : 1,
        x: isDismissing ? exitX : 0,
        y: targetY,
        scale: 1,
        zIndex: 50 - index,
        pointerEvents: !isDismissing ? "auto" : "none",
      }}
      exit={{
        opacity: 0,
        x: exitX,
        scale: 0.95,
        transition: {
          duration: 0.22,
          ease: [0.16, 1, 0.3, 1],
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
      className="toastify-item absolute h-14 w-full select-none cursor-grab active:cursor-grabbing"
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
