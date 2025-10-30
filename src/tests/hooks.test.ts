import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { closeModal, openModal, useModalData, useModalOpen } from "../index";

describe("useModalOpen and useModalData", () => {
  afterEach(() => {
    act(() => {
      closeModal("profile");
      closeModal("settings");
    });

    vi.clearAllMocks();
  });

  it("useModalOpen should return correct open state", () => {
    const { result } = renderHook(() => useModalOpen("profile"));

    expect(result.current).toBe(false);

    act(() => {
      openModal("profile");
    });

    expect(result.current).toBe(true);
  });

  it("useModalData should return correct data", () => {
    const { result } = renderHook(() => useModalData("profile"));

    expect(result.current).toBeUndefined();

    act(() => {
      openModal("profile", { userId: 42 });
    });

    expect(result.current).toEqual({ userId: 42 });

    act(() => {
      closeModal("profile");
    });

    expect(result.current).toBeUndefined();
  });

  it("should not re-render a hook subscribed to a different modal", () => {
    const onRender = vi.fn();

    const { result } = renderHook(() => {
      onRender();

      return useModalOpen("settings");
    });

    expect(result.current).toBe(false);
    expect(onRender).toHaveBeenCalledTimes(1);

    act(() => {
      openModal("profile", { userId: 42 });
    });

    expect(result.current).toBe(false);
    expect(onRender).toHaveBeenCalledTimes(1);

    act(() => {
      openModal("settings");
    });

    expect(result.current).toBe(true);
    expect(onRender).toHaveBeenCalledTimes(2);
  });
});
