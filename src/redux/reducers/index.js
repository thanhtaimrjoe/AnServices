import {combineReducers} from 'redux';
import user from './user';
import otp from './otp';
import requestService from './requestService';
import requestDetail from './requestDetail';
import usedMaterial from './usedMaterial';
import material from './material';
import message from './message';
import report from './report';
import workerInfo from './workerInfo';
const myReducer = combineReducers({
  user,
  otp,
  requestService,
  requestDetail,
  usedMaterial,
  material,
  message,
  report,
  workerInfo,
});
export default myReducer;
