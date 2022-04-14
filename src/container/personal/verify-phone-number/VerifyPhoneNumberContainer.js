import {Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import VerifyPhoneNumber from '../../../components/personal/verify-phone-number/VerifyPhoneNumber';
import {
  actChangePhoneNumberRequest,
  actSendSmsByPhoneNumberRequest,
} from '../../../redux/actions';

export default function VerifyPhoneNumberContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {newPhoneNumber, convertedPhoneNumber} = props.route.params;
  //state --- loading
  const [loading, setLoading] = useState(false);
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- otp
  const otp = useSelector(state => state.otp);
  //reducer --- message
  const message = useSelector(state => state.message);

  //get dispatch
  const dispatch = useDispatch();
  const changePhoneNumber = (userID, newPhoneNumber) =>
    dispatch(actChangePhoneNumberRequest(userID, newPhoneNumber));
  //call api --- send sms to new phone number
  const sendSmsByPhoneNumber = phoneNumber =>
    dispatch(actSendSmsByPhoneNumberRequest(phoneNumber));

  useEffect(() => {
    if (message === 'CHANGE_PHONE_NUMBER_SUCCESS') {
      Alert.alert('Thông báo', 'Thay đổi số điện thoại thành công', [
        {
          text: 'OK',
          onPress: () => {
            setLoading(false);
            navigation.pop(2);
          },
        },
      ]);
    }
    if (message === 'CHANGE_PHONE_NUMBER_FAILURE') {
      Alert.alert(
        'Thông báo',
        'Thay đổi số điện thoại thất bại.\nMời bạn thử lại',
        [
          {
            text: 'OK',
            onPress: () => {
              setLoading(false);
              navigation.goBack();
            },
          },
        ],
      );
    }
  }, [message]);

  //button --- verify otp and change phone number
  const onVerifyOTP = code => {
    setLoading(true);
    // if (otp === code) {
    changePhoneNumber(user.id, newPhoneNumber);
    // } else {
    //   Alert.alert(
    //     'Thông báo',
    //     'Mã xác nhận bạn nhập không khớp.\nVui lòng thử lại',
    //   );
    //   setLoading(false);
    // }
  };

  //button --- resend otp
  const onResendOTP = () => {
    sendSmsByPhoneNumber(convertedPhoneNumber);
  };

  return (
    <VerifyPhoneNumber
      loading={loading}
      newPhoneNumber={newPhoneNumber}
      onVerifyOTP={onVerifyOTP}
      onResendOTP={onResendOTP}
    />
  );
}
