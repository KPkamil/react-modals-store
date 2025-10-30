export type ModalConfig = {
  [K: string]: unknown;
};

type ModalState<T> = {
  isOpen: boolean;
  data?: T;
};

let listeners = new Set<() => void>();
const modals = new Map<string | number, ModalState<unknown>>();

export const modalStore = {
  openModal<T extends ModalConfig, K extends Extract<keyof T, string | number>>(
    modalId: K,
    data?: T[K]
  ) {
    modals.set(modalId, { isOpen: true, data });
    listeners.forEach((listener) => listener()); // Notify
  },

  closeModal(modalId: string | number) {
    modals.set(modalId, { isOpen: false, data: undefined });
    listeners.forEach((listener) => listener()); // Notify
  },

  getModalState<T>(modalId: string | number): ModalState<T> {
    return (modals.get(modalId) as ModalState<T>) || { isOpen: false };
  },

  subscribe(listener: () => void) {
    listeners.add(listener);

    return () => listeners.delete(listener); // Unsubscribe
  },
};
