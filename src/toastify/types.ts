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
  /** Whether to render a dedicated close button. Default: inherited from Toaster (true) */
  closeButton?: boolean;
  /** Optional viewport position override for this toast */
  position?: ToastPosition;
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
  gap?: number;
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
  /** Whether to render a dedicated keyboard-accessible manual close button. Default: true */
  closeButton?: boolean;
  animation?: AnimationPreset | ToastAnimationComponent;
  springConfig?: SpringConfig;
  icons?: Partial<Record<ToastType, ReactNode>>;
  unstyled?: boolean;
  /** Vertical gap between expanded notifications in pixels. Default: 14 */
  gap?: number;
  /** Margin offset from viewport edges (e.g. 24 or "24px"). Default: "24px" */
  offset?: number | string;
  toastOptions?: {
    className?: string;
    style?: CSSProperties;
    duration?: number;
    closeButton?: boolean;
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
  closeButton?: boolean;
  position?: ToastPosition;
  customRenderer?: (id: string) => ReactNode;
  createdAt: number;
};
