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
export const actGetErrorConnectAPIMessage = () => {
  return {
    type: types.ERROR_CONNECT_API,
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
      if (response.ok) {
        const json = await response.json();
        if (json) {
          dispatch(actGetUserInfo(json));
        }
      } else {
        dispatch(actGetErrorConnectAPIMessage());
      }
    } catch (error) {}
  };
};
//fetch user
export const actGetUserInfo = user => {
  return {
    type: types.GET_USER_INFO,
    user,
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
//------------SERVICE----------------
//call api
export const actGetAllRequestServiceByWorkerIDRequest = id => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'Service/GetAllRequestServiceByWorkerID?id=' + id,
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
        dispatch(actGetAllRequestServiceByWorkerID(json));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
//fetch requestService
export const actGetAllRequestServiceByWorkerID = requestService => {
  return {
    type: types.GET_ALL_REQUEST_SERVICE_BY_WORKER_ID,
    requestService,
  };
};
//reset requestDetail
export const actResetRequestDetail = () => {
  return {
    type: types.RESET_REQUEST_DETAIL,
  };
};
//call api
export const actGetAllRequestServiceDetailsByRequestServiceIDAndWorkerIDRequest =
  (requestServiceID, workerID) => {
    return async dispatch => {
      try {
        const response = await fetch(
          API +
            'Service/GetAllRequestServiceDetailsByRequestServiceIDAndWorkerID?requestID=' +
            requestServiceID +
            '&workerID=' +
            workerID,
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
          dispatch(
            actGetRequestServiceDetailsByRequestServiceIDAndWorkerID(json),
          );
        }
      } catch (error) {
        console.error(error);
      }
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
//call api
export const actGetAllMaterialByRequestDetailIDRequest = id => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'Material/GetAllMaterialByRequestDetailID?id=' + id,
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
        dispatch(actGetAllMaterialByRequestDetailID(json));
      }
    } catch (error) {
      console.error(error);
    }
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
//call api
export const actGetAllMaterialRequest = () => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'Material/GetAllMaterial', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (json) {
        dispatch(actGetAllMaterial(json));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
//fetch material
export const actGetAllMaterial = material => {
  return {
    type: types.GET_ALL_MATERIAL,
    material,
  };
};
//call api
export const actInsertRequestMaterialRequest = requestMaterial => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'Material/InsertRequestMaterial', {
        method: 'POST',
        headers: {
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
      }
    } catch (error) {
      dispatch(actInsertRequestMaterialFailure());
      console.error(error);
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
//call api
export const actCancelRequestMaterialRequest = usedMaterialId => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'Material/CancelRequestMaterial?id=' + usedMaterialId,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('response.status', response.status);
      if (response.status === 200) {
        dispatch(actCancelRequestMaterialSuccess());
      } else {
        dispatch(actCancelRequestMaterialFailure());
      }
    } catch (error) {
      dispatch(actCancelRequestMaterialFailure());
      console.error(error);
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
//call api
export const actCreateReportRequest = reportItem => {
  return async dispatch => {
    try {
      const response = await fetch(API + 'Report/CreateReport', {
        method: 'POST',
        headers: {
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
      console.error(error);
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
//call api
export const actGetAllReportByRequestDetailIDRequest = requestDetailId => {
  return async dispatch => {
    try {
      const response = await fetch(
        API + 'Report/GetAllReportByRequestDetailID?id=' + requestDetailId,
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
        dispatch(actGetAllReportByRequestDetailID(json));
      }
    } catch (error) {
      console.error(error);
    }
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
//test
export const actTestRequest = formData => {
  return async dispatch => {
    console.log('zo api1111', formData);
    try {
      console.log('zo api', formData);
      const response = await fetch(
        'https://anservice-capstone.conveyor.cloud/api/Contract/' + 'Test',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );
      console.log('response.status', response.status);
    } catch (error) {
      console.error(error);
    }
  };
};
