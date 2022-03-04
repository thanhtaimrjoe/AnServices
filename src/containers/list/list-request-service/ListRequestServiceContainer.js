import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ListRequestService from '../../../components/list/list-request-service/ListRequestService';
import {
  actGetAllRequestServiceByUserIDRequest,
  actGetRequestServiceByUserIDAndStatusRequest,
  actResetRequestService,
} from '../../../redux/actions/index';

export default function ListRequestServiceContainer(props) {
  const {navigation} = props;
  //state --- refreshing
  const [refreshing, setRefreshing] = useState(false);
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- requestService
  const requestService = useSelector(state => state.requestService);
  //list filter status
  const listFilterStatus = [
    {
      statusID: 0,
      statusName: 'Tất cả',
    },
    {
      statusID: 2,
      statusName: 'Đang chờ',
    },
    {
      statusID: 3,
      statusName: 'Chấp thuận',
    },
    {
      statusID: 6,
      statusName: 'Đang sửa',
    },
    {
      statusID: 1,
      statusName: 'Từ chối',
    },
  ];

  //get dipatch
  const dispatch = useDispatch();
  //call api --- get all request service by user id
  const getAllRequestServiceByUserIDRequest = id =>
    dispatch(actGetAllRequestServiceByUserIDRequest(id));
  //call api --- get request service by user id and status
  const getRequestServiceByUserIDAndStatusRequest = (userID, statusID) =>
    dispatch(actGetRequestServiceByUserIDAndStatusRequest(userID, statusID));
  //reset request service
  const resetRequestService = () => dispatch(actResetRequestService());

  useEffect(() => {
    getAllRequestServiceByUserIDRequest(user.id);
    //reload page when focused
    const willFocusSubscription = navigation.addListener('focus', () => {
      getAllRequestServiceByUserIDRequest(user.id);
    });
    return willFocusSubscription;
  }, []);

  //refresh request service by status
  const onRefreshRequestServiceByStatus = statusID => {
    setRefreshing(true);
    //if status === 'All' -> refresh request service
    if (statusID === 0) {
      getAllRequestServiceByUserIDRequest(user.id);
    } else {
      getRequestServiceByUserIDAndStatusRequest(user.id, statusID);
    }
    setRefreshing(false);
  };

  //button --- navigate to request detail
  const onShowRequestDetail = requestService => {
    navigation.navigate('RequestDetailContainer', {
      requestService: requestService,
    });
  };

  //tap on filter -> get request service by status
  const onGetRequestServiceByStatus = statusID => {
    //reset request service before get new
    resetRequestService();
    if (statusID === 0) {
      getAllRequestServiceByUserIDRequest(user.id);
    } else {
      getRequestServiceByUserIDAndStatusRequest(user.id, statusID);
    }
  };

  return (
    <ListRequestService
      refreshing={refreshing}
      listFilterStatus={listFilterStatus}
      requestService={requestService}
      onRefreshRequestServiceByStatus={onRefreshRequestServiceByStatus}
      onShowRequestDetail={onShowRequestDetail}
      onGetRequestServiceByStatus={onGetRequestServiceByStatus}
    />
  );
}
