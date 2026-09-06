import type { CSSProperties, ReactNode } from "react";
import type { ToastData, ToastType } from "./types";

export type ToastProps = {
  toast: ToastData;
  onDismiss: () => void;
  closeOnClick?: boolean;
  globalIcons?: Partial<Record<ToastType, ReactNode>>;
  globalOptions?: {
    className?: string;
    style?: CSSProperties;
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
  const badgeClasses =
    "toastify-badge flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white shadow-xs dark:bg-white dark:text-neutral-950";

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

export function Toast({
  toast,
  onDismiss,
  closeOnClick = false,
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

  return (
    <div
      onClick={() => closeOnClick && onDismiss()}
      className={`toastify-toast flex h-14 w-full select-none items-center justify-between gap-3 rounded-md border border-neutral-200/90 bg-white px-3.5 shadow-md shadow-neutral-950/5 dark:border-neutral-800/90 dark:bg-neutral-900 dark:shadow-neutral-950/40 ${globalOptions?.className ?? ""} ${toast.className ?? ""}`}
      style={{ ...globalOptions?.style, ...toast.style }}
    >
      <div className="toastify-content flex min-w-0 flex-1 items-center gap-3">
        {icon}

        <div className="toastify-text-group flex min-w-0 flex-col justify-center">
          <div className="toastify-title truncate text-[13px] font-medium leading-4 text-neutral-900 dark:text-neutral-100">
            {toast.title}
          </div>
          {toast.description && (
            <div className="toastify-description mt-0.5 truncate text-[12px] leading-4 text-neutral-500 dark:text-neutral-400">
              {toast.description}
            </div>
          )}
        </div>
      </div>

      <div className="toastify-actions flex shrink-0 items-center gap-2">
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
            className="toastify-btn-cancel cursor-pointer rounded px-2 py-1 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
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
            className="toastify-btn-action cursor-pointer rounded px-2.5 py-1 text-xs font-medium bg-neutral-900 text-white transition-all hover:bg-neutral-800 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.5),0_1px_2px_rgba(0,0,0,0.08)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.22),0_1px_2px_rgba(0,0,0,0.15)] dark:active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)]"
          >
            {toast.action.label}
          </button>
        )}
      </div>
    </div>
  );
}
