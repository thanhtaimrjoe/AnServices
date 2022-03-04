import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import PersonalContainer from '../container/personal/main/PersonalContainer';
import Color from '../style/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ListStack from './ListStack';
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
          tabBarActiveTintColor: Color.second,
          tabBarInactiveTintColor: Color.primary,
          tabBarLabel: 'Trang chủ',
          tabBarLabelStyle: {fontSize: 14},
        }}
      />
      <Tab.Screen
        name="ListStack"
        component={ListStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="exclamation-triangle" size={26} color={color} />
          ),
          tabBarActiveTintColor: Color.second,
          tabBarInactiveTintColor: Color.primary,
          tabBarLabel: 'Unknown',
          tabBarLabelStyle: {fontSize: 14},
        }}
      />
      <Tab.Screen
        name="PersonalContainer"
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
    </Tab.Navigator>
  );
}
