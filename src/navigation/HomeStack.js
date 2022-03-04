import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeContainer from '../containers/home/main/HomeContainer';
import RequestServiceContainer from '../containers/home/request-service/RequestServiceContainer';
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
        name="RequestServiceContainer"
        component={RequestServiceContainer}
        options={{
          headerTitle: 'Yêu cầu dịch vụ',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
        }}
      />
      <Stack.Screen
        name="ContractContainer"
        component={ContractContainer}
        options={{
          headerTitle: 'Xem hợp đồng',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
        }}
      />
      <Stack.Screen
        name="ContractViewer"
        component={ContractViewer}
        options={{
          headerTitle: 'Chi tiết hợp đồng',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
        }}
      />
    </Stack.Navigator>
  );
}
