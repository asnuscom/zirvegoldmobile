import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '../components/HapticTab';
import { IconSymbol } from '../components/ui/IconSymbol';
import TabBarBackground from '../components/ui/TabBarBackground';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="orders/index"
        options={{
          title: 'Siparişler',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="shopping_cart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="newOrder/index"
        options={{
          title: 'Yeni sipariş',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="add_shopping_cart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orderDetail/index"
        options={{
          
          title: 'Sipariş Detayı',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="shopping_bag" color={color} />,
        }}
        redirect={false}
      />
      <Tabs.Screen
        name="customers/index"
        options={{
          title: 'Müşteriler',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="people" color={color} />,
        }}
      />
            <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person_3" color={color} />,
        }}
      />

    </Tabs>
  );
}
