import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import {FontAwesome6, Ionicons} from "@expo/vector-icons";
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';


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

export default function TabLayout() {

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
          headerRight: () => (
            <Link href="/cart" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Card 
                    variant="outline"
                    className={`m-3 p-3 ${pressed && "opacity-50"}`}
                  >
                    <HStack>
                      <Text>
                        Korpa
                      </Text>
                      <FontAwesome
                        name="shopping-cart"
                        size={20}
                        className="ml-2"
                      />
                    </HStack>
                  </Card>
                  
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <TabBarIconIonicons name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
