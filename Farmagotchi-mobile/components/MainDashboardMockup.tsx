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
        <View className="flex-row items-center justify-center gap-2 mt-12 mx-auto w-[200px]">
          <MaterialCommunityIcons name="seed" size={18} color="#71ac17" />
          <View className="flex-1 h-3 rounded-full bg-[#d3d3ca] relative overflow-hidden">
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
          <MaterialCommunityIcons name="food-apple-outline" size={18} color="#ccc"  />
        </View>

        {/* Central Plant Area */}
        <View className="items-center relative mt-8 h-[380px] justify-center">
          <View className="items-center">
            <View className="w-[200px] h-[350px] overflow-visible z-10">
              <Image 
                source={require('../assets/tree.png')} 
                style={{ width: '100%', height: '100%' }} 
                contentFit="contain" 
              />
            </View>
            <View className="w-[160px] h-[100px] -mt-10">
              <Image 
                source={require('../assets/pot.png')} 
                style={{ width: '100%', height: '100%' }} 
                contentFit="contain" 
              />
            </View>
          </View>
          <View className="absolute bottom-0 bg-[rgba(40,41,47,0.8)] border border-black/20 px-4 py-1.5 rounded-lg shadow-sm">
            <Text className="text-white text-base font-medium">Mango tree</Text>
          </View>
        </View>

        {/* Bottom Container */}
        <View className="flex-1 bg-[#f9fafa] rounded-t-[36px] mt-16 px-4 py-6" style={styles.shadow}>
          
          {/* Tasks Widget */}
          <View className="w-full relative rounded-[19px] overflow-hidden mb-4" >
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
            <View className="p-4 relative min-h-[120px] justify-center">
              <Feather 
                name="check-circle" 
                size={140} 
                color="#000000" 
                style={{ position: 'absolute', right: -20, top: -20, opacity: 0.1 }} 
              />
              <Text className="text-[#454b31] text-sm mb-1 font-medium">Tasks</Text>
              <View className="flex-row items-baseline gap-1 mb-3">
                <Text className="text-3xl text-[#49561f]">2</Text>
                <Text className="text-base text-[#698312]">/4</Text>
                <Text className="text-xs text-[#49561f] ml-1">Completed Today</Text>
              </View>
              <View className="h-2 w-full rounded-full bg-[#f1f1ee] overflow-hidden">
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
          <View className="flex-row gap-4 h-[95px]">
            {/* Net Profit Widget */}
            <View 
              className="flex-[1_0_0] rounded-[19px] border border-[#e0e1e6] bg-[#f9fafa] p-4 justify-center"
            >
              <View className="flex-row items-center gap-1.5 mb-2">
                <MaterialCommunityIcons name="cash-fast" size={16} color="#454b31" />
                <Text className="text-[#454b31] text-[13px] font-medium" numberOfLines={1}>Net Profit (Week)</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Feather name="arrow-up" size={20} color="#454b32" />
                <Text className="text-[22px] text-[#454b32] font-bold">₱120</Text>
              </View>
            </View>

            {/* Weather Widget */}
            <View 
              className="flex-[1_0_0] rounded-[19px] border border-[#b6ea67] bg-[#e1f6c0] p-4 flex-row items-center gap-3"
            >
              <Feather name="cloud" size={40} color="#71ac17" />
              <View className="flex-shrink">
                <Text className="text-[#7c7a65] text-xs font-medium">Los Baños</Text>
                <Text className="text-[#575647] text-base font-bold">24°C/30°C</Text>
                <Text className="text-[#9d9c88] text-[10px]">55% Humidity</Text>
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
