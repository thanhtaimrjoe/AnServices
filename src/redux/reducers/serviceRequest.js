import * as types from '../../config/actionTypes';
const inititalState = [];
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      state = inititalState;
      return state;
    case types.RESET_SERVICE_REQUEST:
      state = inititalState;
      return state;
    case types.GET_SERVICE_REQUEST_BY_USER_ID_AND_STATUS:
      state = action.serviceRequest;
      return state;
    default:
      return state;
  }
};
export default myReducer;
