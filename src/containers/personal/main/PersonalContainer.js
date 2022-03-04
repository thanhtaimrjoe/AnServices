import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Personal from '../../../components/personal/main/Personal';
import {actClearData} from '../../../redux/actions/index';

export default function PersonalContainer(props) {
  const {navigation} = props;
  //reducer --- user
  const user = useSelector(state => state.user);

  //list option
  const options = [
    {
      name: 'Lịch sử yêu cầu',
      icon: 'history',
    },
    {
      name: 'Giới thiệu cho bạn bè',
      icon: 'user-alt',
    },
    {
      name: 'Nhập mã giới thiệu',
      icon: 'edit',
    },
    {
      name: 'Quản lý voucher',
      icon: 'tag',
    },
  ];

  //get dispatch
  const dispatch = useDispatch();
  //clear all reducer before log out
  const clearData = () => dispatch(actClearData());

  //clear all reducers -> log out -> back to log in page
  const onLogOut = () => {
    //clear all reducers
    clearData();
    //navigate to home page
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'LoginContainer'}],
      }),
    );
  };

  return <Personal user={user} options={options} onLogOut={onLogOut} />;
}
