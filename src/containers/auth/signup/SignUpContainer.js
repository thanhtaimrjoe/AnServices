import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SignUp from '../../../components/auth/signup/SignUp';
import {
  actCreateCustomerAccount,
  actLoginCustomerOrWorkerRequest,
} from '../../../redux/actions/index';

export default function SignUpContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {phoneNumber} = props.route.params;
  //state --- loading
  const [loading, setLoading] = useState(false);
  //reducer --- message
  const message = useSelector(state => state.message);

  //get dispatch
  const dispatch = useDispatch();
  //call api --- create customer account
  const createCustomerAccount = account =>
    dispatch(actCreateCustomerAccount(account));
  //call api --- check user exist or not
  const loginCustomerOrWorkerRequest = phoneNumber =>
    dispatch(actLoginCustomerOrWorkerRequest(phoneNumber));

  useEffect(() => {
    if (message === 'CREATE_CUSTOMER_ACCOUNT_SUCCESS') {
      //check user exist or not
      loginCustomerOrWorkerRequest(phoneNumber);
      setLoading(false);
      //navigate to home page
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'BottomTab'}],
        }),
      );
    }
  }, [message]);

  //button --- create customer account
  const onCreateCustomerAccount = (fullName, email, address) => {
    setLoading(true);
    const account = {
      fullName: fullName,
      phoneNumber: phoneNumber,
      address: address,
      email: email,
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
