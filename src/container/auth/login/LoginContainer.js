import {Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Login from '../../../components/auth/login/Login';
import {useDispatch, useSelector} from 'react-redux';
import {
  actResetMessage,
  actLoginCustomerOrWorkerRequest,
  actSendSmsByPhoneNumberRequest,
} from '../../../redux/actions/index';
import NetInfo from '@react-native-community/netinfo';

export default function LoginContainer(props) {
  const {navigation} = props;
  //state --- phone number
  const [phoneNumber, setPhoneNumber] = useState('');
  //state --- loading
  const [loading, setLoading] = useState(false);
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- message
  const message = useSelector(state => state.message);
  //get token
  const token = 'Bearer ' + user.token;

  useEffect(() => {
    //user role = worker
    if (user.userRole === 'Worker') {
      navigateToVerifyOTP();
    }
    //user role = customer
    if (user.userRole === 'Customer') {
      Alert.alert(
        'Thông báo',
        'Số điện thoại này đã được đăng ký bởi khách hàng',
      );
      setLoading(false);
    }
    //if phone number was not exist in system
    if (user.errorsMsg) {
      Alert.alert(
        'Thông báo',
        'Số điện thoại này hiện chưa được đăng ký trong hệ thống',
      );
      setLoading(false);
    }
    //if connect api failed
    if (message === 'SYSTEM_ERROR') {
      Alert.alert('Thông báo', 'Lỗi hệ thống, vui lòng thử lại', [
        {
          text: 'OK',
          onPress: () => {
            setLoading(false);
            resetMessage();
          },
        },
      ]);
    }
    //check internet connection
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert(
          'Thông báo',
          'Bạn đã bị mất kết nối. Vui lòng kiểm tra lại đường truyền.',
        );
      }
    });
    //unsubscribe
    return () => unsubscribe();
  }, [user, message]);

  //get dispatch
  const dispatch = useDispatch();
  //reset message
  const resetMessage = () => dispatch(actResetMessage());
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

  //button --- send otp
  const onSendOTP = phoneNumber => {
    setLoading(true);
    setPhoneNumber(phoneNumber);
    loginCustomerOrWorkerRequest(phoneNumber);
  };

  //convert phone number and navigate to verify otp page
  const navigateToVerifyOTP = () => {
    const convertedPhoneNumber = convertPhoneNumber(phoneNumber);
    //sendSmsByPhoneNumber(convertedPhoneNumber);
    setLoading(false);
    navigation.navigate('VerifyOTPContainer', {
      phoneNumber: phoneNumber,
      convertedPhoneNumber: convertedPhoneNumber,
    });
  };

  return <Login loading={loading} onSendOTP={onSendOTP} />;
}
