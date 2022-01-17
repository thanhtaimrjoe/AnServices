import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeContainer from '../containers/home/HomeContainer';
import RequestServiceContainer from '../containers/home/RequestServiceContainer';
import {styles} from '../styles/HeaderStyle';
import Color from '../styles/Color';
const Stack = createNativeStackNavigator();
export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeContainer"
        component={HomeContainer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RequestServiceContainer"
        component={RequestServiceContainer}
        options={{
          headerTitle: 'Yêu cầu dịch vụ',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
        }}
      />
    </Stack.Navigator>
  );
}
