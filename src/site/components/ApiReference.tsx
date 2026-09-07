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

      {/* Toaster Props Table */}
      <div className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-xs dark:border-neutral-800/90 dark:bg-[#121215]">
        <div className="border-b border-neutral-200/80 bg-neutral-50 px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white">
          &lt;Toaster /&gt; Props
        </div>
        <div className="overflow-x-auto">
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
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    position
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  ToastPosition
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-300">
                  "bottom-right"
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Viewport anchor placement
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    animation
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  Preset | Component
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-300">
                  "stack"
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Built-in preset or custom Motion component
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    duration
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  number | false
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-300">
                  3500
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Dismiss delay in ms, or false to persist
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    visibleToasts
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  number
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-300">
                  5
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Max visible cards in stack (top 3 visible when collapsed, up to 5 on hover)
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    theme
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  "light" | "dark" | "system"
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-300">
                  "system"
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Color scheme theme
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    closeButton
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  boolean
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-300">
                  true
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Accessible manual dismiss button
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    dismissOnEscape
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  boolean
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-300">
                  true
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Dismiss front-most notification on Escape key press
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    gap
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  number
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-300">
                  14
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Spacing in px between expanded cards
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    offset
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  number | string
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-300">
                  "24px"
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Viewport edge margin distance
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    icons
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  Partial&lt;Record&lt;ToastType, ReactNode&gt;&gt;
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-300">
                  undefined
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Custom default icons for status variants (success, error, warning, info, loading)
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    springConfig
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  SpringConfig
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-300">
                  &#123; stiffness: 220, damping: 26, mass: 1.0 &#125;
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Fine-tune entrance and stack expansion spring dynamics (stiffness, damping, mass)
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    toastOptions
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  ToastOptions
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-300">
                  undefined
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Global toast styling and color options (className, style, duration, closeButton)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* toast Dispatcher Methods Table */}
      <div className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-xs dark:border-neutral-800/90 dark:bg-[#121215]">
        <div className="border-b border-neutral-200/80 bg-neutral-50 px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white">
          toast Dispatcher Methods
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-200/80 font-mono text-[11px] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
              <tr>
                <th className="px-4 py-2.5 font-medium">Method</th>
                <th className="px-4 py-2.5 font-medium">Arguments</th>
                <th className="px-4 py-2.5 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/60 text-xs text-neutral-700 dark:divide-neutral-800/60 dark:text-neutral-300">
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    toast(title, opts?)
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  ReactNode, ToastOptions
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Dispatch standard notification
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-700 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-emerald-400">
                    toast.success(title, opts?)
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  ReactNode, ToastOptions
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Success toast with check icon
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-rose-700 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-rose-400">
                    toast.error(title, opts?)
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  ReactNode, ToastOptions
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Error toast with alert icon
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-amber-700 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-amber-400">
                    toast.warning(title, opts?)
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  ReactNode, ToastOptions
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Warning toast with warning icon
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-sky-700 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-400">
                    toast.info(title, opts?)
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  ReactNode, ToastOptions
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Info toast with info icon
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-700 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-neutral-300">
                    toast.loading(title, opts?)
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  ReactNode, ToastOptions
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Loading toast with animated spinner (persists until updated or dismissed)
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-amber-700 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-amber-400">
                    toast.promise(promise, opts)
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  Promise, ToastPromiseOptions
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Tracks loading, resolve, and reject states
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-violet-700 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-violet-400">
                    toast.custom(renderFn, opts?)
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  (id) =&gt; ReactNode, ToastOptions
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Headless custom JSX notification
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-sky-700 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    toast.variant(definition)
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  ToastVariantDefinition
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Creates a reusable custom state dispatcher with predefined options
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-700 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-neutral-300">
                    toast.dismiss(id?)
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  string?
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Dismiss single toast or clear all
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ToastOptions & Variant Definition Table */}
      <div className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-xs dark:border-neutral-800/90 dark:bg-[#121215]">
        <div className="border-b border-neutral-200/80 bg-neutral-50 px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white">
          ToastOptions &amp; Variant Definition
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-200/80 font-mono text-[11px] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
              <tr>
                <th className="px-4 py-2.5 font-medium">Property</th>
                <th className="px-4 py-2.5 font-medium">Type</th>
                <th className="px-4 py-2.5 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/60 text-xs text-neutral-700 dark:divide-neutral-800/60 dark:text-neutral-300">
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    icon
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  ReactNode
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Custom icon element to render inside the toast
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    description
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  ReactNode
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Secondary descriptive text rendered below title
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    action / cancel
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  ToastAction: &#123; label, onClick &#125;
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Interactive call-to-action or dismiss action buttons
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    duration
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  number | false
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Per-toast auto dismiss duration, or false to persist
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    className / style
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  string / CSSProperties
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Scoped classes or styles for isolated custom state styling
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ToastAnimationProps Table for Custom Animations */}
      <div className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-xs dark:border-neutral-800/90 dark:bg-[#121215]">
        <div className="border-b border-neutral-200/80 bg-neutral-50 px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white">
          ToastAnimationProps (Custom Animation Components)
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-200/80 font-mono text-[11px] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
              <tr>
                <th className="px-4 py-2.5 font-medium">Prop</th>
                <th className="px-4 py-2.5 font-medium">Type</th>
                <th className="px-4 py-2.5 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/60 text-xs text-neutral-700 dark:divide-neutral-800/60 dark:text-neutral-300">
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    children
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  ReactNode
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  The rendered toast card element to wrap in motion
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    index
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  number
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  0-based visual index in the active stack (0 = newest / front card)
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    totalToasts
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  number
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Total count of active notifications in the stack
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    isHovered
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  boolean
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Whether the user is currently hovering over the notification stack
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    isDismissing
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  boolean
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Whether the notification is currently animating out
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    position
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  ToastPosition
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Active viewport anchor placement (e.g. "bottom-right")
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    gap
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  number
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Configured vertical gap in pixels between expanded cards
                </td>
              </tr>
              <tr className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40">
                <td className="px-4 py-3">
                  <code className="inline-block rounded-md border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-900 shadow-2xs dark:border-neutral-800 dark:bg-[#18181b] dark:text-sky-300">
                    springConfig
                  </code>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-300">
                  SpringConfig
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  Optional physics parameters: &#123; stiffness, damping, mass &#125;
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
