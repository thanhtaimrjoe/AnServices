import React from 'react';
import {useDispatch} from 'react-redux';
import Login from '../../components/auth/Login';
import * as actions from '../../redux/actions/index';
export default function LoginContainer(props) {
  const {navigation} = props;
  //get dispatch
  const dispatch = useDispatch();
  //call api --- check user exist or not
  const loginCustomerOrMasonRequest = phoneNumber =>
    dispatch(actions.actLoginCustomerOrMasonRequest(phoneNumber));
  //call api --- send sms to get otp code
  const actSendSmsByPhoneNumber = phoneNumber =>
    dispatch(actions.actSendSmsByPhoneNumberRequest(phoneNumber));
  //conver 0123... to (+84)123
  const convertPhoneNumber = phoneNumber => {
    return (phoneNumber = phoneNumber.replace(0, '+84'));
  };
  //send otp by phone number
  const sendOTP = phoneNumber => {
    //conver 0123... to (+84)123
    const convertedPhoneNumber = convertPhoneNumber(phoneNumber);
    //check user exist or not
    loginCustomerOrMasonRequest(phoneNumber);
    //send sms to get otp code
    //actSendSmsByPhoneNumber(convertedPhoneNumber);
    //navigate to verify otp page
    navigation.navigate('VerifyOTPContainer', {
      convertedPhoneNumber: convertedPhoneNumber,
    });
  };
  return <Login onSendOTP={sendOTP} />;
}
