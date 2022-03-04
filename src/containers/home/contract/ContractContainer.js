import React, {useEffect, useState} from 'react';
import {Alert, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Contract from '../../../components/home/contract/Contract';
import {
  actGetContractListByUserIDRequest,
  actApproveContractRequest,
  actRequestUpdateContractRequest,
  actResetMessage,
} from '../../../redux/actions/index';

export default function ContractContainer(props) {
  const {navigation} = props;
  //state --- refreshing
  const [refreshing, setRefreshing] = useState(false);
  //reducer --- contract
  const contract = useSelector(state => state.contract);
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- message
  const message = useSelector(state => state.message);

  useEffect(() => {
    getContractListByUserID(user.id);
    if (message === 'APPROVE_CONTRACT_SUCCESS') {
      Alert.alert('Thông báo', 'Bạn đã chấp thuận thành công');
      resetMessage();
    }
    if (message === 'APPROVE_CONTRACT_FAILURE') {
      Alert.alert('Thông báo', 'Có lỗi phát sinh, mời bạn thử lại');
      resetMessage();
    }
    if (message === 'REQUEST_UPDATE_CONTRACT_SUCCESS') {
      Alert.alert('Thông báo', 'Bạn đã yêu cầu sửa chữa thành công');
      resetMessage();
    }
    if (message === 'REQUEST_UPDATE_CONTRACT_FAILURE') {
      Alert.alert('Thông báo', 'Có lỗi phát sinh, mời bạn thử lại');
      resetMessage();
    }
  }, [message]);

  //get dispatch
  const dispatch = useDispatch();
  const getContractListByUserID = userID =>
    dispatch(actGetContractListByUserIDRequest(userID));
  const approveContract = contractId =>
    dispatch(actApproveContractRequest(contractId));
  const requestUpdateContract = contractId =>
    dispatch(actRequestUpdateContractRequest(contractId));
  const resetMessage = () => dispatch(actResetMessage());

  //button --- view contract detail
  const onViewContractDetail = contractUrl => {
    navigation.navigate('ContractViewer', {
      contractUrl: contractUrl,
    });
  };

  //button --- download contract
  const onDownloadContract = async contractUrl => {
    //check if the link is supported
    const supported = await Linking.canOpenURL(contractUrl);
    if (supported) {
      //Open the link, if the URL scheme is "http" the web link should be opened by browser
      await Linking.openURL(contractUrl);
    } else {
      Alert.alert(`Không thể mở URL này: ${contractUrl}`);
    }
  };

  //button --- approve contract
  const onApproveContract = contractId => {
    Alert.alert('Thông báo', 'Bạn có chắc với lựa chọn này?', [
      {
        text: 'Có',
        onPress: () => {
          approveContract(contractId);
        },
      },
      {
        text: 'Không',
      },
    ]);
  };

  //button --- request update contract
  const onRequestUpdateContract = contractId => {
    Alert.alert('Thông báo', 'Bạn có chắc với lựa chọn này?', [
      {
        text: 'Có',
        onPress: () => {
          requestUpdateContract(contractId);
        },
      },
      {
        text: 'Không',
      },
    ]);
  };

  //refresh contract list
  const onRefreshContract = () => {
    setRefreshing(true);
    getContractListByUserID(user.id);
    setRefreshing(false);
  };

  return (
    <Contract
      refreshing={refreshing}
      contract={contract}
      onRefreshContract={onRefreshContract}
      onViewContractDetail={onViewContractDetail}
      onDownloadContract={onDownloadContract}
      onApproveContract={onApproveContract}
      onRequestUpdateContract={onRequestUpdateContract}
    />
  );
}
