import {Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ChangePhoneNumber from '../../../components/personal/change-phone-number/ChangePhoneNumber';
import {
  actCheckPhoneNumberExistOrNotRequest,
  actGetWorkerByIDRequest,
  actResetMessage,
  actSendSmsByPhoneNumberRequest,
} from '../../../redux/actions';

export default function ChangePhoneNumberContainer(props) {
  const {navigation} = props;
  //state --- loading
  const [loading, setLoading] = useState(false);
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- workerInfo
  const workerInfo = useSelector(state => state.workerInfo);
  //reducer --- message
  const message = useSelector(state => state.message);
  //state --- phone number
  const [phoneNumber, setPhoneNumber] = useState('');
  //get token
  const token = 'Bearer ' + user.token;

  //get dispatch
  const dispatch = useDispatch();
  //reset message
  const resetMessage = () => dispatch(actResetMessage());
  //call api --- check phone number exitst or not
  const checkPhoneNumberExistOrNot = newPhoneNumber =>
    dispatch(actCheckPhoneNumberExistOrNotRequest(newPhoneNumber));
  //call api --- send sms to new phone number
  const sendSmsByPhoneNumber = (phoneNumber, token) =>
    dispatch(actSendSmsByPhoneNumberRequest(phoneNumber, token));
  //call api --- get worker infomation
  const getWorkerByIDRequest = (userID, token) =>
    dispatch(actGetWorkerByIDRequest(userID, token));

  useEffect(() => {
    getWorkerByIDRequest(user.id, token);
    if (message === 'PHONE_NUMBER_WAS_EXIST') {
      Alert.alert('Thông báo', 'Số điện thoại mới này đã được đăng ký');
      setLoading(false);
      resetMessage();
    }
    if (message === 'PHONE_NUMBER_NOT_EXIST') {
      navigateToVerifyPhoneNumber();
    }
  }, [message]);

  //conver 0123... to (+84)123
  const convertPhoneNumber = phoneNumber => {
    if (phoneNumber) {
      phoneNumber = phoneNumber.replace(0, '+84');
    }
    return phoneNumber;
  };

  //convert phone number and navigate to verify phone number page
  const navigateToVerifyPhoneNumber = () => {
    setLoading(false);
    resetMessage();
    const convertedPhoneNumber = convertPhoneNumber(phoneNumber);
    //sendSmsByPhoneNumber(convertedPhoneNumber, token);
    navigation.navigate('VerifyPhoneNumberContainer', {
      newPhoneNumber: phoneNumber,
      convertedPhoneNumber: convertedPhoneNumber,
    });
  };

  //button --- check validate old number and send otp to new number
  const onSendOTP = (oldPhoneNumber, newPhoneNumber) => {
    setLoading(true);
    setPhoneNumber(newPhoneNumber);
    if (oldPhoneNumber === workerInfo.phoneNumber) {
      checkPhoneNumberExistOrNot(newPhoneNumber);
    } else {
      Alert.alert('Thông báo', 'Số điện thoại cũ bạn nhập không khớp');
      setLoading(false);
    }
  };

  return <ChangePhoneNumber loading={loading} onSendOTP={onSendOTP} />;
}
