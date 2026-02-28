import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PlotDisplay } from 'components/PlotDisplay';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { colors } from 'lib/colors';
import { useModal, usePlotsStore } from 'lib/stores';
import { AnimatedPressable } from 'lib/utils';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PlotsScreen() {
  const insets = useSafeAreaInsets();
  const plots = usePlotsStore((state) => state.plots);
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1  bg-neutral-100" style={{ paddingTop: insets.top }}>
      {plots.length === 0 ? (
        <View className="flex-1 justify-center">
          <View className='p-3 items-center gap-2'>
            <Text className='font-geist text-2xl text-center'>There are no plots created yet.</Text>
            <Pressable onPress={() => {
              router.push("/add-plot")
            }} className='bg-primary-400 py-3 px-5 rounded-xl'>
              <Text className='font-geist'>Add new Crop</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <ScrollView className="flex-1 p-4">
          <Text className='font-geist text-3xl'>Your Plot Fields</Text>
          <View className='pt-2'>
            {plots.map((plot) => (
              <PlotDisplay plot={plot} happiness={plot.happiness} key={plot.name} />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
