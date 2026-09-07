import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type MotionNavItemProps = {
  href: string;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
};

export function MotionNavItem({
  href,
  label,
  onClick,
  isActive = false,
}: MotionNavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
        isActive
          ? "font-medium text-neutral-950 dark:text-white"
          : "text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100"
      }`}
    >
      <span className="flex items-center gap-2">
        {/* Left Circular Breakout Dot */}
        <motion.span
          className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
            isActive
              ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] scale-125"
              : isHovered
                ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)] scale-110"
                : "bg-neutral-300 dark:bg-neutral-700"
          }`}
          animate={isHovered ? { scale: [1, 1.4, 1.2] } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        />
        <span>{label}</span>
      </span>

      {/* Right-Side Curved Breakout Indicator */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            layoutId="right-curve-indicator"
            initial={{ opacity: 0, x: -4, scaleY: 0.4 }}
            animate={{ opacity: 1, x: 0, scaleY: 1 }}
            exit={{ opacity: 0, x: 4, scaleY: 0.4 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="absolute right-0 h-4 w-1 rounded-l-full rounded-r-md bg-gradient-to-b from-emerald-500 to-amber-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          />
        )}
      </AnimatePresence>
    </a>
  );
}
