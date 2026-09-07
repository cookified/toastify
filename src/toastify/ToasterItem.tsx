import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Toast } from "./Toast";
import { ToastAnimation } from "./animations";
import type {
  AnimationPreset,
  SpringConfig,
  ToastAnimationComponent,
  ToastData,
  ToastPosition,
  ToastType,
} from "./types";

export type ToasterItemProps = {
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
  toastOptions?: {
    className?: string;
    style?: CSSProperties;
    duration?: number | false;
    closeButton?: boolean;
  };
  onDismiss: () => void;
};

export function ToasterItem({
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
  toastOptions,
  onDismiss,
}: ToasterItemProps) {
  const itemDuration =
    toast.type === "loading"
      ? false
      : (toast.duration ?? toastOptions?.duration ?? autoClose ?? duration);

  const [isDismissing, setIsDismissing] = useState(false);
  const onDismissRef = useRef(onDismiss);
  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  const handleDismiss = useCallback(() => {
    setIsDismissing(true);
    onDismissRef.current();
  }, []);

  const remainingTimeRef = useRef<number | false>(itemDuration);
  useEffect(() => {
    remainingTimeRef.current = itemDuration;
  }, [itemDuration]);

  useEffect(() => {
    if (itemDuration === false || isHovered) return;

    const elapsed = toast.createdAt ? Date.now() - toast.createdAt : 0;
    const initial = typeof itemDuration === "number" ? Math.max(50, itemDuration - elapsed) : itemDuration;
    const startTime = Date.now();
    const remaining =
      typeof remainingTimeRef.current === "number" && typeof initial === "number"
        ? Math.min(remainingTimeRef.current, initial)
        : initial;

    const timer = window.setTimeout(handleDismiss, remaining as number);

    return () => {
      window.clearTimeout(timer);
      if (typeof remainingTimeRef.current === "number") {
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - (Date.now() - startTime));
      }
    };
  }, [isHovered, itemDuration, toast.createdAt, handleDismiss]);

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
        closeButton={closeButton}
        globalIcons={icons}
        globalOptions={toastOptions}
      />
    </ToastAnimation>
  );
}
