import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RequestService from '../../components/home/RequestService';
import * as actions from '../../redux/actions/index';
import Loading from '../../components/general/Loading';

export default function RequestServiceContainer(props) {
  const {navigation} = props;
  const services = useSelector(state => state.services);
  const user = useSelector(state => state.user);
  const message = useSelector(state => state.message);
  const dispatch = useDispatch();
  const actResetRequestService = () =>
    dispatch(actions.actResetRequestService());
  const actCreateRequestService = requestService =>
    dispatch(actions.actCreateRequestService(requestService));
  useEffect(() => {
    if (message === 'SUCCESS') {
      Alert.alert(
        'Gửi yêu cầu thành công',
        'Yêu cầu của bạn sẽ được chúng tôi phản hồi trong thời gian sớm nhất',
        [
          {
            text: 'OK',
            onPress: () => {
              actResetRequestService();
              navigation.goBack();
            },
          },
        ],
      );
    }
  }, [message]);
  const createRequestService = requestService => {
    requestService.customerId = user.id;
    actCreateRequestService(requestService);
  };
  return (
    <RequestService
      services={services}
      onCreateRequestService={createRequestService}
    />
  );
}
