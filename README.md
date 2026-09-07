# Toastify

<p align="center">
  <strong>Tactile, developer-first toast notifications for React & Next.js.</strong><br>
  Folder stack spring physics, zero specificity baggage, pluggable motion presets, copy-paste or install via npm.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@cookified/toastify"><img src="https://img.shields.io/npm/v/@cookified/toastify?style=flat-square&color=black" alt="NPM Version" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/react-19+-61dafb.svg?style=flat-square&logo=react" alt="React 19" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-strict-3178c6.svg?style=flat-square&logo=typescript" alt="TypeScript" /></a>
  <a href="https://motion.dev/"><img src="https://img.shields.io/badge/motion-13.2+-ff0055.svg?style=flat-square" alt="Motion" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="MIT License" /></a>
</p>

---

## Why I built this

Most toast notification libraries either force you into rigid provider architectures, bring heavy runtime styling dependencies, or look like every generic alert from 2018.

I wanted something closer to how engineers actually ship software today:
1. **Find a component that feels good**, drop the file into your project (or install the tiny package), tweak the props, and move on.
2. **Copy-paste or package**: Use it via `@cookified/toastify` or copy the self-contained component source directly into your codebase like shadcn/ui. No forced abstraction.
3. **No provider wrappers**: No context providers wrapping your entire app tree, no theme configs to decode, no runtime surprises. Dispatch notifications from anywhere in your codebase—inside hooks, event handlers, server actions, or plain utility functions.
4. **Zero CSS specificity collisions**: Every baseline style is isolated inside CSS `:where()` selectors and CSS custom properties. Your Tailwind classes and inline styles always win cleanly without needing `!important`.
5. **No extra icon package**: Status icons are lightweight, self-contained SVG React components baked right in. No dependencies on Lucide, Heroicons, or FontAwesome, though you can pass your own icons anytime.

---

## Use with AI coding assistants

Toastify is designed from the ground up for prompt-driven workflows with any coding agent — **Cursor**, **Claude Code**, **Copilot**, **Codex**, **Grok**, **ChatGPT**, and **Antigravity**.

Because components use standard `forwardRef`, accept native `HTMLAttributes<HTMLDivElement>`, and feature typed dispatchers, AI agents generate reliable, bug-free notification code on the first try.

### Example prompts for your AI assistant:

```markdown
"Add a tactile notification stack using @cookified/toastify with a custom action button to undo deletion."
```

```markdown
"Setup <Toaster /> in Next.js App Router root layout with bottom-right positioning and automatic Tailwind dark mode."
```

```markdown
"Create a reusable sync notification variant using toast.variant() that shows a spinning SVG while background queries revalidate."
```

```markdown
"Write a custom pluggable animation component adhering to ToastAnimationProps that slides notifications in with a spring bounce."
```

---

## Tech Stack & Design Principles

- **React 19 & 18 Ready**: First-class support for latest React conventions with clean `forwardRef` implementations.
- **Native HTML Props Passthrough**: Both `<Toaster />` and `<Toast />` extend native `HTMLDivElement` attributes (`id`, `data-*`, `aria-*`, event handlers).
- **Lightweight `cn()` Helper**: Built-in zero-dependency class merger exported directly from `@cookified/toastify`.
- **Folder Stack Dynamics**: Spring-compressed cards (`stiffness: 220, damping: 26, mass: 1.0`) that naturally expand and reveal on hover.
- **Pluggable Animation Architecture**: Entrance and exit transitions are decoupled into pluggable React components (`"stack" | "slide" | "fade"` or custom Motion component).
- **Tactile Button Geometry**: Inset action buttons with subtle bottom shadows for satisfying physical press feedback.
- **Accessible & Screen-Reader Tested**: Polite ARIA landmark (`role="region"`), keyboard dismissal via `Escape`, `Enter`, and `Space`, and focus-visible outlines.
- **Bounded Memory & DoS Safe**: Maximum 30 toast history buffer, non-finite timestamp sanitization, and exception shielding.

---

## Installation

You can use Toastify as an npm package or copy the source files directly into your repository.

### Option A: Install via Package Manager

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

### Option B: Copy-Paste (shadcn style)

If you prefer keeping full ownership of component code:
1. Copy `src/toastify/` directly into your project's `components/ui/toastify/`.
2. Import `Toaster` and `toast` directly from your local directory:
   ```tsx
   import { Toaster, toast } from "@/components/ui/toastify";
   ```

---

## Quick Start

### 1. Mount `<Toaster />` once

Place `<Toaster />` near the root of your application (e.g. `layout.tsx` or `App.tsx`):

```tsx
import { Toaster } from "@cookified/toastify";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
```

### 2. Dispatch notifications anywhere

```tsx
import { toast } from "@cookified/toastify";

// 1. Simple neutral toast
toast("Project created successfully");

// 2. High-contrast status toast
toast.success("Changes deployed", {
  description: "Production build live at 15:42 UTC",
});

// 3. Tactile interactive notification
toast("File deleted", {
  description: "toastify-report.pdf removed",
  action: {
    label: "Undo",
    onClick: () => restoreFile(),
  },
  cancel: {
    label: "Dismiss",
    onClick: () => {},
  },
});
```

---

## API Reference

### `<Toaster />` Props

`<Toaster />` forwards `ref` to the container `<motion.div>` and accepts all native HTML attributes (`id`, `data-*`, `aria-*`, etc.).

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `position` | `ToastPosition` | `"bottom-right"` | Viewport anchor: `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` |
| `duration` | `number \| false` | `3500` | Auto-dismiss timeout in ms, or `false` to keep open indefinitely |
| `visibleToasts` | `number` | `5` | Maximum number of visible toasts in the active stack |
| `theme` | `"light" \| "dark" \| "system"` | `"system"` | Visual theme mode |
| `closeButton` | `boolean` | `true` | Whether to render a dedicated accessible dismiss button on each toast |
| `gap` | `number` | `14` | Spacing in pixels between expanded cards |
| `offset` | `number \| string` | `"24px"` | Viewport edge margin offset (e.g. `24` or `"24px"`) |
| `animation` | `AnimationPreset \| ToastAnimationComponent` | `"stack"` | Preset (`"stack" \| "slide" \| "fade"`) or custom React animation component |
| `dismissOnEscape` | `boolean` | `true` | Whether pressing `Escape` dismisses the front-most notification |
| `springConfig` | `SpringConfig` | `{ stiffness: 220, damping: 26, mass: 1.0 }` | Spring tension and damping override |
| `icons` | `Partial<Record<ToastType, ReactNode>>` | `undefined` | Custom icon overrides for status types |
| `toastOptions` | `{ className?, style?, duration?, closeButton? }` | `undefined` | Global styling and default options applied to all toasts |
| `closeOnClick` | `boolean` | `false` | Whether clicking the toast card dismisses it |
| `unstyled` | `boolean` | `false` | When `true`, suppresses internal CSS injection for pure custom styling |
| `className` | `string` | `undefined` | Custom class name applied to the container element |
| `style` | `CSSProperties` | `undefined` | Custom inline styles applied to the container element |

---

### `toast()` Dispatcher API

| Method | Signature | Description |
| :--- | :--- | :--- |
| `toast(title, options?)` | `(title: ReactNode, options?: ToastOptions) => string` | Dispatches a neutral notification |
| `toast.success(title, options?)` | `(title: ReactNode, options?: ToastOptions) => string` | Dispatches a success notification with green badge |
| `toast.error(title, options?)` | `(title: ReactNode, options?: ToastOptions) => string` | Dispatches an error notification with red badge |
| `toast.warning(title, options?)` | `(title: ReactNode, options?: ToastOptions) => string` | Dispatches a warning notification with amber badge |
| `toast.info(title, options?)` | `(title: ReactNode, options?: ToastOptions) => string` | Dispatches an informational notification with blue badge |
| `toast.loading(title, options?)` | `(title: ReactNode, options?: ToastOptions) => string` | Dispatches a persistent loading notification with spinner |
| `toast.promise(promise, options)` | `<T>(promise, options: ToastPromiseOptions<T>) => Promise<T>` | Tracks promise lifecycle (loading → success / error) |
| `toast.custom(renderFn, options?)` | `(renderFn: (id: string) => ReactNode, options?) => string` | Dispatches headless custom JSX markup |
| `toast.variant(definition)` | `(definition: ToastVariantDefinition) => ToastVariantDispatcher` | Creates a reusable custom state dispatcher |
| `toast.dismiss(id?)` | `(id?: string) => void` | Dismisses a specific toast by ID, or all toasts if omitted |
| `toast.update(id, options)` | `(id: string, options: Partial<ToastOptions>) => void` | Dynamically updates an active toast in place |

---

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

## Recipes & Customization

### 1. Tailwind CSS Utility Overrides

Because internal styles use `:where()`, your Tailwind classes override default styles effortlessly:

```tsx
toast("Deployment Finished", {
  description: "Nodes converged in us-east-1",
  className: "bg-zinc-900 border-zinc-700 text-zinc-100 shadow-2xl rounded-xl",
});
```

### 2. Reusable State Dispatchers (`toast.variant`)

Avoid repeating configuration across multiple files:

```tsx
import { toast } from "@cookified/toastify";

export const toastSync = toast.variant({
  icon: <SyncIcon />,
  className: "border-sky-500/30 bg-sky-950/20 text-sky-200",
  duration: 4000,
});

// Call from anywhere
toastSync("Database Synced", {
  description: "Indexed 1,420 records in 18ms",
});
```

### 3. Promise Lifecycles

```tsx
toast.promise(
  fetchUserData(),
  {
    loading: "Fetching account settings...",
    success: (data) => `Welcome back, ${data.name}!`,
    error: (err) => `Failed to load profile: ${err.message}`,
  }
);
```

### 4. Custom Pluggable Animation Components

Implement custom entrance physics and exit transitions with zero coupling:

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
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 20,
      }}
      exit={{
        opacity: 0,
        scale: 0.85,
        transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}

// Pass directly to Toaster
<Toaster animation={BouncyAnimation} />
```

### 5. CSS Custom Properties / Design Tokens

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

## Folder Structure Tour

```text
src/toastify/
├── Toaster.tsx              # Root container: spring height, hover expansion, keyboard listener
├── Toast.tsx                # Card component: badges, tactile buttons, inline SVG icons
├── animations/
│   ├── index.ts             # Pluggable animation dispatcher
│   ├── folder-stack.tsx     # Signature folder stack with spring compression
│   ├── slide.tsx            # Directional slide transition
│   ├── fade.tsx             # Pure opacity dissolution
│   └── constants.ts         # Tested spring physics presets
├── store.ts                 # Zero-dependency reactive event store & variant dispatcher
├── styles.css               # Isolated :where() baseline stylesheet
├── styles.ts                # Auto-generated stringified CSS for zero-config injection
├── utils.ts                 # Zero-dependency cn() class merger
└── types.ts                 # Strict TypeScript definitions & prop types
```

---

## Contributing & Local Development

```bash
# Clone the repository
git clone https://github.com/cookified/toastify.git
cd toastify

# Install dependencies
npm install

# Run Vitest test suite
npm test

# Run ESLint
npm run lint

# Build library & demo site
npm run build
```

---

## License

MIT © [Cookified](https://github.com/cookified/toastify)
