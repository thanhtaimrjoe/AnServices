import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeContainer from '../container/home/main/HomeContainer';
import RequestDetailContainer from '../container/home/request-detail/RequestDetailContainer';
import {styles} from '../style/HeaderStyle';
import Color from '../style/Color';
import MaterialDetailContainer from '../container/home/material-detail/MaterialDetailContainer';
import RequestMaterialContainer from '../container/home/request-material/RequestMaterialContainer';
import ReportProblemContainer from '../container/home/report-problem/ReportProblemContainer';
import CompletedReportContainer from '../container/home/completed-report/CompletedReportContainer';
import ReportDetailContainer from '../container/home/report-detail/ReportDetailContainer';

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
        name="RequestDetailContainer"
        component={RequestDetailContainer}
        options={{
          title: 'Thông tin yêu cầu',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="MaterialDetailContainer"
        component={MaterialDetailContainer}
        options={{
          title: 'Thông tin chung',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="RequestMaterialContainer"
        component={RequestMaterialContainer}
        options={{
          title: 'Yêu cầu vật liệu',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="ReportProblemContainer"
        component={ReportProblemContainer}
        options={{
          title: 'Báo cáo vấn đề',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="CompletedReportContainer"
        component={CompletedReportContainer}
        options={{
          title: 'Báo cáo hoàn thành',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="ReportDetailContainer"
        component={ReportDetailContainer}
        options={{
          title: 'Thông tin báo cáo',
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Color.primary,
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  );
}
