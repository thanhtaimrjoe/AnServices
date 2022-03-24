import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListReportProblemContainer from '../container/list-report-problem/main/ListReportProblemContainer';

const Stack = createNativeStackNavigator();
export default function ListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListReportProblemContainer"
        component={ListReportProblemContainer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
