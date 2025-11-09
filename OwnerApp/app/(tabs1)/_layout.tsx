import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link, router, Tabs} from 'expo-router';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Button, ButtonText} from "@/components/ui/button";


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
          headerLeft: () => <Button className="mx-3" onPress={() => router.back()}><FontAwesome name={"home"} size={24} color={"white"}/></Button>,
          title: 'Porudžbine',
          tabBarIcon: ({ color }) => <TabBarIconMaterial name="order-bool-descending-variant" color={color} />,
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          headerLeft: () => <Button className="mx-3" onPress={() => router.back()}><FontAwesome name={"home"} size={24} color={"white"}/></Button>,
          title: 'Maloprodaje',
          tabBarIcon: ({ color }) => <TabBarIconMaterial name="store" color={color} />,
        }}
      />
      <Tabs.Screen
        name="new_internal_order"
        options={{
          headerLeft: () => <Button className="mx-3" onPress={() => router.back()}><FontAwesome name={"home"} size={24} color={"white"}/></Button>,
          title: 'Upiši porudžbinu',
          tabBarIcon: ({ color }) => <TabBarIcon name="pencil-square-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          headerLeft: () => <Button className="mx-3" onPress={() => router.back()}><FontAwesome name={"home"} size={24} color={"white"}/></Button>,
          title: 'Artikli',
          tabBarIcon: ({ color }) => <TabBarIconMaterial name="shopping-outline" color={color} />,
        }}
      />
    
    </Tabs>
  );
}
