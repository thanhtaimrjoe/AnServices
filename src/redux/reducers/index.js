import {combineReducers} from 'redux';
import services from './services';
import message from './message';
import user from './user';
import requestService from './requestService';
import otp from './otp';
import requestDetail from './requestDetail';
import contract from './contract';
const myReducer = combineReducers({
  services,
  message,
  user,
  requestService,
  otp,
  requestDetail,
  contract,
});
export default myReducer;
