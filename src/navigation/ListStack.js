import React from 'react';
import ListRequestServiceContainer from '../containers/list/list-request-service/ListRequestServiceContainer';
import RequestDetailContainer from '../containers/list/request-detail/RequestDetailContainer';
import InvoiceContainer from '../containers/list/invoice/InvoiceContainer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {styles} from '../style/HeaderStyle';
import Color from '../style/Color';
import ContractContainer from '../containers/list/contract/ContractContainer';

const Stack = createNativeStackNavigator();
export default function ListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListRequestServiceContainer"
        component={ListRequestServiceContainer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RequestDetailContainer"
        component={RequestDetailContainer}
        options={{
          title: 'Thông tin yêu cầu',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ContractContainer"
        component={ContractContainer}
        options={{
          title: 'Chi tiết hợp đồng',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="InvoiceContainer"
        component={InvoiceContainer}
        options={{
          title: 'Thông tin hóa đơn',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
