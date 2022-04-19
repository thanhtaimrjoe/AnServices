import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Login from '../../../components/auth/login/Login';
import {
  actLoginCustomerOrWorkerRequest,
  actResetUserMessage,
  actSendSmsByPhoneNumberRequest,
} from '../../../redux/actions/index';
export default function LoginContainer(props) {
  const {navigation} = props;
  //state --- uploading
  const [loading, setLoading] = useState(false);
  //state --- phoneNumber
  const [phoneNumber, setPhoneNumber] = useState();
  //reducer --- user
  const user = useSelector(state => state.user);

  //get dispatch
  const dispatch = useDispatch();
  //call api --- check user exist or not
  const loginCustomerOrWorkerRequest = phoneNumber =>
    dispatch(actLoginCustomerOrWorkerRequest(phoneNumber));
  //call api --- send sms to phone number
  const sendSmsByPhoneNumber = phoneNumber =>
    dispatch(actSendSmsByPhoneNumberRequest(phoneNumber));
  //conver 0123... to (+84)123
  const convertPhoneNumber = phoneNumber => {
    if (phoneNumber) {
      phoneNumber = phoneNumber.replace(0, '+84');
    }
    return phoneNumber;
  };
  //reset msg
  const resetUserMessage = () => dispatch(actResetUserMessage());

  useEffect(() => {
    if (user.userRole === 'Worker') {
      setLoading(false);
      Alert.alert(
        'Thông báo',
        'Rất tiếc, số điện thoại này đã được đăng ký bởi thợ của chúng tôi',
      );
    }
    if (user.userRole === 'Customer') {
      navigateToVerifyOTP();
    }
    if (user.errorsMsg && user.errorsMsg[0] === 'Phone number is not exists') {
      navigateToVerifyOTP();
    }
    if (
      user.errorsMsg &&
      user.errorsMsg[0] === 'Your account have been banned'
    ) {
      setLoading(false);
      Alert.alert('Thông báo', 'Rất tiếc, tài khoản này đã bị chặn');
    }
    if (user === 'SYSTEM_ERROR') {
      Alert.alert('Thông báo', 'Có lỗi xảy ra, mời bạn thử lại', [
        {
          text: 'OK',
          onPress: () => {
            resetUserMessage();
            setLoading(false);
          },
        },
      ]);
    }
  }, [user]);

  //navigate to verify otp
  const navigateToVerifyOTP = () => {
    const convertedPhoneNumber = convertPhoneNumber(phoneNumber);
    //sendSmsByPhoneNumber(convertedPhoneNumber);
    setLoading(false);
    //navigate to verify otp page
    navigation.navigate('VerifyOTPContainer', {
      phoneNumber: phoneNumber,
      convertedPhoneNumber: convertedPhoneNumber,
    });
  };

  //button --- send otp
  const sendOTP = phoneNumber => {
    setLoading(true);
    setPhoneNumber(phoneNumber);
    loginCustomerOrWorkerRequest(phoneNumber);
  };

  return <Login loading={loading} onSendOTP={sendOTP} />;
}
