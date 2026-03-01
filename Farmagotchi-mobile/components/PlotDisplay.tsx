import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { colors } from 'lib/colors';
import { usePlantStore } from 'lib/stores';
import { PlotFormData } from 'lib/types';
import { AnimatedPressable } from 'lib/utils';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const PlotDisplay = ({ plot, happiness }: { plot: PlotFormData; happiness: number }) => {
  const [pressed, setPressed] = useState(false);
  const setName = usePlantStore((state) => state.setName);
  return (
    <AnimatedPressable
      className="flex-row items-center gap-3 rounded-2xl border-2 bg-white p-3"
      style={{
        borderColor: pressed ? colors['primary-500'] : colors['neutral-200'],
      }}
      onPress={() => {
        router.push('/');
      }}
      onPressIn={() => {
        setPressed(true);
        setName(plot.name);
      }}
      onPressOut={() => setPressed(false)}>
      <View className="size-24 items-center justify-center rounded-xl border border-neutral-200">
        {plot.photoUri ? (
          <Image
            source={plot.photoUri}
            className="size-full rounded-xl"
            contentFit="cover"
          />
        ) : (
          <MaterialCommunityIcons name="sprout" size={48} color={colors['neutral-400']} />
        )}
      </View>
      <View className="flex-1 gap-2">
        <Text className="font-geist text-lg text-neutral-800">{plot.name}</Text>
        <View className="gap-1">
          <View className="h-2 w-full overflow-hidden rounded-full bg-neutral-300">
            <LinearGradient
              colors={[colors['primary-500'], colors['primary-100']]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: `${happiness}%`,
                height: '100%',
                borderRadius: 19,
              }}
            />
          </View>
          <Text className="font-geist text-base text-neutral-500">
            {computeMessage(happiness)}
          </Text>
        </View>
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
