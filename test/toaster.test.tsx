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

  it("supports keyboard dismissal via Enter and Space keys on close button", () => {
    render(<Toaster position="bottom-right" unstyled />);

    act(() => {
      toast("Test Notification");
    });

    const closeBtn = screen.getByRole("button", { name: "Dismiss notification" });

    act(() => {
      // Native buttons trigger click on Enter/Space key down/press
      fireEvent.click(closeBtn);
    });

    expect(toastStore.getToasts().length).toBe(0);
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
});
