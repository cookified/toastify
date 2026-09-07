import { ChevronRight } from "lucide-react";
import { MotionNavItem } from "./MotionNavItem";
import { siteNavLinks } from "../navigation";

export function TableOfContents() {
  return (
    <aside className="hidden xl:block w-60 py-6 pl-4 pr-2 text-xs">
      <div className="sticky top-20 space-y-6 transition-all duration-200">
        {/* On This Page Nav with Motion Curve Animations */}
        <div>
          <div className="px-2.5 text-sm font-semibold tracking-tight text-neutral-950 dark:text-white">
            On this page
          </div>
          <nav className="mt-2 space-y-0.5">
            {siteNavLinks.map((item) => (
              <MotionNavItem
                key={item.href}
                href={item.href}
                label={item.label}
              />
            ))}
          </nav>
        </div>

        {/* Cookified Card */}
        <div className="rounded-xl border border-neutral-200/90 bg-white p-3.5 text-xs dark:border-neutral-800 dark:bg-[#121215]">
          <div className="text-xs font-semibold text-neutral-900 dark:text-white">
            Cookified Open Source
          </div>
          <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            Engineered React components built for craft and performance.
          </p>
          <a
            href="https://github.com/cookified/toastify"
            target="_blank"
            rel="noreferrer"
            className="group mt-3 flex items-center justify-between rounded-lg bg-neutral-950 px-3 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-neutral-800 hover:shadow-[0_0_16px_rgba(16,185,129,0.2)] active:scale-95 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 dark:hover:shadow-[0_0_16px_rgba(245,158,11,0.2)]"
          >
            <span>View Repository</span>
            <ChevronRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </aside>
  );
}
