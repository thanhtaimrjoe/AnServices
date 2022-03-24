import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginContainer from '../containers/auth/login/LoginContainer';
import SignUpContainer from '../containers/auth/signup/SignUpContainer';
import VerifyOTPContainer from '../containers/auth/verify-otp/VerifyOTPContainer';
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
          name="SignUpContainer"
          component={SignUpContainer}
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
