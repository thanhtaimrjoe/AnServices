import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ListRequestService from '../../../components/list/list-request-service/ListRequestService';
import {
  actGetServiceRequestByUserIDAndStatusRequest,
  actResetServiceRequest,
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
  //reducer --- serviceRequest
  const serviceRequest = useSelector(state => state.serviceRequest);
  //list filter status
  const listFilterStatus = [
    {
      statusID: 2,
      statusName: 'Chưa xử lý',
    },
    {
      statusID: 15,
      statusName: 'Chờ khảo sát',
    },
    {
      statusID: 3,
      statusName: 'Đã đồng ý',
    },
    {
      statusID: 6,
      statusName: 'Đang xử lý',
    },
    {
      statusID: 14,
      statusName: 'Chờ thanh toán',
    },
    {
      statusID: 8,
      statusName: 'Đã hủy',
    },
    {
      statusID: 1,
      statusName: 'Đã từ chối',
    },
    {
      statusID: 13,
      statusName: 'Đã hoàn thành',
    },
  ];

  //get dipatch
  const dispatch = useDispatch();
  //call api --- get service request by user id and status
  const getServiceRequestByUserIDAndStatusRequest = (userID, statusID) =>
    dispatch(actGetServiceRequestByUserIDAndStatusRequest(userID, statusID));
  //reset service request
  const resetServiceRequest = () => dispatch(actResetServiceRequest());

  useEffect(() => {
    getServiceRequestByUserIDAndStatusRequest(user.id, status.statusID);
  }, []);

  //refresh request service by status
  const onRefreshServiceRequestByStatus = () => {
    setRefreshing(true);
    getServiceRequestByUserIDAndStatusRequest(user.id, status.statusID);
    setRefreshing(false);
  };

  //button --- navigate to request detail
  const onShowRequestDetail = serviceRequest => {
    navigation.navigate('RequestDetailContainer', {
      serviceRequest: serviceRequest,
    });
  };

  //tap on filter -> get request service by status
  const onGetServiceRequestByStatus = status => {
    //reset request service before get new
    resetServiceRequest();
    //change status state after tap
    setStatus(status);
    getServiceRequestByUserIDAndStatusRequest(user.id, status.statusID);
  };

  //button --- show invoice
  const onShowInvoice = serviceRequestId => {
    navigation.navigate('InvoiceContainer', {
      serviceRequestId: serviceRequestId,
    });
  };

  return (
    <ListRequestService
      status={status}
      refreshing={refreshing}
      listFilterStatus={listFilterStatus}
      serviceRequest={serviceRequest}
      onRefreshServiceRequestByStatus={onRefreshServiceRequestByStatus}
      onShowRequestDetail={onShowRequestDetail}
      onGetServiceRequestByStatus={onGetServiceRequestByStatus}
      onShowInvoice={onShowInvoice}
    />
  );
}
