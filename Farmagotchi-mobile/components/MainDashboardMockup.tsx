import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { verifyInstallation } from 'nativewind';
import { getLoadedFonts } from 'expo-font';

export default function MainDashboardMockup() {
  const insets = useSafeAreaInsets();
  verifyInstallation();
  const fonts = getLoadedFonts()
  console.log(fonts);
  // Simple idle animation for the pet
  // const translateY = useSharedValue(0);
  // const scaleY = useSharedValue(1);

  useEffect(() => {
    // translateY.value = withRepeat(
    //   withSequence(
    //     withTiming(-5, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
    //     withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
    //   ),
    //   -1,
    //   true
    // );
    // scaleY.value = withRepeat(
    //   withSequence(
    //     withTiming(0.98, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
    //     withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
    //   ),
    //   -1,
    //   true
    // );
  }, []);

  // const petStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ translateY: translateY.value }, { scaleY: scaleY.value }],
  //   };
  // });

  return (
    <View
      className="flex-1 bg-morning-mist"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: 16, gap: 24 }}
        className="flex-1">
        {/* Header Section */}
        <View className="flex-row items-center justify-between">
          <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-soft-clay">
            <Ionicons name="person-circle-outline" size={26} color="#4B3F35" />
          </Pressable>

          <Pressable className="flex-row items-center gap-2 rounded-full bg-soft-clay px-4 py-2">
            <Text className="text-lg font-bold text-rich-soil-brown" style={{fontFamily: "GeistPixel"
      }}>Tomato Patch</Text>
            <Ionicons name="chevron-down" size={16} color="#4B3F35" />
          </Pressable> 

          <Pressable className="relative h-10 w-10 items-center justify-center rounded-full bg-soft-clay">
            <Ionicons name="notifications" size={22} color="#4B3F35" />
            <View className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border border-soft-clay bg-sunlit-gold" />
          </Pressable>
        </View>

        {/* Quick Widgets */}
        <View className="gap-4">
          <Text className="px-1 text-lg font-bold text-rich-soil-brown">Overview</Text>

          <View className="flex-row gap-4">
            {/* Task Summary Widget */}
            <Pressable className="flex-1 rounded-3xl bg-soft-clay p-4" style={styles.softShadow}>
              <View className="mb-2 flex-row items-center gap-2">
                <Ionicons name="checkmark-circle" size={20} color="#4A7C59" />
                <Text className="font-bold text-rich-soil-brown" style={{fontFamily: "GeistPixel"
      }}>Tasks</Text>
              </View>
              <Text
                className="text-2xl font-bold text-rich-soil-brown"
                style={{ fontVariant: ['tabular-nums'] }}>
                2/4
              </Text>
              <Text className="text-xs text-rich-soil-brown/70">Completed Today</Text>
            </Pressable>

            {/* Health/Scan Widget */}
            <Pressable className="flex-1 rounded-3xl bg-soft-clay p-4" style={styles.softShadow}>
              <View className="mb-2 flex-row items-center gap-2">
                <MaterialCommunityIcons name="leaf" size={20} color="#7FB3D5" />
                <Text className="font-bold text-rich-soil-brown">Health</Text>
              </View>
              <Text
                className="text-2xl font-bold text-rich-soil-brown"
                style={{ fontVariant: ['tabular-nums'] }}>
                85%
              </Text>
              <Text className="flex-row items-center text-xs text-earthy-green">
                ↑ <Text className="text-xs text-earthy-green">Looking good</Text>
              </Text>
            </Pressable>
          </View>

          {/* Finance Widget */}
          <Pressable
            className="flex-row items-center justify-between rounded-3xl bg-soft-clay p-4"
            style={styles.softShadow}>
            <View className="gap-1">
              <View className="flex-row items-center gap-2">
                {/* <MaterialCommunityIcons name="currency-usd-circle" size={20} color="#F4D35E" /> */}
                <Text className="font-bold text-rich-soil-brown">Net Profit (Week)</Text>
              </View>
              <Text className="text-xs text-rich-soil-brown/70">
                Estimated from expenses vs market
              </Text>
            </View>
            <Text
              className="text-2xl font-bold text-earthy-green"
              style={{ fontVariant: ['tabular-nums'] }}>
              +$120
            </Text>
          </Pressable>

          {/* Daily Insights Widget */}
          <View className="gap-3">
            <Text className="px-1 text-lg font-bold text-rich-soil-brown">Daily Insights</Text>
            
            <View className="rounded-3xl bg-soft-clay p-4" style={styles.softShadow}>
              <View className="mb-4 flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <Ionicons name="sunny" size={28} color="#F4D35E" />
                  <View>
                    <Text className="text-lg font-bold text-rich-soil-brown">28°C</Text>
                    <Text className="text-xs text-rich-soil-brown/70">Mostly Sunny</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-xs font-bold text-rich-soil-brown">Humidity: 45%</Text>
                  <Text className="text-xs text-rich-soil-brown/70">Precipitation: 5%</Text>
                </View>
              </View>

              <View className="h-[1px] w-full bg-rich-soil-brown/10 mb-4" />

              <View className="gap-3">
                <View className="flex-row items-start gap-3">
                  <View className="mt-1 h-2 w-2 rounded-full bg-earthy-green" />
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-rich-soil-brown">Weekly Trend</Text>
                    <Text className="text-xs text-rich-soil-brown/70">Growth rate is 12% higher than last week. Great job!</Text>
                  </View>
                </View>
                
                <View className="flex-row items-start gap-3">
                  <View className="mt-1 h-2 w-2 rounded-full bg-sunlit-gold" />
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-rich-soil-brown">Daily Tip</Text>
                    <Text className="text-xs text-rich-soil-brown/70">Mulching today will help retain moisture during the afternoon heat.</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  softShadow: {
    // A soft, diffused, warm drop-shadow rather than harsh dark gray
    boxShadow: '0 4px 12px rgba(75, 63, 53, 0.08)',
  } as any,
});
