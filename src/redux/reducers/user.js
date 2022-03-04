import * as types from '../../config/ActionTypes';
const inititalState = {};
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      state = inititalState;
      return state;
    case types.GET_USER_INFO:
      state = action.user;
      return state;
    default:
      return state;
  }
};
export default myReducer;
