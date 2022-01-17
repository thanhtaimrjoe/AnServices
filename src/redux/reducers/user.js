import * as types from '../../config/actionTypes';
const inititalState = [];
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.GET_USER_INFO:
      state = action.user;
      return state;
    default:
      return state;
  }
};
export default myReducer;
