import type { CSSProperties, ReactNode } from "react";

/** Toast variant types supported by the system */
export type ToastType =
  "neutral" | "success" | "error" | "warning" | "info" | "loading" | "custom";

/** Tactile action button configuration */
export type ToastAction = {
  /** Text label displayed inside the button */
  label: string;
  /** Click handler triggered when user clicks the button */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

/** Options passed when creating or updating a notification */
export type ToastOptions = {
  /** Unique identifier for the toast. Auto-generated if omitted. */
  id?: string;
  /** Secondary descriptive text or markup rendered beneath the title */
  description?: ReactNode;
  /** Primary tactile call-to-action button */
  action?: ToastAction;
  /** Secondary cancel or dismiss button */
  cancel?: ToastAction;
  /** Custom icon element override for this specific toast */
  icon?: ReactNode;
  /** Auto-dismiss timeout in ms, or `false` to disable auto-dismiss */
  duration?: number | false;
  /** Alias for duration (in ms) */
  autoClose?: number | false;
  /** Additional custom CSS class names applied to the toast card */
  className?: string;
  /** Inline CSS style overrides applied to the toast card */
  style?: CSSProperties;
  /** Whether to render a dedicated accessible dismiss button. Default: true */
  closeButton?: boolean;
  /** Optional viewport position override for this specific toast */
  position?: ToastPosition;
};

/** Options passed to toast.promise() to track async operations */
export type ToastPromiseOptions<T = unknown> = {
  /** Message displayed while the promise is pending */
  loading: string;
  /** Message or generator function displayed when the promise resolves */
  success: string | ((data: T) => string);
  /** Message or generator function displayed when the promise rejects */
  error: string | ((err: unknown) => string);
  /** Secondary descriptive text displayed upon resolution */
  description?: ReactNode | ((data: T) => ReactNode);
  /** Primary action button attached to the resolved/rejected toast */
  action?: ToastAction;
  /** Secondary cancel button attached to the toast */
  cancel?: ToastAction;
};

/** Options for defining a reusable custom toast state */
export type ToastVariantDefinition = {
  /** Optional base variant role (defaults to "custom") */
  type?: ToastType;
  /** Custom icon or ReactNode */
  icon?: ReactNode;
  /** Default auto-dismiss duration in ms, or `false` to persist */
  duration?: number | false;
  /** Scoped CSS class names applied to the toast card */
  className?: string;
  /** Inline CSS style overrides */
  style?: CSSProperties;
  /** Whether to render dedicated close button */
  closeButton?: boolean;
  /** Optional viewport position override */
  position?: ToastPosition;
  /** Default primary action button */
  action?: ToastAction;
  /** Default secondary cancel button */
  cancel?: ToastAction;
};

/** Reusable dispatcher created by toast.variant() or toast.defineState() */
export type ToastVariantDispatcher = (
  title: ReactNode,
  options?: ToastOptions,
) => string;

/** Screen corner or edge where notifications anchor */
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/** Color scheme mode for the Toaster */
export type ToastTheme = "light" | "dark" | "system";

/** Spring physics configuration for Motion animations */
export type SpringConfig = {
  /** Spring stiffness coefficient */
  stiffness?: number;
  /** Damping ratio coefficient */
  damping?: number;
  /** Inertial mass coefficient */
  mass?: number;
};

/** Props passed to any pluggable Toast animation component */
export type ToastAnimationProps = {
  /** Notification data record */
  toast: ToastData;
  /** Current 0-based visual index in the active stack */
  index: number;
  /** Total number of notifications currently in the store */
  totalToasts: number;
  /** Whether the user is currently hovering over the notification stack */
  isHovered: boolean;
  /** Active viewport anchor placement */
  position: ToastPosition;
  /** Whether the notification is currently in its exit/dismissal animation */
  isDismissing: boolean;
  /** Trigger dismissal of this notification */
  onDismiss: () => void;
  /** Optional spring dynamics override */
  springConfig?: SpringConfig;
  /** The rendered toast card element */
  children: ReactNode;
  /** Vertical gap between expanded cards in pixels */
  gap?: number;
};

/** Pluggable React component conforming to ToastAnimationProps */
export type ToastAnimationComponent = React.ComponentType<ToastAnimationProps>;

/** Built-in animation preset identifiers */
export type AnimationPreset = "stack" | "slide" | "fade";

/** Props for the root <Toaster /> component */
export type ToasterProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  | "children"
  | "animation"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
> & {
  /** Viewport anchor corner or edge. Default: "bottom-right" */
  position?: ToastPosition;
  /** Default auto-close duration in ms, or `false` to disable. Default: 3500 */
  duration?: number | false;
  /** Alias for duration */
  autoClose?: number | false;
  /** Visual theme mode ("light" | "dark" | "system"). Default: "system" */
  theme?: ToastTheme;
  /** Custom CSS class names applied to the container */
  className?: string;
  /** Inline CSS style overrides applied to the container */
  style?: CSSProperties;
  /** Maximum number of cards visible in the stack. Default: 5 */
  visibleToasts?: number;
  /** Whether clicking anywhere on a toast card dismisses it. Default: false */
  closeOnClick?: boolean;
  /** Whether to render a dedicated keyboard-accessible manual close button. Default: true */
  closeButton?: boolean;
  /** Whether pressing the Escape key dismisses the front-most active notification. Default: true */
  dismissOnEscape?: boolean;
  /** Built-in preset name or custom pluggable Motion component. Default: "stack" */
  animation?: AnimationPreset | ToastAnimationComponent;
  /** Spring physics dynamics override */
  springConfig?: SpringConfig;
  /** Global custom icons map by toast variant */
  icons?: Partial<Record<ToastType, ReactNode>>;
  /** If true, disables auto-injection of library CSS styles. Default: false */
  unstyled?: boolean;
  /** Vertical spacing in pixels between expanded notifications. Default: 14 */
  gap?: number;
  /** Distance in pixels or CSS units from viewport edges. Default: "24px" */
  offset?: number | string;
  /** Global default options applied to all toasts */
  toastOptions?: {
    className?: string;
    style?: CSSProperties;
    duration?: number | false;
    closeButton?: boolean;
  };
};

/** Internal state representation of an active notification */
export type ToastData = {
  /** Unique ID */
  id: string;
  /** Notification type variant */
  type: ToastType;
  /** Primary title content */
  title: ReactNode;
  /** Secondary description content */
  description?: ReactNode;
  /** Call-to-action button */
  action?: ToastAction;
  /** Cancel button */
  cancel?: ToastAction;
  /** Custom icon */
  icon?: ReactNode;
  /** Auto-close timeout in ms, or false */
  duration?: number | false;
  /** Custom CSS class */
  className?: string;
  /** Inline style */
  style?: CSSProperties;
  /** Close button flag */
  closeButton?: boolean;
  /** Viewport position override */
  position?: ToastPosition;
  /** Custom JSX render function for headless toasts */
  customRenderer?: (id: string) => ReactNode;
  /** Creation timestamp in ms */
  createdAt: number;
};
