import {combineReducers} from 'redux';
import services from './services';
import message from './message';
import user from './user';
import listRequestService from './listRequestService';
import otp from './otp';
const myReducer = combineReducers({
  services, //services: services
  message, //message: message
  user, //user:user
  listRequestService, //listRequestService: listRequestService
  otp, //otp: otp
});
export default myReducer;
