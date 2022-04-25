import * as types from '../../config/actionTypes';
const inititalState = {};
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      state = inititalState;
      return state;
    case types.GET_SERVICE_REQUEST_INFO:
      state = action.serviceRequestInfo;
      return state;
    default:
      return state;
  }
};
export default myReducer;
