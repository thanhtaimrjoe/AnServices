import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RequestDetail from '../../../components/list/request-detail/RequestDetail';
import {
  actResetRequestDetail,
  actResetMessage,
  actCancelServiceRequestRequest,
  actGetAllRequestServiceDetailsByRequestServiceIDRequest,
  actUpdateStatusRequestServiceDetailRequest,
  actGetContractByServiceRequestIDRequest,
  actGetContractParentByServiceRequestReferenceRequest,
  actResetContractParent,
  actGetServiceRequestByIDRequest,
} from '../../../redux/actions/index';

export default function RequestDetailContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {serviceRequestId, serviceRequestReference} = props.route.params;
  //reduer --- user
  const user = useSelector(state => state.user);
  //reduer --- serviceRequestInfo
  const serviceRequestInfo = useSelector(state => state.serviceRequestInfo);
  //reducer --- requestDetail
  const requestDetail = useSelector(state => state.requestDetail);
  //reduer --- message
  const message = useSelector(state => state.message);
  //reduer --- contractInfo
  const contractInfo = useSelector(state => state.contractInfo);
  //reduer --- contractParentInfo
  const contractParentInfo = useSelector(state => state.contractParentInfo);
  //get token
  const token = 'Bearer ' + user.token;

  //get dispatch
  const dispatch = useDispatch();
  //call api --- get service request by id
  const getServiceRequestByID = (serviceRequestId, token) =>
    dispatch(actGetServiceRequestByIDRequest(serviceRequestId, token));
  //call api --- get request service details by request service id
  const getAllRequestServiceDetailsByRequestServiceIDRequest = (
    serviceRequestId,
    token,
  ) =>
    dispatch(
      actGetAllRequestServiceDetailsByRequestServiceIDRequest(
        serviceRequestId,
        token,
      ),
    );
  //reset request detail
  const resetRequestDetail = () => dispatch(actResetRequestDetail());
  //reset message
  const resetMessage = () => dispatch(actResetMessage());
  //call api --- cancel request service
  const cancelServiceRequestRequest = (serviceRequestId, token) =>
    dispatch(actCancelServiceRequestRequest(serviceRequestId, token));
  //call api --- update status request service detail
  const updateStatusRequestServiceDetail = (requestDetailId, status, token) =>
    dispatch(
      actUpdateStatusRequestServiceDetailRequest(
        requestDetailId,
        status,
        token,
      ),
    );
  //call api --- get contract
  const getContractByServiceRequestIDRequest = (serviceRequestID, token) =>
    dispatch(actGetContractByServiceRequestIDRequest(serviceRequestID, token));
  //call api --- get contract parent information
  const getContractParentByServiceRequestReference = (
    serviceRequestReference,
    token,
  ) =>
    dispatch(
      actGetContractParentByServiceRequestReferenceRequest(
        serviceRequestReference,
        token,
      ),
    );
  //reset contract parent
  const resetContractParent = () => dispatch(actResetContractParent());

  useEffect(() => {
    resetRequestDetail();
    getServiceRequestByID(serviceRequestId, token);
    getAllRequestServiceDetailsByRequestServiceIDRequest(
      serviceRequestId,
      token,
    );
    resetContractParent();
    if (serviceRequestReference !== null) {
      getContractParentByServiceRequestReference(
        serviceRequestReference,
        token,
      );
    }
    getContractByServiceRequestIDRequest(serviceRequestId, token);
    if (message === 'CANCEL_SERVICE_REQUEST_SUCCESS') {
      Alert.alert('Thông báo', 'Bạn đã hủy yêu cầu thành công', [
        {
          text: 'OK',
          onPress: () => {
            resetMessage();
            navigation.replace('ListRequestServiceContainer');
          },
        },
      ]);
    }
    if (message === 'CANCEL_SERVICE_REQUEST_FAILURE') {
      Alert.alert('Thông báo', 'Hủy yêu cầu không thành công', [
        {
          text: 'OK',
          onPress: () => {
            resetMessage();
          },
        },
      ]);
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
          updateStatusRequestServiceDetail(requestDetailId, 11, token);
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
          updateStatusRequestServiceDetail(requestDetailId, 12, token);
        },
      },
      {
        text: 'Không',
      },
    ]);
  };

  //button --- cancel request service
  const onCancelServiceRequest = serviceRequestId => {
    cancelServiceRequestRequest(serviceRequestId, token);
  };

  //button --- show invoice page
  const onShowInvoice = (
    serviceRequestId,
    promotionId,
    serviceRequestReference,
  ) => {
    navigation.navigate('InvoiceContainer', {
      serviceRequestId: serviceRequestId,
      promotionId: promotionId,
      serviceRequestReference: serviceRequestReference,
    });
  };

  //button --- view contract detail
  const onViewContractDetail = contractItem => {
    navigation.navigate('ContractContainer', {
      contractItem: contractItem,
    });
  };

  //button --- create service request
  const onCreateServiceRequest = reworkService => {
    const reworkDescription =
      serviceRequestInfo.serviceRequestDescription + ' (làm lại yêu cầu mới)';
    //create requestService
    const serviceRequestRework = {
      customerId: user.id,
      customerName: serviceRequestInfo.customerName,
      customerPhone: serviceRequestInfo.customerPhone,
      customerAddress: serviceRequestInfo.customerAddress,
      requestServicePackage: serviceRequestInfo.serviceRequestPackage,
      serviceList: reworkService,
      requestServiceDescription: reworkDescription,
      mediaList: null,
      promotionID: serviceRequestInfo.promotionId,
      serviceRequestIDParent: serviceRequestInfo.serviceRequestId,
    };
    navigation.navigate('ServiceRequestContainer', {
      serviceRequestRework: serviceRequestRework,
    });
  };

  return (
    <RequestDetail
      serviceRequestInfo={serviceRequestInfo}
      requestDetail={requestDetail}
      contractInfo={contractInfo}
      contractParentInfo={contractParentInfo}
      onCancelServiceRequest={onCancelServiceRequest}
      onHappyService={onHappyService}
      onUnhappyService={onUnhappyService}
      onViewContractDetail={onViewContractDetail}
      onShowInvoice={onShowInvoice}
      onCreateServiceRequest={onCreateServiceRequest}
    />
  );
}
