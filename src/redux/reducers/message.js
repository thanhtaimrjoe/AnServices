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
    case types.CREATE_REQUEST_SERVICE_SUCCESS:
      state = 'SUCCESS';
      return state;
    case types.CREATE_REQUEST_SERVICE_FAILURE:
      state = 'FAILURE';
      return state;
    case types.CREATE_CUSTOMER_ACCOUNT_SUCCESS:
      state = 'CREATE_CUSTOMER_ACCOUNT_SUCCESS';
      return state;
    case types.CREATE_CUSTOMER_ACCOUNT_FAILURE:
      state = 'CREATE_CUSTOMER_ACCOUNT_FAILURE';
      return state;
    case types.CANCEL_REQUEST_SERVICE_SUCCESS:
      state = 'CANCEL_REQUEST_SERVICE_SUCCESS';
      return state;
    case types.CANCEL_REQUEST_SERVICE_FAILURE:
      state = 'CANCEL_REQUEST_SERVICE_FAILURE';
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
    default:
      return state;
  }
};
export default myReducer;
