import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Contract from '../../../components/list/contract/Contract';
import {
  actApproveContractRequest,
  actRequestUpdateContractRequest,
  actResetMessage,
} from '../../../redux/actions/index';

export default function ContractContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {contractItem} = props.route.params;
  //reduer --- user
  const user = useSelector(state => state.user);
  //reduer --- message
  const message = useSelector(state => state.message);
  //get token
  const token = 'Bearer ' + user.token;

  //get dispatch
  const dispatch = useDispatch();
  //call api --- approve contract
  const approveContract = (contractId, token) =>
    dispatch(actApproveContractRequest(contractId, token));
  //call api --- request update contract
  const requestUpdateContract = (contractId, token) =>
    dispatch(actRequestUpdateContractRequest(contractId, token));
  //reset message
  const resetMessage = () => dispatch(actResetMessage());

  useEffect(() => {
    if (message === 'APPROVE_CONTRACT_SUCCESS') {
      Alert.alert('Thông báo', 'Bạn đã chấp thuận thành công', [
        {
          text: 'OK',
          onPress: () => {
            resetMessage();
            navigation.goBack();
          },
        },
      ]);
    }
    if (message === 'APPROVE_CONTRACT_FAILURE') {
      Alert.alert('Thông báo', 'Có lỗi phát sinh, mời bạn thử lại');
      resetMessage();
    }
    if (message === 'REQUEST_UPDATE_CONTRACT_SUCCESS') {
      Alert.alert('Thông báo', 'Bạn đã yêu cầu sửa lại thành công', [
        {
          text: 'OK',
          onPress: () => {
            resetMessage();
            navigation.goBack();
          },
        },
      ]);
    }
    if (message === 'REQUEST_UPDATE_CONTRACT_FAILURE') {
      Alert.alert('Thông báo', 'Có lỗi phát sinh, mời bạn thử lại');
      resetMessage();
    }
  }, [message]);

  //button --- approve contract
  const onApproveContract = contractId => {
    approveContract(contractId, token);
  };

  //button --- request update contract
  const onRequestUpdateContract = contractId => {
    requestUpdateContract(contractId, token);
  };
  return (
    <Contract
      contractItem={contractItem}
      onApproveContract={onApproveContract}
      onRequestUpdateContract={onRequestUpdateContract}
    />
  );
}
