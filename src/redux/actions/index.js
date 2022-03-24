import * as types from '../../config/actionTypes';
import {API} from '../../config/API_URI';
//----------CLEAR REDUCER----------
export const actClearData = () => {
  return {
    type: types.CLEAR_DATA,
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
      console.error(error);
    }
  };
};
//call api
export const actSendSmsByPhoneNumberRequest = phoneNumber => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'User/SendSms', {
        method: 'POST',
        headers: {
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
      //console.error(error);
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
      console.error(error);
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

//------------SERVICE----------------
//call api
export const actGetAllServiceRequest = token => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'Service/GetAllService', {
        method: 'GET',
        headers: {
          //Authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (json) {
        dispatch(actGetAllService(json));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
//fetch services
export const actGetAllService = services => {
  return {
    type: types.GET_ALL_SERVICE,
    services,
  };
};
//call api***
export const actCreateServiceRequestRequest = requestService => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'Service/CreateServiceRequest', {
        method: 'POST',
        headers: {
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
        }),
      });
      if (response.status === 200) {
        dispatch(createRequestSuccess());
      } else {
        const json = await response.json();
        if (json.errorsMsg[0] === 'Your account has been banned') {
          dispatch(createRequestBanned());
        } else {
          dispatch(createRequestFailure());
        }
      }
    } catch (error) {
      console.error(error);
      dispatch(createRequestFailure());
    }
  };
};
/*
//call api with formData format
export const actCreateServiceRequestRequest = formData => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'Service/CreateServiceRequest', {
        method: 'POST',
        // headers: {
        //   //Accept: 'application/json',
        // },
        body: formData,
      });
      console.log('response', response);
      if (response.status === 200) {
        dispatch(createRequestSuccess());
      } else {
        dispatch(createRequestFailure());
      }
    } catch (error) {
      console.error(error);
      console.log('error', error);
      dispatch(createRequestFailure());
    }
  };
};
*/
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
//create request service BANNED
export const createRequestBanned = () => {
  return {
    type: types.CREATE_SERVICE_REQUEST_BANNED,
  };
};
//call api***
export const actGetAllRequestServiceDetailsByRequestServiceIDRequest =
  serviceRequestId => {
    return async dispatch => {
      try {
        const response = await fetch(
          API +
            'Service/GetAllServiceRequestDetailsByServiceRequestID?id=' +
            serviceRequestId,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        const json = await response.json();
        if (json) {
          dispatch(actGetAllRequestServiceDetailsByRequestServiceID(json));
        }
      } catch (error) {
        console.error(error);
      }
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
//call api***
export const actGetServiceRequestByUserIDAndStatusRequest = (
  userID,
  statusID,
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
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      if (json) {
        dispatch(actGetServiceRequestByUserIDAndStatus(json));
      }
    } catch (error) {
      console.error(error);
    }
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
//call api***
export const actCancelServiceRequestRequest = serviceRequestId => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'Service/CancelServiceRequestForCustomer?id=' + serviceRequestId,
        {
          method: 'PUT',
          headers: {
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
      console.error(error);
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
//call api***
export const actUpdateStatusRequestServiceDetailRequest = (
  requestDetailId,
  status,
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
      console.error(error);
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
//call api
export const actGetContractListByUserIDRequest = userID => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'Contract/GetContractListByUserID?id=' + userID,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      if (json) {
        dispatch(actGetContractListByUserID(json));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
//fetch contract
export const actGetContractListByUserID = contract => {
  return {
    type: types.GET_CONTRACT_LIST_BY_USER_ID,
    contract,
  };
};
//call api
export const actApproveContractRequest = contractId => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'Contract/ApproveContract?id=' + contractId,
        {
          method: 'PUT',
          headers: {
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
      console.error(error);
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
//call api
export const actRequestUpdateContractRequest = contractId => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'Contract/RequestUpdateContract?id=' + contractId,
        {
          method: 'PUT',
          headers: {
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
      console.error(error);
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
//call api
export const actGetContractByServiceRequestIDRequest = serviceRequestID => {
  return async dispatch => {
    try {
      const response = await fetch(
        API +
          'Contract/GetContractByServiceRequestID?requestServiceId=' +
          serviceRequestID,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      if (json) {
        dispatch(actGetContractByServiceRequestID(json));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
//
export const actGetContractByServiceRequestID = contractInfo => {
  return {
    type: types.GET_CONTRACT_BY_SERVICE_REQUEST_ID,
    contractInfo,
  };
};
//------------INVOICE----------------
//call api***
export const actGetInfomationInvoiceByRequestServiceIDRequest =
  serviceRequestId => {
    return async dispatch => {
      try {
        const response = await fetch(
          API +
            'Invoice/GetInfomationInvoiceByServiceRequestID?serviceRequestID=' +
            serviceRequestId,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        const json = await response.json();
        if (json) {
          dispatch(actGetInfomationInvoiceByRequestServiceID(json));
        }
      } catch (error) {
        console.error(error);
      }
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
//------------INVOICE----------------
//call api
export const actGetPromotionCodeRequest = (userID, inviteCode) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API +
          'Promotion/GetPromotionCode?userID=' +
          userID +
          '&inviteCode=' +
          inviteCode,
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
        dispatch(actGetPromotionCode(json));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
//fetch promotion code
export const actGetPromotionCode = code => {
  return {
    type: types.GET_PROMOTION_CODE,
    code,
  };
};
//reset promotion error msg
export const actResetPromotionErrorMsg = () => {
  return {
    type: types.RESET_PROMOTION_ERROR_MSG,
  };
};
//call api
export const actGetAllPromotionByUserIDRequest = userID => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'Promotion/GetAllPromotionByUserID?userID=' + userID,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      if (json) {
        dispatch(actGetAllPromotionByUserID(json));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
//fetch all promotion code by user id
export const actGetAllPromotionByUserID = promotion => {
  return {
    type: types.GET_ALL_PROMOTION_BY_USER_ID,
    promotion,
  };
};
//------------INVITE CODE----------------
//call api
export const actCreateInviteCodeRequest = userID => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'InviteCode/CreateInviteCode?userID=' + userID,
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
        dispatch(actCreateInviteCode(json));
      }
    } catch (error) {
      console.error(error);
    }
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
