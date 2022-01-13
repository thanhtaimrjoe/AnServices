import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {styles} from './LoginStyle';

export default function Login(props) {
  const onSendOTP = () => {
    props.onSendOTP();
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../../assets/mobile.png')}
          />
          <Text style={styles.bigText}>Đăng nhập</Text>
          <Text style={styles.smallText}>
            Chúng tôi sẽ gửi mã xác nhận gồm 6 chữ số ngay sau khi bạn nhập số
            điện thoại
          </Text> 
          <TextInput
            style={styles.inputField}
            placeholder="Nhập số điện thoại"
            keyboardType="number-pad"
          />
          <TouchableOpacity style={styles.button} onPress={onSendOTP}>
            <Text style={styles.buttonText}>Gửi OTP</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
