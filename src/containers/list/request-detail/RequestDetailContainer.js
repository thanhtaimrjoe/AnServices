import React, {useEffect} from 'react';
import {Alert, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RequestDetail from '../../../components/list/request-detail/RequestDetail';
import {
  actResetRequestDetail,
  actResetMessage,
  actCancelServiceRequestRequest,
  actGetAllRequestServiceDetailsByRequestServiceIDRequest,
  actUpdateStatusRequestServiceDetailRequest,
  actGetContractByServiceRequestIDRequest,
} from '../../../redux/actions/index';

export default function RequestDetailContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {serviceRequest} = props.route.params;
  //reducer --- requestDetail
  const requestDetail = useSelector(state => state.requestDetail);
  //reduer --- message
  const message = useSelector(state => state.message);
  //reduer --- contractInfo
  const contractInfo = useSelector(state => state.contractInfo);

  //get dispatch
  const dispatch = useDispatch();
  //call api --- get request service details by request service id
  const getAllRequestServiceDetailsByRequestServiceIDRequest =
    serviceRequestId =>
      dispatch(
        actGetAllRequestServiceDetailsByRequestServiceIDRequest(
          serviceRequestId,
        ),
      );
  //reset request detail
  const resetRequestDetail = () => dispatch(actResetRequestDetail());
  //reset message
  const resetMessage = () => dispatch(actResetMessage());
  //call api --- cancel request service
  const cancelServiceRequestRequest = serviceRequestId =>
    dispatch(actCancelServiceRequestRequest(serviceRequestId));
  //call api --- update status request service detail
  const updateStatusRequestServiceDetail = (requestDetailId, status) =>
    dispatch(
      actUpdateStatusRequestServiceDetailRequest(requestDetailId, status),
    );
  //call api --- get contract
  const getContractByServiceRequestIDRequest = serviceRequestID =>
    dispatch(actGetContractByServiceRequestIDRequest(serviceRequestID));

  useEffect(() => {
    resetRequestDetail();
    getAllRequestServiceDetailsByRequestServiceIDRequest(
      serviceRequest.serviceRequestId,
    );
    getContractByServiceRequestIDRequest(serviceRequest.serviceRequestId);
    if (message === 'CANCEL_SERVICE_REQUEST_SUCCESS') {
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
    if (message === 'CANCEL_SERVICE_REQUEST_FAILURE') {
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
  const onCancelServiceRequest = serviceRequestId => {
    cancelServiceRequestRequest(serviceRequestId);
  };

  //button --- show invoice page
  const onShowInvoice = serviceRequestId => {
    navigation.navigate('InvoiceContainer', {
      serviceRequestId: serviceRequestId,
    });
  };

  //button --- download contract
  const onDownloadContract = async contractUrl => {
    //check if the link is supported
    const supported = await Linking.canOpenURL(contractUrl);
    if (supported) {
      //Open the link, if the URL scheme is "http" the web link should be opened by browser
      await Linking.openURL(contractUrl);
    } else {
      Alert.alert(`Không thể mở URL này: ${contractUrl}`);
    }
  };

  //button --- view contract detail
  const onViewContractDetail = contractUrl => {
    navigation.navigate('ContractViewer', {
      contractUrl: contractUrl,
    });
  };

  return (
    <RequestDetail
      serviceRequest={serviceRequest}
      requestDetail={requestDetail}
      contractInfo={contractInfo}
      onCancelServiceRequest={onCancelServiceRequest}
      onHappyService={onHappyService}
      onUnhappyService={onUnhappyService}
      onDownloadContract={onDownloadContract}
      onViewContractDetail={onViewContractDetail}
      onShowInvoice={onShowInvoice}
    />
  );
}
