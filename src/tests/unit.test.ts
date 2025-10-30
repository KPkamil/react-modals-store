import { act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { modalStore, openModal } from "../index";

describe("modalStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should notify a subscriber when a modal is opened", () => {
    const listener = vi.fn();

    const unsubscribe = modalStore.subscribe(listener);

    expect(listener).not.toHaveBeenCalled();

    act(() => {
      openModal("testModal", { id: 1 });
    });

    expect(listener).toHaveBeenCalledTimes(1);

    act(() => {
      modalStore.closeModal("testModal");
    });

    unsubscribe();
  });

  it("should update modal state correctly", () => {
    expect(modalStore.getModalState("testModal").isOpen).toBe(false);

    act(() => {
      openModal("testModal", { id: 1 });
    });

    const state = modalStore.getModalState<{ id: number }>("testModal");
    expect(state.isOpen).toBe(true);
    expect(state.data).toEqual({ id: 1 });

    act(() => {
      modalStore.closeModal("testModal");
    });

    expect(modalStore.getModalState("testModal").isOpen).toBe(false);
  });
});
