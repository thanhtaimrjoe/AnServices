import * as types from '../../config/actionTypes';
const inititalState = [];
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      state = inititalState;
      return state;
    case types.GET_ALL_PROMOTION_BY_USER_ID:
      state = action.promotion;
      return state;
    default:
      return state;
  }
};
export default myReducer;
