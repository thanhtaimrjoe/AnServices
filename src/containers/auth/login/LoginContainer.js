import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Login from '../../../components/auth/login/Login';
import {
  actLoginCustomerOrWorkerRequest,
  actResetMessage,
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
  //reducer --- message
  const message = useSelector(state => state.message);
  //get token
  const token = 'Bearer ' + user.token;

  //get dispatch
  const dispatch = useDispatch();
  //call api --- check user exist or not
  const loginCustomerOrWorkerRequest = phoneNumber =>
    dispatch(actLoginCustomerOrWorkerRequest(phoneNumber));
  //call api --- send sms to phone number
  const sendSmsByPhoneNumber = (phoneNumber, token) =>
    dispatch(actSendSmsByPhoneNumberRequest(phoneNumber, token));
  //conver 0123... to (+84)123
  const convertPhoneNumber = phoneNumber => {
    return (phoneNumber = phoneNumber.replace(0, '+84'));
  };
  //reset message
  const resetMessage = () => dispatch(actResetMessage());

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
    if (message === 'SYSTEM_ERROR') {
      Alert.alert('Thông báo', 'Lỗi hệ thống, mời bạn thử lại', [
        {
          text: 'OK',
          onPress: () => {
            setLoading(false);
            resetMessage();
          },
        },
      ]);
    }
  }, [user, message]);

  //navigate to verify otp
  const navigateToVerifyOTP = () => {
    const convertedPhoneNumber = convertPhoneNumber(phoneNumber);
    //sendSmsByPhoneNumber(convertedPhoneNumber, token);
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
