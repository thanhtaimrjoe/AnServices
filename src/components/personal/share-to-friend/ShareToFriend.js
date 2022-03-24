import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {styles} from './ShareToFriendStyle';
import IconURL from '../../../style/IconURL';


export default function ShareToFriend(props) {

  //button
  const onShowInviteCode = () => {
    props.onShowInviteCode();
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: IconURL.shareToFrinedImg}} style={styles.image} />
      <Text style={styles.bigText}>Giới thiệu cho bạn bè</Text>
      <Text style={styles.smallText}>
        Chỉ cần gửi mã code của bạn cho bạn bè là người mới sử dụng và nhận ngay
        ưu đãi từ chúng tôi
      </Text>
      <TouchableOpacity
          style={styles.shareToFriendBtnContainer}
          onPress={onShowInviteCode}>
          <Text style={styles.shareToFriendBtnText}>Giới thiệu</Text>
        </TouchableOpacity>
    </View>
  );
}
