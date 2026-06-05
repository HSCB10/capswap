import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path, Circle, Line } from 'react-native-svg';

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

const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const RED   = '#FF3030';
const BG    = '#0F0F0F';

// ── SVG ICONS ──────────────────────────────────────────────────────────────

function IconMarket({ active }: { active: boolean }) {
  const c = active ? '#fff' : '#444';
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <Line x1="3" y1="6" x2="21" y2="6" stroke={c} strokeWidth={2} strokeLinecap="round"/>
      <Path d="M16 10a4 4 0 01-8 0" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

function IconSearch({ active }: { active: boolean }) {
  const c = active ? '#fff' : '#444';
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="8" stroke={c} strokeWidth={2}/>
      <Line x1="21" y1="21" x2="16.65" y2="16.65" stroke={c} strokeWidth={2} strokeLinecap="round"/>
    </Svg>
  );
}

function IconSpots({ active }: { active: boolean }) {
  const c = active ? '#fff' : '#444';
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <Circle cx="12" cy="10" r="3" stroke={c} strokeWidth={2}/>
    </Svg>
  );
}

function IconProfile({ active }: { active: boolean }) {
  const c = active ? '#fff' : '#444';
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <Circle cx="12" cy="7" r="4" stroke={c} strokeWidth={2}/>
    </Svg>
  );
}

function IconPublish() {
  return (
    <View style={styles.publishBtn}>
      <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
        <Line x1="12" y1="5" x2="12" y2="19" stroke="#fff" strokeWidth={2.5} strokeLinecap="round"/>
        <Line x1="5" y1="12" x2="19" y2="12" stroke="#fff" strokeWidth={2.5} strokeLinecap="round"/>
      </Svg>
    </View>
  );
}

// ── STACKS ─────────────────────────────────────────────────────────────────

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

// ── APP ────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarLabel: ({ focused }) => {
            const labels: Record<string, string> = {
              HomeTab: 'Mercado', SearchTab: 'Buscar',
              Sell: 'Publicar', Spots: 'Spots', ProfileTab: 'Perfil',
            };
            return (
              <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
                {labels[route.name]}
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            if (route.name === 'HomeTab')    return <IconMarket  active={focused} />;
            if (route.name === 'SearchTab')  return <IconSearch  active={focused} />;
            if (route.name === 'Sell')       return <IconPublish />;
            if (route.name === 'Spots')      return <IconSpots   active={focused} />;
            if (route.name === 'ProfileTab') return <IconProfile active={focused} />;
            return null;
          },
        })}
      >
        <Tab.Screen name="HomeTab"    component={HomeStack}    />
        <Tab.Screen name="SearchTab"  component={SearchStack}  />
        <Tab.Screen name="Sell"       component={SellScreen}   />
        <Tab.Screen name="Spots"      component={SpotsScreen}  />
        <Tab.Screen name="ProfileTab" component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: BG,
    borderTopColor: 'rgba(255,255,255,0.06)',
    borderTopWidth: 1,
    height: 72,
    paddingBottom: 12,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#444',
    letterSpacing: 0.3,
    marginTop: 4,
  },
  tabLabelActive: { color: '#fff' },
  publishBtn: {
    width: 48,
    height: 48,
    backgroundColor: RED,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: RED,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});