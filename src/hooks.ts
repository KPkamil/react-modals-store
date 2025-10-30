import { useSyncExternalStore } from "use-sync-external-store/shim";

import { modalStore, ModalConfig } from "./store";

export function useModalOpen<
  T extends ModalConfig,
  K extends Extract<keyof T, string | number>
>(modalId: K): boolean {
  const isOpen = useSyncExternalStore(
    modalStore.subscribe,
    () => modalStore.getModalState(modalId).isOpen // getSnapshot
  );

  return isOpen;
}

export function useModalData<
  T extends ModalConfig,
  K extends Extract<keyof T, string | number>
>(modalId: K): T[K] | undefined {
  const data = useSyncExternalStore(
    modalStore.subscribe,
    () => modalStore.getModalState<T[K]>(modalId).data // getSnapshot
  );

  return data;
}
