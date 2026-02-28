import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { colors } from 'lib/colors';
import { usePlantStore } from 'lib/stores';
import { PlotFormData } from 'lib/types';
import { AnimatedPressable } from 'lib/utils';
import { useState } from 'react';
import { View, Text } from 'react-native';

export const PlotDisplay = ({ plot }: { plot: PlotFormData }) => {
  const [pressed, setPressed] = useState(false);
  const setName = usePlantStore(state => state.setName)
  return (
    <AnimatedPressable
      className="flex-row items-center gap-2 rounded-2xl border-2 p-3"
      style={{
        borderColor: pressed ? colors['primary-500'] : colors['neutral-200'],
        backgroundColor: pressed ? colors['primary-100'] : "transparent",
        transitionProperty: ["borderColor", "backgroundColor"],
        transitionDuration: ".1s"
      }}
      onPressIn={() => {setPressed(true); setName(plot.name); router.push("/")}}
      onPressOut={() => setPressed(false)}
      >
      {plot.photoUri ? (
        <Image
          source={plot.photoUri}
          style={{ width: 96, height: 96, borderRadius: 12 }}
          contentFit="cover"
        />
      ) : (
        <View className="h-24 w-24 items-center justify-center">
          <MaterialCommunityIcons name="sprout" size={48} color="#9ca3af" />
        </View>
      )}
      <View className="gap-2">
        <Text className="font-geist text-lg">{plot.name}</Text>
        <View className="gap-1"></View>
      </View>
    </AnimatedPressable>
  );
};
