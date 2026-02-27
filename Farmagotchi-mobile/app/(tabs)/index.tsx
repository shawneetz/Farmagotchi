import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { verifyInstallation } from 'nativewind';
import {
  useTaskStore,
  useFinanceStore,
  useInsightsModal,
  useWeatherStore,
  useScanStore,
} from '../../lib/stores';

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  verifyInstallation();

  const tasks = useTaskStore((state) => state.tasks);
  const transactions = useFinanceStore((state) => state.transactions);
  const { open: openInsights, showTooltip, dismissTooltip } = useInsightsModal();
  const weather = useWeatherStore();
  const { scans, setRecentScan } = useScanStore();

  const latestScan = scans.length > 0 ? scans[0] : null;

  const dailyTasks = tasks.filter((t) => t.category === 'daily');
  const completedDailyTasks = dailyTasks.filter((t) => t.isCompleted).length;
  const totalDailyTasks = dailyTasks.length;
  const progressPercentage =
    totalDailyTasks > 0 ? (completedDailyTasks / totalDailyTasks) * 100 : 0;

  const netProfit = transactions.reduce(
    (acc, curr) => (curr.type === 'income' ? acc + curr.cost : acc - curr.cost),
    0
  );
  const isProfitPositive = netProfit >= 0;

  // Simple idle animation for the pet
  const translateY = useSharedValue(0);
  const scaleY = useSharedValue(1);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    scaleY.value = withRepeat(
      withSequence(
        withTiming(0.98, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, [translateY, scaleY]);

  const petStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }, { scaleY: scaleY.value }],
    };
  });

  const tooltipTranslateY = useSharedValue(0);

  useEffect(() => {
    tooltipTranslateY.value = withRepeat(
      withSequence(
        withTiming(-4, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, [tooltipTranslateY]);

  const tooltipStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: tooltipTranslateY.value }],
    };
  });

  return (
    <View className="flex-1 bg-[#f9fafa]" style={{ paddingTop: insets.top, paddingBottom: 100 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View className="px-4">
          {/* Plant Progress Bar */}
          <View className="mx-auto mt-16 w-[200px] flex-row items-center justify-center gap-2">
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
          <Pressable
            onPress={() => {
              openInsights();
              dismissTooltip();
            }}
            className="relative mt-16 h-[300px] items-center justify-center active:opacity-90">
            {/* Tooltip */}
            {showTooltip && (
              <Animated.View
                style={[
                  tooltipStyle,
                  {
                    position: 'absolute',
                    top: -20,
                    zIndex: 20,
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: 'rgba(113, 172, 23, 0.3)',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 2,
                  },
                ]}>
                <View className="flex-row items-center gap-1.5">
                  <MaterialCommunityIcons name="lightbulb-on-outline" size={13} color="#71ac17" />
                  <Text className="font-geist text-[10px] font-medium text-[#575647]">
                    Tap for insights
                  </Text>
                </View>
                {/* Tooltip Arrow */}
                <View
                  style={{
                    position: 'absolute',
                    bottom: -5,
                    left: '50%',
                    marginLeft: -5,
                    width: 0,
                    height: 0,
                    borderLeftWidth: 5,
                    borderRightWidth: 5,
                    borderTopWidth: 5,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderTopColor: 'rgba(255, 255, 255, 0.85)',
                  }}
                />
              </Animated.View>
            )}

            <Animated.View style={[petStyle, { alignItems: 'center' }]}>
              <View className="z-10 h-[340px] w-[200px] overflow-visible">
                <Image
                  source={require('../../assets/tree.png')}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="contain"
                />
              </View>
              <View className="-mt-10 h-[80px] w-[140px]">
                <Image
                  source={require('../../assets/pot.png')}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="contain"
                />
              </View>
            </Animated.View>
            <View className="absolute -bottom-12 rounded-lg border border-black/20 bg-[rgba(40,41,47,0.8)] px-4 py-1.5 shadow-sm">
              <Text className="font-geist text-base font-medium text-white">Mango tree</Text>
            </View>
          </Pressable>
        </View>

        {/* Bottom Container */}
        <View
          className="mt-24 flex-1 rounded-t-[36px] bg-[#f9fafa] px-4 py-8"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.58,
            shadowRadius: 10,
            elevation: 9,
          }}>
          {/* Widgets Container */}
          <View className="gap-4">
            {/* Tasks Widget */}
            <Pressable
              onPress={() => router.push('/tasks')}
              className="relative w-full overflow-hidden rounded-[19px]">
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
              <View className="relative min-h-[100px] justify-center p-4">
                <Feather
                  name="check-circle"
                  size={200}
                  color="#000000"
                  style={{ position: 'absolute', right: 10, top: -40, opacity: 0.1 }}
                />
                <Text className="mb-1 font-geist text-sm font-medium text-[#454b31]">Tasks</Text>
                <View className="mb-2 flex-row items-baseline gap-1">
                  <Text className="font-geist text-3xl text-[#49561f]">{completedDailyTasks}</Text>
                  <Text className="font-geist text-base text-[#698312]">/{totalDailyTasks}</Text>
                  <Text className="ml-1 font-geist text-xs text-[#49561f]">Completed Today</Text>
                </View>
                <View className="h-2 w-full overflow-hidden rounded-full bg-white/30">
                  <View
                    style={{
                      width: `${progressPercentage}%`,
                      height: '100%',
                      backgroundColor: '#49561f',
                    }}
                  />
                </View>
              </View>
            </Pressable>

            {/* Row for Net Profit and Weather */}
            <View className="h-[95px] flex-row gap-4">
              {/* Net Profit Widget */}
              <View className="flex-1 justify-center rounded-[19px] border border-[#e0e1e6] bg-white p-4">
                <View className="mb-2 flex-row items-center gap-1.5">
                  <MaterialCommunityIcons name="cash-fast" size={16} color="#454b31" />
                  <Text
                    className="font-geist text-[13px] font-medium text-[#454b31]"
                    numberOfLines={1}>
                    Net Profit
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Feather
                    name={isProfitPositive ? 'arrow-up' : 'arrow-down'}
                    size={18}
                    color={isProfitPositive ? '#454b32' : '#C85A5A'}
                  />
                  <Text
                    className={`font-geist text-[20px] font-bold ${isProfitPositive ? 'text-[#454b32]' : 'text-[#C85A5A]'}`}>
                    ₱{Math.abs(netProfit).toLocaleString()}
                  </Text>
                </View>
              </View>

              {/* Weather Widget */}
              <View className="flex-1 flex-row items-center gap-3 rounded-[19px] border border-[#b6ea67] bg-[#e1f6c0] p-4">
                <Feather name={weather.condition} size={32} color="#71ac17" />
                <View className="flex-shrink">
                  <Text className="font-geist text-[10px] font-medium text-[#7c7a65]">
                    {weather.location}
                  </Text>
                  <Text className="font-geist text-sm font-bold text-[#575647]">
                    {weather.lowTemp}°C/{weather.highTemp}°C
                  </Text>
                </View>
              </View>
            </View>

            {/* Scan Widget */}
            <Pressable
              onPress={() => {
                if (latestScan) {
                  setRecentScan(latestScan);
                } else {
                  router.push('/scan');
                }
              }}
              className="w-full flex-row items-center justify-between rounded-[19px] border border-[#e1f6c0] bg-white p-4">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
                  <Feather name="camera" size={20} color="#71ac17" />
                </View>
                <View>
                  <Text className="font-geist text-sm font-bold text-[#28292f]">
                    {latestScan ? 'Latest Scan Result' : 'No Scan Data'}
                  </Text>
                  <Text className="font-geist text-xs text-neutral-500">
                    {latestScan
                      ? `Health Score: ${latestScan.healthScore}/100`
                      : 'Scan your crop for AI insights'}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="font-geist text-xs font-medium text-primary-700">
                  {latestScan ? 'View' : 'Start'}
                </Text>
                <Feather name="chevron-right" size={16} color="#71ac17" />
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
