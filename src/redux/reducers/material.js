import * as types from '../../config/ActionTypes';
const inititalState = [];
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      state = inititalState;
      return state;
    case types.GET_ALL_MATERIAL:
      state = action.material;
      return state;
    default:
      return state;
  }
};
export default myReducer;
