import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Home from '../../../components/home/main/Home';
import {
  actGetAllServiceRequest,
  actGetUserInformationRequest,
} from '../../../redux/actions/index';
import NetInfo from '@react-native-community/netinfo';

export default function HomeContainer(props) {
  const {navigation} = props;
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- services
  const services = useSelector(state => state.services);
  //get token
  const token = 'Bearer ' + user.token;

  //get dispatch
  const dispatch = useDispatch();
  //call api --- get all service request
  const getAllServiceRequest = token =>
    dispatch(actGetAllServiceRequest(token));
  //call api --- get user information
  const getUserInformation = (userID, token) =>
    dispatch(actGetUserInformationRequest(userID, token));

  useEffect(() => {
    getAllServiceRequest(token);
    getUserInformation(user.id, token);
    //check internet connection
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert(
          'Thông báo',
          'Bạn đã bị mất kết nối. Vui lòng kiểm tra đường truyền.',
        );
      }
    });
    //unsubscribe
    return () => unsubscribe();
  }, []);

  //button --- navigate to service request page
  const onServiceRequest = () => {
    navigation.navigate('ServiceRequestContainer', {
      serviceRequestRework: null,
    });
  };

  return <Home services={services} onServiceRequest={onServiceRequest} />;
}
