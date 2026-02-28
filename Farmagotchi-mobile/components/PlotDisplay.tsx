import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { colors } from 'lib/colors';
import { usePlantStore } from 'lib/stores';
import { PlotFormData } from 'lib/types';
import { AnimatedPressable } from 'lib/utils';
import { useState } from 'react';
import { View, Text } from 'react-native';

// Font.loadAsync
// loadas
export const PlotDisplay = ({ plot, happiness }: { plot: PlotFormData; happiness: number }) => {
  const [pressed, setPressed] = useState(false);
  const setName = usePlantStore((state) => state.setName);
  return (
    <AnimatedPressable
      className="flex-row items-center gap-2 rounded-2xl border-2 p-3"
      style={{
        borderColor: pressed ? colors['primary-500'] : colors['neutral-200'],
        backgroundColor: pressed ? colors['primary-100'] : 'transparent',
        transitionProperty: ['borderColor', 'backgroundColor'],
        transitionDuration: '.1s',
      }}
      onPressIn={() => {
        setPressed(true);
        setName(plot.name);
        router.push('/');
      }}
      onPressOut={() => setPressed(false)}>
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
      <View className="flex-1 gap-2">
        <Text className="font-geist text-lg">{plot.name}</Text>
        <View className="h-3 bg-neutral-200">
          <View
            style={{
              width: `${happiness}%`,
              height: '100%',
            }}
            className="bg-primary-600"></View>
        </View>
        <Text style={{
          fontFamily: "GeistPixel"
        }}>{computeMessage(happiness)}</Text>
      </View>
    </AnimatedPressable>
  );
};

function computeMessage(percentage: number): string {
  if (percentage >= 70) {
    return 'Looking Good';
  } else if (percentage >= 50) {
    return 'Nothing of concern';
  } else if (percentage >= 20) {
    return 'Needs Attention';
  }
  return 'Neglected';
}
