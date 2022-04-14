import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import Color from '../style/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PersonalStack from './PersonalStack';
const Tab = createBottomTabNavigator();
export default function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => <Icon name="home" size={26} color={color} />,
          tabBarActiveTintColor: Color.primary,
          tabBarInactiveTintColor: Color.second,
          tabBarLabel: 'Trang chủ',
          tabBarLabelStyle: {fontSize: 14},
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="PersonalStack"
        component={PersonalStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="user-alt" size={26} color={color} />
          ),
          tabBarActiveTintColor: Color.primary,
          tabBarInactiveTintColor: Color.second,
          tabBarLabel: 'Cá nhân',
          tabBarLabelStyle: {fontSize: 14},
          tabBarHideOnKeyboard: true,
        }}
      />
    </Tab.Navigator>
  );
}
