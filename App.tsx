import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen       from './src/screens/HomeScreen';
import DetailScreen     from './src/screens/DetailScreen';
import ChatScreen       from './src/screens/ChatScreen';
import SellScreen       from './src/screens/SellScreen';
import ProfileScreen    from './src/screens/ProfileScreen';
import SpotsScreen      from './src/screens/SpotsScreen';
import SearchScreen     from './src/screens/SearchScreen';
import ConditionsScreen from './src/screens/ConditionsScreen';
import AccountsScreen   from './src/screens/AccountsScreen';
import RegisterScreen   from './src/screens/RegisterScreen';
import { COLORS }       from './src/data/constants';

const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home"   component={HomeScreen}   />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Chat"   component={ChatScreen}   />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Chat"   component={ChatScreen}   />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile"    component={ProfileScreen}    />
      <Stack.Screen name="Conditions" component={ConditionsScreen} />
      <Stack.Screen name="Accounts"   component={AccountsScreen}   />
      <Stack.Screen name="Register"   component={RegisterScreen}   />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'rgba(7,7,16,0.97)',
            borderTopColor: 'rgba(255,255,255,0.06)',
            borderTopWidth: 1,
            height: 70,
            paddingBottom: 10,
          },
          tabBarActiveTintColor: COLORS.gold,
          tabBarInactiveTintColor: 'rgba(255,255,255,0.3)',
          tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
          tabBarIcon: ({ focused }) => {
            const icons: Record<string, string> = {
              HomeTab: '🏠', SearchTab: '🔍', Sell: '➕', Spots: '📍', ProfileTab: '👤',
            };
            return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.4 }}>{icons[route.name]}</Text>;
          },
        })}
      >
        <Tab.Screen name="HomeTab"    component={HomeStack}    options={{ title: 'INICIO'  }} />
        <Tab.Screen name="SearchTab"  component={SearchStack}  options={{ title: 'BUSCAR'  }} />
        <Tab.Screen name="Sell"       component={SellScreen}   options={{ title: 'VENDER'  }} />
        <Tab.Screen name="Spots"      component={SpotsScreen}  options={{ title: 'SPOTS'   }} />
        <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ title: 'PERFIL'  }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}