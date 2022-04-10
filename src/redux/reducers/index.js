import {combineReducers} from 'redux';
import services from './services';
import message from './message';
import user from './user';
import serviceRequest from './serviceRequest';
import otp from './otp';
import requestDetail from './requestDetail';
import invoice from './invoice';
import promotion from './promotion';
import promotionInfo from './promotionInfo';
import contractInfo from './contractInfo';
import inviteCode from './inviteCode';
import contractParentInfo from './contractParentInfo';
const myReducer = combineReducers({
  services,
  message,
  user,
  serviceRequest,
  otp,
  requestDetail,
  invoice,
  promotion,
  promotionInfo,
  contractInfo,
  inviteCode,
  contractParentInfo,
});
export default myReducer;
