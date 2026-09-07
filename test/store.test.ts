import { describe, it, expect, beforeEach, vi } from "vitest";
import { toast, toastStore } from "../src/toastify/store";

describe("toastStore & toast API", () => {
  beforeEach(() => {
    toast.dismiss();
  });

  it("creates unique IDs automatically for each toast", () => {
    const id1 = toast("Toast 1");
    const id2 = toast("Toast 2");
    expect(id1).toBeDefined();
    expect(id2).toBeDefined();
    expect(id1).not.toBe(id2);

    const toasts = toastStore.getToasts();
    expect(toasts.length).toBe(2);
    expect(toasts[0].id).toBe(id2);
    expect(toasts[1].id).toBe(id1);
  });

  it("allows updating an existing toast by ID instead of creating duplicate", () => {
    const id = toast("Initial message", { id: "custom-id" });
    expect(id).toBe("custom-id");
    expect(toastStore.getToasts().length).toBe(1);

    toast.success("Updated message", { id: "custom-id" });
    const current = toastStore.getToasts();
    expect(current.length).toBe(1);
    expect(current[0].title).toBe("Updated message");
    expect(current[0].type).toBe("success");
  });

  it("enforces MAX_TOASTS = 30 memory buffer to prevent memory leaks", () => {
    for (let i = 0; i < 100; i++) {
      toast(`Message ${i}`);
    }
    const toasts = toastStore.getToasts();
    expect(toasts.length).toBe(30);
    expect(toasts[0].title).toBe("Message 99");
  });

  it("sanitizes durations safely (negative, non-finite)", () => {
    const id1 = toast("Negative duration", { duration: -500 });
    const toast1 = toastStore.getToasts().find((t) => t.id === id1);
    expect(toast1?.duration).toBe(3500);

    const id2 = toast("NaN duration", { duration: NaN });
    const toast2 = toastStore.getToasts().find((t) => t.id === id2);
    expect(toast2?.duration).toBe(3500);

    const id3 = toast("Infinite duration", { duration: Infinity });
    const toast3 = toastStore.getToasts().find((t) => t.id === id3);
    expect(toast3?.duration).toBe(3500);

    const id4 = toast("Persistent duration", { duration: false });
    const toast4 = toastStore.getToasts().find((t) => t.id === id4);
    expect(toast4?.duration).toBe(false);
  });

  it("handles promise resolution lifecycle", async () => {
    const deferred = new Promise<string>((resolve) => {
      setTimeout(() => resolve("Success Payload"), 50);
    });

    const promiseChain = toast.promise(deferred, {
      loading: "Loading...",
      success: (data) => `Loaded: ${data}`,
      error: "Error",
    });

    let current = toastStore.getToasts();
    expect(current.length).toBe(1);
    expect(current[0].type).toBe("loading");
    expect(current[0].duration).toBe(false);

    await promiseChain;

    current = toastStore.getToasts();
    expect(current.length).toBe(1);
    expect(current[0].type).toBe("success");
    expect(current[0].title).toBe("Loaded: Success Payload");
  });

  it("handles promise rejection lifecycle", async () => {
    const deferred = new Promise<string>((_, reject) => {
      setTimeout(() => reject(new Error("Failure Payload")), 50);
    });

    try {
      await toast.promise(deferred, {
        loading: "Loading...",
        success: "Success",
        error: (err) => `Failed: ${(err as Error).message}`,
      });
    } catch {
      // expected rejection
    }

    const current = toastStore.getToasts();
    expect(current.length).toBe(1);
    expect(current[0].type).toBe("error");
    expect(current[0].title).toBe("Failed: Failure Payload");
  });

  it("isolates subscriber errors so external listener crashes do not break store", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const brokenListener = () => {
      throw new Error("Crashing subscriber");
    };
    const healthyListener = vi.fn();

    const unsubBroken = toastStore.subscribe(brokenListener);
    const unsubHealthy = toastStore.subscribe(healthyListener);

    toast("Should still work");

    expect(healthyListener).toHaveBeenCalled();
    expect(toastStore.getToasts().length).toBe(1);

    unsubBroken();
    unsubHealthy();
    errorSpy.mockRestore();
  });

  it("dismisses a single toast by ID or all toasts", () => {
    const id1 = toast("First");
    const id2 = toast("Second");
    expect(toastStore.getToasts().length).toBe(2);

    toast.dismiss(id1);
    expect(toastStore.getToasts().length).toBe(1);
    expect(toastStore.getToasts()[0].id).toBe(id2);

    toast.dismiss();
    expect(toastStore.getToasts().length).toBe(0);
  });
});
