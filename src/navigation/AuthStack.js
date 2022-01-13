import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import LoginContainer from '../containers/auth/LoginContainer';
import VerifyOTPContainer from '../containers/auth/VerifyOTPContainer';

const Stack = createNativeStackNavigator();
export default function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='LoginContainer' component={LoginContainer} options={{headerShown: false}}/>
                <Stack.Screen  name='VerifyOTPContainer' component={VerifyOTPContainer} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
