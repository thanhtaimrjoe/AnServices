import * as types from '../../config/actionTypes';
import {API} from '../../config/API_URI';
//----------CLEAR REDUCER----------
export const actClearData = () => {
  return {
    type: types.CLEAR_DATA,
  };
};
//------------SYSTEM ERROR---------
export const actSystemError = () => {
  return {
    type: types.SYSTEM_ERROR,
  };
};
//------------MESSAGE-------------
//reset message
export const actResetMessage = () => {
  return {
    type: types.RESET_MESSAGE,
  };
};
//------------USER----------------
//call api
export const actLoginCustomerOrWorkerRequest = phoneNumber => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'User/LoginCustomerOrWorker?phoneNumber=' + phoneNumber,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      if (json) {
        dispatch(actGetUserInfo(json));
      }
    } catch (error) {
      dispatch(actSystemError());
    }
  };
};
//call api --- authen
export const actSendSmsByPhoneNumberRequest = (phoneNumber, token) => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'User/SendSms', {
        method: 'POST',
        headers: {
          Authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phoneNumber,
        }),
      });
      const json = await response.json();
      if (json) {
        dispatch(actGetOTP(json));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
//fetch otp
export const actGetOTP = otp => {
  return {
    type: types.GET_OTP,
    otp,
  };
};
//call api
export const actCreateCustomerAccount = account => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'User/CreateCustomerAccount', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: account.fullName,
          phoneNumber: account.phoneNumber,
          address: account.address,
          email: account.email,
          inviteCode: account.inviteCode,
        }),
      });
      if (response.status === 200) {
        dispatch(actCreateCustomerAccountSuccess());
      } else {
        const json = await response.json();
        if (json.errorsMsg[0] === 'Your invite code is valid') {
          dispatch(actInvalidInviteCode());
        } else {
          dispatch(actCreateCustomerAccountFailure());
        }
      }
    } catch (error) {
      dispatch(actCreateCustomerAccountFailure());
    }
  };
};
//create customer account SUCCESS
export const actCreateCustomerAccountSuccess = () => {
  return {
    type: types.CREATE_CUSTOMER_ACCOUNT_SUCCESS,
  };
};
//create customer account FAILURE
export const actCreateCustomerAccountFailure = () => {
  return {
    type: types.CREATE_CUSTOMER_ACCOUNT_FAILURE,
  };
};
//invalid invite code
export const actInvalidInviteCode = () => {
  return {
    type: types.INVALID_INVITE_CODE,
  };
};
//fetch user
export const actGetUserInfo = user => {
  return {
    type: types.GET_USER,
    user,
  };
};
//account have been BANNED
export const accountBanned = () => {
  return {
    type: types.ACCOUNT_HAVE_BEEN_BANNED,
  };
};
//call api
export const actGetUserInformationRequest = (userID, token) => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'User/GetCustomerById?id=' + userID, {
        method: 'GET',
        headers: {
          Authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (json) {
        dispatch(actGetUserInformation(json));
      }
    } catch (error) {}
  };
};
//get user information
export const actGetUserInformation = userInfo => {
  return {
    type: types.GET_USER_INFORMATION,
    userInfo,
  };
};
//call api
export const actUpdateInformationRequest = (userUpdateInfo, token) => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'User/UpdateCustomer', {
        method: 'PUT',
        headers: {
          Authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: userUpdateInfo.customerId,
          fullName: userUpdateInfo.fullName,
          email: userUpdateInfo.email,
          address: userUpdateInfo.address,
        }),
      });
      if (response.status === 200) {
        dispatch(actUpdateInformationSuccess());
      } else {
        dispatch(actUpdateInformationFailure());
      }
    } catch (error) {
      dispatch(actUpdateInformationFailure());
    }
  };
};
//update information success
export const actUpdateInformationSuccess = () => {
  return {
    type: types.UPDATE_INFORMATION_SUCCESS,
  };
};
//update information failure
export const actUpdateInformationFailure = () => {
  return {
    type: types.UPDATE_INFORMATION_FAILURE,
  };
};
//------------SERVICE----------------
//call api --- authen
export const actGetAllServiceRequest = token => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'Service/GetAllService', {
        method: 'GET',
        headers: {
          Authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (json) {
        dispatch(actGetAllService(json));
      }
    } catch (error) {}
  };
};
//fetch services
export const actGetAllService = services => {
  return {
    type: types.GET_ALL_SERVICE,
    services,
  };
};
//call api*** --- authen
export const actCreateServiceRequestRequest = (requestService, token) => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'Service/CreateServiceRequest', {
        method: 'POST',
        headers: {
          Authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: requestService.customerId,
          customerName: requestService.customerName,
          customerPhone: requestService.customerPhone,
          customerAddress: requestService.customerAddress,
          serviceRequestPackage: requestService.requestServicePackage,
          serviceList: requestService.serviceList,
          serviceRequestDescription: requestService.requestServiceDescription,
          mediaList: requestService.mediaList,
          promotionID: requestService.promotionID,
          serviceRequestIDParent: requestService.serviceRequestIDParent,
        }),
      });
      if (response.status === 200) {
        dispatch(createRequestSuccess());
      } else {
        const json = await response.json();
        if (
          json.errorsMsg &&
          json.errorsMsg[0] === 'Your account has been banned'
        ) {
          dispatch(accountBanned());
        } else {
          dispatch(createRequestFailure());
        }
      }
    } catch (error) {
      dispatch(createRequestFailure());
    }
  };
};
//create request service SUCCESS
export const createRequestSuccess = () => {
  return {
    type: types.CREATE_SERVICE_REQUEST_SUCCESS,
  };
};
//create request service FAILURE
export const createRequestFailure = () => {
  return {
    type: types.CREATE_SERVICE_REQUEST_FAILURE,
  };
};
//call api*** --- authen
export const actGetAllRequestServiceDetailsByRequestServiceIDRequest = (
  serviceRequestId,
  token,
) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API +
          'Service/GetAllServiceRequestDetailsByServiceRequestID?id=' +
          serviceRequestId,
        {
          method: 'GET',
          headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      if (json) {
        dispatch(actGetAllRequestServiceDetailsByRequestServiceID(json));
      }
    } catch (error) {}
  };
};
//fetch request detail
export const actGetAllRequestServiceDetailsByRequestServiceID =
  requestDetail => {
    return {
      type: types.GET_REQUEST_SERVICE_DETAILS_BY_REQUEST_SERVICE_ID,
      requestDetail,
    };
  };
//call api*** --- authen
export const actGetServiceRequestByUserIDAndStatusRequest = (
  userID,
  statusID,
  token,
) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API +
          'Service/GetServiceRequestByUserIDAndStatus?id=' +
          userID +
          '&status=' +
          statusID,
        {
          method: 'GET',
          headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      if (json) {
        dispatch(actGetServiceRequestByUserIDAndStatus(json));
      }
    } catch (error) {}
  };
};
//fetch service request
export const actGetServiceRequestByUserIDAndStatus = serviceRequest => {
  return {
    type: types.GET_SERVICE_REQUEST_BY_USER_ID_AND_STATUS,
    serviceRequest,
  };
};
//reset service request
export const actResetServiceRequest = () => {
  return {
    type: types.RESET_SERVICE_REQUEST,
  };
};
//reset request detail
export const actResetRequestDetail = () => {
  return {
    type: types.RESET_REQUEST_DETAIL,
  };
};
//call api*** --- authen
export const actCancelServiceRequestRequest = (serviceRequestId, token) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'Service/CancelServiceRequestForCustomer?id=' + serviceRequestId,
        {
          method: 'PUT',
          headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        dispatch(actCancelServiceRequestSuccess());
      } else {
        dispatch(actCancelServiceRequestFailure());
      }
    } catch (error) {
      dispatch(actCancelServiceRequestFailure());
    }
  };
};
//cancel request service SUCCESS
export const actCancelServiceRequestSuccess = () => {
  return {
    type: types.CANCEL_SERVICE_REQUEST_SUCCESS,
  };
};
//cancel request service FAILURE
export const actCancelServiceRequestFailure = () => {
  return {
    type: types.CANCEL_SERVICE_REQUEST_FAILURE,
  };
};
//call api*** --- authen
export const actUpdateStatusRequestServiceDetailRequest = (
  requestDetailId,
  status,
  token,
) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API +
          'Service/UpdateStatusServiceRequestDetail?id=' +
          requestDetailId +
          '&status=' +
          status,
        {
          method: 'PUT',
          headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        dispatch(actUpdateStatusRequestServiceDetailSuccess());
      } else {
        dispatch(actUpdateStatusRequestServiceDetailFailure());
      }
    } catch (error) {
      dispatch(actUpdateStatusRequestServiceDetailFailure());
    }
  };
};
//update status request service detail success
export const actUpdateStatusRequestServiceDetailSuccess = () => {
  return {
    type: types.UPDATE_STATUS_REQUEST_SERVICE_DETAIL_SUCCESS,
  };
};
//update status request service detail failure
export const actUpdateStatusRequestServiceDetailFailure = () => {
  return {
    type: types.UPDATE_STATUS_REQUEST_SERVICE_DETAIL_FAILURE,
  };
};
//------------CONTRACT----------------
//call api --- authen
export const actApproveContractRequest = (contractId, token) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'Contract/ApproveContract?id=' + contractId,
        {
          method: 'PUT',
          headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        dispatch(actApproveContractSuccess());
      } else {
        dispatch(actApproveContractFailure());
      }
    } catch (error) {
      dispatch(actApproveContractFailure());
    }
  };
};
//approve contract success
export const actApproveContractSuccess = () => {
  return {
    type: types.APPROVE_CONTRACT_SUCCESS,
  };
};
//approve contract failure
export const actApproveContractFailure = () => {
  return {
    type: types.APPROVE_CONTRACT_FAILURE,
  };
};
//call api --- authen
export const actRequestUpdateContractRequest = (contractId, token) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'Contract/RequestUpdateContract?id=' + contractId,
        {
          method: 'PUT',
          headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        dispatch(actRequestUpdateContractSuccess());
      } else {
        dispatch(actRequestUpdateContractFailure());
      }
    } catch (error) {
      dispatch(actRequestUpdateContractFailure());
    }
  };
};
//request update contract success
export const actRequestUpdateContractSuccess = () => {
  return {
    type: types.REQUEST_UPDATE_CONTRACT_SUCCESS,
  };
};
//request update contract failure
export const actRequestUpdateContractFailure = () => {
  return {
    type: types.REQUEST_UPDATE_CONTRACT_FAILURE,
  };
};
//call api --- authen
export const actGetContractByServiceRequestIDRequest = (
  serviceRequestID,
  token,
) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API +
          'Contract/GetContractByServiceRequestID?requestServiceId=' +
          serviceRequestID,
        {
          method: 'GET',
          headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      if (json) {
        dispatch(actGetContractByServiceRequestID(json));
      }
    } catch (error) {}
  };
};
//get contract by service request id
export const actGetContractByServiceRequestID = contractInfo => {
  return {
    type: types.GET_CONTRACT_BY_SERVICE_REQUEST_ID,
    contractInfo,
  };
};
//call api --- authen
export const actGetContractParentByServiceRequestReferenceRequest = (
  serviceRequestReference,
  token,
) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API +
          'Contract/GetContractByServiceRequestID?requestServiceId=' +
          serviceRequestReference,
        {
          method: 'GET',
          headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      if (json) {
        dispatch(actGetContractParentByServiceRequestReference(json));
      }
    } catch (error) {}
  };
};
//get contract parent by service request reference
export const actGetContractParentByServiceRequestReference =
  contractParentInfo => {
    return {
      type: types.GET_CONTRACT_PARENT_BY_SERVICE_REQUEST_REFERENCE,
      contractParentInfo,
    };
  };
//reset contract parent
export const actResetContractParent = () => {
  return {
    type: types.RESET_CONTRACT_PARENT,
  };
};
//------------INVOICE----------------
//call api*** --- authen
export const actGetInfomationInvoiceByRequestServiceIDRequest = (
  serviceRequestId,
  token,
) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API +
          'Invoice/GetInfomationInvoiceByServiceRequestID?serviceRequestID=' +
          serviceRequestId,
        {
          method: 'GET',
          headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      if (json) {
        dispatch(actGetInfomationInvoiceByRequestServiceID(json));
      }
    } catch (error) {}
  };
};
//get information invoice by request service id
export const actGetInfomationInvoiceByRequestServiceID = invoice => {
  return {
    type: types.GET_INFORMATION_INVOICE_BY_REQUEST_SERVICE_ID,
    invoice,
  };
};
//reset invoice
export const actResetInvoice = () => {
  return {
    type: types.RESET_INVOICE,
  };
};
//------------PROMOTION----------------
//call api --- authen
export const actGetAllPromotionValidByUserIDRequest = (userID, token) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'Promotion/GetAllPromotionValidByUserID?userID=' + userID,
        {
          method: 'GET',
          headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      if (json) {
        dispatch(actGetAllPromotionValidByUserID(json));
      }
    } catch (error) {}
  };
};
//fetch all promotion valid by user id
export const actGetAllPromotionValidByUserID = promotion => {
  return {
    type: types.GET_ALL_PROMOTION_VALID_BY_USER_ID,
    promotion,
  };
};
//call api --- authen
export const actGetInformationPromotionByIDRequest = (promotionID, token) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API +
          'Promotion/GetInformationPromotionByID?promotionID=' +
          promotionID,
        {
          method: 'GET',
          headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      if (json) {
        dispatch(actGetInformationPromotionByID(json));
      }
    } catch (error) {}
  };
};
//get information promotion by id
export const actGetInformationPromotionByID = promotionInfo => {
  return {
    type: types.GET_INFORMATION_PROMOTION_BY_ID,
    promotionInfo,
  };
};
//------------INVITE CODE----------------
//call api --- authen
export const actCreateInviteCodeRequest = (userID, token) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'InviteCode/CreateInviteCode?userID=' + userID,
        {
          method: 'POST',
          headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      if (json) {
        dispatch(actCreateInviteCode(json));
      }
    } catch (error) {}
  };
};
//fetch invite code
export const actCreateInviteCode = inviteCode => {
  return {
    type: types.GET_INVITE_CODE,
    inviteCode,
  };
};
//reset invite code
export const actResetInviteCode = () => {
  return {
    type: types.RESET_INVITE_CODE,
  };
};
