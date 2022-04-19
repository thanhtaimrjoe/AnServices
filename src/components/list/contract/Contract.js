import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {styles} from './ContractStyle';
import Pdf from 'react-native-pdf';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Color from '../../../style/Color';

export default function Contract(props) {
  const {contractItem} = props;
  const [checkboxState, setCheckboxState] = useState(false);
  const onApproveContract = contractId => {
    Alert.alert('Thông báo', 'Bạn có chắc với lựa chọn này?', [
      {
        text: 'Có',
        onPress: () => {
          props.onApproveContract(contractId);
        },
      },
      {
        text: 'Không',
      },
    ]);
  };
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
  return (
    <View style={styles.container}>
      <Pdf
        source={{uri: contractItem.contractUrl, cache: true}}
        style={
          contractItem.contractStatus === 3 ? styles.approvedPDF : styles.pdf
        }
      />
      <View style={styles.policyContainer}>
        <View style={styles.policyContentContainer}>
          <BouncyCheckbox
            fillColor={Color.primary}
            iconStyle={{borderColor: Color.primary}}
            isChecked={checkboxState}
            onPress={() => setCheckboxState(!checkboxState)}
          />
          <Text style={styles.policyContent}>
            Bằng việc tích vào đây, bạn cam kết đã xem tất cả nội dung trong hợp
            đồng.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {checkboxState ? (
            <TouchableOpacity
              style={styles.approveBtn}
              onPress={() => onApproveContract(contractItem.contractId)}>
              <Text style={styles.textBtn}>Đồng ý</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.approveDisableBtn}>
              <Text style={styles.textDisableBtn}>Đồng ý</Text>
            </View>
          )}
          {checkboxState ? (
            <TouchableOpacity
              style={styles.requestUpdateBtn}
              onPress={() => onRequestUpdateContract(contractItem.contractId)}>
              <Text style={styles.textBtn}>Yêu cầu sửa lại</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={styles.requestUpdatDisableeBtn}
              onPress={() => onRequestUpdateContract(contractItem.contractId)}>
              <Text style={styles.textDisableBtn}>Yêu cầu sửa lại</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
