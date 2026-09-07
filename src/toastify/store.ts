import type { ReactNode } from "react";
import type {
  ToastData,
  ToastOptions,
  ToastPromiseOptions,
  ToastType,
  ToastVariantDefinition,
  ToastVariantDispatcher,
} from "./types";

type Listener = (toasts: ToastData[]) => void;

const MAX_TOASTS = 30;

let toasts: ToastData[] = [];
const listeners = new Set<Listener>();

function generateId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function sanitizeDuration(
  duration: number | false | undefined,
): number | false | undefined {
  if (duration === false) return false;
  if (typeof duration === "number") {
    return Number.isFinite(duration) && duration >= 0 ? duration : 3500;
  }
  return undefined;
}

function emit() {
  const snapshot = [...toasts];
  listeners.forEach((listener) => {
    try {
      listener(snapshot);
    } catch (err) {
      console.error("Toast listener threw an error:", err);
    }
  });
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  try {
    listener([...toasts]);
  } catch (err) {
    console.error("Initial toast listener threw an error:", err);
  }

  return () => {
    listeners.delete(listener);
  };
}

function remove(id?: string) {
  if (id) {
    toasts = toasts.filter((toast) => toast.id !== id);
  } else {
    toasts = [];
  }

  emit();
}

function update(
  id: string,
  updates: Partial<Omit<ToastData, "id" | "createdAt">>,
) {
  toasts = toasts.map((toast) =>
    toast.id === id ? { ...toast, ...updates } : toast,
  );

  emit();
}

function create(type: ToastType, title: ReactNode, options: ToastOptions = {}) {
  const id = options.id ?? generateId();
  const duration = sanitizeDuration(options.autoClose ?? options.duration);

  const existing = toasts.find((t) => t.id === id);
  if (existing) {
    update(id, {
      type,
      title,
      description: options.description,
      action: options.action,
      cancel: options.cancel,
      icon: options.icon,
      className: options.className,
      style: options.style,
      duration,
      closeButton: options.closeButton,
      position: options.position,
    });
    return id;
  }

  const toastItem: ToastData = {
    id,
    type,
    title,
    description: options.description,
    action: options.action,
    cancel: options.cancel,
    icon: options.icon,
    className: options.className,
    style: options.style,
    duration,
    closeButton: options.closeButton,
    position: options.position,
    createdAt: Date.now(),
  };

  // Keep memory bounded to MAX_TOASTS to prevent runaway memory leaks
  toasts = [toastItem, ...toasts].slice(0, MAX_TOASTS);

  emit();

  return id;
}

function resolveMsg<T, R>(val: R | ((arg: T) => R) | undefined, arg: T, fallback?: R): R | undefined {
  try {
    return typeof val === "function" ? (val as (arg: T) => R)(arg) : (val ?? fallback);
  } catch {
    return fallback;
  }
}

function promise<T>(
  promiseOrFn: Promise<T> | (() => Promise<T>),
  options: ToastPromiseOptions<T>,
): Promise<T> {
  const id = create("loading", options.loading, { duration: false });
  const p = typeof promiseOrFn === "function" ? promiseOrFn() : promiseOrFn;

  const promiseChain = p
    .then((data) => {
      update(id, {
        type: "success",
        title: resolveMsg(options.success, data, "Completed successfully"),
        description: resolveMsg(options.description, data, undefined),
        action: options.action,
        cancel: options.cancel,
        duration: 3500,
      });
      return data;
    })
    .catch((err) => {
      update(id, {
        type: "error",
        title: resolveMsg(options.error, err, "An error occurred"),
        action: options.action,
        cancel: options.cancel,
        duration: 4000,
      });
      return Promise.reject(err);
    });

  promiseChain.catch(() => {});
  return promiseChain;
}

export const toastStore = {
  subscribe,
  remove,
  update,
  getToasts: () => [...toasts],
};

const dispatch = (type: ToastType, extra?: Partial<ToastOptions>) =>
  (title: ReactNode, options?: ToastOptions) => create(type, title, { ...options, ...extra });

export const toast = Object.assign(dispatch("neutral"), {
  show: dispatch("neutral"),
  success: dispatch("success"),
  error: dispatch("error"),
  warning: dispatch("warning"),
  info: dispatch("info"),
  loading: dispatch("loading", { duration: false }),

  custom(renderer: (id: string) => ReactNode, options: ToastOptions = {}) {
    const id = options.id ?? generateId();
    const duration = sanitizeDuration(options.autoClose ?? options.duration);

    const toastItem: ToastData = {
      id,
      type: "custom",
      title: "",
      customRenderer: renderer,
      duration,
      className: options.className,
      style: options.style,
      createdAt: Date.now(),
    };

    toasts = [toastItem, ...toasts].slice(0, MAX_TOASTS);
    emit();
    return id;
  },

  promise,
  variant: defineVariant,
  defineState: defineVariant,
  dismiss: (id?: string) => remove(id),
  update: (id: string, options: Partial<ToastOptions> & { title?: ReactNode; type?: ToastType }) => {
    update(id, options);
  },
});

/**
 * Creates a reusable custom toast state dispatcher.
 * Predefine icons, durations, and styles once to avoid repetitive options.
 */
export function defineVariant(
  definition: ToastVariantDefinition,
): ToastVariantDispatcher {
  return (title: ReactNode, options: ToastOptions = {}) => {
    const mergedOptions: ToastOptions = {
      ...definition,
      ...options,
      icon: options.icon !== undefined ? options.icon : definition.icon,
      className:
        [definition.className, options.className].filter(Boolean).join(" ") ||
        undefined,
      style: { ...definition.style, ...options.style },
    };

    return create(definition.type ?? "custom", title, mergedOptions);
  };
}
