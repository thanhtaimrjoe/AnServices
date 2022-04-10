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
} from 'react-native';
import {styles} from './LoginStyle';
import Color from '../../../style/Color';
import IconURL from '../../../style/IconURL';

export default function Login(props) {
  const {loading} = props;
  //state --- phone number
  const [phoneNumber, setPhoneNumber] = useState('');

  //validation
  const validateValue = () => {
    var result = true;
    //check phone number not equal 10 digit
    if (phoneNumber.length != 10) {
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
            placeholder="Nhập số điện thoại"
            placeholderTextColor={Color.placeholder}
            keyboardType="number-pad"
            onChangeText={text => setPhoneNumber(text)}
          />
          {loading ? (
            <View style={styles.loadingBtn}>
              <ActivityIndicator size={'large'} color={Color.white} />
            </View>
          ) : (
            <TouchableOpacity style={styles.btn} onPress={onSendOTP}>
              <Text style={styles.btnText}>Gửi OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
