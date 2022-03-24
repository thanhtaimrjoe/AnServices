import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Personal from '../../../components/personal/main/Personal';
import {actClearData} from '../../../redux/actions/index';

export default function PersonalContainer(props) {
  const {navigation} = props;
  //reducer --- user
  const user = useSelector(state => state.user);

  //get dispatch
  const dispatch = useDispatch();
  //clear all reducer before log out
  const clearData = () => dispatch(actClearData());

  //button --- show share to friend page
  const onShowShareToFriendPage = () => {
    navigation.navigate('ShareToFriendContainer', {
      userID: user.id,
    })
  }

  //button --- show promotion management page
  const onShowPromotionManagementPage = () => {
    navigation.navigate('PromotionManagementContainer', {
      userID: user.id,
    })
  }

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

  return <Personal user={user} onShowShareToFriendPage={onShowShareToFriendPage} onShowPromotionManagementPage={onShowPromotionManagementPage} onLogOut={onLogOut} />;
}
