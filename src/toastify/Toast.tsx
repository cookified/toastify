import type { CSSProperties, ReactNode } from "react";
import type { ToastData, ToastType } from "./types";

export type ToastProps = {
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
      className="toastify-spin"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export function DefaultToastIcon({ type }: { type: ToastType }) {
  switch (type) {
    case "loading":
      return (
        <span className="toastify-badge">
          <LoaderIcon />
        </span>
      );
    case "success":
      return (
        <span className="toastify-badge">
          <CheckIcon />
        </span>
      );
    case "error":
      return (
        <span className="toastify-badge">
          <XIcon />
        </span>
      );
    case "warning":
      return (
        <span className="toastify-badge">
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
        <span className="toastify-badge">
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

export function Toast({
  toast,
  onDismiss,
  closeOnClick = false,
  closeButton = true,
  globalIcons,
  globalOptions,
}: ToastProps) {
  if (toast.customRenderer) {
    return <>{toast.customRenderer(toast.id)}</>;
  }

  const icon =
    toast.icon ??
    globalIcons?.[toast.type] ?? (
      <DefaultToastIcon type={toast.type} />
    );

  const showCloseButton =
    toast.closeButton !== undefined
      ? toast.closeButton
      : (globalOptions?.closeButton ?? closeButton);

  return (
    <div
      onClick={() => closeOnClick && onDismiss()}
      className={`toastify-toast ${globalOptions?.className ?? ""} ${toast.className ?? ""}`}
      style={{ ...globalOptions?.style, ...toast.style }}
    >
      <div className="toastify-content">
        {icon}

        <div className="toastify-text-group">
          <div className="toastify-title">
            {toast.title}
          </div>
          {toast.description && (
            <div className="toastify-description">
              {toast.description}
            </div>
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
            className="toastify-close-btn"
          >
            <XIcon />
          </button>
        )}
      </div>
    </div>
  );
}
