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
  actGetContractParentByServiceRequestReferenceRequest,
  actResetContractParent,
  actRequestUpdateContractRequest,
  actApproveContractRequest,
} from '../../../redux/actions/index';

export default function RequestDetailContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {serviceRequest} = props.route.params;
  //reduer --- user
  const user = useSelector(state => state.user);
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
  //call api --- approve contract
  const approveContract = (contractId, token) =>
    dispatch(actApproveContractRequest(contractId, token));
  //call api --- request update contract
  const requestUpdateContract = (contractId, token) =>
    dispatch(actRequestUpdateContractRequest(contractId, token));
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
    getAllRequestServiceDetailsByRequestServiceIDRequest(
      serviceRequest.serviceRequestId,
      token,
    );
    resetContractParent();
    if (serviceRequest.serviceRequestReference !== null) {
      getContractParentByServiceRequestReference(
        serviceRequest.serviceRequestReference,
        token,
      );
    }
    getContractByServiceRequestIDRequest(
      serviceRequest.serviceRequestId,
      token,
    );
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
    if (message === 'APPROVE_CONTRACT_SUCCESS') {
      Alert.alert('Thông báo', 'Bạn đã chấp thuận thành công');
      resetMessage();
    }
    if (message === 'APPROVE_CONTRACT_FAILURE') {
      Alert.alert('Thông báo', 'Có lỗi phát sinh, mời bạn thử lại');
      resetMessage();
    }
    if (message === 'REQUEST_UPDATE_CONTRACT_SUCCESS') {
      Alert.alert('Thông báo', 'Bạn đã yêu cầu sửa chữa thành công');
      resetMessage();
    }
    if (message === 'REQUEST_UPDATE_CONTRACT_FAILURE') {
      Alert.alert('Thông báo', 'Có lỗi phát sinh, mời bạn thử lại');
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

  //button --- approve contract
  const onApproveContract = contractId => {
    approveContract(contractId, token);
  };

  //button --- request update contract
  const onRequestUpdateContract = contractId => {
    requestUpdateContract(contractId, token);
  };

  //button --- create service request
  const onCreateServiceRequest = reworkService => {
    //get list media url
    const mediaURL = [];
    serviceRequest.tblMedia.map((item, index) => {
      mediaURL.push(item.mediaUrl);
    });
    const reworkDescription =
      serviceRequest.serviceRequestDescription + ' (làm lại yêu cầu mới)';
    //create requestService
    const serviceRequestRework = {
      customerId: user.id,
      customerName: serviceRequest.customerName,
      customerPhone: serviceRequest.customerPhone,
      customerAddress: serviceRequest.customerAddress,
      requestServicePackage: serviceRequest.serviceRequestPackage,
      serviceList: reworkService,
      requestServiceDescription: reworkDescription,
      mediaList: null,
      promotionID: serviceRequest.promotionId,
      serviceRequestIDParent: serviceRequest.serviceRequestId,
    };
    navigation.navigate('ServiceRequestContainer', {
      serviceRequestRework: serviceRequestRework,
    });
  };

  return (
    <RequestDetail
      serviceRequest={serviceRequest}
      requestDetail={requestDetail}
      contractInfo={contractInfo}
      contractParentInfo={contractParentInfo}
      onCancelServiceRequest={onCancelServiceRequest}
      onHappyService={onHappyService}
      onUnhappyService={onUnhappyService}
      onDownloadContract={onDownloadContract}
      onViewContractDetail={onViewContractDetail}
      onApproveContract={onApproveContract}
      onRequestUpdateContract={onRequestUpdateContract}
      onShowInvoice={onShowInvoice}
      onCreateServiceRequest={onCreateServiceRequest}
    />
  );
}
