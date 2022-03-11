import * as types from '../../config/actionTypes';
const inititalState = [];
const myReducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      state = inititalState;
      return state;
    case types.RESET_INVOICE:
      state = inititalState;
      return state;
    case types.GET_INFORMATION_INVOICE_BY_REQUEST_SERVICE_ID:
      state = action.invoice;
      return state;
    default:
      return state;
  }
};
export default myReducer;
