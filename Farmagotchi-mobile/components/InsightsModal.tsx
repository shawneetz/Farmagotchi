import React, { useMemo } from 'react';
import { Modal, View, Text, Pressable, ScrollView } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useTaskStore, useFinanceStore, useInsightsModal } from '../lib/stores';

export default function InsightsModal() {
  const visible = useInsightsModal((state) => state.visible);
  const close = useInsightsModal((state) => state.close);

  const tasks = useTaskStore((state) => state.tasks);
  const transactions = useFinanceStore((state) => state.transactions);

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

    // General Health Stub
    insights.push('Soil moisture levels are within optimal range for Mangoes.');

    return insights;
  }, [completedDailyTasks, totalDailyTasks, netProfit]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={close}>
      <View className="absolute inset-0">
        <Pressable className="absolute inset-0 bg-neutral-900/40" onPress={close} />

        <View className="absolute bottom-0 w-full rounded-t-[36px] bg-white px-6 pb-10 pt-4 shadow-2xl">
          {/* Handle/Close Bar */}
          <View className="mb-6 items-center">
            <View className="h-1.5 w-12 rounded-full bg-neutral-200" />
          </View>

          <View className="mb-6 flex-row items-center justify-between">
            <View>
              <Text className="font-geist text-2xl font-bold text-[#28292f]">Mango tree</Text>
              <Text className="font-geist text-sm text-[#71ac17]">Healthy • Growth Stage 3</Text>
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

            {/* Health Scan Stub */}
            <View className="mb-8 flex-row items-center justify-between rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-xl border border-neutral-100 bg-white">
                  <Feather name="camera" size={20} color="#71ac17" />
                </View>
                <View>
                  <Text className="font-geist text-sm font-bold text-[#28292f]">Recent Scan</Text>
                  <Text className="font-geist text-xs text-neutral-500">
                    2 days ago • All optimal
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#ccc" />
            </View>
          </ScrollView>

          {/* Action Button */}
          <Pressable
            className="w-full flex-row items-center justify-center gap-2 rounded-2xl bg-[#71ac17] py-4 shadow-sm"
            onPress={() => {
              close();
              // Future navigation to Chat
            }}>
            <MaterialCommunityIcons name="chat-processing-outline" size={22} color="white" />
            <Text className="font-geist text-base font-bold text-white">Chat with your crop</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
