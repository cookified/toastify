import { motion } from "motion/react";
import type { ToastAnimationProps } from "../types";
import { defaultSpring } from "./constants";

/**
 * FolderStackAnimation (Default)
 * Elegant card-stacking animation with smooth hover expansion and lateral exit.
 */
export function FolderStackAnimation({
  toast,
  index,
  isHovered,
  position,
  isDismissing,
  onDismiss,
  springConfig = defaultSpring,
  children,
}: ToastAnimationProps) {
  const isTop = position.startsWith("top");
  const isCenter = position.endsWith("center");
  const isLeft = position.endsWith("left");

  const collapsed = !isHovered;
  const isVisible = !collapsed || index < 3;

  const stackStep = 66;
  const offset = collapsed ? index * 10 : index * stackStep;
  const targetY = isTop ? offset : -offset;
  const targetScale = collapsed ? Math.max(0.88, 1 - index * 0.05) : 1;
  const targetOpacity = !isVisible
    ? 0
    : collapsed
      ? index === 0
        ? 1
        : index === 1
          ? 0.94
          : 0.84
      : 1;

  const exitX = isCenter ? 0 : isLeft ? -36 : 36;
  const isError = toast?.type === "error";

  return (
    <motion.article
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      aria-atomic="true"
      initial={{
        opacity: 0,
        x: 0,
        y: isTop ? targetY - 14 : targetY + 14,
        scale: 0.94,
      }}
      animate={{
        opacity: isDismissing ? 0 : targetOpacity,
        x: isDismissing ? exitX : 0,
        y: targetY,
        scale: isDismissing ? 0.94 : targetScale,
        zIndex: 50 - index,
        pointerEvents: !isDismissing && isVisible ? "auto" : "none",
      }}
      exit={{
        opacity: 0,
        x: exitX,
        scale: 0.94,
        transition: {
          duration: 0.24,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      transition={{
        type: "spring",
        ...springConfig,
      }}
      drag={index === 0 || isHovered ? "x" : false}
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
        transformOrigin: isTop ? "top center" : "bottom center",
      }}
    >
      {children}
    </motion.article>
  );
}
