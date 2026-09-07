import type { ToastVariant } from "../components/Playground";

export const playgroundCodeSnippets: Record<ToastVariant, string> = {
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
