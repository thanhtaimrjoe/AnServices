import * as types from '../../config/actionTypes';
const inititalState = [];
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.GET_ALL_REQUEST_SERVICE_BY_USER_ID:
      state = action.listRequestService;
      return state;
    default:
      return state;
  }
};
export default myReducer;
