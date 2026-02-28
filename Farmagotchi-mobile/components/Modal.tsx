import { useModal } from 'lib/stores';
import OptionModal from './OptionModal';

export const Modal = () => {
  const visible = useModal((state) => state.visible);
  const close = useModal((state) => state.close);
  return visible ? <OptionModal visible={visible} onClose={close} /> : <></>;
};
