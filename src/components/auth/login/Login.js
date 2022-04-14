import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {styles} from './LoginStyle';
import Color from '../../../style/Color';
import IconURL from '../../../style/IconURL';

export default function Login(props) {
  const {loading} = props;
  //state --- phone number
  const [phoneNumber, setPhoneNumber] = useState('');

  //check phone number validate
  const validateValue = () => {
    var result = true;
    if (!phoneNumber.match(/(0[3|5|7|8|9])+([0-9]{8})\b/)) {
      Alert.alert('Thông báo', 'Số điện thoại bạn nhập không đúng');
      result = false;
    }
    return result;
  };

  //button --- send otp
  const onSendOTP = () => {
    var validation = validateValue();
    //phone number valid
    if (validation) {
      props.onSendOTP(phoneNumber);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image style={styles.image} source={{uri: IconURL.loginImg}} />
          <Text style={styles.bigText}>Đăng nhập</Text>
          <Text style={styles.smallText}>
            Chúng tôi sẽ gửi mã xác nhận gồm 6 chữ số ngay sau khi bạn nhập số
            điện thoại
          </Text>
          <TextInput
            style={styles.inputField}
            maxLength={10}
            placeholder="Nhập số điện thoại"
            placeholderTextColor={Color.placeholder}
            keyboardType="numeric"
            onChangeText={text => setPhoneNumber(text)}
          />
          <TouchableOpacity style={styles.btn} onPress={onSendOTP}>
            <Text style={styles.btnText}>Tiếp tục</Text>
          </TouchableOpacity>
          <Modal transparent={true} visible={loading}>
            <View style={styles.dialogBackground}>
              <View style={styles.loadingView}>
                <ActivityIndicator size={'large'} color={Color.primary} />
                <Text style={styles.loadingText}>Đang tải</Text>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
