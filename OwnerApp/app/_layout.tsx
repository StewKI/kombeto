import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';


import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    
    <GluestackUIProvider mode="light">
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="home" options={{ presentation: "modal", headerTitle: "Kombeto uprava"}} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs1)" options={{ headerShown: false }} />
          <Stack.Screen name="new_customer" options={{ presentation: "modal", headerTitle: "Novi kupac"}} />
          <Stack.Screen name="new_customer_internal" options={{ presentation: "modal", headerTitle: "Nova maloprodaja"}} />
          <Stack.Screen name="edit_customer" options={{ presentation: "modal", headerTitle: "Izmeni kupca"}} />
          <Stack.Screen name="edit_customer_internal" options={{ presentation: "modal", headerTitle: "Izmeni maloprodaju"}} />
          <Stack.Screen name="new_product" options={{ presentation: "modal", headerTitle: "Novi artikal"}} />
          <Stack.Screen name="edit_product" options={{ presentation: "modal", headerTitle: "Izmeni artikal"}} />
          <Stack.Screen name="order" options={{ presentation: "modal", headerTitle: "Porudžbina"}} />
          <Stack.Screen name="write_order" options={{ presentation: "modal", headerTitle: "Upiši porudžbinu"}} />
          <Stack.Screen name="new_discount" options={{ presentation: "modal", headerTitle: "Novi popust"}} />
          <Stack.Screen name="edit_discount" options={{ presentation: "modal", headerTitle: "Izmeni popust"}} />
          <Stack.Screen name="edit_discount_products" options={{ presentation: "modal", headerTitle: "Izmeni artikle u popustu"}} />
        </Stack>
      </ThemeProvider>
    </GluestackUIProvider>
  
  );
}
