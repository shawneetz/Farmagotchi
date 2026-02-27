import { Slot, Tabs } from 'expo-router';
import { View, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MenuBar } from 'components/MenuBar';
import OptionModal from 'components/OptionModal';
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
