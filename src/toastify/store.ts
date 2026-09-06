import type { ReactNode } from "react";
import type {
  ToastData,
  ToastOptions,
  ToastPromiseOptions,
  ToastType,
} from "./types";

type Listener = (toasts: ToastData[]) => void;

const MAX_TOASTS = 30;

let toasts: ToastData[] = [];
const listeners = new Set<Listener>();

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function sanitizeDuration(duration: number | false | undefined): number | false | undefined {
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

function create(
  type: ToastType,
  title: ReactNode,
  options: ToastOptions = {},
) {
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
    createdAt: Date.now(),
  };

  // Keep memory bounded to MAX_TOASTS to prevent runaway memory leaks
  toasts = [toastItem, ...toasts].slice(0, MAX_TOASTS);

  emit();

  return id;
}

function promise<T>(
  promiseOrFn: Promise<T> | (() => Promise<T>),
  options: ToastPromiseOptions<T>,
): Promise<T> {
  const id = create("loading", options.loading, {
    duration: false,
  });

  const p = typeof promiseOrFn === "function" ? promiseOrFn() : promiseOrFn;

  const promiseChain = p
    .then((data) => {
      let successTitle: ReactNode;
      try {
        successTitle =
          typeof options.success === "function"
            ? options.success(data)
            : options.success;
      } catch {
        successTitle = "Completed successfully";
      }

      let description: ReactNode;
      if (options.description) {
        try {
          description =
            typeof options.description === "function"
              ? options.description(data)
              : options.description;
        } catch {
          description = undefined;
        }
      }

      update(id, {
        type: "success",
        title: successTitle,
        description,
        action: options.action,
        cancel: options.cancel,
        duration: 3500,
      });

      return data;
    })
    .catch((err) => {
      let errorTitle: ReactNode;
      try {
        errorTitle =
          typeof options.error === "function"
            ? options.error(err)
            : options.error;
      } catch {
        errorTitle = "An error occurred";
      }

      update(id, {
        type: "error",
        title: errorTitle,
        action: options.action,
        cancel: options.cancel,
        duration: 4000,
      });

      return Promise.reject(err);
    });

  // Attach a noop listener so that unawaited toast.promise() calls do not trigger uncaught console errors
  promiseChain.catch(() => {});

  return promiseChain;
}

export const toastStore = {
  subscribe,
  remove,
  update,
  getToasts: () => [...toasts],
};

function toastFn(title: ReactNode, options?: ToastOptions) {
  return create("neutral", title, options);
}

export const toast = Object.assign(toastFn, {
  show(title: ReactNode, options?: ToastOptions) {
    return create("neutral", title, options);
  },

  success(title: ReactNode, options?: ToastOptions) {
    return create("success", title, options);
  },

  error(title: ReactNode, options?: ToastOptions) {
    return create("error", title, options);
  },

  warning(title: ReactNode, options?: ToastOptions) {
    return create("warning", title, options);
  },

  info(title: ReactNode, options?: ToastOptions) {
    return create("info", title, options);
  },

  loading(title: ReactNode, options?: ToastOptions) {
    return create("loading", title, { ...options, duration: false });
  },

  custom(
    renderer: (id: string) => ReactNode,
    options: ToastOptions = {},
  ) {
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

  dismiss(id?: string) {
    remove(id);
  },

  update(
    id: string,
    options: Partial<ToastOptions> & { title?: ReactNode; type?: ToastType },
  ) {
    update(id, options);
  },
});
