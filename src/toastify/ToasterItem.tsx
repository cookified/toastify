import { useEffect, useRef, useState } from "react";
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
      : toast.duration !== undefined
        ? toast.duration
        : toastOptions?.duration !== undefined
          ? toastOptions.duration
          : (autoClose ?? duration);

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

    const elapsedSinceCreation = toast.createdAt
      ? Date.now() - toast.createdAt
      : 0;
    const initialRemaining =
      typeof itemDuration === "number"
        ? Math.max(50, itemDuration - elapsedSinceCreation)
        : itemDuration;

    const startTime = Date.now();
    const currentRemaining =
      remainingTimeRef.current === false
        ? initialRemaining
        : Math.min(
            typeof remainingTimeRef.current === "number"
              ? remainingTimeRef.current
              : Infinity,
            typeof initialRemaining === "number" ? initialRemaining : Infinity,
          );

    const timer = window.setTimeout(() => {
      handleDismiss();
    }, currentRemaining);

    return () => {
      window.clearTimeout(timer);
      if (remainingTimeRef.current !== false) {
        const elapsed = Date.now() - startTime;
        remainingTimeRef.current = Math.max(
          0,
          remainingTimeRef.current - elapsed,
        );
      }
    };
  }, [isHovered, itemDuration, toast.createdAt]);

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
