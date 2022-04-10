import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PersonalContainer from '../container/personal/main/PersonalContainer';
import ChangePhoneNumberContainer from '../container/personal/change-phone-number/ChangePhoneNumberContainer';
import Color from '../style/Color';
import {styles} from '../style/HeaderStyle';
import VerifyPhoneNumberContainer from '../container/personal/verify-phone-number/VerifyPhoneNumberContainer';

const Stack = createNativeStackNavigator();
export default function PersonalStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PersonalContainer"
        component={PersonalContainer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePhoneNumberContainer"
        component={ChangePhoneNumberContainer}
        options={{
          title: 'Thay đổi số điện thoại',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="VerifyPhoneNumberContainer"
        component={VerifyPhoneNumberContainer}
        options={{
          title: 'Thay đổi số điện thoại',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
