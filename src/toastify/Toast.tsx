import React, { forwardRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { ToastData, ToastType } from "./types";
import { cn } from "./utils";

export type ToastProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  toast: ToastData;
  onDismiss: () => void;
  closeOnClick?: boolean;
  closeButton?: boolean;
  globalIcons?: Partial<Record<ToastType, ReactNode>>;
  globalOptions?: {
    className?: string;
    style?: CSSProperties;
    closeButton?: boolean;
  };
};

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function LoaderIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="toastify-spin animate-spin"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export function DefaultToastIcon({ type }: { type: ToastType }) {
  const badgeClasses = "toastify-badge";

  switch (type) {
    case "loading":
      return (
        <span className={badgeClasses}>
          <LoaderIcon />
        </span>
      );
    case "success":
      return (
        <span className={badgeClasses}>
          <CheckIcon />
        </span>
      );
    case "error":
      return (
        <span className={badgeClasses}>
          <XIcon />
        </span>
      );
    case "warning":
      return (
        <span className={badgeClasses}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </span>
      );
    case "info":
    case "neutral":
    default:
      return (
        <span className={badgeClasses}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </span>
      );
  }
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  function Toast(
    {
      toast,
      onDismiss,
      closeOnClick = false,
      closeButton = true,
      globalIcons,
      globalOptions,
      className,
      style,
      ...restProps
    },
    ref,
  ) {
    if (toast.customRenderer) {
      return <>{toast.customRenderer(toast.id)}</>;
    }

    const icon =
      toast.icon !== undefined
        ? toast.icon
        : (globalIcons?.[toast.type] ?? (
            <DefaultToastIcon type={toast.type} />
          ));

    const showCloseButton =
      toast.closeButton !== undefined
        ? toast.closeButton
        : (globalOptions?.closeButton ?? closeButton);

    const combinedClassName = cn(
      "toastify-toast",
      globalOptions?.className,
      toast.className,
      className,
    );

    return (
      <div
        ref={ref}
        onClick={(event) => {
          restProps.onClick?.(event);
          if (closeOnClick) onDismiss();
        }}
        className={combinedClassName}
        style={{ ...globalOptions?.style, ...toast.style, ...style }}
        {...restProps}
      >
      <div className="toastify-content">
        {icon}

        <div className="toastify-text-group">
          <div className="toastify-title">{toast.title}</div>
          {toast.description && (
            <div className="toastify-description">{toast.description}</div>
          )}
        </div>
      </div>

      <div className="toastify-actions">
        {toast.cancel && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              try {
                toast.cancel?.onClick(event);
              } catch (err) {
                console.error("Toast cancel handler failed:", err);
              }
              onDismiss();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                event.stopPropagation();
                try {
                  toast.cancel?.onClick(event as unknown as React.MouseEvent<HTMLButtonElement>);
                } catch (err) {
                  console.error("Toast cancel handler failed:", err);
                }
                onDismiss();
              }
            }}
            className="toastify-btn-cancel"
          >
            {toast.cancel.label}
          </button>
        )}

        {toast.action && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              try {
                toast.action?.onClick(event);
              } catch (err) {
                console.error("Toast action handler failed:", err);
              }
              onDismiss();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                event.stopPropagation();
                try {
                  toast.action?.onClick(event as unknown as React.MouseEvent<HTMLButtonElement>);
                } catch (err) {
                  console.error("Toast action handler failed:", err);
                }
                onDismiss();
              }
            }}
            className="toastify-btn-action"
          >
            {toast.action.label}
          </button>
        )}

        {showCloseButton && (
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={(event) => {
              event.stopPropagation();
              onDismiss();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
                event.preventDefault();
                event.stopPropagation();
                onDismiss();
              }
            }}
            className="toastify-btn-close"
          >
            <XIcon />
          </button>
        )}
      </div>
    </div>
  );
});

Toast.displayName = "Toast";

