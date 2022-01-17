import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ListRequestService from '../../components/list/ListRequestService';
import * as actions from '../../redux/actions/index';

export default function ListRequestServiceContainer() {
  const user = useSelector(state => state.user);
  const listRequestService = useSelector(state => state.listRequestService);
  const dispatch = useDispatch();
  const getAllRequestServiceByUserID = id =>
    dispatch(actions.actGetAllRequestServiceByUserIDRequest(id));
  useEffect(() => {
    getAllRequestServiceByUserID(user.id);
  }, []);
  const refreshListRequestService = () => {
    getAllRequestServiceByUserID(user.id);
  };
  return (
    <ListRequestService
      listRequestService={listRequestService}
      onRefresh={refreshListRequestService}
    />
  );
}
