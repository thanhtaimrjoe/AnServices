import * as types from '../../config/actionTypes';
const inititalState = {};
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      state = inititalState;
      return state;
    case types.RESET_PROMOTION_ERROR_MSG:
      state = inititalState;
      return state;
    case types.GET_PROMOTION_CODE:
      state = action.code;
      return state;
    default:
      return state;
  }
};
export default myReducer;
