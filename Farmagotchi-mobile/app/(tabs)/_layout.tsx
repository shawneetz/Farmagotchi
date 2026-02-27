import { Slot } from 'expo-router';
import { MenuBar } from 'components/MenuBar';
import { Modal } from 'components/Modal';

export default function TabLayout() {
  return (
    <>
      {/* <Modal /> */}
      <Slot />
      <MenuBar />
      <Modal />
    </>
  );
}
