import * as types from '../../config/actionTypes';
const inititalState = '';
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      state = inititalState;
      return state;
    case types.RESET_MESSAGE:
      state = inititalState;
      return state;
    case types.INVALID_INVITE_CODE:
      state = 'INVALID_INVITE_CODE';
      return state;
    case types.CREATE_SERVICE_REQUEST_SUCCESS:
      state = 'CREATE_SERVICE_REQUEST_SUCCESS';
      return state;
    case types.CREATE_SERVICE_REQUEST_FAILURE:
      state = 'CREATE_SERVICE_REQUEST_FAILURE';
      return state;
    case types.CREATE_SERVICE_REQUEST_BANNED:
      state = 'CREATE_SERVICE_REQUEST_BANNED';
      return state;
    case types.CREATE_CUSTOMER_ACCOUNT_SUCCESS:
      state = 'CREATE_CUSTOMER_ACCOUNT_SUCCESS';
      return state;
    case types.CREATE_CUSTOMER_ACCOUNT_FAILURE:
      state = 'CREATE_CUSTOMER_ACCOUNT_FAILURE';
      return state;
    case types.CANCEL_SERVICE_REQUEST_SUCCESS:
      state = 'CANCEL_SERVICE_REQUEST_SUCCESS';
      return state;
    case types.CANCEL_SERVICE_REQUEST_FAILURE:
      state = 'CANCEL_SERVICE_REQUEST_FAILURE';
      return state;
    case types.APPROVE_CONTRACT_SUCCESS:
      state = 'APPROVE_CONTRACT_SUCCESS';
      return state;
    case types.APPROVE_CONTRACT_FAILURE:
      state = 'APPROVE_CONTRACT_FAILURE';
      return state;
    case types.REQUEST_UPDATE_CONTRACT_SUCCESS:
      state = 'REQUEST_UPDATE_CONTRACT_SUCCESS';
      return state;
    case types.REQUEST_UPDATE_CONTRACT_FAILURE:
      state = 'REQUEST_UPDATE_CONTRACT_FAILURE';
      return state;
    case types.UPDATE_STATUS_REQUEST_SERVICE_DETAIL_SUCCESS:
      state = 'UPDATE_STATUS_REQUEST_SERVICE_DETAIL_SUCCESS';
      return state;
    case types.UPDATE_STATUS_REQUEST_SERVICE_DETAIL_FAILURE:
      state = 'UPDATE_STATUS_REQUEST_SERVICE_DETAIL_FAILURE';
      return state;
    default:
      return state;
  }
};
export default myReducer;
