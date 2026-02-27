import { Slot } from 'expo-router';
import { MenuBar } from 'components/MenuBar';
import { Modal } from 'components/Modal';
import InsightsModal from 'components/InsightsModal';

export default function TabLayout() {
  return (
    <>
      {/* <Modal /> */}
      <Slot />
      <MenuBar />
      <Modal />
      <InsightsModal />
    </>
  );
}
