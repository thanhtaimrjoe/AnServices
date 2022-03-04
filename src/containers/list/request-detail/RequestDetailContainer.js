import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RequestDetail from '../../../components/list/request-detail/RequestDetail';
import {
  actResetRequestDetail,
  actResetMessage,
  actCancelRequestServiceRequest,
  actGetAllRequestServiceDetailsByRequestServiceIDRequest,
} from '../../../redux/actions/index';

export default function RequestDetailContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {requestService} = props.route.params;
  //reducer --- requestDetail
  const requestDetail = useSelector(state => state.requestDetail);
  //reduer --- message
  const message = useSelector(state => state.message);

  //get dispatch
  const dispatch = useDispatch();
  //call api --- get request service details by request service id
  const getAllRequestServiceDetailsByRequestServiceIDRequest =
    requestServiceId =>
      dispatch(
        actGetAllRequestServiceDetailsByRequestServiceIDRequest(
          requestServiceId,
        ),
      );
  //reset request detail
  const resetRequestDetail = () => dispatch(actResetRequestDetail());
  //reset message
  const resetMessage = () => dispatch(actResetMessage());
  //call api --- cancel request service
  const cancelRequestServiceRequest = requestServiceId =>
    dispatch(actCancelRequestServiceRequest(requestServiceId));

  useEffect(() => {
    resetRequestDetail();
    getAllRequestServiceDetailsByRequestServiceIDRequest(
      requestService.requestServiceId,
    );
    if (message === 'CANCEL_REQUEST_SERVICE_SUCCESS') {
      Alert.alert('Thông báo', 'Bạn đã hủy yêu cầu thành công', [
        {
          text: 'OK',
          onPress: () => {
            resetMessage();
            navigation.goBack();
          },
        },
      ]);
    }
    if (message === 'CANCEL_REQUEST_SERVICE_FAILURE') {
      Alert.alert('Thông báo', 'Hủy yêu cầu không thành công');
    }
  }, [message]);

  //button --- happy service
  const onHappyService = () => {};

  //button --- unhappy service
  const onUnhappyService = () => {};

  //button --- cancel request service
  const onCancelRequestService = requestServiceId => {
    cancelRequestServiceRequest(requestServiceId);
  };

  return (
    <RequestDetail
      requestService={requestService}
      requestDetail={requestDetail}
      onCancelRequestService={onCancelRequestService}
      onHappyService={onHappyService}
      onUnhappyService={onUnhappyService}
    />
  );
}
