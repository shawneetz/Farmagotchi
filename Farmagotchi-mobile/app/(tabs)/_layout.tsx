import { Slot, Tabs } from 'expo-router';
import { View, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MenuBar } from 'components/MenuBar';

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();
  return (
    <>
      <Slot />
      <MenuBar />
    </>
  );
}
