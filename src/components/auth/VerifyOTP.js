import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {styles} from './VerifyOTPStyle';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export default function VerifyOTP(props) {
  const [code, setCode] = useState();
  const onVerifyOTP = () => {
    props.onVerifyOTP(code);
  };
  const onResendOTP = () => {
    props.onResendOTP();
  }
  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../../assets/verifyotp.png')}
          />
          <Text style={styles.bigText}>Xác nhận OTP</Text>
          <Text style={styles.smallText}>
            Mã xác nhận đã được gửi đến số của bạn
          </Text>
          <OTPInputView
            style={styles.otpContainer}
            pinCount={6}
            autoFocusOnLoad
            onCodeChanged={code => setCode(code)}
            codeInputFieldStyle={styles.otpField}
          />
          <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Chưa nhận được mã? </Text>
          <TouchableOpacity onPress={onResendOTP}>
          <Text style={styles.resendBtn}>Gửi lại</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={onVerifyOTP}>
            <Text style={styles.buttonText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
