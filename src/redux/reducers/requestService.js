import * as types from '../../config/ActionTypes';
const inititalState = [];
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      state = inititalState;
      return state;
    case types.GET_ALL_REQUEST_SERVICE_BY_WORKER_ID:
      state = action.requestService;
      return state;
    default:
      return state;
  }
};
export default myReducer;
