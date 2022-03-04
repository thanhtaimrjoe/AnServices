import * as types from '../../config/actionTypes';
const inititalState = [];
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      state = inititalState;
      return state;
    case types.RESET_REQUEST_SERVICE:
      state = inititalState;
      return state;
    case types.GET_ALL_REQUEST_SERVICE_BY_USER_ID:
      state = action.requestService;
      return state;
    case types.GET_REQUEST_SERVICE_BY_USER_ID_AND_STATUS:
      state = action.requestService;
      return state;
    default:
      return state;
  }
};
export default myReducer;
