import type { CSSProperties, ReactNode } from "react";

export type ToastType =
  | "neutral"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "custom";

export type ToastAction = {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type ToastOptions = {
  id?: string;
  description?: ReactNode;
  action?: ToastAction;
  cancel?: ToastAction;
  icon?: ReactNode;
  duration?: number | false;
  autoClose?: number | false;
  className?: string;
  style?: CSSProperties;
};

export type ToastPromiseOptions<T = unknown> = {
  loading: string;
  success: string | ((data: T) => string);
  error: string | ((err: unknown) => string);
  description?: ReactNode | ((data: T) => ReactNode);
  action?: ToastAction;
  cancel?: ToastAction;
};

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastTheme = "light" | "dark" | "system";

export type SpringConfig = {
  stiffness?: number;
  damping?: number;
  mass?: number;
};

export type ToastAnimationProps = {
  toast: ToastData;
  index: number;
  totalToasts: number;
  isHovered: boolean;
  position: ToastPosition;
  isDismissing: boolean;
  onDismiss: () => void;
  springConfig?: SpringConfig;
  children: ReactNode;
};

export type ToastAnimationComponent = React.ComponentType<ToastAnimationProps>;

export type AnimationPreset = "stack" | "slide" | "fade";

export type ToasterProps = {
  position?: ToastPosition;
  duration?: number | false;
  autoClose?: number | false;
  theme?: ToastTheme;
  className?: string;
  style?: CSSProperties;
  visibleToasts?: number;
  closeOnClick?: boolean;
  animation?: AnimationPreset | ToastAnimationComponent;
  springConfig?: SpringConfig;
  icons?: Partial<Record<ToastType, ReactNode>>;
  toastOptions?: {
    className?: string;
    style?: CSSProperties;
    duration?: number;
  };
};

export type ToastData = {
  id: string;
  type: ToastType;
  title: ReactNode;
  description?: ReactNode;
  action?: ToastAction;
  cancel?: ToastAction;
  icon?: ReactNode;
  duration?: number | false;
  className?: string;
  style?: CSSProperties;
  customRenderer?: (id: string) => ReactNode;
  createdAt: number;
};
