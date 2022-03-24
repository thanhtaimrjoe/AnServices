import * as types from '../../config/actionTypes';
const inititalState = {};
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      state = inititalState;
      return state;
    case types.GET_CONTRACT_BY_SERVICE_REQUEST_ID:
      state = action.contractInfo;
      return state;
    default:
      return state;
  }
};
export default myReducer;
