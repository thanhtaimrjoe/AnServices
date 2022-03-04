import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeStack from './HomeStack';
import ListStack from './ListStack';
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
          tabBarActiveTintColor: Color.second,
          tabBarInactiveTintColor: Color.primary,
          tabBarLabel: 'Trang chủ',
          tabBarLabelStyle: {fontSize: 14},
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
          tabBarActiveTintColor: Color.second,
          tabBarInactiveTintColor: Color.primary,
          tabBarLabel: 'Xem yêu cầu',
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
