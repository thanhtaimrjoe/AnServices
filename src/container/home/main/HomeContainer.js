import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Home from '../../../components/home/main/Home';
import {actGetAllRequestServiceByWorkerIDRequest} from '../../../redux/actions/index';

export default function HomeContainer(props) {
  const {navigation} = props;
  //state --- refreshing
  const [refreshing, setRefreshing] = useState(false);
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- requestService
  const requestService = useSelector(state => state.requestService);

  //get dispatch
  const dispatch = useDispatch();
  //call api --- get all request service by Worker id
  const getAllRequestServiceByWorkerIDRequest = id =>
    dispatch(actGetAllRequestServiceByWorkerIDRequest(id));

  useEffect(() => {
    if (user.id) {
      getAllRequestServiceByWorkerIDRequest(user.id);
    }
  }, []);

  //list filter
  const listFilterStatus = [
    {
      status: 'Gần đây',
    },
    {
      status: 'Tất cả',
    },
  ];

  //button --- navigate to request service detail
  const onShowRequestServiceDetail = requestService => {
    navigation.navigate('RequestDetailContainer', {
      requestService: requestService,
    });
  };

  //button --- refresh request service by Worker id
  const onRefreshRequestServiceByWorkerID = () => {
    setRefreshing(true);
    getAllRequestServiceByWorkerIDRequest(user.id);
    setRefreshing(false);
  };

  return (
    <Home
      user={user}
      refreshing={refreshing}
      requestService={requestService}
      listFilterStatus={listFilterStatus}
      onShowRequestServiceDetail={onShowRequestServiceDetail}
      onRefreshRequestServiceByWorkerID={onRefreshRequestServiceByWorkerID}
    />
  );
}
