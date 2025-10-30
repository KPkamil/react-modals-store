import { modalStore } from "./store";

// Export the types
export * from "./store"; // Exports ModalConfig

// Export the hooks
export * from "./hooks"; // Exports useModalOpen, useModalData

// Export the actions
export const { openModal, closeModal } = modalStore;
