import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeContainer from '../containers/home/main/HomeContainer';
import ServiceRequestContainer from '../containers/home/service-request/ServiceRequestContainer';
import {styles} from '../style/HeaderStyle';
import Color from '../style/Color';
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
        name="ServiceRequestContainer"
        component={ServiceRequestContainer}
        options={{
          title: 'Yêu cầu dịch vụ',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
