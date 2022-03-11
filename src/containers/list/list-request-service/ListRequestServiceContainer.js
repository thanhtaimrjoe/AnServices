import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ListRequestService from '../../../components/list/list-request-service/ListRequestService';
import {
  actGetRequestServiceByUserIDAndStatusRequest,
  actResetRequestService,
} from '../../../redux/actions/index';

export default function ListRequestServiceContainer(props) {
  const {navigation} = props;
  //state --- refreshing
  const [refreshing, setRefreshing] = useState(false);
  //state --- status
  const [status, setStatus] = useState({
    statusID: 2,
    statusName: 'Đang chờ',
  });
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- requestService
  const requestService = useSelector(state => state.requestService);
  //list filter status
  const listFilterStatus = [
    {
      statusID: 2,
      statusName: 'Chưa xử lý',
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
      statusID: 14,
      statusName: 'Chờ thanh toán',
    },
    {
      statusID: 1,
      statusName: 'Từ chối',
    },
  ];

  //get dipatch
  const dispatch = useDispatch();
  //call api --- get request service by user id and status
  const getRequestServiceByUserIDAndStatusRequest = (userID, statusID) =>
    dispatch(actGetRequestServiceByUserIDAndStatusRequest(userID, statusID));
  //reset request service
  const resetRequestService = () => dispatch(actResetRequestService());

  useEffect(() => {
    getRequestServiceByUserIDAndStatusRequest(user.id, status.statusID);
  }, []);

  //refresh request service by status
  const onRefreshRequestServiceByStatus = () => {
    setRefreshing(true);
    getRequestServiceByUserIDAndStatusRequest(user.id, status.statusID);
    setRefreshing(false);
  };

  //button --- navigate to request detail
  const onShowRequestDetail = requestService => {
    navigation.navigate('RequestDetailContainer', {
      requestService: requestService,
    });
  };

  //tap on filter -> get request service by status
  const onGetRequestServiceByStatus = status => {
    //reset request service before get new
    resetRequestService();
    //change status state after tap
    setStatus(status);
    getRequestServiceByUserIDAndStatusRequest(user.id, status.statusID);
  };

  //button --- show invoice
  const onShowInvoice = requestServiceId => {
    navigation.navigate('InvoiceContainer', {
      requestServiceId: requestServiceId,
    });
  };

  return (
    <ListRequestService
      status={status}
      refreshing={refreshing}
      listFilterStatus={listFilterStatus}
      requestService={requestService}
      onRefreshRequestServiceByStatus={onRefreshRequestServiceByStatus}
      onShowRequestDetail={onShowRequestDetail}
      onGetRequestServiceByStatus={onGetRequestServiceByStatus}
      onShowInvoice={onShowInvoice}
    />
  );
}
