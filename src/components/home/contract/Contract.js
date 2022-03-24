import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './ContractStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconURL from '../../../style/IconURL';

export default function Contract(props) {
  const {refreshing, contract} = props;
  //state --- contractItem
  const [contractItem, setContractItem] = useState();
  //state --- showContractDialog
  const [showContractDialog, setShowContractDialog] = useState(false);

  //refreshing
  const onRefreshContract = () => {
    props.onRefreshContract();
  };

  //show dialog
  const onShowDialog = item => {
    setContractItem(item);
    setShowContractDialog(true);
  };

  //exit dialog
  const onExitDialog = () => {
    setShowContractDialog(false);
  };

  //btn --- download contract
  const onDownloadContract = contractUrl => {
    props.onDownloadContract(contractUrl);
  };

  //btn --- approve contract
  const onApproveContract = contractId => {
    Alert.alert('Thông báo', 'Bạn có chắc với lựa chọn này?', [
      {
        text: 'Có',
        onPress: () => {
          setShowContractDialog(false);
          props.onApproveContract(contractId);
        },
      },
      {
        text: 'Không',
      },
    ]);
  };

  //btn --- request update contract
  const onRequestUpdateContract = contractId => {
    Alert.alert('Thông báo', 'Bạn có chắc với lựa chọn này?', [
      {
        text: 'Có',
        onPress: () => {
          props.onRequestUpdateContract(contractId);
        },
      },
      {
        text: 'Không',
      },
    ]);
  };

  //btn --- view contract detail
  const onViewContractDetail = contractUrl => {
    setShowContractDialog(false);
    props.onViewContractDetail(contractUrl);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefreshContract} />
      }>
      <Text style={styles.title}>Danh sách hợp đồng</Text>
      {contract.length === 0 && (
        <View style={styles.errorView}>
          <Image source={{uri: IconURL.notFoundImg}} style={styles.errorImg} />
          <Text style={styles.errorMsg}>Không có hợp đồng nào có sẵn</Text>
        </View>
      )}
      {contract.length > 0 &&
        contract.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.contractItemContainer}
              onPress={() => onShowDialog(item)}>
              <Image
                source={{uri: IconURL.contractImg}}
                style={styles.contractItemImg}
              />
              <Text style={styles.contractItemName}>{item.contractTitle}</Text>
              <View style={styles.contractItemStatus}>
                <Text style={styles.contractItemStatusText}>
                  {item.contractStatus === 2 && 'Đang chờ'}
                  {item.contractStatus === 7 && 'Yều cầu sửa'}
                  {item.contractStatus === 3 && 'Đồng ý'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      {contractItem && (
        <Modal transparent={true} visible={showContractDialog}>
          <View style={styles.dialogBackground}>
            <View style={styles.dialogContainer}>
              <View style={styles.dialogHeader}>
                <Text style={styles.dialogTitle}>
                  {contractItem.contractTitle}
                </Text>
                <TouchableOpacity onPress={onExitDialog}>
                  <Icon name="times" style={styles.exitIcon} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.btnDownload}
                onPress={() => onViewContractDetail(contractItem.contractUrl)}>
                <Text style={styles.btnText}>Xem chi tiết</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnDownload}
                onPress={() => onDownloadContract(contractItem.contractUrl)}>
                <Text style={styles.btnText}>Tải về</Text>
              </TouchableOpacity>
              {contractItem.contractStatus !== 3 && (
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.btnApprove}
                    onPress={() => onApproveContract(contractItem.contractId)}>
                    <Text style={styles.btnText}>Chấp thuận</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnRequestUpdate}
                    onPress={() =>
                      onRequestUpdateContract(contractItem.contractId)
                    }>
                    <Text style={styles.btnText}>Yêu cầu sửa</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}
