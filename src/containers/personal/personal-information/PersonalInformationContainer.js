import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PersonalInformation from '../../../components/personal/personal-information/PersonalInformation';
import {
  actGetUserInformationRequest,
  actResetMessage,
  actUpdateInformationRequest,
} from '../../../redux/actions/index';

export default function PersonalInformationContainer(props) {
  const {navigation} = props;
  //state --- uploading
  const [uploading, setUploading] = useState(false);
  //reduer --- user
  const user = useSelector(state => state.user);
  //reduer --- userInfo
  const userInfo = useSelector(state => state.userInfo);
  //reducer --- message
  const message = useSelector(state => state.message);
  //get token
  const token = 'Bearer ' + user.token;

  //get dispatch
  const dispatch = useDispatch();
  //reset message
  const resetMessage = () => dispatch(actResetMessage());
  //call api --- get user information
  const getUserInformation = (userID, token) =>
    dispatch(actGetUserInformationRequest(userID, token));
  //call api --- update user information
  const updateInformation = (userUpdateInfo, token) =>
    dispatch(actUpdateInformationRequest(userUpdateInfo, token));

  useEffect(() => {
    getUserInformation(user.id, token);
    if (message === 'UPDATE_INFORMATION_SUCCESS') {
      setUploading(false);
      Alert.alert('Thông báo', 'Thay đổi thông tin thành công', [
        {
          text: 'OK',
          onPress: () => {
            resetMessage();
            navigation.goBack();
          },
        },
      ]);
    }
    if (message === 'UPDATE_INFORMATION_FAILURE') {
      Alert.alert('Thông báo', 'Thay đổi thông tin thất bại, mời bạn thử lại', [
        {
          text: 'OK',
          onPress: () => {
            setUploading(false);
            resetMessage();
          },
        },
      ]);
    }
  }, [message]);

  //button --- change personal information
  const onChangePersonalInformation = (fullName, email, address) => {
    setUploading(true);
    const userUpdateInfo = {
      customerId: user.id,
      fullName: fullName,
      email: email,
      address: address,
    };
    updateInformation(userUpdateInfo, token);
  };

  return (
    <PersonalInformation
      uploading={uploading}
      userInfo={userInfo}
      onChangePersonalInformation={onChangePersonalInformation}
    />
  );
}
