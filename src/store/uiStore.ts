import { create } from "zustand";

type UiState = {
  isSideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  toggleSideMenu: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  isSideMenuOpen: false,

  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
  toggleSideMenu: () =>
    set((state) => ({ isSideMenuOpen: !state.isSideMenuOpen })),
}));