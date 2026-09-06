import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { Toast } from "./Toast";
import { ToastAnimation } from "./animations";
import { toastStore } from "./store";
import type {
  AnimationPreset,
  SpringConfig,
  ToastAnimationComponent,
  ToastData,
  ToastPosition,
  ToastType,
  ToasterProps,
} from "./types";

const positionClasses: Record<ToastPosition, string> = {
  "top-left": "top-6 left-6",
  "top-center": "top-6 left-0 right-0 mx-auto",
  "top-right": "top-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "bottom-center": "bottom-6 left-0 right-0 mx-auto",
  "bottom-right": "bottom-6 right-6",
};

type ToasterItemProps = {
  toast: ToastData;
  index: number;
  totalToasts: number;
  isHovered: boolean;
  position: ToastPosition;
  duration?: number | false;
  autoClose?: number | false;
  closeOnClick?: boolean;
  animation?: AnimationPreset | ToastAnimationComponent;
  springConfig?: SpringConfig;
  icons?: Partial<Record<ToastType, ReactNode>>;
  toastOptions?: {
    className?: string;
    style?: CSSProperties;
    duration?: number;
  };
  onDismiss: () => void;
};

function ToasterItem({
  toast,
  index,
  totalToasts,
  isHovered,
  position,
  duration = 3500,
  autoClose,
  closeOnClick = false,
  animation = "stack",
  springConfig,
  icons,
  toastOptions,
  onDismiss,
}: ToasterItemProps) {
  const itemDuration =
    toast.type === "loading"
      ? false
      : toast.duration !== undefined
        ? toast.duration
        : toastOptions?.duration !== undefined
          ? toastOptions.duration
          : autoClose ?? duration;

  const onDismissRef = useRef(onDismiss);
  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  const [isDismissing, setIsDismissing] = useState(false);

  const handleDismiss = () => {
    setIsDismissing(true);
    onDismissRef.current();
  };

  const remainingTimeRef = useRef<number | false>(itemDuration);

  useEffect(() => {
    remainingTimeRef.current = itemDuration;
  }, [itemDuration]);

  useEffect(() => {
    if (itemDuration === false || isHovered) {
      return;
    }

    const startTime = Date.now();
    const currentRemaining =
      remainingTimeRef.current === false ? itemDuration : remainingTimeRef.current;

    const timer = window.setTimeout(() => {
      handleDismiss();
    }, currentRemaining);

    return () => {
      window.clearTimeout(timer);
      if (remainingTimeRef.current !== false) {
        const elapsed = Date.now() - startTime;
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      }
    };
  }, [isHovered, itemDuration]);

  return (
    <ToastAnimation
      animation={animation}
      toast={toast}
      index={index}
      totalToasts={totalToasts}
      isHovered={isHovered}
      position={position}
      isDismissing={isDismissing}
      onDismiss={handleDismiss}
      springConfig={springConfig}
    >
      <Toast
        toast={toast}
        onDismiss={handleDismiss}
        closeOnClick={closeOnClick}
        globalIcons={icons}
        globalOptions={toastOptions}
      />
    </ToastAnimation>
  );
}

export function Toaster({
  position = "bottom-right",
  duration = 3500,
  autoClose,
  theme = "light",
  className,
  style,
  visibleToasts = 5,
  closeOnClick = false,
  animation = "stack",
  springConfig,
  icons,
  toastOptions,
}: ToasterProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverExpandedCount, setHoverExpandedCount] = useState<number | null>(null);
  const leaveTimeoutRef = useRef<number | null>(null);

  useEffect(() => toastStore.subscribe(setToasts), []);

  const isTop = position.startsWith("top");
  const hasToasts = toasts.length > 0;
  const activeCount = Math.min(toasts.length, visibleToasts);

  const effectiveCount =
    isHovered && hoverExpandedCount !== null
      ? Math.max(activeCount, hoverExpandedCount)
      : activeCount;

  const containerHeight =
    hasToasts && isHovered && effectiveCount > 0
      ? (effectiveCount - 1) * 66 + 56
      : 56;

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      window.clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setHoverExpandedCount((prev) => Math.max(prev ?? 0, activeCount));
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(false);
      setHoverExpandedCount(null);
    }, 140);
  };

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) {
        window.clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      data-toastify-toaster="true"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      tabIndex={-1}
      className={`toastify-toaster fixed z-50 w-[356px] max-w-[calc(100vw-32px)] ${hasToasts ? "pointer-events-auto" : "pointer-events-none"} ${positionClasses[position]} ${theme === "dark" ? "dark" : ""} ${className ?? ""}`}
      style={style}
      animate={{
        height: containerHeight,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 26,
        mass: 1.0,
        ...springConfig,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative w-full h-full flex ${isTop ? "flex-col" : "flex-col-reverse"}`}
      >
        <AnimatePresence>
          {toasts.slice(0, visibleToasts).map((toastItem, index) => (
            <ToasterItem
              key={toastItem.id}
              toast={toastItem}
              index={index}
              totalToasts={toasts.length}
              isHovered={isHovered}
              position={position}
              duration={duration}
              autoClose={autoClose}
              closeOnClick={closeOnClick}
              animation={animation}
              springConfig={springConfig}
              icons={icons}
              toastOptions={toastOptions}
              onDismiss={() => toastStore.remove(toastItem.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export const ToastContainer = Toaster;
