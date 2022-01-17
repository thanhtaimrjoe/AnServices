import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Home from '../../components/home/Home';
import * as actions from '../../redux/actions/index';

export default function HomeContainer(props) {
  const {navigation} = props;
  const services = useSelector(state => state.services);
  const dispatch = useDispatch();
  const getAllServiceRequest = () =>
    dispatch(actions.actGetAllServiceRequest());
  useEffect(() => {
    getAllServiceRequest();
  }, []);
  const requestService = () => {
    navigation.navigate('RequestServiceContainer');
  };
  return <Home services={services} onRequestService={requestService} />;
}
