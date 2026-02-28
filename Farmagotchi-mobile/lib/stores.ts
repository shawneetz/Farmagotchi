import { create } from 'zustand';

type ModalState = {
  visible: boolean;
  type: "option" | "field" | "resource"
};

type ModalAction = {
  open: () => void;
  close: () => void;
};

export const useModal = create<ModalState & ModalAction>((set) => ({
  visible: false,
  type: "option",
  open: () => set(() => ({visible: true})),
  close: () => set(() => ({visible: false}))
}));
