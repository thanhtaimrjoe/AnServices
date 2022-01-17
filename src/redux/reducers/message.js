import * as types from '../../config/actionTypes';
const inititalState = '';
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.RESET_REQUEST_SERVICE:
      state = inititalState;
      return state;
    case types.CREATE_REQUEST_SERVICE_SUCCESS:
      state = 'SUCCESS';
      return state;
    case types.CREATE_REQUEST_SERVICE_FAILURE:
      state = 'FAILURE';
      return state;
    default:
      return state;
  }
};
export default myReducer;
