# Toastify

<p align="center">
  <strong>A delightful toast notification library for React.</strong><br>
  Designed with folder stack animations, tactile buttons, and pluggable Motion presets.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@cookified/toastify"><img src="https://img.shields.io/badge/react-19+-61dafb.svg?style=flat-square&logo=react" alt="React 19" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-strict-3178c6.svg?style=flat-square&logo=typescript" alt="TypeScript" /></a>
  <a href="https://motion.dev/"><img src="https://img.shields.io/badge/motion-13.2+-ff0055.svg?style=flat-square" alt="Motion" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="MIT License" /></a>
</p>

---

## Highlights

- 📁 **Folder Stack Animations**: Stacked cards with spring compression that smoothly expand on hover.
- 🔌 **Pluggable Animation Components**: Animations are fully decoupled as first-class React components (`"stack" | "slide" | "fade"` or custom Motion component).
- 🎛️ **Tactile Action Buttons**: Subtle bottom shadow offering clean tactile feedback.
- ♿ **Full Screen Reader & Keyboard A11y**: Polite ARIA regions (`role="region"`), non-intrusive focus management, and keyboard dismissal.
- 📐 **Zero Layout Jumps**: Constant 56px height geometry across neutral, action, and loading states ensures zero layout thrashing.
- 🛡️ **Bounded Memory & DoS Safe**: Bounded toast buffer, duration sanitization, and safe exception containment.
- 🧩 **Headless Custom JSX**: `toast.custom((id) => ...)` for total layout freedom when you need bespoke cards.

---

## Installation

```bash
# pnpm
pnpm add @cookified/toastify motion

# npm
npm install @cookified/toastify motion

# bun
bun add @cookified/toastify motion

# yarn
yarn add @cookified/toastify motion
```

---

## Quick Start

### 1. Add `<Toaster />` to your application root

```tsx
import { Toaster } from "@cookified/toastify";

export default function App() {
  return (
    <>
      <YourAppContent />
      <Toaster position="bottom-right" />
    </>
  );
}
```

### 2. Dispatch notifications from anywhere

```tsx
import { toast } from "@cookified/toastify";

// Simple neutral toast
toast("Your changes have been saved");

// Toast with description and tactile action
toast("Event scheduled", {
  description: "Monday, January at 4:00 PM",
  action: {
    label: "Undo",
    onClick: () => console.log("Undo triggered"),
  },
  cancel: {
    label: "Dismiss",
    onClick: () => console.log("Dismissed"),
  },
});
```

---

## Notification Types & Examples

### Status Variants

Each status variant displays an inverted high-contrast badge for instant optical hierarchy:

```tsx
toast.success("Payment confirmed", {
  description: "Receipt #4092 emailed to your account",
});

toast.error("Deployment failed", {
  description: "Missing environment variable API_SECRET",
  action: {
    label: "Retry",
    onClick: () => retryDeployment(),
  },
});

toast.warning("Storage limit approaching", {
  description: "You have used 88% of available quota",
});

toast.info("Update available", {
  description: "Version 2.4 is ready to install",
});
```

### Promise Toasts

Automatically tracks loading states and resolves to success or error:

```tsx
toast.promise(
  uploadFilePromise(),
  {
    loading: "Uploading file to server...",
    success: (data) => `Uploaded ${data.filename} successfully`,
    error: "Failed to upload file. Please retry.",
    action: {
      label: "View",
      onClick: () => navigateToFiles(),
    },
  }
);
```

### Custom Themes & Icons

```tsx
import { Sparkles } from "lucide-react";

toast("Custom Palette & Icon", {
  description: "Per-toast CSS styling & custom icons",
  icon: (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-neutral-950">
      <Sparkles size={11} strokeWidth={2.5} />
    </span>
  ),
  className: "border-amber-500/40 bg-amber-500/5",
});
```

### Headless Custom JSX Toasts

When you want total control over the rendered markup:

```tsx
toast.custom((id) => (
  <div className="flex h-14 w-full items-center justify-between rounded-md border border-violet-500/40 bg-neutral-900 px-4 text-xs text-white shadow-xl">
    <span>Custom rendered notification</span>
    <button onClick={() => toast.dismiss(id)} className="cursor-pointer font-bold opacity-70 hover:opacity-100">
      ✕
    </button>
  </div>
));
```

---

## Pluggable Animation Components

Unlike traditional libraries with fixed CSS transitions, Toastify treats animations as first-class, pluggable React components.

### 1. Using Built-In Presets

```tsx
<Toaster animation="stack" />  {/* Signature folder stack (default) */}
<Toaster animation="slide" />  {/* Horizontal sliding edge transitions */}
<Toaster animation="fade" />   {/* Pure opacity dissolution */}
```

### 2. Creating a Custom Animation Component

Any React component adhering to `ToastAnimationProps` can be passed to `<Toaster animation={MyComponent} />`:

```tsx
import type { ToastAnimationProps } from "@cookified/toastify";
import { motion } from "motion/react";

export function BouncyAnimation({
  children,
  isDismissing,
  index,
}: ToastAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{
        opacity: isDismissing ? 0 : 1,
        scale: isDismissing ? 0.85 : 1 - index * 0.05,
        y: isDismissing ? 40 : index * 8,
      }}
      transition={{ type: "spring", stiffness: 420, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

// Pass directly to Toaster:
<Toaster animation={BouncyAnimation} />
```

### 3. Tuning Spring Physics

You can customize the folder stack spring dynamics directly:

```tsx
<Toaster
  animation="stack"
  springConfig={{
    stiffness: 240,
    damping: 24,
    mass: 0.9,
  }}
/>
```

---

## API Reference

### `<Toaster />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `position` | `ToastPosition` | `"bottom-right"` | Viewport anchor: `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` |
| `animation` | `AnimationPreset \| ToastAnimationComponent` | `"stack"` | Animation preset string (`"stack" \| "slide" \| "fade"`) or custom React motion component |
| `theme` | `"light" \| "dark" \| "system"` | `"system"` | Visual theme mode |
| `duration` | `number \| false` | `3500` | Auto-close timeout in ms, or `false` to disable |
| `springConfig` | `SpringConfig` | `{ stiffness: 260, damping: 26, mass: 0.8 }` | Motion spring dynamics override |
| `icons` | `Partial<Record<ToastType, ReactNode>>` | `undefined` | Global custom icon overrides by toast variant |
| `closeButton` | `boolean` | `true` | Whether to render a dedicated keyboard-accessible dismiss button |
| `gap` | `number` | `14` | Spacing in pixels between expanded cards |
| `offset` | `number \| string` | `"24px"` | Viewport edge margin offset (e.g. `24` or `"24px"`) |
| `toastOptions` | `{ className?, style?, duration?, closeButton? }` | `undefined` | Global toast card styling and defaults |
| `closeOnClick` | `boolean` | `false` | Whether clicking a toast card dismisses it |
| `visibleToasts` | `number` | `3` | Maximum number of visible toasts in the folder stack |

### `toast()` Dispatcher API

| Method | Signature | Description |
| :--- | :--- | :--- |
| `toast(title, options?)` | `(title: ReactNode, options?: ToastOptions) => string` | Dispatches a neutral notification |
| `toast.success(title, options?)` | `(title: ReactNode, options?: ToastOptions) => string` | Dispatches a success notification |
| `toast.error(title, options?)` | `(title: ReactNode, options?: ToastOptions) => string` | Dispatches an error notification |
| `toast.warning(title, options?)` | `(title: ReactNode, options?: ToastOptions) => string` | Dispatches a warning notification |
| `toast.info(title, options?)` | `(title: ReactNode, options?: ToastOptions) => string` | Dispatches an informational notification |
| `toast.loading(title, options?)` | `(title: ReactNode, options?: ToastOptions) => string` | Dispatches a persistent loading notification |
| `toast.promise(promise, options)` | `<T>(promise, options: ToastPromiseOptions<T>) => Promise<T>` | Dispatches a promise lifecycle notification |
| `toast.custom(renderFn, options?)` | `(renderFn: (id: string) => ReactNode, options?) => string` | Dispatches a headless custom JSX toast |
| `toast.dismiss(id?)` | `(id?: string) => void` | Dismisses a specific toast by ID, or all toasts if omitted |
| `toast.update(id, options)` | `(id: string, options: Partial<ToastOptions>) => void` | Dynamically updates an active toast |

### `ToastOptions`

```typescript
type ToastOptions = {
  id?: string;
  description?: ReactNode;
  action?: {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };
  cancel?: {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };
  icon?: ReactNode;
  duration?: number | false;
  autoClose?: number | false;
  closeButton?: boolean;
  position?: ToastPosition;
  className?: string;
  style?: CSSProperties;
};
```

---

## Security & Reliability Hardening

- **DoS & Memory Leak Prevention**: The store maintains a strictly bounded maximum history (`MAX_TOASTS = 30`), discarding overflow if a runaway loop fires toasts continuously.
- **Duration Sanitization**: Negative numbers and non-finite timestamps are sanitized to safe fallback intervals.
- **Exception Shielding**: Action and cancel callbacks are wrapped with exception boundaries, guaranteeing that unhandled user errors never crash the toaster or leave orphaned timers.
- **Safe ID Generation**: Utilizes standard `crypto.randomUUID()` with entropy fallbacks for SSR, older browsers, and web workers.
- **Strict Form Isolation**: All buttons explicitly declare `type="button"`, preventing accidental form submissions when rendered inside `<form>` tags.

---

## License

MIT © [Cookified](https://github.com/cookified/toastify)
