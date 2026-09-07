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

### Creating Custom States

In addition to built-in status types (`toast.success`, `toast.error`, etc.), you can easily create custom notification states:

#### 1. Ad-hoc Custom State
Pass custom icons, styles, or actions directly to `toast`:

```tsx
toast("Session Verified", {
  description: "Hardware passkey approved for this workspace",
  icon: <KeyIcon />,
});
```

#### 2. Reusable State Dispatcher (`toast.variant`)
When you have recurring notification types across your app (e.g. sync statuses, deployments, mentions), declare a reusable state dispatcher once to avoid repeating options:

```tsx
import { toast } from "@cookified/toastify";

// Define the state once
const toastSync = toast.variant({
  icon: <SyncIcon />,
  className: "border-sky-500/30",
  duration: 3500,
});

// Call it from anywhere in your app
toastSync("Cloud Synchronized", {
  description: "Branch main updated with 4 new commits",
});
```

#### 3. Headless Custom Markup
When you want total control over the rendered markup, pass a render function to `toast.custom`:

```tsx
toast.custom((id) => (
  <div className="flex h-14 w-full items-center justify-between rounded-md border border-neutral-700 bg-neutral-900 px-4 text-xs text-white shadow-xl">
    <span>Custom rendered notification</span>
    <button onClick={() => toast.dismiss(id)} className="cursor-pointer font-bold opacity-70 hover:opacity-100">
      ✕
    </button>
  </div>
));
```

---

## Themes & Color Customization

Toastify supports flexible color and theme customization at every level—from global CSS variables to per-toast inline styles.

### 1. Changing the Theme

Control theme mode directly on `<Toaster />`:

```tsx
// 1. Follow system dark/light mode automatically (default):
<Toaster theme="system" />

// 2. Explicit dark mode:
<Toaster theme="dark" />

// 3. Explicit light mode:
<Toaster theme="light" />

// 4. Controlled with React state (e.g. next-themes or custom toggle):
const { theme } = useTheme();
<Toaster theme={theme === "dark" ? "dark" : "light"} />
```

> **Tailwind & Class-Based Dark Mode**: Toastify automatically synchronizes whenever `.dark` or `[data-theme="dark"]` is present on your `<html>` or `<body>` element.

---

### 2. Changing Colors

#### A. Global Colors via `toastOptions`
Apply custom background, text, and border colors globally across all notifications:

```tsx
<Toaster
  toastOptions={{
    className: "bg-zinc-950 text-zinc-100 border-zinc-800",
    style: {
      backgroundColor: "#09090b",
      color: "#fafafa",
      borderColor: "#27272a",
    },
  }}
/>
```

#### B. Per-Toast Colors (Inline Options)
Override colors for specific notifications directly in `toast()`:

```tsx
toast("Payment Received", {
  description: "$120.00 deposited into your account",
  className: "bg-emerald-950/80 text-emerald-100 border-emerald-800",
  style: {
    borderColor: "#10b981",
  },
});
```

#### C. Custom State Color Palettes (`toast.variant`)
Create reusable notification states with custom colors:

```tsx
const toastWarning = toast.variant({
  className: "border-amber-500/40 bg-amber-500/10 text-amber-200",
  style: {
    borderColor: "rgba(245, 158, 11, 0.4)",
  },
});

toastWarning("Approaching Usage Limit", {
  description: "85% of compute quota used",
});
```

#### D. Global CSS Custom Properties
Override CSS variables in your stylesheet:

```css
:root {
  --toastify-bg: #ffffff;
  --toastify-color: #09090b;
  --toastify-border: #e4e4e7;
  --toastify-offset: 24px;
  --toastify-gap: 14px;
}

.dark {
  --toastify-bg: #09090b;
  --toastify-color: #fafafa;
  --toastify-border: #27272a;
}
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

#### Preset Physics & Transition Timings

| Preset | Entrance Motion | Exit Duration & Easing | Gesture Dismiss |
| :--- | :--- | :--- | :--- |
| `"stack"` *(default)* | Spring: `stiffness: 220`, `damping: 26`, `mass: 1.0` | `240ms` (`ease: [0.16, 1, 0.3, 1]`) | Swipe `>60px` or `>500px/s` |
| `"slide"` | Spring: `stiffness: 320`, `damping: 28` | `220ms` (`ease: [0.16, 1, 0.3, 1]`) | Swipe `>60px` or `>500px/s` |
| `"fade"` | Spring: `stiffness: 280`, `damping: 26` | `220ms` (`ease: "easeOut"`) | Swipe `>60px` or `>500px/s` |


### 2. Creating a Custom Animation Component

Any React component adhering to `ToastAnimationProps` can be passed to `<Toaster animation={MyComponent} />`, giving you 100% direct control over entrance spring physics, exit duration, and easing:

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
      // Direct entrance spring physics:
      transition={{
        type: "spring",
        stiffness: 420, // Snappy entry tension
        damping: 20,    // High bounce
      }}
      // Direct exit transition duration & curve:
      exit={{
        opacity: 0,
        scale: 0.85,
        transition: {
          duration: 0.22, // 220ms exit duration
          ease: [0.16, 1, 0.3, 1], // Cubic bezier deceleration
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Pass directly to Toaster with custom auto-dismiss duration:
<Toaster animation={BouncyAnimation} duration={4000} />
```

### 3. Tuning Spring Physics & Timing Directly

You can customize the folder stack spring dynamics and dismiss duration directly on `<Toaster />`:

```tsx
<Toaster
  animation="stack"
  duration={3500} // Global auto-dismiss timeout in ms (or false to disable)
  springConfig={{
    stiffness: 240, // Spring tension: higher = snappier entrance
    damping: 24,    // Friction: lower = bouncier, higher = stiffer
    mass: 0.9,      // Inertial mass during card hover expansion
  }}
/>

// Override duration directly per-toast:
toast("Deployment Finished", {
  description: "All cluster nodes operational",
  duration: 5000, // Stay for 5s (or false to stay indefinitely)
});
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
| `springConfig` | `SpringConfig` | `{ stiffness: 220, damping: 26, mass: 1.0 }` | Motion spring dynamics override |
| `icons` | `Partial<Record<ToastType, ReactNode>>` | `undefined` | Global custom icon overrides by toast variant |
| `closeButton` | `boolean` | `true` | Whether to render a dedicated keyboard-accessible dismiss button |
| `dismissOnEscape` | `boolean` | `true` | Whether pressing the `Escape` key dismisses the front-most notification |
| `gap` | `number` | `14` | Spacing in pixels between expanded cards |
| `offset` | `number \| string` | `"24px"` | Viewport edge margin offset (e.g. `24` or `"24px"`) |
| `toastOptions` | `{ className?, style?, duration?, closeButton? }` | `undefined` | Global toast card styling and defaults |
| `closeOnClick` | `boolean` | `false` | Whether clicking a toast card dismisses it |
| `visibleToasts` | `number` | `5` | Maximum number of visible toasts in the folder stack |

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
| `toast.variant(definition)` | `(definition: ToastVariantDefinition) => ToastVariantDispatcher` | Creates a reusable custom state dispatcher |
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
