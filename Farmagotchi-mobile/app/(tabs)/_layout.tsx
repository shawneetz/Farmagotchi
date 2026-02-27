import { Tabs } from 'expo-router';
import { View, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
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
              className="items-center justify-center"
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: focused ? '#e1f6c0' : 'transparent',
              }}>
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
              className="items-center justify-center"
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: focused ? '#e1f6c0' : 'transparent',
              }}>
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
            <View
              className="items-center justify-center"
              style={{
                width: 58,
                height: 58,
                borderRadius: 29,
                backgroundColor: '#a3e540',
                marginBottom: 4, // Aligns better visually within the 66px bar
              }}>
              <MaterialCommunityIcons name="plus" size={32} color="#1d1b20" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          title: 'Finance',
          tabBarIcon: ({ focused }) => (
            <View
              className="items-center justify-center"
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: focused ? '#e1f6c0' : 'transparent',
              }}>
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
              className="items-center justify-center"
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: focused ? '#e1f6c0' : 'transparent',
              }}>
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
  );
}
