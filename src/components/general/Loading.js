import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {styles} from './LoadingStyle';
import Color from '../../styles/Color';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        style={styles.loadingIcon}
        size={'large'}
        color={Color.primary}
      />
      <Text style={styles.loadingText}>Loading</Text>
    </View>
  );
}
