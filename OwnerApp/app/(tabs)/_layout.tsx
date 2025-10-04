import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import {MaterialCommunityIcons} from "@expo/vector-icons";


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconMaterial(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Porudžbine',
          tabBarIcon: ({ color }) => <TabBarIconMaterial name="order-bool-descending-variant" color={color} />,
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          title: 'Kupci',
          tabBarIcon: ({ color }) => <TabBarIconMaterial name="human-queue" color={color} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Artikli',
          tabBarIcon: ({ color }) => <TabBarIconMaterial name="shopping-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="discounts"
        options={{
          title: 'Popusti',
          tabBarIcon: ({ color }) => <TabBarIconMaterial name="sale-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
