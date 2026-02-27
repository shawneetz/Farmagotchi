import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function MainDashboardMockup() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#f9fafa]" style={{ paddingTop: insets.top, paddingBottom: 100 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        {/* Plant Progress Bar */}
        <View className="mx-auto mt-12 w-[200px] flex-row items-center justify-center gap-2">
          <MaterialCommunityIcons name="seed" size={18} color="#71ac17" />
          <View className="relative h-3 flex-1 overflow-hidden rounded-full bg-[#d3d3ca]">
            <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '70.68%' }}>
              <Svg width="100%" height="100%">
                <Defs>
                  <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#a3e540" />
                    <Stop offset="100%" stopColor="#e1f6c0" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grad1)" />
              </Svg>
            </View>
          </View>
          <MaterialCommunityIcons name="food-apple-outline" size={18} color="#ccc" />
        </View>

        {/* Central Plant Area */}
        <View className="relative mt-8 h-[380px] items-center justify-center">
          <View className="items-center">
            <View className="z-10 h-[350px] w-[200px] overflow-visible">
              <Image
                source={require('../assets/tree.png')}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
              />
            </View>
            <View className="-mt-10 h-[100px] w-[160px]">
              <Image
                source={require('../assets/pot.png')}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
              />
            </View>
          </View>
          <View className="absolute bottom-0 rounded-lg border border-black/20 bg-[rgba(40,41,47,0.8)] px-4 py-1.5 shadow-sm">
            <Text className="text-base font-medium text-white">Mango tree</Text>
          </View>
        </View>

        {/* Bottom Container */}
        <View
          className="mt-16 flex-1 rounded-t-[36px] bg-[#f9fafa] px-4 py-6"
          style={styles.shadow}>
          {/* Tasks Widget */}
          <View className="relative mb-4 w-full overflow-hidden rounded-[19px]">
            <View className="absolute inset-0">
              <Svg width="100%" height="100%">
                <Defs>
                  <LinearGradient id="gradTasks" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#8eda1e" />
                    <Stop offset="100%" stopColor="#c6ef89" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#gradTasks)" />
              </Svg>
            </View>
            <View className="relative min-h-[120px] justify-center p-4">
              <Feather
                name="check-circle"
                size={140}
                color="#000000"
                style={{ position: 'absolute', right: -20, top: -20, opacity: 0.1 }}
              />
              <Text className="mb-1 text-sm font-medium text-[#454b31]">Tasks</Text>
              <View className="mb-3 flex-row items-baseline gap-1">
                <Text className="text-3xl text-[#49561f]">2</Text>
                <Text className="text-base text-[#698312]">/4</Text>
                <Text className="ml-1 text-xs text-[#49561f]">Completed Today</Text>
              </View>
              <View className="h-2 w-full overflow-hidden rounded-full bg-[#f1f1ee]">
                <View style={{ width: '50%', height: '100%' }}>
                  <Svg width="100%" height="100%">
                    <Defs>
                      <LinearGradient id="gradTaskProg" x1="0%" y1="0%" x2="100%" y2="0%">
                        <Stop offset="0%" stopColor="#71ac17" />
                        <Stop offset="100%" stopColor="#b6ea67" />
                      </LinearGradient>
                    </Defs>
                    <Rect width="100%" height="100%" fill="url(#gradTaskProg)" />
                  </Svg>
                </View>
              </View>
            </View>
          </View>

          {/* Row for Net Profit and Weather */}
          <View className="h-[95px] flex-row gap-4">
            {/* Net Profit Widget */}
            <View className="flex-[1_0_0] justify-center rounded-[19px] border border-[#e0e1e6] bg-[#f9fafa] p-4">
              <View className="mb-2 flex-row items-center gap-1.5">
                <MaterialCommunityIcons name="cash-fast" size={16} color="#454b31" />
                <Text className="text-[13px] font-medium text-[#454b31]" numberOfLines={1}>
                  Net Profit (Week)
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Feather name="arrow-up" size={20} color="#454b32" />
                <Text className="text-[22px] font-bold text-[#454b32]">₱120</Text>
              </View>
            </View>

            {/* Weather Widget */}
            <View className="flex-[1_0_0] flex-row items-center gap-3 rounded-[19px] border border-[#b6ea67] bg-[#e1f6c0] p-4">
              <Feather name="cloud" size={40} color="#71ac17" />
              <View className="flex-shrink">
                <Text className="text-xs font-medium text-[#7c7a65]">Los Baños</Text>
                <Text className="text-base font-bold text-[#575647]">24°C/30°C</Text>
                <Text className="text-[10px] text-[#9d9c88]">55% Humidity</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 9,
  },
});
