import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import Personal from '../../../components/personal/main/Personal';
import {actClearData} from '../../../redux/actions/index';
export default function PersonalContainer(props) {
  const {navigation} = props;
  //reducer --- user
  const user = useSelector(state => state.user);
  //option list
  const options = [
    {
      name: 'Thay đổi số điện thoại',
      icon: 'phone-alt',
    },
  ];

  //get dispatch
  const dispatch = useDispatch();
  //clear all reducer before log out
  const clearData = () => dispatch(actClearData());

  //button --- show change phone number page
  const onShowChangePhoneNumber = () => {
    navigation.navigate('ChangePhoneNumberContainer');
  };

  //clear all reducers -> log out -> back to log in page
  const onLogOut = () => {
    clearData();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'LoginContainer'}],
      }),
    );
  };

  return (
    <Personal
      user={user}
      options={options}
      onShowChangePhoneNumber={onShowChangePhoneNumber}
      onLogOut={onLogOut}
    />
  );
}
