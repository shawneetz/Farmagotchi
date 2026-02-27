import { Tabs } from 'expo-router';
import { View, Platform } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 24 : 16,
          left: 16,
          right: 16,
          backgroundColor: '#ffffff',
          borderRadius: 33,
          height: 66,
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: '#d3d3ca',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 14.9,
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => (
            <View className={`p-3 rounded-full ${focused ? 'bg-[#e1f6c0]' : 'bg-transparent'}`}>
              <Feather name="home" size={24} color="#1d1b20" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="plots"
        options={{
          title: 'Plots',
          tabBarIcon: ({ focused }) => (
            <View className={`p-3 rounded-full ${focused ? 'bg-[#e1f6c0]' : 'bg-transparent'}`}>
              <MaterialCommunityIcons name="sprout" size={24} color="#1d1b20" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ focused }) => (
            <View className="bg-[#a3e540] rounded-[30px] shadow-sm items-center justify-center" style={{ marginTop: -20, width: 60, height: 60 }}>
              <Feather name="plus" size={30} color="#1d1b20" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          title: 'Finance',
          tabBarIcon: ({ focused }) => (
            <View className={`p-3 rounded-full ${focused ? 'bg-[#e1f6c0]' : 'bg-transparent'}`}>
              <MaterialCommunityIcons name="currency-usd" size={24} color="#1d1b20" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ focused }) => (
            <View className={`p-3 rounded-full ${focused ? 'bg-[#e1f6c0]' : 'bg-transparent'}`}>
              <Feather name="camera" size={24} color="#1d1b20" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          href: null, // Hide chat from the floating tab bar
        }}
      />
    </Tabs>
  );
}