import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ToasterItem } from "./ToasterItem";
import { toastStore } from "./store";
import { toastifyStyles } from "./styles";
import type { ToastData, ToastPosition, ToasterProps } from "./types";
import { cn } from "./utils";

const positionClasses: Record<ToastPosition, string> = {
  "top-left": "toastify-pos-top-left",
  "top-center": "toastify-pos-top-center",
  "top-right": "toastify-pos-top-right",
  "bottom-left": "toastify-pos-bottom-left",
  "bottom-center": "toastify-pos-bottom-center",
  "bottom-right": "toastify-pos-bottom-right",
};

export const Toaster = forwardRef<HTMLDivElement, ToasterProps>(
  function Toaster(
    {
      position = "bottom-right",
      duration = 3500,
      autoClose,
      theme = "system",
      className,
      style,
      visibleToasts = 5,
      closeOnClick = false,
      closeButton = true,
      dismissOnEscape = true,
      animation = "stack",
      springConfig,
      icons,
      unstyled = false,
      gap = 14,
      offset = "24px",
      toastOptions,
      ...restProps
    }: ToasterProps,
    ref,
  ) {
    const [toasts, setToasts] = useState<ToastData[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const [hoverExpandedCount, setHoverExpandedCount] = useState<number | null>(
      null,
    );
    const leaveTimeoutRef = useRef<number | null>(null);

    useEffect(() => toastStore.subscribe(setToasts), []);

    useEffect(() => {
      if (!dismissOnEscape || toasts.length === 0) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          const target = event.target;
          const isElement =
            typeof Element !== "undefined" && target instanceof Element;
          const isInsideToaster = Boolean(
            isElement && target.closest('[data-toastify-toaster="true"]'),
          );
          const isInputField = Boolean(
            isElement &&
            (target.tagName === "INPUT" ||
              target.tagName === "TEXTAREA" ||
              target.tagName === "SELECT" ||
              (target as HTMLElement).isContentEditable),
          );

          if (isInsideToaster || !isInputField) {
            event.preventDefault();
            toastStore.remove(toasts[0].id);
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [dismissOnEscape, toasts]);

    useEffect(() => {
      if (!isHovered && toasts.length > visibleToasts) {
        const excess = toasts.slice(visibleToasts);
        excess.forEach((t) => {
          toastStore.remove(t.id);
        });
      }
    }, [toasts, visibleToasts, isHovered]);

    const isTop = position.startsWith("top");
    const hasToasts = toasts.length > 0;
    const activeCount = Math.min(toasts.length, visibleToasts);

    const effectiveCount =
      isHovered && hoverExpandedCount !== null
        ? Math.max(activeCount, hoverExpandedCount)
        : activeCount;

    const stackStep = 56 + gap;
    const containerHeight =
      hasToasts && isHovered && effectiveCount > 0
        ? (effectiveCount - 1) * stackStep + 56
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
          ref={ref}
          data-toastify-toaster="true"
          role="region"
          aria-label="Notifications"
          tabIndex={-1}
          {...restProps}
          className={cn(
            "toastify-toaster",
            hasToasts ? "toastify-pointer-auto" : "toastify-pointer-none",
            positionClasses[position],
            theme === "dark" ? "dark" : theme === "system" ? "system" : "",
            className,
          )}
          style={dynamicStyle}
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
                  toastOptions={toastOptions}
                  onDismiss={() => toastStore.remove(toastItem.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </>
    );
  },
);

Toaster.displayName = "Toaster";

export const ToastContainer = Toaster;
