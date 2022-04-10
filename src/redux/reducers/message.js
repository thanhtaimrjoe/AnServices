import * as types from '../../config/ActionTypes';
const inititalState = '';
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      state = inititalState;
      return state;
    case types.RESET_MESSAGE:
      state = inititalState;
      return state;
    case types.ERROR_CONNECT_API:
      state = 'ERROR_CONNECT_API';
      return state;
    case types.PHONE_NUMBER_WAS_EXIST:
      state = 'PHONE_NUMBER_WAS_EXIST';
      return state;
    case types.PHONE_NUMBER_NOT_EXIST:
      state = 'PHONE_NUMBER_NOT_EXIST';
      return state;
    case types.CHANGE_PHONE_NUMBER_SUCCESS:
      state = 'CHANGE_PHONE_NUMBER_SUCCESS';
      return state;
    case types.CHANGE_PHONE_NUMBER_FAILURE:
      state = 'CHANGE_PHONE_NUMBER_FAILURE';
      return state;
    case types.INSERT_REQUEST_MATERIAL_SUCCESS:
      state = 'INSERT_REQUEST_MATERIAL_SUCCESS';
      return state;
    case types.INSERT_REQUEST_MATERIAL_FAILURE:
      return 'INSERT_REQUEST_MATERIAL_FAILURE';
    case types.CREATE_REPORT_SUCCESS:
      return 'CREATE_REPORT_SUCCESS';
    case types.CREATE_REPORT_FAILURE:
      return 'CREATE_REPORT_FAILURE';
    case types.CANCEL_REQUEST_MATERIAL_SUCCESS:
      return 'CANCEL_REQUEST_MATERIAL_SUCCESS';
    case types.CANCEL_REQUEST_MATERIAL_FAILURE:
      return 'CANCEL_REQUEST_MATERIAL_FAILURE';
    default:
      return state;
  }
};
export default myReducer;
