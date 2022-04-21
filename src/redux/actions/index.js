import * as types from '../../config/ActionTypes';
import {API} from '../../config/API_URI';
//----------CLEAR DATA---------------
export const actClearData = () => {
  return {
    type: types.CLEAR_DATA,
  };
};
//------------MESSAGE----------------
export const actResetMessage = () => {
  return {
    type: types.RESET_MESSAGE,
  };
};
export const actSystemError = () => {
  return {
    type: types.SYSTEM_ERROR,
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
//fetch user
export const actGetUserInfo = user => {
  return {
    type: types.GET_USER_INFO,
    user,
  };
};
//call api --- authen
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
//call api --- authen
export const actGetWorkerByIDRequest = (userID, token) => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'User/GetWorkerById?id=' + userID, {
        method: 'GET',
        headers: {
          Authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (json) {
        dispatch(actGetWorkerInfo(json));
      }
    } catch (error) {}
  };
};
//get worker info
export const actGetWorkerInfo = workerInfo => {
  return {
    type: types.GET_WORKER_BY_ID,
    workerInfo,
  };
};
//call api
export const actCheckPhoneNumberExistOrNotRequest = newPhoneNumber => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'User/LoginCustomerOrWorker?phoneNumber=' + newPhoneNumber,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.ok) {
        const json = await response.json();
        if (json) {
          dispatch(actPhoneNumberWasExist());
        }
      } else {
        dispatch(actPhoneNumberNotExist());
      }
    } catch (error) {}
  };
};

//phone number was exist
export const actPhoneNumberWasExist = () => {
  return {
    type: types.PHONE_NUMBER_WAS_EXIST,
  };
};

//phone number not exist
export const actPhoneNumberNotExist = () => {
  return {
    type: types.PHONE_NUMBER_NOT_EXIST,
  };
};
//call api
export const actChangePhoneNumberRequest = (userID, newPhoneNumber, token) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API +
          'User/ChangePhoneNumber?userID=' +
          userID +
          '&phoneNumber=' +
          newPhoneNumber,
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
        dispatch(actChangePhoneNumberSuccess());
      } else {
        dispatch(actChangePhoneNumberFailure());
      }
    } catch (error) {
      dispatch(actChangePhoneNumberFailure());
    }
  };
};
//change phone number success
export const actChangePhoneNumberSuccess = () => {
  return {
    type: types.CHANGE_PHONE_NUMBER_SUCCESS,
  };
};
//change phone number failure
export const actChangePhoneNumberFailure = () => {
  return {
    type: types.CHANGE_PHONE_NUMBER_FAILURE,
  };
};
//------------SERVICE----------------
//call api*** --- authen
export const actGetAllServiceRequestByWorkerIDRequest = (
  userID,
  status,
  token,
) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API +
          'Service/GetAllServiceRequestByWorkerID?id=' +
          userID +
          '&status=' +
          status,
        {
          method: 'GET',
          headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        const json = await response.json();
        if (json) {
          dispatch(actGetAllRequestServiceByWorkerID(json));
        }
      } else {
        const json = await response.json();
        if (json.errorsMsg[0] === 'No Request Service Availabe') {
          dispatch(actGetAllRequestServiceByWorkerID(json));
        }
      }
    } catch (error) {}
  };
};
//fetch requestService
export const actGetAllRequestServiceByWorkerID = requestService => {
  return {
    type: types.GET_ALL_REQUEST_SERVICE_BY_WORKER_ID,
    requestService,
  };
};
//reset service request
export const actResetServiceRequest = () => {
  return {
    type: types.RESET_SERVICE_REQUEST,
  };
};
//reset requestDetail
export const actResetRequestDetail = () => {
  return {
    type: types.RESET_REQUEST_DETAIL,
  };
};
//call api --- authen
export const actGetAllRequestServiceDetailsByRequestServiceIDAndWorkerIDRequest =
  (requestServiceID, workerID, token) => {
    return async dispatch => {
      try {
        const response = await fetch(
          API +
            'Service/GetAllServiceRequestDetailsByServiceRequestIDAndWorkerID?requestID=' +
            requestServiceID +
            '&workerID=' +
            workerID,
          {
            method: 'GET',
            headers: {
              Authorization: token,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.status === 200) {
          const json = await response.json();
          if (json) {
            dispatch(
              actGetRequestServiceDetailsByRequestServiceIDAndWorkerID(json),
            );
          }
        }
      } catch (error) {}
    };
  };
//reset requestDetail
export const actGetRequestServiceDetailsByRequestServiceIDAndWorkerID =
  requestDetail => {
    return {
      type: types.GET_REQUEST_SERVICE_DETAILS_BY_REQUEST_SERVICE_ID_AND_WORKER_ID,
      requestDetail,
    };
  };
//---------------MATERIAL-----------------
//call api --- authen
export const actGetAllMaterialByRequestDetailIDRequest = (id, token) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'Material/GetAllMaterialByRequestDetailID?id=' + id,
        {
          method: 'GET',
          headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        const json = await response.json();
        if (json) {
          dispatch(actGetAllMaterialByRequestDetailID(json));
        }
      } else {
        const json = await response.json();
        if (json.errorsMsg[0] === 'No Record') {
          dispatch(actGetAllMaterialByRequestDetailID(json));
        }
      }
    } catch (error) {}
  };
};
//fetch usedMaterial
export const actGetAllMaterialByRequestDetailID = usedMaterial => {
  return {
    type: types.GET_ALL_MATERIAL_BY_REQUEST_DETAIL_ID,
    usedMaterial,
  };
};
//reset usedMaterial
export const actResetUsedMaterialState = () => {
  return {
    type: types.RESET_USED_MATERIAL_STATE,
  };
};
//call api --- authen
export const actGetAllMaterialRequest = token => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'Material/GetAllMaterial', {
        method: 'GET',
        headers: {
          Authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        if (json) {
          dispatch(actGetAllMaterial(json));
        }
      }
    } catch (error) {}
  };
};
//fetch material
export const actGetAllMaterial = material => {
  return {
    type: types.GET_ALL_MATERIAL,
    material,
  };
};
//call api --- authen
export const actInsertRequestMaterialRequest = (requestMaterial, token) => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'Material/InsertRequestMaterial', {
        method: 'POST',
        headers: {
          Authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workerID: requestMaterial.workerID,
          requestDetailID: requestMaterial.requestDetailID,
          materialList: requestMaterial.materialList,
        }),
      });
      if (response.status === 200) {
        dispatch(actInsertRequestMaterialSuccess());
      } else {
        dispatch(actInsertRequestMaterialFailure());
      }
    } catch (error) {
      dispatch(actInsertRequestMaterialFailure());
    }
  };
};
//insert request material SUCCESS
export const actInsertRequestMaterialSuccess = () => {
  return {
    type: types.INSERT_REQUEST_MATERIAL_SUCCESS,
  };
};
//insert request material FAILURE
export const actInsertRequestMaterialFailure = () => {
  return {
    type: types.INSERT_REQUEST_MATERIAL_FAILURE,
  };
};
//call api --- authen
export const actCancelRequestMaterialRequest = (usedMaterialId, token) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'Material/CancelRequestMaterial?id=' + usedMaterialId,
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
        dispatch(actCancelRequestMaterialSuccess());
      } else {
        dispatch(actCancelRequestMaterialFailure());
      }
    } catch (error) {
      dispatch(actCancelRequestMaterialFailure());
    }
  };
};
//cancel request material success
export const actCancelRequestMaterialSuccess = () => {
  return {
    type: types.CANCEL_REQUEST_MATERIAL_SUCCESS,
  };
};
//cancel request material failure
export const actCancelRequestMaterialFailure = () => {
  return {
    type: types.CANCEL_REQUEST_MATERIAL_FAILURE,
  };
};
//---------------REPORT-------------------
//call api --- authen
export const actCreateReportRequest = (reportItem, token) => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'Report/CreateReport', {
        method: 'POST',
        headers: {
          Authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestDetailID: reportItem.requestDetailID,
          workerID: reportItem.workerID,
          reportTitle: reportItem.reportTitle,
          reportDescription: reportItem.reportDescription,
          mediaList: reportItem.mediaList,
        }),
      });
      if (response.status === 200) {
        dispatch(actCreateReportSuccess());
      } else {
        dispatch(actCreateReportFailure());
      }
    } catch (error) {
      dispatch(actCreateReportFailure());
    }
  };
};
//create report SUCCESS
export const actCreateReportSuccess = () => {
  return {
    type: types.CREATE_REPORT_SUCCESS,
  };
};
//create report FAILURE
export const actCreateReportFailure = () => {
  return {
    type: types.CREATE_REPORT_FAILURE,
  };
};
//call api --- authen
export const actGetAllReportByRequestDetailIDRequest = (
  requestDetailId,
  token,
) => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'Report/GetAllReportByRequestDetailID?id=' + requestDetailId,
        {
          method: 'GET',
          headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        const json = await response.json();
        if (json) {
          dispatch(actGetAllReportByRequestDetailID(json));
        }
      } else {
        const json = await response.json();
        if (json.errorsMsg[0] === 'No record') {
          dispatch(actGetAllReportByRequestDetailID(json));
        }
      }
    } catch (error) {}
  };
};
//fetch report
export const actGetAllReportByRequestDetailID = report => {
  return {
    type: types.GET_ALL_REPORT_BY_REQUEST_DETAIL_ID,
    report,
  };
};
//reset report state
export const actResetReportState = () => {
  return {
    type: types.RESET_REPORT_STATE,
  };
};
