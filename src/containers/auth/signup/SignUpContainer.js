import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SignUp from '../../../components/auth/signup/SignUp';
import {
  actCreateCustomerAccount,
  actLoginCustomerOrWorkerRequest,
  actResetMessage,
} from '../../../redux/actions/index';

export default function SignUpContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {phoneNumber} = props.route.params;
  //state --- loading
  const [loading, setLoading] = useState(false);
  //reducer --- message
  const message = useSelector(state => state.message);
  //reducer --- user
  const user = useSelector(state => state.user);

  //get dispatch
  const dispatch = useDispatch();
  //call api --- create customer account
  const createCustomerAccount = account =>
    dispatch(actCreateCustomerAccount(account));
  //call api --- check user exist or not
  const loginCustomerOrWorkerRequest = phoneNumber =>
    dispatch(actLoginCustomerOrWorkerRequest(phoneNumber));
  //reset message
  const resetMessage = () => dispatch(actResetMessage());

  useEffect(() => {
    if (message === 'CREATE_CUSTOMER_ACCOUNT_SUCCESS') {
      //check user exist or not
      loginCustomerOrWorkerRequest(phoneNumber);
    }
    if (user.userRole === 'Customer') {
      resetMessage();
      setLoading(false);
      //navigate to home page
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'BottomTab'}],
        }),
      );
    }
    if (message === 'INVALID_INVITE_CODE') {
      Alert.alert('Thông báo', 'Mã giới thiệu bạn nhập không đúng', [
        {
          text: 'OK',
          onPress: () => {
            resetMessage();
            setLoading(false);
          },
        },
      ]);
    }
    if (message === 'EXPIRED_INVITE_CODE') {
      Alert.alert('Thông báo', 'Mã giới thiệu bạn nhập đã hết hạn', [
        {
          text: 'OK',
          onPress: () => {
            resetMessage();
            setLoading(false);
          },
        },
      ]);
    }
    if (message === 'CREATE_CUSTOMER_ACCOUNT_FAILURE') {
      Alert.alert('Thông báo', 'Đăng ký không thành công, mời bạn thử lại', [
        {
          text: 'OK',
          onPress: () => {
            resetMessage();
            setLoading(false);
          },
        },
      ]);
    }
  }, [message, user]);

  //button --- create customer account
  const onCreateCustomerAccount = (fullName, email, address, inviteCode) => {
    setLoading(true);
    const account = {
      fullName: fullName,
      phoneNumber: phoneNumber,
      address: address,
      email: email,
      inviteCode: inviteCode,
    };
    createCustomerAccount(account);
  };

  return (
    <SignUp
      loading={loading}
      onCreateCustomerAccount={onCreateCustomerAccount}
    />
  );
}
