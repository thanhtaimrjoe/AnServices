import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RequestDetail from '../../../components/list/request-detail/RequestDetail';
import {
  actResetRequestDetail,
  actResetMessage,
  actCancelRequestServiceRequest,
  actGetAllRequestServiceDetailsByRequestServiceIDRequest,
  actUpdateStatusRequestServiceDetailRequest,
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
  //call api --- update status request service detail
  const updateStatusRequestServiceDetail = (requestDetailId, status) =>
    dispatch(
      actUpdateStatusRequestServiceDetailRequest(requestDetailId, status),
    );

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
      resetMessage();
    }
    if (message === 'UPDATE_STATUS_REQUEST_SERVICE_DETAIL_SUCCESS') {
      Alert.alert('Thông báo', 'Cám ơn bạn đã đánh giá dịch vụ');
      resetMessage();
    }
    if (message === 'UPDATE_STATUS_REQUEST_SERVICE_DETAIL_FAILURE') {
      Alert.alert('Thông báo', 'Đánh giá không thành công');
      resetMessage();
    }
  }, [message]);

  //button --- happy service
  const onHappyService = requestDetailId => {
    Alert.alert('Thông báo', 'Bạn có chắc với lựa chọn này?', [
      {
        text: 'Có',
        onPress: () => {
          updateStatusRequestServiceDetail(requestDetailId, 11);
        },
      },
      {
        text: 'Không',
      },
    ]);
  };

  //button --- unhappy service
  const onUnhappyService = requestDetailId => {
    Alert.alert('Thông báo', 'Bạn có chắc với lựa chọn này?', [
      {
        text: 'Có',
        onPress: () => {
          updateStatusRequestServiceDetail(requestDetailId, 12);
        },
      },
      {
        text: 'Không',
      },
    ]);
  };

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
