import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from './PersonalStyle';
import IconURL from '../../../style/IconURL';

export default function Personal(props) {
  const {user, options} = props;

  //button --- show change phone number page
  const onShowChangePhoneNumber = () => {
    props.onShowChangePhoneNumber();
  };

  //log out
  const onLogOut = () => {
    props.onLogOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{uri: IconURL.userImg}} style={styles.avtIcon} />
        <Text style={styles.profileName}>{user.fullName}</Text>
      </View>
      <View style={styles.settingContainer}>
        {options.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={
                index === options.length - 1
                  ? styles.settingItemContainer
                  : styles.settingItemBorderContainer
              }
              onPress={onShowChangePhoneNumber}>
              <Icon name={item.icon} style={styles.settingItemIcon} />
              <Text style={styles.settingItemName}>{item.name}</Text>
              <Icon name="chevron-right" style={styles.settingItemBack} />
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity style={styles.signOutBtn} onPress={onLogOut}>
        <Text style={styles.signOutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}
