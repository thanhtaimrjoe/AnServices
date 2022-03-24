import {Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CodeReedem from '../../../components/personal/code-reedem/CodeReedem';
import {
  actGetPromotionCodeRequest,
  actResetPromotionErrorMsg,
} from '../../../redux/actions';

export default function CodeReedemContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {userID} = props.route.params;
  //state --- uploading
  const [uploading, setUploading] = useState(false);

  //reducer --- promotion
  const code = useSelector(state => state.code);

  useEffect(() => {
    if (code.length > 0) {
      Alert.alert('Thông báo', 'Nhận voucher thành công', [
        {
          text: 'Xem voucher',
          onPress: () => {
            resetPromotionErrorMsg();
            setUploading(false);
            navigation.replace('PromotionManagementContainer', {
              userID: userID,
            });
          },
        },
      ]);
    }
    if (code.errorsMsg && code.errorsMsg[0] === 'Invite code invalid') {
      Alert.alert('Thông báo', 'Mã giới thiệu không đúng', [
        {
          text: 'OK',
          onPress: () => {
            resetPromotionErrorMsg();
            setUploading(false);
          },
        },
      ]);
    }
    if (
      code.errorsMsg &&
      code.errorsMsg[0] === 'You cant input your invite code'
    ) {
      Alert.alert('Thông báo', 'Bạn không thể nhập mã giới thiệu của bạn', [
        {
          text: 'OK',
          onPress: () => {
            resetPromotionErrorMsg();
            setUploading(false);
          },
        },
      ]);
    }
    if (code.errorsMsg && code.errorsMsg[0] === 'You have been already enter invite code') {
      Alert.alert('Thông báo', 'Bạn đã sử dụng mã code này', [
        {
          text: 'OK',
          onPress: () => {
            resetPromotionErrorMsg();
            setUploading(false);
          },
        },
      ]);
    }
  }, [code]);

  //get dispatch
  const dispatch = useDispatch();
  //call api --- get promotion code
  const getPromotionCode = (userID, inviteCode) =>
    dispatch(actGetPromotionCodeRequest(userID, inviteCode));
  //reset promotion error msg
  const resetPromotionErrorMsg = () => dispatch(actResetPromotionErrorMsg());

  //button --- get promotion code
  const onGetPromotionCode = codeReedem => {
    setUploading(true);
    getPromotionCode(userID, codeReedem);
  };

  return (
    <CodeReedem uploading={uploading} onGetPromotionCode={onGetPromotionCode} />
  );
}
