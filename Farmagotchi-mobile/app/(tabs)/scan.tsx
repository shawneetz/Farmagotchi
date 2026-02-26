import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ScanScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1 items-center justify-center bg-morning-mist"
      style={{ paddingTop: insets.top }}>
      <Text className="text-xl font-bold text-rich-soil-brown">Scan Flow</Text>
    </View>
  );
}
