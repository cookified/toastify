import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { Toast } from "./Toast";
import { ToastAnimation } from "./animations";
import { toastStore } from "./store";
import { toastifyStyles } from "./styles";
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
  "top-left": "toastify-pos-top-left",
  "top-center": "toastify-pos-top-center",
  "top-right": "toastify-pos-top-right",
  "bottom-left": "toastify-pos-bottom-left",
  "bottom-center": "toastify-pos-bottom-center",
  "bottom-right": "toastify-pos-bottom-right",
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
  closeButton?: boolean;
  animation?: AnimationPreset | ToastAnimationComponent;
  springConfig?: SpringConfig;
  icons?: Partial<Record<ToastType, ReactNode>>;
  gap?: number;
  toastOptions?: {
    className?: string;
    style?: CSSProperties;
    duration?: number;
    closeButton?: boolean;
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
  closeButton = true,
  animation = "stack",
  springConfig,
  icons,
  gap = 14,
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

  const effectivePosition = toast.position ?? position;

  return (
    <ToastAnimation
      animation={animation}
      toast={toast}
      index={index}
      totalToasts={totalToasts}
      isHovered={isHovered}
      position={effectivePosition}
      isDismissing={isDismissing}
      onDismiss={handleDismiss}
      springConfig={springConfig}
      gap={gap}
    >
      <Toast
        toast={toast}
        onDismiss={handleDismiss}
        closeOnClick={closeOnClick}
        closeButton={closeButton}
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
  theme = "system",
  className,
  style,
  visibleToasts = 3,
  closeOnClick = false,
  closeButton = true,
  animation = "stack",
  springConfig,
  icons,
  unstyled = false,
  gap = 14,
  offset = "24px",
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
      ? (effectiveCount - 1) * (56 + gap) + 56
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

  const dynamicStyle: CSSProperties = {
    ...style,
    ...(typeof offset === "number"
      ? { "--toastify-offset": `${offset}px` }
      : offset
        ? { "--toastify-offset": offset }
        : {}),
    ...(typeof gap === "number" ? { "--toastify-gap": `${gap}px` } : {}),
  } as CSSProperties;

  return (
    <>
      {!unstyled && (
        <style
          data-toastify-styles=""
          dangerouslySetInnerHTML={{ __html: toastifyStyles }}
        />
      )}
      <motion.div
        data-toastify-toaster="true"
        role="region"
        aria-label="Notifications"
        tabIndex={-1}
        className={`toastify-toaster ${hasToasts ? "toastify-pointer-auto" : "toastify-pointer-none"} ${positionClasses[position]} ${theme === "dark" ? "dark" : theme === "system" ? "system" : ""} ${className ?? ""}`.trim()}
        style={dynamicStyle}
        animate={{
          height: containerHeight,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 26,
          mass: 0.8,
          ...springConfig,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`toastify-list ${isTop ? "toastify-list-col" : "toastify-list-col-reverse"}`}
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
                closeButton={closeButton}
                animation={animation}
                springConfig={springConfig}
                icons={icons}
                gap={gap}
                toastOptions={toastOptions}
                onDismiss={() => toastStore.remove(toastItem.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

export const ToastContainer = Toaster;

