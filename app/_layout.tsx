import { Stack, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
import SettingsDrawer from '../components/SettingsDrawer';

interface SettingsButtonProps {
  onPress: () => void;
}

const SettingsButton = ({ onPress }: SettingsButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 16 }}>
      <Feather name="settings" size={24} color="#ECD182" />
    </TouchableOpacity>
  );
};

const FeedTitle = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('../assets/images/Icaros-branco.png')}
        style={{ width: 30, height: 30, marginRight: 10 }}
        resizeMode="contain"
      />
      <Text style={{ color: '#ECD182', fontSize: 24, fontWeight: 'bold', letterSpacing: 1 }}>
        Icaros
      </Text>
    </View>
  );
};

export default function RootLayout() {
  const router = useRouter();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    setDrawerOpen(false);
    router.replace('/');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1 }}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#ECD182",
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            contentStyle: { backgroundColor: "#000" },
            animation: "default",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 16 }}>
                <Ionicons name="arrow-back" size={24} color="#ECD182" />
              </TouchableOpacity>
            ),
          }}
        >
          <Stack.Screen name="splash" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="pages/auth/CadastroScreen" options={{ title: '' }} />
          <Stack.Screen name="pages/auth/login" options={{ title: '' }} />

          <Stack.Screen
            name="pages/profile/index"
            options={{
              title: 'Perfil',
              headerTitleStyle: {
                fontSize: 22,
                fontWeight: 'bold',
              },
              animation: "slide_from_right",
              headerRight: () => <SettingsButton onPress={() => setDrawerOpen(true)} />,
              headerBackVisible: false,
              headerLeft: () => null,
            }}
          />

          <Stack.Screen
            name="pages/feed/feed"
            options={({ navigation }: { navigation: any }) => {
              const state = navigation.getState();
              const routes = state.routes;
              const previousRoute = routes.length > 1 ? routes[routes.length - 2] : null;
              const previousRouteName = previousRoute ? previousRoute.name : null;

              return {
                headerTitle: () => <FeedTitle />,
                headerBackVisible: false,
                headerLeft: () => null,
                headerTitleAlign: 'left',
                animation: previousRouteName === 'pages/profile/index' 
                  ? "slide_from_left" 
                  : "default",
              };
            }}
          />
        </Stack>

        <SettingsDrawer
          isVisible={isDrawerOpen}
          onClose={() => setDrawerOpen(false)}
          onLogout={handleLogout}
        />
      </View>
    </SafeAreaView>
  );
}

