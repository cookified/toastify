import React, { forwardRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { DefaultToastIcon, XIcon } from "./icons";
import type { ToastData, ToastType } from "./types";
import { cn } from "./utils";

export { DefaultToastIcon } from "./icons";

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

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
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
      : (globalIcons?.[toast.type] ?? <DefaultToastIcon type={toast.type} />);

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

  const handleAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      toast.action?.onClick(event);
    } catch (err) {
      console.error("Toast action handler failed:", err);
    }
    onDismiss();
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      toast.cancel?.onClick(event);
    } catch (err) {
      console.error("Toast cancel handler failed:", err);
    }
    onDismiss();
  };

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
            onClick={handleCancel}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleCancel(
                  event as unknown as React.MouseEvent<HTMLButtonElement>,
                );
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
            onClick={handleAction}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleAction(
                  event as unknown as React.MouseEvent<HTMLButtonElement>,
                );
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
              if (
                event.key === "Enter" ||
                event.key === " " ||
                event.key === "Escape"
              ) {
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
