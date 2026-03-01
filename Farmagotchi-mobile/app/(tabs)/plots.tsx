import { PlotDisplay } from 'components/PlotDisplay';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { usePlotsStore } from 'lib/stores';
import { ScrollView, View, Text, Pressable } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PlotsScreen() {
  const insets = useSafeAreaInsets();
  const plots = usePlotsStore((state) => state.plots);
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-neutral-100" style={{ paddingTop: insets.top }}>
      {plots.length === 0 ? (
        <View className="flex-1 justify-center">
          <View className="items-center gap-2 p-3">
            <Text className="text-center font-geist text-2xl text-neutral-800">
              There are no plots created yet.
            </Text>
            <Pressable
              onPress={() => {
                router.push('/add-plot');
              }}
              className="overflow-hidden rounded-full">
              <LinearGradient
                colors={['#71ac17', '#8eda1e']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="flex-row items-center justify-center px-6 py-3 shadow-sm">
                <Text className="font-geist text-base text-white">Add new Crop</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      ) : (
        <ScrollView className="flex-1 p-4">
          <Text className="mb-4 font-geist text-2xl text-black">My Fields</Text>
          <View className="gap-2">
            {plots.map((plot, index) => (
              <Animated.View key={plot.name} entering={FadeInRight.delay(index * 100)}>
                <PlotDisplay plot={plot} happiness={plot.happiness} />
              </Animated.View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
