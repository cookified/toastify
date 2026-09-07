import { toast } from "../toastify";
import type { ToastVariant } from "./components/Playground";

export type DemoToastVariant = ToastVariant | "error" | "neutral";

export function triggerDemoToast(variant: DemoToastVariant) {
  switch (variant) {
    case "action":
      toast("Message deleted", {
        description: "The conversation was moved to trash.",
        action: { label: "Undo", onClick: () => toast("Restored message") },
        cancel: { label: "Dismiss", onClick: () => {} },
      });
      break;

    case "promise":
      toast
        .promise(
          new Promise<{ name: string }>((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() > 0.15) {
                resolve({ name: "toastify-v1.0.tar.gz" });
              } else {
                reject(new Error("Network timeout: 504 Gateway"));
              }
            }, 2000);
          }),
          {
            loading: "Uploading build artifacts to edge...",
            success: (data) => `Deployed ${data.name} to production`,
            error: (err) => `Upload failed: ${(err as Error).message}`,
            action: { label: "Inspect", onClick: () => {} },
          },
        )
        .catch(() => {});
      break;

    case "success":
      toast.success("Payment confirmed", {
        description: "Receipt #4092 emailed to your account",
      });
      break;

    case "custom-icon":
      toast("AI Model Ready", {
        description: "Synthesized 12 variations in 0.4s",
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ),
        action: { label: "Inspect", onClick: () => toast("AI Inspector opened") },
      });
      break;

    case "tailwind":
      toast("Invoice Paid", {
        description: "Transferred $1,420 to Stripe account",
        className: "bg-emerald-950 text-emerald-100 border-emerald-800",
        action: { label: "Receipt", onClick: () => toast("Receipt #9102 ready") },
      });
      break;

    case "variant": {
      const streakToast = toast.variant({
        duration: 4000,
        className: "border-orange-500/30",
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          </svg>
        ),
      });
      streakToast("7-Day Streak!", { description: "Keep up the momentum today" });
      break;
    }

    case "error":
      toast.error("Deployment failed", {
        description: "Missing environment variable API_SECRET",
        action: { label: "Retry", onClick: () => triggerDemoToast("error") },
      });
      break;

    case "headless":
      toast.custom((id) => (
        <div className="flex h-14 w-full items-center justify-between gap-3 rounded-xl border border-neutral-700 bg-neutral-900 px-4 text-xs font-medium text-white shadow-xl">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-white font-bold text-[10px]">★</span>
            <span>Custom Headless JSX Notification</span>
          </div>
          <button type="button" onClick={() => toast.dismiss(id)} className="cursor-pointer rounded px-2 py-0.5 text-neutral-400 hover:text-white">
            Close
          </button>
        </div>
      ));
      break;

    case "neutral":
    default:
      toast("File archived", { description: "Moved to trash folder. You can restore it anytime." });
      break;
  }
}
