import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import { Toaster } from "../src/toastify/Toaster";
import { toast, toastStore } from "../src/toastify/store";

describe("<Toaster /> and <Toast /> component", () => {
  beforeEach(() => {
    toast.dismiss();
  });

  it("renders dispatched notifications inside the landmark region", () => {
    render(<Toaster position="bottom-right" unstyled />);

    act(() => {
      toast("Profile updated", { description: "Changes saved to disk" });
    });

    const region = screen.getByRole("region", { name: "Notifications" });
    expect(region).toBeDefined();
    // Confirms outer container does NOT have conflicting aria-live
    expect(region.getAttribute("aria-live")).toBeNull();

    expect(screen.getByText("Profile updated")).toBeDefined();
    expect(screen.getByText("Changes saved to disk")).toBeDefined();
  });

  it("renders a dedicated accessible close button and dismisses on click", () => {
    render(<Toaster position="bottom-right" unstyled />);

    act(() => {
      toast("Deploy complete");
    });

    const closeBtn = screen.getByRole("button", { name: "Dismiss notification" });
    expect(closeBtn).toBeDefined();

    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(toastStore.getToasts().length).toBe(0);
  });

  it("supports keyboard dismissal via Enter key on close button", () => {
    render(<Toaster position="bottom-right" unstyled />);

    act(() => {
      toast("Test Notification Enter");
    });

    const closeBtn = screen.getByRole("button", { name: "Dismiss notification" });
    act(() => {
      fireEvent.keyDown(closeBtn, { key: "Enter" });
    });
    expect(toastStore.getToasts().length).toBe(0);
  });

  it("supports keyboard dismissal via Space key on close button", () => {
    render(<Toaster position="bottom-right" unstyled />);

    act(() => {
      toast("Test Notification Space");
    });

    const closeBtn = screen.getByRole("button", { name: "Dismiss notification" });
    act(() => {
      fireEvent.keyDown(closeBtn, { key: " " });
    });
    expect(toastStore.getToasts().length).toBe(0);
  });

  it("supports keyboard dismissal via Escape key", () => {
    render(<Toaster position="bottom-right" unstyled />);

    act(() => {
      toast("Dismissible with Escape");
    });
    expect(toastStore.getToasts().length).toBe(1);

    act(() => {
      fireEvent.keyDown(window, { key: "Escape" });
    });
    expect(toastStore.getToasts().length).toBe(0);
  });

  it("respects dismissOnEscape=false to disable Escape key dismissal", () => {
    render(<Toaster position="bottom-right" dismissOnEscape={false} unstyled />);

    act(() => {
      toast("Persistent on Escape");
    });
    expect(toastStore.getToasts().length).toBe(1);

    act(() => {
      fireEvent.keyDown(window, { key: "Escape" });
    });
    expect(toastStore.getToasts().length).toBe(1);
  });

  it("announces standard toasts with role='status' and errors with role='alert'", () => {
    render(<Toaster position="bottom-right" unstyled />);

    act(() => {
      toast.success("Success notice");
      toast.error("Critical failure");
    });

    const statusArticle = screen.getByText("Success notice").closest("article");
    expect(statusArticle).not.toBeNull();
    expect(statusArticle?.getAttribute("role")).toBe("status");
    expect(statusArticle?.getAttribute("aria-live")).toBe("polite");

    const alertArticle = screen.getByText("Critical failure").closest("article");
    expect(alertArticle).not.toBeNull();
    expect(alertArticle?.getAttribute("role")).toBe("alert");
    expect(alertArticle?.getAttribute("aria-live")).toBe("assertive");
  });

  it("cleans up store subscription when Toaster is unmounted", () => {
    const { unmount } = render(<Toaster position="bottom-right" unstyled />);

    act(() => {
      toast("Before unmount");
    });
    expect(screen.getByText("Before unmount")).toBeDefined();

    unmount();

    // After unmount, adding a toast should not cause React warnings or state updates on unmounted component
    expect(() => {
      act(() => {
        toast("After unmount");
      });
    }).not.toThrow();
  });

  it("evicts oldest toasts first (FIFO order) when multiple toasts are pushed at once", () => {
    render(<Toaster visibleToasts={3} unstyled />);

    act(() => {
      toast("Toast 1");
      toast("Toast 2");
      toast("Toast 3");
      toast("Toast 4");
      toast("Toast 5");
    });

    // The oldest toasts (Toast 1 and 2) must be evicted first, leaving the 3 newest
    expect(screen.queryByText("Toast 1")).toBeNull();
    expect(screen.queryByText("Toast 2")).toBeNull();
    expect(screen.getByText("Toast 3")).toBeDefined();
    expect(screen.getByText("Toast 4")).toBeDefined();
    expect(screen.getByText("Toast 5")).toBeDefined();
  });

  it("applies custom colors via style and className at the toast and Toaster levels", () => {
    render(
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "global-custom-class",
          style: { backgroundColor: "#1e1e2e" },
        }}
        unstyled
      />,
    );

    act(() => {
      toast("Custom Colored Toast", {
        className: "per-toast-class",
        style: { color: "#cdd6f4" },
      });
    });

    const toastElement = screen.getByText("Custom Colored Toast").closest(".toastify-toast");
    expect(toastElement).not.toBeNull();
    expect(toastElement?.className).toContain("global-custom-class");
    expect(toastElement?.className).toContain("per-toast-class");
    expect(toastElement?.getAttribute("style")).toContain("background-color: rgb(30, 30, 46)");
    expect(toastElement?.getAttribute("style")).toContain("color: rgb(205, 214, 244)");
  });

  it("renders with dark, light, and system themes", () => {
    const { rerender } = render(<Toaster theme="dark" unstyled />);
    let region = screen.getByRole("region", { name: "Notifications" });
    expect(region.className).toContain("dark");

    rerender(<Toaster theme="light" unstyled />);
    region = screen.getByRole("region", { name: "Notifications" });
    expect(region.className).not.toContain("dark");

    rerender(<Toaster theme="system" unstyled />);
    region = screen.getByRole("region", { name: "Notifications" });
    expect(region.className).toContain("system");
  });

  it("dispatches warning, info, and loading methods properly", () => {
    render(<Toaster position="bottom-right" unstyled />);

    act(() => {
      toast.warning("Warning message");
      toast.info("Info message");
      toast.loading("Loading message");
    });

    expect(screen.getByText("Warning message")).toBeDefined();
    expect(screen.getByText("Info message")).toBeDefined();
    expect(screen.getByText("Loading message")).toBeDefined();
  });

  it("renders headless custom JSX notifications via toast.custom", () => {
    render(<Toaster position="bottom-right" unstyled />);

    act(() => {
      toast.custom((id) => (
        <div data-testid="custom-jsx">
          <span>Headless custom UI</span>
          <button onClick={() => toast.dismiss(id)}>Dismiss Headless</button>
        </div>
      ));
    });

    expect(screen.getByTestId("custom-jsx")).toBeDefined();
    expect(screen.getByText("Headless custom UI")).toBeDefined();
  });

  it("renders custom SVG icons cleanly without collision or duplicate default icons", () => {
    render(<Toaster position="bottom-right" unstyled />);

    act(() => {
      toast("AI Model Synthesized", {
        icon: (
          <svg data-testid="custom-svg-icon" width="14" height="14" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        ),
      });
    });

    expect(screen.getByTestId("custom-svg-icon")).toBeDefined();
    // Verify default badge is NOT rendered when custom icon is provided
    expect(document.querySelector(".toastify-badge")).toBeNull();
  });

  it("allows seamless Tailwind and custom utility class overrides without conflict", () => {
    render(<Toaster position="bottom-right" unstyled />);

    act(() => {
      toast("Tailwind Styled Toast", {
        className: "bg-emerald-950 text-emerald-100 border-emerald-800 shadow-2xl",
      });
    });

    const toastElement = screen.getByText("Tailwind Styled Toast").closest(".toastify-toast");
    expect(toastElement).not.toBeNull();
    expect(toastElement?.className).toContain("bg-emerald-950");
    expect(toastElement?.className).toContain("text-emerald-100");
    expect(toastElement?.className).toContain("border-emerald-800");
    expect(toastElement?.className).toContain("shadow-2xl");
  });

  it("creates isolated, reusable custom states via toast.variant", () => {
    render(<Toaster position="bottom-right" unstyled />);

    const streakToast = toast.variant({
      duration: 5000,
      className: "border-orange-500/30",
      icon: (
        <span data-testid="streak-icon" role="img" aria-label="fire">
          🔥
        </span>
      ),
    });

    act(() => {
      streakToast("7-Day Streak!", {
        description: "Consistency is key",
      });
    });

    expect(screen.getByText("7-Day Streak!")).toBeDefined();
    expect(screen.getByText("Consistency is key")).toBeDefined();
    expect(screen.getByTestId("streak-icon")).toBeDefined();

    const toastElement = screen.getByText("7-Day Streak!").closest(".toastify-toast");
    expect(toastElement?.className).toContain("border-orange-500/30");
  });

  it("suppresses icons entirely when icon: null is explicitly provided", () => {
    render(<Toaster position="bottom-right" unstyled />);

    act(() => {
      toast("No Icon Toast", {
        icon: null,
      });
    });

    expect(screen.getByText("No Icon Toast")).toBeDefined();
    expect(document.querySelector(".toastify-badge")).toBeNull();
  });

  it("supports pluggable custom animation components passed to <Toaster animation={...} />", () => {
    function CustomFlipAnimation({
      children,
      index,
    }: {
      children: React.ReactNode;
      index: number;
    }) {
      return (
        <div data-testid={`custom-animation-stage-${index}`} className="custom-motion-wrapper">
          {children}
        </div>
      );
    }

    render(<Toaster animation={CustomFlipAnimation} unstyled />);

    act(() => {
      toast("Pluggable Animation Notice");
    });

    expect(screen.getByText("Pluggable Animation Notice")).toBeDefined();
    expect(screen.getByTestId("custom-animation-stage-0")).toBeDefined();
  });
});
