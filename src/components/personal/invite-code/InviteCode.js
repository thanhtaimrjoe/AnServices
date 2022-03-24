import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Clipboard from '@react-native-community/clipboard';
import Color from '../../../style/Color';
import {styles} from './InviteCodeStyle';
import IconURL from '../../../style/IconURL';

export default function InviteCode(props) {
  const {inviteCode} = props;
  //button
  const onCopyToClipBoard = inviteCode => {
    Clipboard.setString(inviteCode);
    ToastAndroid.show('Đã copy thành công', ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: IconURL.inviteCodeImg}} style={styles.image} />
      <Text style={styles.bigText}>Thành công</Text>
      <Text style={styles.smallText}>
        Đây là mã code của bạn.{'\n'}
        Nhấn vào bên dưới để copy nhé!
      </Text>
      {inviteCode ? (
        <TouchableOpacity
          style={styles.inviteCodeContainer}
          onPress={() => onCopyToClipBoard(inviteCode)}>
          <Text style={styles.inviteCode}>{inviteCode}</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <ActivityIndicator
            style={styles.loadingIcon}
            size={'large'}
            color={Color.primary}
          />
          <Text style={styles.loadingText}>Đang tải</Text>
        </View>
      )}
    </View>
  );
}
