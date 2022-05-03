import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './VerifyPhoneNumberStyle';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Color from '../../../style/Color';

export default function VerifyPhoneNumber(props) {
  const {loading, newPhoneNumber} = props;
  //state --- code
  const [code, setCode] = useState('');
  //--------------
  let clockCall = null;
  const defaultCountdown = 8;
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true);
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };

  //button --- verify otp and change phone number
  const onVerifyOTP = () => {
    //check code equal 6 number or not
    if (code.length < 6) {
      Alert.alert('Thông báo', 'Mã xác nhận phải đủ 6 số, vui lòng thử lại');
    } else {
      props.onVerifyOTP(code);
    }
  };

  //button --- re-send otp
  const onResendOTP = () => {
    setEnableResend(false);
    setCountdown(defaultCountdown);
    clearInterval(clockCall);
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    props.onResendOTP();
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Nhập mã xác nhận đã gửi đến số</Text>
            <Text style={styles.titlePhoneNumber}>{newPhoneNumber}</Text>
          </View>
          <OTPInputView
            style={styles.otpContainer}
            pinCount={6}
            autoFocusOnLoad={false}
            onCodeChanged={text => setCode(text)}
            codeInputFieldStyle={styles.otpField}
          />
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Chưa nhận được mã? </Text>
            {enableResend ? (
              <TouchableOpacity onPress={onResendOTP}>
                <Text style={styles.resendBtn}>Gửi lại</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity disabled={true}>
                <Text style={styles.resendBtn}>{countdown}</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.confirmBtn} onPress={onVerifyOTP}>
            <Text style={styles.confirmBtnText}>Xác nhận</Text>
          </TouchableOpacity>
          <Modal transparent={true} visible={loading}>
            <View style={styles.dialogBackground}>
              <View style={styles.loadingView}>
                <ActivityIndicator size={'large'} color={Color.primary} />
                <Text style={styles.loadingText}>
                  Đang thay đổi số điện thoại
                </Text>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
