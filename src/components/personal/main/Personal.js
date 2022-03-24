import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from './PersonalStyle';

export default function Personal(props) {
  const {user} = props;

  //button --- show share to friend page
  const onShowShareToFriendPage = () => {
    props.onShowShareToFriendPage();
  }

  //button --- show promotion management
  const onShowPromotionManagementPage = () => {
    props.onShowPromotionManagementPage();
  }

  //button --- log out
  const onLogOut = () => {
    props.onLogOut();
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avtContainer}>
          <Icon name="user-alt" style={styles.avtIcon} />
        </View>
        <Text style={styles.profileName}>{user.fullName}</Text>
      </View>
      <View style={styles.settingContainer}>
        <TouchableOpacity style={styles.settingItemContainer} onPress={onShowShareToFriendPage}>
          <Icon name="user-alt" style={styles.settingItemIcon} />
          <Text style={styles.settingItemName}>Giới thiệu cho bạn bè</Text>
          <Icon name="chevron-right" style={styles.settingItemBack} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItemContainer} onPress={onShowPromotionManagementPage}>
          <Icon name="tag" style={styles.settingItemIcon} />
          <Text style={styles.settingItemName}>Quản lý voucher</Text>
          <Icon name="chevron-right" style={styles.settingItemBack} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signOutBtn} onPress={onLogOut}>
        <Text style={styles.signOutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}
