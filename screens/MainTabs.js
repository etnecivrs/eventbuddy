import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Home';
import PerfilScreen from './Perfil';
import FavoritosScreen from './Favoritos';
import { useTheme } from '../context/ThemeContext';
import { themeColors } from '../styles/styles';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { darkMode } = useTheme();
  const colors = darkMode ? themeColors.dark : themeColors.light;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Perfil') iconName = 'person';
          else if (route.name === 'Favoritos') iconName = 'heart';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.tabBackground,
        },
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.headerBackground,
        },
        headerTitleStyle: {
          color: colors.headerText,
        },
        headerTintColor: colors.headerText,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Favoritos"
        component={FavoritosScreen}
        options={{ title: 'Favoritos' }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}
