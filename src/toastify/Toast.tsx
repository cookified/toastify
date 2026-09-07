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

  const handleBtn = (action?: { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) =>
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      try { action?.onClick(e); } catch (err) { console.error("Toast action failed:", err); }
      onDismiss();
    };

  const handleKey = (cb: () => void, allowEsc = false) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || (allowEsc && e.key === "Escape")) {
      e.preventDefault();
      e.stopPropagation();
      cb();
    }
  };

  return (
    <div
      ref={ref}
      onClick={(e) => { restProps.onClick?.(e); if (closeOnClick) onDismiss(); }}
      className={combinedClassName}
      style={{ ...globalOptions?.style, ...toast.style, ...style }}
      {...restProps}
    >
      <div className="toastify-content">
        {icon}
        <div className="toastify-text-group">
          <div className="toastify-title">{toast.title}</div>
          {toast.description && <div className="toastify-description">{toast.description}</div>}
        </div>
      </div>

      <div className="toastify-actions">
        {toast.cancel && (
          <button
            type="button"
            onClick={handleBtn(toast.cancel)}
            onKeyDown={handleKey(() => toast.cancel?.onClick({} as React.MouseEvent<HTMLButtonElement>))}
            className="toastify-btn-cancel"
          >
            {toast.cancel.label}
          </button>
        )}
        {toast.action && (
          <button
            type="button"
            onClick={handleBtn(toast.action)}
            onKeyDown={handleKey(() => toast.action?.onClick({} as React.MouseEvent<HTMLButtonElement>))}
            className="toastify-btn-action"
          >
            {toast.action.label}
          </button>
        )}
        {showCloseButton && (
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={(e) => { e.stopPropagation(); onDismiss(); }}
            onKeyDown={handleKey(onDismiss, true)}
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
