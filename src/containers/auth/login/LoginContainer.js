import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Login from '../../../components/auth/login/Login';
import {
  actLoginCustomerOrWorkerRequest,
  actSendSmsByPhoneNumberRequest,
} from '../../../redux/actions/index';
export default function LoginContainer(props) {
  const {navigation} = props;
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
    return (phoneNumber = phoneNumber.replace(0, '+84'));
  };

  //button --- send otp
  const sendOTP = phoneNumber => {
    const convertedPhoneNumber = convertPhoneNumber(phoneNumber);
    loginCustomerOrWorkerRequest(phoneNumber);
    //sendSmsByPhoneNumber(convertedPhoneNumber);
    if (user) {
      //navigate to verify otp page
      navigation.navigate('VerifyOTPContainer', {
        phoneNumber: phoneNumber,
        convertedPhoneNumber: convertedPhoneNumber,
      });
    }
  };

  return <Login onSendOTP={sendOTP} />;
}
