import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import VerifyOTP from '../../../components/auth/verify-otp/VerifyOTP';
import {actSendSmsByPhoneNumberRequest} from '../../../redux/actions/index';

export default function VerifyOTPContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {phoneNumber, convertedPhoneNumber} = props.route.params;
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- otp
  const otp = useSelector(state => state.otp);

  //get dispatch
  const dispatch = useDispatch();
  //call api --- send sms to phone number
  const sendSmsByPhoneNumber = phoneNumber =>
    dispatch(actSendSmsByPhoneNumberRequest(phoneNumber));

  //button --- check inputted code with otp -> navigate to home page
  const onVerifyOTP = code => {
    //if inputed code correct
    // if (code === otp) {
      if (user.id) {
        //navigate to home page
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'BottomTab'}],
          }),
        );
      } else {
        //navigate to sign up page
        navigation.replace('SignUpContainer', {phoneNumber: phoneNumber});
      }
    // } else {
    //   Alert.alert(
    //     'Thông báo',
    //     'Mã OTP bạn đã nhập không khớp, vui lòng thử lại',
    //   );
    // }
  };

  //button --- re-send otp
  const onResendOTP = () => {
    sendSmsByPhoneNumber(convertedPhoneNumber);
  };

  return <VerifyOTP onVerifyOTP={onVerifyOTP} onResendOTP={onResendOTP} />;
}
