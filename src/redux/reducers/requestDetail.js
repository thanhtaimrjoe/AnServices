import * as types from '../../config/actionTypes';
const inititalState = [];
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      state = inititalState;
      return state;
    case types.RESET_REQUEST_DETAIL:
      state = inititalState;
      return state;
    case types.GET_REQUEST_SERVICE_DETAILS_BY_REQUEST_SERVICE_ID:
      state = action.requestDetail;
      return state;
    default:
      return state;
  }
};
export default myReducer;
