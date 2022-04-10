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
  //get token
  const token = 'Bearer ' + user.token;

  //get dispatch
  const dispatch = useDispatch();
  //call api --- get all material
  const getAllMaterialRequest = token =>
    dispatch(actGetAllMaterialRequest(token));
  //call api --- insert request material
  const insertRequestMaterialRequest = (requestMaterial, token) =>
    dispatch(actInsertRequestMaterialRequest(requestMaterial, token));
  //reset message
  const resetMessage = () => dispatch(actResetMessage());

  useEffect(() => {
    getAllMaterialRequest(token);
    if (message === 'INSERT_REQUEST_MATERIAL_SUCCESS') {
      resetMessage();
      setUploading(false);
      Alert.alert('Thông báo', 'Yêu cầu của bạn đã được gửi thành công', [
        {
          text: 'OK',
          onPress: () => {
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
    insertRequestMaterialRequest(requestMaterial, token);
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
