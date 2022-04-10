import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Home from '../../../components/home/main/Home';
import {
  actGetAllServiceRequestByWorkerIDRequest,
  actGetWorkerByIDRequest,
  actResetServiceRequest,
} from '../../../redux/actions/index';

export default function HomeContainer(props) {
  const {navigation} = props;
  //state --- refreshing
  const [refreshing, setRefreshing] = useState(false);
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- requestService
  const requestService = useSelector(state => state.requestService);
  //reducer --- workerInfo
  const workerInfo = useSelector(state => state.workerInfo);
  //get token
  const token = 'Bearer ' + user.token;

  //get dispatch
  const dispatch = useDispatch();
  //call api --- get all request service by Worker id
  const getAllServiceRequestByWorkerID = (userID, status, token) =>
    dispatch(actGetAllServiceRequestByWorkerIDRequest(userID, status, token));
  //reset service request
  const resetServiceRequest = () => dispatch(actResetServiceRequest());
  //call api --- get worker infomation
  const getWorkerByIDRequest = (userID, token) =>
    dispatch(actGetWorkerByIDRequest(userID, token));

  useEffect(() => {
    getWorkerByIDRequest(user.id, token);
    getAllServiceRequestByWorkerID(user.id, 0, token);
  }, []);

  //list filter
  const listFilterStatus = [
    {
      statusID: 0,
      statusName: 'Đang nhận',
    },
    {
      statusID: 13,
      statusName: 'Đã xong',
    },
  ];

  //button --- get all re
  const onGetAllServiceRequestByWorkerID = statusID => {
    //reset service request before get new record
    resetServiceRequest();
    getAllServiceRequestByWorkerID(user.id, statusID, token);
  };

  //button --- navigate to request service detail
  const onShowRequestServiceDetail = requestService => {
    navigation.navigate('RequestDetailContainer', {
      requestService: requestService,
    });
  };

  //button --- refresh service request by Worker id
  const onRefreshServiceRequestByWorkerID = statusID => {
    setRefreshing(true);
    getAllServiceRequestByWorkerID(user.id, statusID, token);
    setRefreshing(false);
  };

  return (
    <Home
      user={user}
      workerInfo={workerInfo}
      refreshing={refreshing}
      requestService={requestService}
      listFilterStatus={listFilterStatus}
      onGetAllServiceRequestByWorkerID={onGetAllServiceRequestByWorkerID}
      onShowRequestServiceDetail={onShowRequestServiceDetail}
      onRefreshServiceRequestByWorkerID={onRefreshServiceRequestByWorkerID}
    />
  );
}
