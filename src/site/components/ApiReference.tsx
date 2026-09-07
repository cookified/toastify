import type { ReactNode } from "react";

type PropDefinition = {
  name: string;
  type: string;
  defaultVal?: string;
  description: string;
};

type MethodDefinition = {
  method: string;
  args: string;
  description: string;
  colorClass?: string;
};

const toasterProps: PropDefinition[] = [
  {
    name: "position",
    type: "ToastPosition",
    defaultVal: '"bottom-right"',
    description: "Viewport anchor placement",
  },
  {
    name: "animation",
    type: "Preset | Component",
    defaultVal: '"stack"',
    description: "Built-in preset or custom Motion component",
  },
  {
    name: "duration",
    type: "number | false",
    defaultVal: "3500",
    description: "Dismiss delay in ms, or false to persist",
  },
  {
    name: "visibleToasts",
    type: "number",
    defaultVal: "5",
    description:
      "Max visible cards in stack (top 3 visible when collapsed, up to 5 on hover)",
  },
  {
    name: "theme",
    type: '"light" | "dark" | "system"',
    defaultVal: '"system"',
    description: "Color scheme theme",
  },
  {
    name: "closeButton",
    type: "boolean",
    defaultVal: "true",
    description: "Accessible manual dismiss button",
  },
  {
    name: "dismissOnEscape",
    type: "boolean",
    defaultVal: "true",
    description: "Dismiss front-most notification on Escape key press",
  },
  {
    name: "gap",
    type: "number",
    defaultVal: "14",
    description: "Spacing in px between expanded cards",
  },
  {
    name: "offset",
    type: "number | string",
    defaultVal: '"24px"',
    description: "Viewport edge margin distance",
  },
  {
    name: "icons",
    type: "Partial<Record<ToastType, ReactNode>>",
    defaultVal: "undefined",
    description:
      "Custom default icons for status variants (success, error, warning, info, loading)",
  },
  {
    name: "springConfig",
    type: "SpringConfig",
    defaultVal: "{ stiffness: 220, damping: 26, mass: 1.0 }",
    description:
      "Fine-tune entrance and stack expansion spring dynamics (stiffness, damping, mass)",
  },
  {
    name: "toastOptions",
    type: "ToastOptions",
    defaultVal: "undefined",
    description:
      "Global toast styling and color options (className, style, duration, closeButton)",
  },
];

const toastMethods: MethodDefinition[] = [
  {
    method: "toast(title, opts?)",
    args: "ReactNode, ToastOptions",
    description: "Dispatch standard notification",
  },
  {
    method: "toast.success(title, opts?)",
    args: "ReactNode, ToastOptions",
    description: "Success toast with check icon",
    colorClass: "text-emerald-700 dark:text-emerald-400",
  },
  {
    method: "toast.error(title, opts?)",
    args: "ReactNode, ToastOptions",
    description: "Error toast with alert icon",
    colorClass: "text-rose-700 dark:text-rose-400",
  },
  {
    method: "toast.warning(title, opts?)",
    args: "ReactNode, ToastOptions",
    description: "Warning toast with warning icon",
    colorClass: "text-amber-700 dark:text-amber-400",
  },
  {
    method: "toast.info(title, opts?)",
    args: "ReactNode, ToastOptions",
    description: "Info toast with info icon",
    colorClass: "text-sky-700 dark:text-sky-400",
  },
  {
    method: "toast.loading(title, opts?)",
    args: "ReactNode, ToastOptions",
    description:
      "Loading toast with animated spinner (persists until updated or dismissed)",
    colorClass: "text-neutral-700 dark:text-neutral-300",
  },
  {
    method: "toast.promise(promise, opts)",
    args: "Promise, ToastPromiseOptions",
    description: "Tracks loading, resolve, and reject states",
    colorClass: "text-amber-700 dark:text-amber-400",
  },
  {
    method: "toast.custom(renderFn, opts?)",
    args: "(id) => ReactNode, ToastOptions",
    description: "Headless custom JSX notification",
    colorClass: "text-violet-700 dark:text-violet-400",
  },
  {
    method: "toast.variant(definition)",
    args: "ToastVariantDefinition",
    description:
      "Creates a reusable custom state dispatcher with predefined options",
    colorClass: "text-sky-700 dark:text-sky-300",
  },
  {
    method: "toast.dismiss(id?)",
    args: "string?",
    description: "Dismiss single toast or clear all",
    colorClass: "text-neutral-700 dark:text-neutral-300",
  },
];

const optionProps: PropDefinition[] = [
  {
    name: "icon",
    type: "ReactNode",
    description: "Custom icon element to render inside the toast",
  },
  {
    name: "description",
    type: "ReactNode",
    description: "Secondary descriptive text rendered below title",
  },
  {
    name: "action / cancel",
    type: "ToastAction: { label, onClick }",
    description: "Interactive call-to-action or dismiss action buttons",
  },
  {
    name: "duration",
    type: "number | false",
    description: "Per-toast auto dismiss duration, or false to persist",
  },
  {
    name: "className / style",
    type: "string / CSSProperties",
    description: "Scoped classes or styles for isolated custom state styling",
  },
];

const animationProps: PropDefinition[] = [
  {
    name: "children",
    type: "ReactNode",
    description: "The rendered toast card element to wrap in motion",
  },
  {
    name: "index",
    type: "number",
    description:
      "0-based visual index in the active stack (0 = newest / front card)",
  },
  {
    name: "totalToasts",
    type: "number",
    description: "Total count of active notifications in the stack",
  },
  {
    name: "isHovered",
    type: "boolean",
    description:
      "Whether the user is currently hovering over the notification stack",
  },
  {
    name: "isDismissing",
    type: "boolean",
    description: "Whether the notification is currently animating out",
  },
  {
    name: "position",
    type: "ToastPosition",
    description: 'Active viewport anchor placement (e.g. "bottom-right")',
  },
  {
    name: "gap",
    type: "number",
    description: "Configured vertical gap in pixels between expanded cards",
  },
  {
    name: "springConfig",
    type: "SpringConfig",
    description: "Optional physics parameters: { stiffness, damping, mass }",
  },
];

function CardTable({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-xs dark:border-neutral-800/90 dark:bg-[#121215]">
      <div className="border-b border-neutral-200/80 bg-neutral-50 px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white">
        {title}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

export function ApiReference() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-neutral-950 dark:text-white">
          API Reference
        </h2>
        <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400">
          Component props and dispatcher methods for @cookified/toastify.
        </p>
      </div>

      {/* Toaster Props */}
      <CardTable title="<Toaster /> Props">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-neutral-200/80 font-mono text-[11px] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-2.5 font-medium">Prop</th>
              <th className="px-4 py-2.5 font-medium">Type</th>
              <th className="px-4 py-2.5 font-medium">Default</th>
              <th className="px-4 py-2.5 font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200/60 text-xs text-neutral-700 dark:divide-neutral-800/60 dark:text-neutral-300">
            {toasterProps.map((p) => (
              <tr
                key={p.name}
                className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40"
              >
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    {p.name}
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  {p.type}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-300">
                  {p.defaultVal}
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  {p.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardTable>

      {/* Dispatcher Methods */}
      <CardTable title="toast Dispatcher Methods">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-neutral-200/80 font-mono text-[11px] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-2.5 font-medium">Method</th>
              <th className="px-4 py-2.5 font-medium">Arguments</th>
              <th className="px-4 py-2.5 font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200/60 text-xs text-neutral-700 dark:divide-neutral-800/60 dark:text-neutral-300">
            {toastMethods.map((m) => (
              <tr
                key={m.method}
                className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40"
              >
                <td className="px-4 py-3">
                  <code
                    className={`inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] ${
                      m.colorClass ?? "text-neutral-900 dark:text-sky-300"
                    }`}
                  >
                    {m.method}
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  {m.args}
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  {m.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardTable>

      {/* ToastOptions */}
      <CardTable title="ToastOptions & Variant Definition">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-neutral-200/80 font-mono text-[11px] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-2.5 font-medium">Property</th>
              <th className="px-4 py-2.5 font-medium">Type</th>
              <th className="px-4 py-2.5 font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200/60 text-xs text-neutral-700 dark:divide-neutral-800/60 dark:text-neutral-300">
            {optionProps.map((p) => (
              <tr
                key={p.name}
                className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40"
              >
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    {p.name}
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  {p.type}
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  {p.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardTable>

      {/* Animation Props */}
      <CardTable title="ToastAnimationProps (Custom Animation Components)">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-neutral-200/80 font-mono text-[11px] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-2.5 font-medium">Prop</th>
              <th className="px-4 py-2.5 font-medium">Type</th>
              <th className="px-4 py-2.5 font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200/60 text-xs text-neutral-700 dark:divide-neutral-800/60 dark:text-neutral-300">
            {animationProps.map((p) => (
              <tr
                key={p.name}
                className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40"
              >
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    {p.name}
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  {p.type}
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  {p.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardTable>
    </div>
  );
}
