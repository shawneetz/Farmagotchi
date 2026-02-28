import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
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
  useAnimatedProps,
} from 'react-native-reanimated';
import {
  useTaskStore,
  useFinanceStore,
  useInsightsModal,
  useWeatherStore,
  useScanStore,
  usePlantStore,
} from '../../lib/stores';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const tasks = useTaskStore((state) => state.tasks);
  const transactions = useFinanceStore((state) => state.transactions);
  const { open: openInsights, showTooltip, dismissTooltip } = useInsightsModal();
  const weather = useWeatherStore();
  const { scans, setRecentScan } = useScanStore();
  const plant = usePlantStore();

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

  // Shared values for load-in animations
  const fadeAnim = useSharedValue(0);
  const happinessAnim = useSharedValue(0);
  const taskProgressAnim = useSharedValue(0);
  const profitAnim = useSharedValue(0);

  // Simple idle animation for the pet
  const translateY = useSharedValue(0);
  const scaleY = useSharedValue(1);

  useEffect(() => {
    // Load-in animations
    fadeAnim.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.quad) });
    happinessAnim.value = withTiming(plant.happiness, {
      duration: 1500,
      easing: Easing.out(Easing.exp),
    });
    taskProgressAnim.value = withTiming(progressPercentage, {
      duration: 1500,
      easing: Easing.out(Easing.exp),
    });
    profitAnim.value = withTiming(Math.abs(netProfit), {
      duration: 2000,
      easing: Easing.out(Easing.quad),
    });

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
  }, [
    fadeAnim,
    happinessAnim,
    taskProgressAnim,
    profitAnim,
    translateY,
    scaleY,
    plant.happiness,
    progressPercentage,
    netProfit,
  ]);

  const petStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }, { scaleY: scaleY.value }],
    };
  });

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  const happinessBarStyle = useAnimatedStyle(() => ({
    width: `${happinessAnim.value}%`,
  }));

  const taskProgressBarStyle = useAnimatedStyle(() => ({
    width: `${taskProgressAnim.value}%`,
  }));

  const profitAnimatedProps = useAnimatedProps(() => {
    return {
      text: `₱${Math.floor(profitAnim.value).toLocaleString()}`,
    } as any;
  });

  // Apply periodic happiness bonuses for good weather and positive profit on mount
  useEffect(() => {
    let bonus = 0;
    // Good weather bonus (Sun or Cloud)
    if (weather.condition === 'sun' || weather.condition === 'cloud') {
      bonus += 1.5;
    }
    // Positive profit bonus
    if (isProfitPositive) {
      bonus += 1.0;
    }

    if (bonus > 0) {
      // Small delay to ensure store is ready and doesn't interfere with hydration
      const timer = setTimeout(() => {
        plant.updateHappiness(bonus);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isProfitPositive, plant, weather.condition]);

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

  const plantImages: Record<string, any> = {
    'tree.png': require('../../assets/tree.png'),
    'sprout.svg': require('../../assets/lucide/sprout.svg'),
  };

  return (
    <View className="flex-1 bg-[#f9fafa]" style={{ paddingTop: insets.top, paddingBottom: 100 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={[fadeStyle, { flex: 1 }]}>
          <View className="px-4">
            {/* Plant Happiness Bar */}
            <View className="mx-auto mt-16 w-[200px] flex-row items-center justify-center gap-2">
              <MaterialCommunityIcons name="emoticon-sad-outline" size={18} color="#7c7a65" />
              <View className="relative h-3 flex-1 overflow-hidden rounded-full bg-[#d3d3ca]">
                <Animated.View
                  style={[
                    {
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                    },
                    happinessBarStyle,
                  ]}>
                  <Svg width="100%" height="100%" preserveAspectRatio="none">
                    <Defs>
                      <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <Stop offset="0%" stopColor="#a3e540" />
                        <Stop offset="100%" stopColor="#e1f6c0" />
                      </LinearGradient>
                    </Defs>
                    <Rect width="1000" height="100%" fill="url(#grad1)" />
                  </Svg>
                </Animated.View>
              </View>
              <MaterialCommunityIcons name="emoticon-happy-outline" size={18} color="#71ac17" />
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
                    source={plantImages[plant.petImage] || require('../../assets/tree.png')}
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
                <Text className="font-geist text-base font-medium text-white">{plant.name}</Text>
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
                    <Text className="font-geist text-3xl text-[#49561f]">
                      {completedDailyTasks}
                    </Text>
                    <Text className="font-geist text-base text-[#698312]">/{totalDailyTasks}</Text>
                    <Text className="ml-1 font-geist text-xs text-[#49561f]">Completed Today</Text>
                  </View>
                  <View className="h-2 w-full overflow-hidden rounded-full bg-white/30">
                    <Animated.View
                      style={[
                        {
                          height: '100%',
                          backgroundColor: '#49561f',
                        },
                        taskProgressBarStyle,
                      ]}
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
                    <AnimatedTextInput
                      editable={false}
                      underlineColorAndroid="transparent"
                      animatedProps={profitAnimatedProps}
                      className={`font-geist text-[20px] font-bold ${isProfitPositive ? 'text-[#454b32]' : 'text-[#C85A5A]'}`}
                    />
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
        </Animated.View>
      </ScrollView>
    </View>
  );
}
