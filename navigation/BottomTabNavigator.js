/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useColorScheme } from 'react-native';

import Colors from '../constants/Colors';
import TimeScreen from '../tabs/time/TimeScreen';
import DevScreen from '../tabs/dev/DevScreen';
import GroupchatOutput from '../tabs/groupchat/GroupchatOutput';
import WishlistOutput from '../tabs/wishlist/WishlistOutput';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Chat"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Chat"
        component={GroupchatNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="chatbox-outline" color={color} size={30} style={{ marginBottom: -3 }} />,
        }}
      />
      <BottomTab.Screen 
        name="Wishlist"
        component={WishlistNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="gift" color={color} size={30} style={{ marginBottom: -3 }}/>,
        }}
      />
      <BottomTab.Screen
        name="Dev"
        component={DevNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="ios-code" color={color} size={30} style={{ marginBottom: -3 }} />,        }}
      />
      <BottomTab.Screen
        name="Time"
        component={TimeNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="timer-sand-empty" color={color} size={30} style={{ marginBottom: -3 }}/>,
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TimeStack = createStackNavigator();

function TimeNavigator() {
  return (
    <TimeStack.Navigator>
      <TimeStack.Screen
        name="TimeScreen"
        component={TimeScreen}
        options={{ headerTitle: `\u03C6time` }}
      />
    </TimeStack.Navigator>
  );
}

const DevStack = createStackNavigator();

function DevNavigator() {
  return (
    <DevStack.Navigator>
      <DevStack.Screen
        name="DevScreen"
        component={DevScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </DevStack.Navigator>
  );
}

const GroupchatStack = createStackNavigator();

function GroupchatNavigator() {
  return (
    <GroupchatStack.Navigator>
      <GroupchatStack.Screen
        name="GroupchatOutput"
        component={GroupchatOutput}
        options={{ headerTitle: 'Group Chat' }}
      />
    </GroupchatStack.Navigator>
  )
}

const WishlistStack = createStackNavigator();

function WishlistNavigator() {
  return (
    <WishlistStack.Navigator>
      <WishlistStack.Screen 
        name="Wishlist"
        component={WishlistOutput}
        option={{ headerTitle: 'Wishlist' }}
      />
    </WishlistStack.Navigator>
  )
}