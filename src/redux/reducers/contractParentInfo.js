import * as types from '../../config/actionTypes';
const inititalState = {};
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      state = inititalState;
      return state;
    case types.RESET_CONTRACT_PARENT:
      state = inititalState;
      return state;
    case types.GET_CONTRACT_PARENT_BY_SERVICE_REQUEST_REFERENCE:
      state = action.contractParentInfo;
      return state;
    default:
      return state;
  }
};
export default myReducer;
