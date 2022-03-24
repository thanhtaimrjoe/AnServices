import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeContainer from '../containers/home/main/HomeContainer';
import ServiceRequestContainer from '../containers/home/service-request/ServiceRequestContainer';
import ContractContainer from '../containers/home/contract/ContractContainer';
import ContractViewer from '../components/home/contract/contract-viewer/ContractViewer';
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
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="ContractContainer"
        component={ContractContainer}
        options={{
          title: 'Xem hợp đồng',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="ContractViewer"
        component={ContractViewer}
        options={{
          title: 'Chi tiết hợp đồng',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  );
}
