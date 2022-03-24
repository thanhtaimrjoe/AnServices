import {combineReducers} from 'redux';
import services from './services';
import message from './message';
import user from './user';
import serviceRequest from './serviceRequest';
import otp from './otp';
import requestDetail from './requestDetail';
import contract from './contract';
import invoice from './invoice';
import code from './code';
import promotion from './promotion';
import contractInfo from './contractInfo';
import inviteCode from './inviteCode';
const myReducer = combineReducers({
  services,
  message,
  user,
  serviceRequest,
  otp,
  requestDetail,
  contract,
  invoice,
  code,
  promotion,
  contractInfo,
  inviteCode,
});
export default myReducer;
