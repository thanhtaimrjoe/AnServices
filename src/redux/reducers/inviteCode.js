import * as types from '../../config/actionTypes';
const inititalState = '';
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      state = inititalState;
      return state;
    case types.RESET_INVITE_CODE:
      state = inititalState;
      return state;
    case types.GET_INVITE_CODE:
      state = action.inviteCode;
      return state;
    default:
      return state;
  }
};
export default myReducer;
