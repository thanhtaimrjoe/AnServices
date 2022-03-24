import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginContainer from '../container/auth/login/LoginContainer';
import VerifyOTPContainer from '../container/auth/verify-otp/VerifyOTPContainer';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();
export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginContainer"
          component={LoginContainer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifyOTPContainer"
          component={VerifyOTPContainer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
