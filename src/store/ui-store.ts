import { create } from "zustand";

interface UIState {
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  modalType: "flight" | "hotel" | "activity" | null;
  modalData: unknown;
}

interface UIActions {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openModal: (type: "flight" | "hotel" | "activity", data?: unknown) => void;
  closeModal: () => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>()((set) => ({
  isSidebarOpen: true,
  isModalOpen: false,
  modalType: null,
  modalData: null,

  toggleSidebar: () => {
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
  },

  setSidebarOpen: (open) => {
    set({ isSidebarOpen: open });
  },

  openModal: (type, data = null) => {
    set({ isModalOpen: true, modalType: type, modalData: data });
  },

  closeModal: () => {
    set({ isModalOpen: false, modalType: null, modalData: null });
  },
}));

