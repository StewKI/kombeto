import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import {FontAwesome6, Ionicons} from "@expo/vector-icons";
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import {CartCountSum, useCartStore} from "@/services/state/CartState";


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome6>['name'];
  color: string;
}) {
  return <FontAwesome6 size={20} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconIonicons(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={20} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconFontAwesome(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  
  const {cartItems} = useCartStore();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00ac42',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Kombeto',
          tabBarIcon: ({ color }) => <TabBarIcon name="shop" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Pretraga',
          tabBarIcon: ({ color }) => <TabBarIconIonicons name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Korpa',
          tabBarBadge: cartItems.length > 0 ? CartCountSum(cartItems) : undefined,
          tabBarIcon: ({ color }) => <TabBarIconFontAwesome name="shopping-cart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Moj nalog',
          tabBarIcon: ({ color }) => <TabBarIconIonicons name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
