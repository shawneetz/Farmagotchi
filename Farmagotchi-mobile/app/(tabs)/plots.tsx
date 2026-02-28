import { usePlotsStore } from 'lib/stores';
import { View, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PlotsScreen() {
  const insets = useSafeAreaInsets();
  const plots = usePlotsStore((state) => state.plots);
  return (
    <SafeAreaView
      className="flex-1  bg-morning-mist"
      style={{ paddingTop: insets.top }}>
      {plots.map(plot => <Text key={plot.name}>{plot.name}</Text>)}
    </SafeAreaView>
  );
}
