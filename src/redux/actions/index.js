import * as types from '../../config/actionTypes';
import {API_SERVICE_URI, API_USER_URI} from '../../config/API_URI';
//login customer and mason
export const actLoginCustomerOrMasonRequest = phoneNumber => {
  return async dispatch => {
    try {
      const response = await fetch(
        API_USER_URI + 'LoginCustomerOrManson?phoneNumber=' + phoneNumber,
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
export const actGetUserInfo = user => {
  return {
    type: types.GET_USER_INFO,
    user, //user: user
  };
};
export const actFetchUserInfo = user => {};
export const actGetAllServiceRequest = () => {
  return async dispatch => {
    try {
      const response = await fetch(API_SERVICE_URI + 'GetAllService', {
        method: 'GET',
        headers: {
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
export const actGetAllService = services => {
  return {
    type: types.GET_ALL_SERVICE,
    services, //services: services
  };
};
//create request service
export const actCreateRequestService = requestService => {
  return async dispatch => {
    try {
      const response = await fetch(API_SERVICE_URI + 'CreateRequestService', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: requestService.customerId,
          customerPhone: requestService.customerPhone,
          customerAddress: requestService.customerAddress,
          serviceList: requestService.serviceList,
          requestServiceDescription: requestService.requestServiceDescription,
          mediaList: requestService.mediaList,
        }),
      });
      if (response.status === 200) {
        dispatch(createRequestSuccess());
      } else {
        dispatch(createRequestFailure());
      }
    } catch (error) {
      console.error(error);
      dispatch(createRequestFailure());
    }
  };
};
export const actResetRequestService = () => {
  return {
    type: types.RESET_REQUEST_SERVICE,
  };
};
export const createRequestSuccess = () => {
  return {
    type: types.CREATE_REQUEST_SERVICE_SUCCESS,
  };
};
export const createRequestFailure = () => {
  return {
    type: types.CREATE_REQUEST_SERVICE_FAILURE,
  };
};
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
export const actGetAllRequestServiceByUserID = listRequestService => {
  return {
    type: types.GET_ALL_REQUEST_SERVICE_BY_USER_ID,
    listRequestService, //listRequestService: listRequestService
  };
};
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
      console.error(error);
    }
  };
};
export const actGetOTP = otp => {
  return {
    type: types.GET_OTP,
    otp, //otp: otp
  };
};
