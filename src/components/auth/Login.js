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
} from 'react-native';
import {styles} from './LoginStyle';
import Color from '../../styles/Color';

export default function Login(props) {
  const [phoneNumber, setPhoneNumber] = useState('');
  //validate
  const validateValue = () => {
    var result = true;
    //check phone number not equal 10 digit
    if (phoneNumber.length != 10) {
      Alert.alert('Thông báo', 'Số điện thoại bạn nhập không đúng');
      result = false;
    }
    return result;
  };
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
          <Image
            style={styles.image}
            source={require('../../assets/image/mobile.png')}
          />
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
          <TouchableOpacity style={styles.button} onPress={onSendOTP}>
            <Text style={styles.buttonText}>Gửi OTP</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
