import type { ReactNode } from "react";
import type { ToastType } from "./types";

const Svg = ({ children, className }: { children: ReactNode; className?: string }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const CheckIcon = () => (
  <Svg>
    <polyline points="20 6 9 17 4 12" />
  </Svg>
);

export const XIcon = () => (
  <Svg>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Svg>
);

export const LoaderIcon = () => (
  <Svg className="toastify-spin animate-spin">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </Svg>
);

export const WarningIcon = () => (
  <Svg>
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </Svg>
);

export const InfoIcon = () => (
  <Svg>
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </Svg>
);

const defaultIcons: Record<string, ReactNode> = {
  loading: <LoaderIcon />,
  success: <CheckIcon />,
  error: <XIcon />,
  warning: <WarningIcon />,
};

export function DefaultToastIcon({ type }: { type: ToastType }) {
  return <span className="toastify-badge">{defaultIcons[type] ?? <InfoIcon />}</span>;
}
