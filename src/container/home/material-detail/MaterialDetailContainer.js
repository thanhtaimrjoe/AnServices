import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialDetail from '../../../components/home/material-detail/MaterialDetail';
import {
  actGetAllMaterialByRequestDetailIDRequest,
  actResetUsedMaterialState,
  actResetMessage,
  actGetAllReportByRequestDetailIDRequest,
  actInsertRequestMaterialRequest,
  actCancelRequestMaterialRequest,
  actResetReportState,
} from '../../../redux/actions/index';

export default function MaterialDetailContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {requestDetailItem, requestServicePackage} = props.route.params;
  //state --- upload
  const [uploading, setUploading] = useState(false);
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- usedMaterial
  const usedMaterial = useSelector(state => state.usedMaterial);
  //reducer --- message
  const message = useSelector(state => state.message);
  //reducer --- report
  const report = useSelector(state => state.report);

  //get dispatch
  const dispatch = useDispatch();
  //call api --- get all material by request detail id
  const getAllMaterialByRequestDetailID = id =>
    dispatch(actGetAllMaterialByRequestDetailIDRequest(id));
  //reset used material state
  const resetUsedMaterialState = () => dispatch(actResetUsedMaterialState());
  //call api --- insert request material
  const insertRequestMaterialRequest = requestMaterial =>
    dispatch(actInsertRequestMaterialRequest(requestMaterial));
  //reset message
  const resetMessage = () => dispatch(actResetMessage());
  //call api --- get all report by worker id
  const getAllReportByRequestDetailIDRequest = requestDetailId =>
    dispatch(actGetAllReportByRequestDetailIDRequest(requestDetailId));
  //call api ---cancel request material
  const cancelRequestMaterialRequest = usedMaterialId =>
    dispatch(actCancelRequestMaterialRequest(usedMaterialId));
  //reset report state
  const resetReportState = () => dispatch(actResetReportState());

  useEffect(() => {
    resetUsedMaterialState();
    resetReportState();
    getAllMaterialByRequestDetailID(requestDetailItem.requestDetailId);
    getAllReportByRequestDetailIDRequest(requestDetailItem.requestDetailId);
    //check message of insert request material
    if (message === 'INSERT_REQUEST_MATERIAL_SUCCESS') {
      Alert.alert('Thông báo', 'Yêu cầu của bạn đã được gửi thành công', [
        {
          text: 'OK',
          onPress: () => {
            resetMessage();
            setUploading(false);
          },
        },
      ]);
    }
    //check message of cancel request material
    if (message === 'CANCEL_REQUEST_MATERIAL_SUCCESS') {
      Alert.alert('Thông báo', 'Yêu cầu của bạn đã được hủy thành công', [
        {
          text: 'OK',
          onPress: () => {
            resetMessage();
          },
        },
      ]);
    }
    //reload page when focused
    const willFocusSubscription = navigation.addListener('focus', () => {
      resetUsedMaterialState();
      resetReportState();
      getAllMaterialByRequestDetailID(requestDetailItem.requestDetailId);
      getAllReportByRequestDetailIDRequest(requestDetailItem.requestDetailId);
    });
    return willFocusSubscription;
  }, [message]);

  //button --- navigate to report problem
  const onShowReportProblem = () => {
    navigation.navigate('ReportProblemContainer', {
      requestDetailItem: requestDetailItem,
    });
  };

  //button --- navigate to completed report
  const onShowCompletedReport = () => {
    navigation.navigate('CompletedReportContainer', {
      requestDetailItem: requestDetailItem,
    });
  };

  //button --- navigate to request material
  const onShowRequestMaterial = () => {
    navigation.navigate('RequestMaterialContainer', {
      requestDetailItem: requestDetailItem,
    });
  };

  //button --- request new material
  const onRequestNewMaterial = materialNewItem => {
    setUploading(true);
    const requestMaterial = {
      workerID: user.id,
      requestDetailID: requestDetailItem.requestDetailId,
      materialList: [materialNewItem],
    };
    insertRequestMaterialRequest(requestMaterial);
  };

  //button --- cancel request material
  const onCancelRequestMaterial = usedMaterialId => {
    Alert.alert('Thông báo', 'Bạn có chắc sẽ hủy yêu cầu này?', [
      {
        text: 'Có',
        onPress: () => {
          cancelRequestMaterialRequest(usedMaterialId);
        },
      },
      {
        text: 'Không',
      },
    ]);
  };

  //button --- show report detail
  const onShowReportDetail = reportItem => {
    navigation.navigate('ReportDetailContainer', {
      reportDetail: reportItem,
      requestDetailItem: requestDetailItem,
    });
  };

  return (
    <MaterialDetail
      uploading={uploading}
      message={message}
      requestServicePackage={requestServicePackage}
      isPrimary={requestDetailItem.tblRepairDetails[0].isPrimary}
      usedMaterial={usedMaterial}
      report={report}
      onShowReportProblem={onShowReportProblem}
      onShowCompletedReport={onShowCompletedReport}
      onShowRequestMaterial={onShowRequestMaterial}
      onRequestNewMaterial={onRequestNewMaterial}
      onCancelRequestMaterial={onCancelRequestMaterial}
      onShowReportDetail={onShowReportDetail}
    />
  );
}
