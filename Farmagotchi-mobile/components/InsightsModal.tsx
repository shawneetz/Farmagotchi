import React, { useMemo } from 'react';
import { Modal, View, Text, Pressable, ScrollView } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useTaskStore,
  useFinanceStore,
  useInsightsModal,
  useWeatherStore,
  useScanStore,
  usePlantStore,
} from '../lib/stores';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function InsightsModal() {
  const {bottom: bottomInset} = useSafeAreaInsets();
  const router = useRouter();
  const visible = useInsightsModal((state) => state.visible);
  const close = useInsightsModal((state) => state.close);

  const tasks = useTaskStore((state) => state.tasks);
  const transactions = useFinanceStore((state) => state.transactions);
  const weather = useWeatherStore();
  const { scans, setRecentScan } = useScanStore();
  const plant = usePlantStore();

  const dailyTasks = tasks.filter((t) => t.category === 'daily');
  const completedDailyTasks = dailyTasks.filter((t) => t.isCompleted).length;
  const totalDailyTasks = dailyTasks.length;

  const netProfit = transactions.reduce(
    (acc, curr) => (curr.type === 'income' ? acc + curr.cost : acc - curr.cost),
    0
  );

  const aiInsights = useMemo(() => {
    const insights = [];

    // Task Insight
    if (totalDailyTasks > 0) {
      if (completedDailyTasks === totalDailyTasks) {
        insights.push('Looking healthy! All daily care routines completed.');
      } else {
        insights.push("Some daily tasks are pending. Don't forget to water me!");
      }
    }

    // Profit Insight
    if (netProfit > 0) {
      insights.push('Your crop is currently profitable. Keep it up!');
    } else if (netProfit < 0) {
      insights.push('Expenses are exceeding income. Review your resource spending.');
    }

    // Weather Insight
    if (weather.condition.includes('rain')) {
      insights.push(`It's raining in ${weather.location}. Natural hydration for me!`);
    } else if (weather.highTemp > 32) {
      insights.push(`It's getting hot today (${weather.highTemp}°C). Keep an eye on my soil.`);
    } else {
      insights.push(`The weather in ${weather.location} is great for my growth.`);
    }

    // Scan Insight
    if (scans.length > 0) {
      const lastScan = scans[0];
      if (lastScan.healthScore > 80) {
        insights.push(`My last scan was excellent (${lastScan.healthScore}/100).`);
      } else if (lastScan.healthScore < 60) {
        insights.push(`The last scan showed some concerns. Please check my tips!`);
      }
      if (lastScan.anomalies.length > 0) {
        insights.push(`Warning: ${lastScan.anomalies[0]} detected in recent analysis.`);
      }
    } else {
      insights.push("I haven't been scanned recently. A quick check-up would be nice!");
    }

    return insights;
  }, [
    completedDailyTasks,
    totalDailyTasks,
    netProfit,
    weather.condition,
    weather.highTemp,
    weather.location,
    scans,
  ]);

  const getTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const latestScan = scans.length > 0 ? scans[0] : null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={close}>
      <View className="absolute inset-0" style={{
        paddingBottom: bottomInset
      }}>
        <Pressable className="absolute inset-0 bg-neutral-900/40" onPress={close} />

        <Animated.View
          entering={SlideInDown.duration(300)}
          exiting={SlideOutDown.duration(300)}
          className="absolute bottom-0 w-full rounded-t-[36px] bg-white px-6 pb-10 pt-4 shadow-2xl">
          {/* Handle/Close Bar */}
          <View className="mb-6 items-center">
            <View className="h-1.5 w-12 rounded-full bg-neutral-200" />
          </View>

          <View className="mb-6 flex-row items-center justify-between">
            <View>
              <Text className="font-geist text-2xl font-bold text-[#28292f]">{plant.name}</Text>
              <Text className="font-geist text-sm text-[#71ac17]">
                Healthy • {Math.round(plant.happiness)}% Happiness
              </Text>
            </View>
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-full bg-neutral-100"
              onPress={close}>
              <MaterialCommunityIcons name="close" size={24} color="#28292f" />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="max-h-[400px]">
            {/* AI Status Report */}
            <View className="mb-6 rounded-2xl border border-[#e1f6c0] bg-[#f4fce3] p-5">
              <View className="mb-3 flex-row items-center gap-2">
                <MaterialCommunityIcons name="robot" size={20} color="#71ac17" />
                <Text className="font-geist text-base font-bold text-[#454b31]">
                  AI Status Report
                </Text>
              </View>
              {aiInsights.map((insight, index) => (
                <View key={index} className="mb-2 flex-row gap-2">
                  <Text className="text-[#71ac17]">•</Text>
                  <Text className="flex-1 font-geist text-sm text-[#575647]">{insight}</Text>
                </View>
              ))}
            </View>

            {/* Quick Stats Grid */}
            <View className="mb-6 flex-row gap-4">
              <View className="flex-1 rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
                <Text className="mb-1 font-geist text-xs uppercase text-neutral-500">Tasks</Text>
                <Text className="font-geist text-lg font-bold text-[#28292f]">
                  {completedDailyTasks}/{totalDailyTasks}
                </Text>
                <Text className="font-geist text-[10px] text-neutral-400">Completed today</Text>
              </View>
              <View className="flex-1 rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
                <Text className="mb-1 font-geist text-xs uppercase text-neutral-500">
                  Net Profit
                </Text>
                <Text className="font-geist text-lg font-bold text-[#28292f]">
                  ₱{netProfit.toLocaleString()}
                </Text>
                <Text className="font-geist text-[10px] text-neutral-400">Lifetime total</Text>
              </View>
            </View>

            {/* Health Scan Widget */}
            <Pressable
              onPress={() => {
                if (latestScan) {
                  close();
                  setRecentScan(latestScan);
                } else {
                  close();
                  router.push('/scan');
                }
              }}
              className="mb-8 flex-row items-center justify-between rounded-2xl border border-neutral-100 bg-neutral-50 p-4 active:bg-neutral-100">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-xl border border-neutral-100 bg-white">
                  <Feather name="camera" size={20} color="#71ac17" />
                </View>
                <View>
                  <Text className="font-geist text-sm font-bold text-[#28292f]">
                    {latestScan ? 'Recent Scan' : 'No Scan Data'}
                  </Text>
                  <Text className="font-geist text-xs text-neutral-500">
                    {latestScan
                      ? `${getTimeAgo(latestScan.createdAt)} • ${latestScan.healthScore}/100 Health`
                      : 'Take a photo for AI analysis'}
                  </Text>
                </View>
              </View>
              <Feather
                name={latestScan ? 'chevron-right' : 'plus'}
                size={20}
                color={latestScan ? '#ccc' : '#71ac17'}
              />
            </Pressable>
          </ScrollView>

          {/* Action Button */}
          <Pressable
            className="w-full overflow-hidden rounded-2xl shadow-sm"
            onPress={() => {
              close();
              router.push('/chat');
            }}>
            <LinearGradient
              colors={['#71ac17', '#8eda1e']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              className="flex-row items-center justify-center gap-2 py-4">
              <MaterialCommunityIcons name="chat-processing-outline" size={22} color="white" />
              <Text className="font-geist text-base font-bold text-white">Chat with your crop</Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}
