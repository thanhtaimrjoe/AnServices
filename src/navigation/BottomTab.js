import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeStack from './HomeStack';
import ListStack from './ListStack';
import PersonalStack from './PersonalStack';
import PersonalContainer from '../containers/personal/main/PersonalContainer';
import Color from '../style/Color';

const Stack = createBottomTabNavigator();
export default function BottomTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
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
      <Stack.Screen
        name="List"
        component={ListStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="tools" size={26} color={color} />
          ),
          tabBarActiveTintColor: Color.primary,
          tabBarInactiveTintColor: Color.second,
          tabBarLabel: 'Xem yêu cầu',
          tabBarLabelStyle: {fontSize: 14},
          tabBarHideOnKeyboard: true,
        }}
      />
      <Stack.Screen
        name="Personal"
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
    </Stack.Navigator>
  );
}
