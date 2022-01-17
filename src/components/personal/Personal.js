import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from './PersonalStyle';

export default function Personal() {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avtContainer}>
          <Icon name="user-alt" style={styles.avtIcon} />
        </View>
        <Text style={styles.profileName}>Sơn Tùng</Text>
      </View>
    </View>
  );
}
