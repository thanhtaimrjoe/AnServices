import * as types from '../../config/actionTypes';
const inititalState = [];
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.GET_ALL_SERVICE:
      state = action.services;
      return state;
    default:
      return state;
  }
};
export default myReducer;
