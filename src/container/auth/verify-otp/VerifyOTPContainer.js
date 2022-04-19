import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import VerifyOTP from '../../../components/auth/verify-otp/VerifyOTP';
import {actSendSmsByPhoneNumberRequest} from '../../../redux/actions/index';
export default function VerifyOTPContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {convertedPhoneNumber} = props.route.params;
  //reducer --- otp
  const otp = useSelector(state => state.otp);
  //reducer --- user
  const user = useSelector(state => state.user);
  //get token
  const token = 'Bearer ' + user.token;

  //get dispatch
  const dispatch = useDispatch();
  //call api --- re-send sms to phone number
  const sendSmsByPhoneNumber = (phoneNumber, token) =>
    dispatch(actSendSmsByPhoneNumberRequest(phoneNumber, token));

  //button --- check inputted code with otp -> navigate to home page
  const onVerifyOTP = code => {
    //if (code === otp) {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'BottomTab'}],
      }),
    );
    // } else {
    //   Alert.alert(
    //     'Thông báo',
    //     'Mã xác nhận bạn nhập không khớp, vui lòng thử lại',
    //   );
    // }
  };

  //button --- re-send otp
  const onResendOTP = () => {
    sendSmsByPhoneNumber(convertedPhoneNumber, token);
  };

  return <VerifyOTP onVerifyOTP={onVerifyOTP} onResendOTP={onResendOTP} />;
}
