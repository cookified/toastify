import { Bell, Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { AnimationPreset, ToastPosition } from "../../toastify";
import { CodeBlock } from "./CodeBlock";

export type ToastVariant =
  | "action"
  | "promise"
  | "success"
  | "custom-icon"
  | "tailwind"
  | "variant"
  | "headless";

type PlaygroundProps = {
  selectedVariant: ToastVariant;
  onSelectVariant: (v: ToastVariant) => void;
  position: ToastPosition;
  onChangePosition: (p: ToastPosition) => void;
  animation: AnimationPreset;
  onChangeAnimation: (a: AnimationPreset) => void;
  activeCount: number;
  onFireToast: (v: ToastVariant) => void;
};

const positionOptions: { value: ToastPosition; label: string }[] = [
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "top-right", label: "Top Right" },
  { value: "top-center", label: "Top Center" },
  { value: "top-left", label: "Top Left" },
];

const animationOptions: { value: AnimationPreset; label: string }[] = [
  { value: "stack", label: "Folder Stack" },
  { value: "slide", label: "Slide Preset" },
  { value: "fade", label: "Fade Preset" },
];

function CustomDropdown<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (val: T) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 180);
  };

  const current = options.find((o) => o.value === value) || options[0];

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group flex cursor-pointer items-center gap-1.5 py-1 px-1 text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
        aria-label={label}
      >
        <span>{current.label}</span>
        <ChevronDown
          size={12}
          className={`text-neutral-400 transition-transform duration-200 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 2, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 450, damping: 28 }}
            className="absolute right-0 z-50 mt-1 min-w-[150px] overflow-hidden rounded-xl border border-neutral-200 bg-white/95 p-1 shadow-xl backdrop-blur-md dark:border-neutral-800 dark:bg-[#18181b]/95"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors ${
                  opt.value === value
                    ? "bg-neutral-100 font-medium text-neutral-950 dark:bg-[#27272a] dark:text-white"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-[#202024] dark:hover:text-neutral-200"
                }`}
              >
                <span>{opt.label}</span>
                {opt.value === value && (
                  <Check size={12} className="text-neutral-900 dark:text-white" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const codeSnippets: Record<ToastVariant, string> = {
  action: `import { toast } from "@cookified/toastify";

toast("Event scheduled", {
  description: "Monday, January at 4:00 PM",
  action: {
    label: "Undo",
    onClick: () => handleUndo(),
  },
  cancel: {
    label: "Dismiss",
    onClick: () => handleDismiss(),
  },
});`,
  promise: `import { toast } from "@cookified/toastify";

toast.promise(saveDocument(), {
  loading: "Uploading document...",
  success: "Uploaded successfully",
  error: "Failed to upload document",
  action: {
    label: "View",
    onClick: () => openDoc(),
  },
});`,
  success: `import { toast } from "@cookified/toastify";

toast.success("Payment confirmed", {
  description: "Receipt #4092 emailed to your account",
});`,
  "custom-icon": `import { toast } from "@cookified/toastify";
import { Sparkles } from "lucide-react"; // or any custom SVG

toast("AI Model Ready", {
  description: "Synthesized 12 variations in 0.4s",
  icon: <Sparkles className="h-4 w-4 text-amber-400" />,
  action: {
    label: "Inspect",
    onClick: () => openInspector(),
  },
});`,
  tailwind: `import { toast } from "@cookified/toastify";

// Tailwind utility classes override default styles with 0 specificity conflict
toast("Invoice Paid", {
  description: "Transferred $1,420 to Stripe account",
  className: "bg-emerald-950 text-emerald-100 border-emerald-800",
  action: {
    label: "Receipt",
    onClick: () => viewReceipt(),
  },
});`,
  variant: `import { toast } from "@cookified/toastify";
import { Flame } from "lucide-react";

// 1. Define reusable state dispatcher once
const toastStreak = toast.variant({
  icon: <Flame className="h-4 w-4 text-orange-500" />,
  className: "border-orange-500/30",
  duration: 4000,
});

// 2. Dispatch anywhere dynamically
toastStreak("7-Day Streak!", {
  description: "Keep up the momentum today",
});`,
  headless: `import { toast } from "@cookified/toastify";

toast.custom((id) => (
  <div className="flex h-14 w-full items-center justify-between gap-3 rounded-lg border border-neutral-700 bg-neutral-900 px-4 text-xs font-medium text-white shadow-xl">
    <div className="flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 font-bold text-[10px]">
        ★
      </span>
      <span>Custom Headless JSX Notification</span>
    </div>
    <button
      onClick={() => toast.dismiss(id)}
      className="cursor-pointer rounded px-2 py-0.5 text-neutral-400 hover:text-white"
    >
      Close
    </button>
  </div>
));`,
};

export function Playground({
  selectedVariant,
  onSelectVariant,
  position,
  onChangePosition,
  animation,
  onChangeAnimation,
  activeCount,
  onFireToast,
}: PlaygroundProps) {
  const variantItems: { id: ToastVariant; label: string }[] = [
    { id: "action", label: "Action" },
    { id: "promise", label: "Promise" },
    { id: "success", label: "Success" },
    { id: "custom-icon", label: "External Icon" },
    { id: "tailwind", label: "Tailwind Classes" },
    { id: "variant", label: "Dynamic Variant" },
    { id: "headless", label: "Custom JSX" },
  ];

  return (
    <div className="space-y-4">
      {/* Playground Header with Custom Sleek Dropdown Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <h2 className="text-sm font-medium tracking-tight text-neutral-950 sm:text-base dark:text-white">
          Playground
        </h2>

        {/* Custom Sleek Dropdown Controls */}
        <div className="flex items-center gap-2">
          <CustomDropdown
            value={position}
            options={positionOptions}
            onChange={onChangePosition}
            label="Toaster Position"
          />

          <CustomDropdown
            value={animation}
            options={animationOptions}
            onChange={onChangeAnimation}
            label="Animation Preset"
          />
        </div>
      </div>

      {/* Dead-Centered Interactive Preview Canvas */}
      <div className="canvas-grid relative flex h-[350px] w-full flex-col items-center justify-center rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs transition-all hover:border-neutral-300 dark:border-neutral-800/90 dark:bg-[#111113] dark:hover:border-neutral-700">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          {/* Bigger, Darker Contrast Bell Trigger Button */}
          <button
            type="button"
            onClick={() => onFireToast(selectedVariant)}
            className="group relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-2xl border border-neutral-300 bg-neutral-900 text-white shadow-xl transition-all hover:scale-105 active:scale-95 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white dark:hover:bg-[#222226]"
            aria-label="Trigger toast notification"
          >
            <Bell size={28} className="transition-transform group-hover:rotate-12" />
            {activeCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-neutral-950 shadow-md dark:bg-white dark:text-neutral-950">
                {activeCount}
              </span>
            )}
          </button>

          <div className="space-y-1">
            <div className="text-sm font-medium text-neutral-900 dark:text-white">
              Click bell to fire <strong className="capitalize font-semibold text-neutral-950 dark:text-white">{selectedVariant}</strong> toast
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              Hover over notifications to preview smooth card expansion
            </div>
          </div>

          {/* Bigger, Darker Contrast Variant Selection Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {variantItems.map((v) => {
              const isSelected = selectedVariant === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    onSelectVariant(v.id);
                    onFireToast(v.id);
                  }}
                  className={`cursor-pointer rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-neutral-950 text-white shadow-md ring-2 ring-neutral-950/25 dark:bg-white dark:text-neutral-950 dark:ring-white/30"
                      : "border border-neutral-300/80 bg-neutral-100/90 text-neutral-800 hover:bg-neutral-200/80 hover:text-black dark:border-neutral-800 dark:bg-[#18181b] dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-[#222226] dark:hover:text-white"
                  }`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Syntax-Highlighted Dynamic Code Viewer */}
      <CodeBlock
        code={codeSnippets[selectedVariant]}
        filename={`${selectedVariant}Toast.tsx`}
      />
    </div>
  );
}
