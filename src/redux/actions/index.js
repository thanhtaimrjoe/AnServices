import * as types from '../../config/actionTypes';
import {
  API_SERVICE_URI,
  API_USER_URI,
  API_CONTRACT_URI,
} from '../../config/API_URI';
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
        API_USER_URI + 'LoginCustomerOrWorker?phoneNumber=' + phoneNumber,
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
      const response = await fetch(API_USER_URI + 'SendSms', {
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
      const response = await fetch(API_USER_URI + 'CreateCustomerAccount', {
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
        }),
      });
      if (response.status === 200) {
        dispatch(actCreateCustomerAccountSuccess());
      } else {
        dispatch(actCreateCustomerAccountFailure());
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
//fetch user
export const actGetUserInfo = user => {
  return {
    type: types.GET_USER_INFO,
    user,
  };
};
//------------SERVICE----------------
//call api
export const actGetAllServiceRequest = token => {
  return async dispatch => {
    try {
      const response = await fetch(API_SERVICE_URI + 'GetAllService', {
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
//call api
// export const actCreateRequestServiceRequest = requestService => {
//   return async dispatch => {
//     try {
//       const response = await fetch(API_SERVICE_URI + 'CreateRequestService', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           customerId: requestService.customerId,
//           customerName: requestService.customerName,
//           customerPhone: requestService.customerPhone,
//           customerAddress: requestService.customerAddress,
//           serviceList: requestService.serviceList,
//           requestServiceDescription: requestService.requestServiceDescription,
//           mediaList: requestService.mediaList,
//         }),
//       });
//       if (response.status === 200) {
//         dispatch(createRequestSuccess());
//       } else {
//         dispatch(createRequestFailure());
//       }
//     } catch (error) {
//       console.error(error);
//       dispatch(createRequestFailure());
//     }
//   };
// };
//call api with formData format
export const actCreateRequestServiceRequest = formData => {
  return async dispatch => {
    try {
      const response = await fetch(API_SERVICE_URI + 'CreateRequestService', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      console.log('response.status', response.status);
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
//create request service SUCCESS
export const createRequestSuccess = () => {
  return {
    type: types.CREATE_REQUEST_SERVICE_SUCCESS,
  };
};
//create request service FAILURE
export const createRequestFailure = () => {
  return {
    type: types.CREATE_REQUEST_SERVICE_FAILURE,
  };
};
//call api
export const actGetAllRequestServiceByUserIDRequest = userID => {
  return async dispatch => {
    try {
      const response = await fetch(
        API_SERVICE_URI + 'GetAllRequestServiceByUserID?id=' + userID,
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
        dispatch(actGetAllRequestServiceByUserID(json));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
//fetch request service
export const actGetAllRequestServiceByUserID = requestService => {
  return {
    type: types.GET_ALL_REQUEST_SERVICE_BY_USER_ID,
    requestService,
  };
};
//call api
export const actGetAllRequestServiceDetailsByRequestServiceIDRequest =
  requestServiceId => {
    return async dispatch => {
      try {
        const response = await fetch(
          API_SERVICE_URI +
            'GetAllRequestServiceDetailsByRequestServiceID?id=' +
            requestServiceId,
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
//call api
export const actGetRequestServiceByUserIDAndStatusRequest = (
  userID,
  statusID,
) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API_SERVICE_URI +
          'GetRequestServiceByUserIDAndStatus?id=' +
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
        dispatch(actGetRequestServiceByUserIDAndStatus(json));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
//fetch request service
export const actGetRequestServiceByUserIDAndStatus = requestService => {
  return {
    type: types.GET_REQUEST_SERVICE_BY_USER_ID_AND_STATUS,
    requestService,
  };
};
//reset request service
export const actResetRequestService = () => {
  return {
    type: types.RESET_REQUEST_SERVICE,
  };
};
//reset request detail
export const actResetRequestDetail = () => {
  return {
    type: types.RESET_REQUEST_DETAIL,
  };
};
//call api
export const actCancelRequestServiceRequest = requestServiceId => {
  return async dispatch => {
    try {
      const response = await fetch(
        API_SERVICE_URI + 'CancelRequestService?id=' + requestServiceId,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        dispatch(actCancelRequestServiceSuccess());
      } else {
        dispatch(actCancelRequestServiceFailure());
      }
    } catch (error) {
      dispatch(actCancelRequestServiceFailure());
      console.error(error);
    }
  };
};
//cancel request service SUCCESS
export const actCancelRequestServiceSuccess = () => {
  return {
    type: types.CANCEL_REQUEST_SERVICE_SUCCESS,
  };
};
//cancel request service FAILURE
export const actCancelRequestServiceFailure = () => {
  return {
    type: types.CANCEL_REQUEST_SERVICE_FAILURE,
  };
};
//------------CONTRACT----------------
//call api
export const actGetContractListByUserIDRequest = userID => {
  return async dispatch => {
    try {
      const response = await fetch(
        API_CONTRACT_URI + 'GetContractListByUserID?id=' + userID,
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
        API_CONTRACT_URI + 'ApproveContract?id=' + contractId,
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
        API_CONTRACT_URI + 'RequestUpdateContract?id=' + contractId,
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
