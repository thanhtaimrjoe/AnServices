import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RequestMaterial from '../../../components/home/request-material/RequestMaterial';
import {
  actGetAllMaterialRequest,
  actInsertRequestMaterialRequest,
  actResetMessage,
} from '../../../redux/actions/index';

export default function RequestMaterialContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {requestDetailItem} = props.route.params;
  //state --- upload
  const [uploading, setUploading] = useState(false);
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- material
  const material = useSelector(state => state.material);
  //reducer --- message
  const message = useSelector(state => state.message);

  //get dispatch
  const dispatch = useDispatch();
  //call api --- get all material
  const getAllMaterialRequest = () => dispatch(actGetAllMaterialRequest());
  //call api --- insert request material
  const insertRequestMaterialRequest = requestMaterial =>
    dispatch(actInsertRequestMaterialRequest(requestMaterial));
  //reset message
  const resetMessage = () => dispatch(actResetMessage());

  useEffect(() => {
    getAllMaterialRequest();
    if (message === 'INSERT_REQUEST_MATERIAL_SUCCESS') {
      Alert.alert('Thông báo', 'Yêu cầu của bạn đã được gửi thành công', [
        {
          text: 'OK',
          onPress: () => {
            resetMessage();
            setUploading(false);
            navigation.goBack();
          },
        },
      ]);
    }
  }, [message]);

  //button --- insert request material
  const onInsertRequestMaterial = materialList => {
    setUploading(true);
    const requestMaterial = {
      workerID: user.id,
      requestDetailID: requestDetailItem.requestDetailId,
      materialList: materialList,
    };
    insertRequestMaterialRequest(requestMaterial);
  };

  return (
    <RequestMaterial
      uploading={uploading}
      requestDetailItem={requestDetailItem}
      material={material}
      onInsertRequestMaterial={onInsertRequestMaterial}
    />
  );
}
