import * as types from '../../config/ActionTypes';
const inititalState = [];
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      state = inititalState;
      return state;
    case types.RESET_USED_MATERIAL_STATE:
      state = inititalState;
      return state;
    case types.GET_ALL_MATERIAL_BY_REQUEST_DETAIL_ID:
      state = action.usedMaterial;
      return state;
    default:
      return state;
  }
};
export default myReducer;
