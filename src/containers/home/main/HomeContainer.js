import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Home from '../../../components/home/main/Home';
import {actGetAllServiceRequest} from '../../../redux/actions/index';

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

  useEffect(() => {
    getAllServiceRequest(token);
  }, []);

  //button --- navigate to service request page
  const onServiceRequest = () => {
    navigation.navigate('ServiceRequestContainer', {
      serviceRequestRework: null,
    });
  };

  return <Home services={services} onServiceRequest={onServiceRequest} />;
}
