import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeStack from './HomeStack';
import ListRequestServiceContainer from '../containers/list/ListRequestServiceContainer';
import PersonalContainer from '../containers/personal/PersonalContainer';
import Color from '../styles/Color';

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
          tabBarActiveTintColor: Color.second,
          tabBarInactiveTintColor: Color.primary,
          tabBarLabel: 'Trang chủ',
          tabBarLabelStyle: {fontSize: 14},
        }}
      />
      <Stack.Screen
        name="List"
        component={ListRequestServiceContainer}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => <Icon name="list" size={26} color={color} />,
          tabBarActiveTintColor: Color.second,
          tabBarInactiveTintColor: Color.primary,
          tabBarLabel: 'Danh sách',
          tabBarLabelStyle: {fontSize: 14},
        }}
      />
      <Stack.Screen
        name="Personal"
        component={PersonalContainer}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="user-alt" size={26} color={color} />
          ),
          tabBarActiveTintColor: Color.second,
          tabBarInactiveTintColor: Color.primary,
          tabBarLabel: 'Cá nhân',
          tabBarLabelStyle: {fontSize: 14},
        }}
      />
    </Stack.Navigator>
  );
}
