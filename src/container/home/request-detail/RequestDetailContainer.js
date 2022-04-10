import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RequestDetail from '../../../components/home/request-detail/RequestDetail';
import {
  actGetAllRequestServiceDetailsByRequestServiceIDAndWorkerIDRequest,
  actResetRequestDetail,
} from '../../../redux/actions/index';

export default function RequestDetailContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {requestService} = props.route.params;
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- requestDetail
  const requestDetail = useSelector(state => state.requestDetail);
  //get token
  const token = 'Bearer ' + user.token;

  //get dispatch
  const dispatch = useDispatch();
  //call api --- get request service details by request service id
  const getAllRequestServiceDetailsByRequestServiceIDAndWorkerIDRequest = (
    requestServiceID,
    workerID,
    token,
  ) =>
    dispatch(
      actGetAllRequestServiceDetailsByRequestServiceIDAndWorkerIDRequest(
        requestServiceID,
        workerID,
        token,
      ),
    );
  //reset request detail
  const resetRequestDetail = () => dispatch(actResetRequestDetail());

  useEffect(() => {
    resetRequestDetail();
    getAllRequestServiceDetailsByRequestServiceIDAndWorkerIDRequest(
      requestService.serviceRequestId,
      user.id,
      token,
    );
    //reload page when focused
    const willFocusSubscription = navigation.addListener('focus', () => {
      resetRequestDetail();
      getAllRequestServiceDetailsByRequestServiceIDAndWorkerIDRequest(
        requestService.serviceRequestId,
        user.id,
        token,
      );
    });
    return willFocusSubscription;
  }, []);

  //button --- navigate to material detail
  const onShowMaterialDetail = requestDetailItem => {
    navigation.navigate('MaterialDetailContainer', {
      requestDetailItem: requestDetailItem,
      requestServicePackage: requestService.serviceRequestPackage,
    });
  };

  return (
    <RequestDetail
      requestService={requestService}
      requestDetail={requestDetail}
      onShowMaterialDetail={onShowMaterialDetail}
    />
  );
}
