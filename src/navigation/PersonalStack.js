import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {styles} from '../style/HeaderStyle';
import Color from '../style/Color';
import PersonalContainer from '../containers/personal/main/PersonalContainer';
import ShareToFriendContainer from '../containers/personal/share-to-friend/ShareToFriendContainer';
import PromotionManagementContainer from '../containers/personal/promotion-management/PromotionManagementContainer';
import InviteCodeContainer from '../containers/personal/invite-code/InviteCodeContainer';

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
        name="ShareToFriendContainer"
        component={ShareToFriendContainer}
        options={{
          title: 'Giới thiệu cho bạn bè',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="InviteCodeContainer"
        component={InviteCodeContainer}
        options={{
          title: 'Nhận mã giới thiệu',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="PromotionManagementContainer"
        component={PromotionManagementContainer}
        options={{
          title: 'Quản lý voucher',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
