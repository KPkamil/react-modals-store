# react-modals-store

A tiny, type-safe, and performant global state manager for React modals.

This library provides a set of hooks and functions to manage your application's modal state without coupling your components. It uses `useSyncExternalStore` to ensure components only re-render when the specific modal they care about changes.

## 🌟 Key Features

- **Type-Safe**: Link modal IDs to specific data payloads using TypeScript.
- **Performant**: Uses `useSyncExternalStore` to prevent unnecessary re-renders.
- **Decoupled**: Manages state only. Bring your own UI components.
- **Lightweight**: Tiny and has no dependencies (other than React).

## 📦 Installation

```bash
npm install react-modals-store
yarn add react-modals-store
```

### Peer Dependencies

This package has peer dependencies on `react` and `use-sync-external-store`.

- **If you are on React 18+**: `useSyncExternalStore` is built-in. You are done.
- **If you are on React 16.8+ or 17**: You must install the shim:

```bash
npm install use-sync-external-store
yarn add use-sync-external-store
```

## 🚀 Usage

### 1. Define Your Modals

Create a central type file to define all modals and the data they require.

```typescript
// src/types/modals.ts

// This is the generic you will pass to the hooks
export type AppModalConfig = {
  confirmation: {
    title: string;
    onConfirm: () => void;
  };
  userProfile: {
    userId: string;
  };
  settings: undefined; // A modal with no data
};
```

### 2. Connect Your Modal Component

In your modal component, use `useModalOpen` and `useModalData` to subscribe to its state.

```typescript
// src/components/UserProfileModal.tsx
import { useModalOpen, useModalData, closeModal } from "react-modals-store";
import type { AppModalConfig } from "../types/modals";

export function UserProfileModal() {
  // These hooks subscribe *only* to 'userProfile' state.
  const isOpen = useModalOpen<AppModalConfig>("userProfile");
  const data = useModalData<AppModalConfig>("userProfile");

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>User Profile: {data?.userId}</h2>
        <button onClick={() => closeModal("userProfile")}>Close</button>
      </div>
    </div>
  );
}
```

### 3. Render Modals

```typescript
// src/App.tsx
import { UserProfileModal } from "./components/UserProfileModal";
import { ConfirmationModal } from "./components/ConfirmationModal";

export function App() {
  return (
    <div>
      {/* Your regular app content */}
      <h1>My App</h1>
      <MyPage />

      {/* Modals are invisible by default. */}
      <UserProfileModal />
      <ConfirmationModal />
    </div>
  );
}
```

### 4. Open Modals

Call `openModal` function to open a modal.

```typescript
// src/components/SomeButton.tsx
import { openModal } from "react-modals-store";
import type { AppModalConfig } from "../types/modals";

export function SomeButton() {
  const handleOpenProfile = () => {
    // Type-safe: TypeScript ensures the data matches 'userProfile'
    openModal<AppModalConfig>("userProfile", { userId: "abc-123" });
  };

  const handleOpenSettings = () => {
    // Works for modals with no data
    openModal<AppModalConfig>("settings");
  };

  return (
    <>
      <button onClick={handleOpenProfile}>View Profile</button>
      <button onClick={handleOpenSettings}>Open Settings</button>
    </>
  );
}
```

## 📚 API Reference

### Actions

**`openModal<T extends ModalConfig>(modalId: keyof T, data?: T[keyof T])`**  
Opens a modal and optionally sets its data.

**`closeModal(modalId: keyof T)`**  
Closes a modal and clears its data.

### Hooks

**`useModalOpen<T extends ModalConfig>(modalId: keyof T): boolean`**  
Returns `true` or `false`. Subscribes the component to the modal's open state.

**`useModalData<T extends ModalConfig>(modalId: keyof T): T[keyof T] | undefined`**  
Returns the modal's data. Subscribes the component to the modal's data state.

### Types

**`ModalConfig`**  
The base type to extend for your application's modal configuration.

## 📄 License

MIT
