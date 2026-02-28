import React from 'react';
import { Modal, View, Text, Pressable, ScrollView } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useScanStore } from '../lib/stores';

export default function ScanAnalysisModal() {
  const recentScan = useScanStore((state) => state.recentScan);
  const clearRecentScan = useScanStore((state) => state.clearRecentScan);

  if (!recentScan) return null;

  const getHealthStatus = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: '#71ac17' };
    if (score >= 60) return { label: 'Good', color: '#8eda1e' };
    if (score >= 40) return { label: 'Fair', color: '#f59e0b' };
    return { label: 'Poor', color: '#ef4444' };
  };

  const status = getHealthStatus(recentScan.healthScore);

  return (
    <Modal
      visible={!!recentScan}
      transparent
      animationType="fade"
      onRequestClose={clearRecentScan}>
      <View className="absolute inset-0">
        <Pressable className="absolute inset-0 bg-neutral-900/40" onPress={clearRecentScan} />

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
              <Text className="font-geist text-2xl font-bold text-[#28292f]">Analysis Result</Text>
              <Text className="font-geist text-sm text-neutral-500">
                {new Date(recentScan.createdAt).toLocaleString()}
              </Text>
            </View>
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-full bg-neutral-100"
              onPress={clearRecentScan}>
              <MaterialCommunityIcons name="close" size={24} color="#28292f" />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="max-h-[500px]">
            {/* Image Preview */}
            <View className="mb-6 h-48 w-full overflow-hidden rounded-2xl bg-neutral-100">
              <Image source={{ uri: recentScan.imageUrl }} style={{ flex: 1 }} contentFit="cover" />
            </View>

            {/* Health Score & Happiness Impact */}
            <View className="mb-6 flex-row gap-4">
              <View className="flex-1 rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
                <Text className="mb-1 font-geist text-xs uppercase text-neutral-500">
                  Health Score
                </Text>
                <View className="flex-row items-end gap-1">
                  <Text className="font-geist text-3xl font-bold text-[#28292f]">
                    {recentScan.healthScore}
                  </Text>
                  <Text className="mb-1 font-geist text-sm text-neutral-400">/100</Text>
                </View>
                <Text className="font-geist text-xs font-bold" style={{ color: status.color }}>
                  {status.label}
                </Text>
              </View>
              <View className="flex-1 rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
                <Text className="mb-1 font-geist text-xs uppercase text-neutral-500">
                  Happiness
                </Text>
                <View className="flex-row items-center gap-2">
                  <MaterialCommunityIcons
                    name={recentScan.happinessImpact >= 0 ? 'emoticon-happy' : 'emoticon-sad'}
                    size={24}
                    color={recentScan.happinessImpact >= 0 ? '#71ac17' : '#ef4444'}
                  />
                  <Text
                    className="font-geist text-2xl font-bold"
                    style={{ color: recentScan.happinessImpact >= 0 ? '#71ac17' : '#ef4444' }}>
                    {recentScan.happinessImpact >= 0 ? '+' : ''}
                    {recentScan.happinessImpact}
                  </Text>
                </View>
                <Text className="font-geist text-[10px] text-neutral-400">Impact on crop</Text>
              </View>
            </View>

            {/* Anomalies */}
            {recentScan.anomalies.length > 0 && (
              <View className="mb-6 rounded-2xl border border-[#fee2e2] bg-[#fef2f2] p-5">
                <View className="mb-3 flex-row items-center gap-2">
                  <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#ef4444" />
                  <Text className="font-geist text-base font-bold text-[#991b1b]">
                    Detected Anomalies
                  </Text>
                </View>
                {recentScan.anomalies.map((anomaly, index) => (
                  <View key={index} className="mb-2 flex-row gap-2">
                    <Text className="text-[#ef4444]">•</Text>
                    <Text className="flex-1 font-geist text-sm text-[#7f1d1d]">{anomaly}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* AI Tips */}
            <View className="mb-8 rounded-2xl border border-[#e1f6c0] bg-[#f4fce3] p-5">
              <View className="mb-3 flex-row items-center gap-2">
                <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color="#71ac17" />
                <Text className="font-geist text-base font-bold text-[#454b31]">
                  AI Recommendations
                </Text>
              </View>
              {recentScan.tips.map((tip, index) => (
                <View key={index} className="mb-2 flex-row gap-2">
                  <Text className="text-[#71ac17]">•</Text>
                  <Text className="flex-1 font-geist text-sm text-[#575647]">{tip}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Action Button */}
          <Pressable
            className="w-full rounded-2xl bg-primary-700 py-4 shadow-sm"
            onPress={clearRecentScan}>
            <Text className="text-center font-geist text-base font-bold text-white">
              Got it, thanks!
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}
