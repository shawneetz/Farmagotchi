import { Tabs } from 'expo-router';
import { View, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import OptionModal from '../../components/OptionModal';

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 40 : 24,
            marginHorizontal: 30,
            backgroundColor: '#ffffff',
            borderRadius: 33,
            height: 66,
            borderTopWidth: 0,
            elevation: 10,
            shadowColor: '#d3d3ca',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 15,
            paddingHorizontal: 12,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ focused }) => (
              <View
                className={`h-12 w-12 items-center justify-center rounded-full ${focused ? 'bg-primary-100' : 'bg-transparent'}`}>
                <MaterialCommunityIcons name="home-outline" size={26} color="#1d1b20" />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="plots"
          options={{
            title: 'Plots',
            tabBarIcon: ({ focused }) => (
              <View
                className={`h-12 w-12 items-center justify-center rounded-full ${focused ? 'bg-primary-100' : 'bg-transparent'}`}>
                <MaterialCommunityIcons name="sprout-outline" size={26} color="#1d1b20" />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            title: 'Tasks',
            tabBarIcon: () => (
              <View className="mb-1 h-[58px] w-[58px] items-center justify-center rounded-full bg-primary-500">
                <MaterialCommunityIcons name="plus" size={32} color="#1d1b20" />
              </View>
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setModalVisible(true);
            },
          }}
        />
        <Tabs.Screen
          name="finance"
          options={{
            title: 'Finance',
            tabBarIcon: ({ focused }) => (
              <View
                className={`h-12 w-12 items-center justify-center rounded-full ${focused ? 'bg-primary-100' : 'bg-transparent'}`}>
                <MaterialCommunityIcons name="currency-php" size={26} color="#1d1b20" />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="scan"
          options={{
            title: 'Scan',
            tabBarIcon: ({ focused }) => (
              <View
                className={`h-12 w-12 items-center justify-center rounded-full ${focused ? 'bg-primary-100' : 'bg-transparent'}`}>
                <MaterialCommunityIcons name="camera-outline" size={26} color="#1d1b20" />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            href: null,
          }}
        />
      </Tabs>

      <OptionModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
}
