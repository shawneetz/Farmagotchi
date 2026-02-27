import { create } from 'zustand';

type ModalState = {
  visible: boolean;
};

type ModalAction = {
  open: () => void;
  close: () => void;
};

export const useModal = create<ModalState & ModalAction>((set) => ({
  visible: false,
  open: () => set(() => ({visible: true})),
  close: () => set(() => ({visible: false}))
}));
