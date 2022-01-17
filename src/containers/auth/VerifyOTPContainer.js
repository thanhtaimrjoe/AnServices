import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import VerifyOTP from '../../components/auth/VerifyOTP';

export default function VerifyOTPContainer(props) {
  const {navigation} = props;
  const {convertedPhoneNumber} = props.route.params;
  //get otp which called by API
  const otp = useSelector(state => state.otp);
  //get dispatch
  const dispatch = useDispatch();
  //call api --- send sms to get otp code
  const actSendSmsByPhoneNumber = phoneNumber =>
    dispatch(actions.actSendSmsByPhoneNumberRequest(phoneNumber));
  const verifyOTP = code => {
    //if inputed code correct
    // if (code === otp) {
    //   //navigate to home page
    //   navigation.dispatch(
    //     CommonActions.reset({
    //       index: 1,
    //       routes: [{name: 'BottomTab'}],
    //     }),
    //   );
    // }
    //navigate to home page
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'BottomTab'}],
      }),
    );
  };
  const resendOTP = () => {
    //send sms to get otp code
    actSendSmsByPhoneNumber(convertedPhoneNumber);
  };
  return <VerifyOTP onVerifyOTP={verifyOTP} onResendOTP={resendOTP} />;
}
