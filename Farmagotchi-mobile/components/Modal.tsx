import { useModal } from 'lib/stores';
import OptionModal from './OptionModal';
import { Pressable } from 'react-native';
import { AnimatedPressable } from 'lib/utils';

export const Modal = () => {
  const visible = useModal((state) => state.visible);
  const close = useModal((state) => state.close);
  return visible ? <OptionModal visible={visible} onClose={close} /> : <></>;
};
