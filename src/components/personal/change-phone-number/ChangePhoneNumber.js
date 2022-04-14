import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './ChangePhoneNumberStyle';
import Color from '../../../style/Color';

export default function ChangePhoneNumber(props) {
  const {loading} = props;
  //state --- oldPhoneNumber and oldPhoneNumberError
  const [oldPhoneNumber, setOldPhoneNumber] = useState('');
  const [oldPhoneNumberError, setOldPhoneNumberError] = useState();

  //state --- newPhoneNumber and newPhoneNumberError
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newPhoneNumberError, setNewPhoneNumberError] = useState();

  //validation
  const validateValue = () => {
    var result = true;
    //reset new
    setOldPhoneNumberError('');
    setNewPhoneNumberError('');
    //validate old phone number
    if (!oldPhoneNumber.match(/(0[3|5|7|8|9])+([0-9]{8})\b/)) {
      setOldPhoneNumberError('Số điện thoại cũ không đúng');
      result = false;
    }
    //validate new phone number
    if (!newPhoneNumber.match(/(0[3|5|7|8|9])+([0-9]{8})\b/)) {
      setNewPhoneNumberError('Số điện thoại mới không đúng');
      result = false;
    }
    return result;
  };

  //button --- check validate old number and send otp to new number
  const onSendOTP = () => {
    const validation = validateValue();
    if (validation) {
      if (newPhoneNumber.trim().length != 10) {
        Alert.alert('Thông báo', 'Số điện thoại mới bạn nhập không đủ 10 số');
      } else if (!newPhoneNumber.match(/(0[3|5|7|8|9])+([0-9]{8})\b/)) {
        Alert.alert('Thông báo', 'Số điện thoại mới bạn nhập không đúng');
      } else {
        props.onSendOTP(oldPhoneNumber, newPhoneNumber);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.phoneNumberContainer}>
            <Text style={styles.phoneNumberTitle}>Số điện thoại cũ</Text>
            <TextInput
              maxLength={10}
              onChangeText={text => setOldPhoneNumber(text)}
              placeholder="Nhập số điện thoại cũ"
              placeholderTextColor={Color.placeholder}
              keyboardType="number-pad"
              style={styles.phoneNumberInput}
            />
            <Text style={styles.errorMessage}>{oldPhoneNumberError}</Text>
          </View>
          <View style={styles.phoneNumberContainer}>
            <Text style={styles.phoneNumberTitle}>Số điện thoại mới</Text>
            <TextInput
              maxLength={10}
              onChangeText={text => setNewPhoneNumber(text)}
              placeholder="Nhập số điện thoại mới"
              placeholderTextColor={Color.placeholder}
              keyboardType="numeric"
              style={styles.phoneNumberInput}
            />
            <Text style={styles.errorMessage}>{newPhoneNumberError}</Text>
          </View>
          <TouchableOpacity style={styles.confirmBtn} onPress={onSendOTP}>
            <Text style={styles.confirmBtnText}>Xác nhận</Text>
          </TouchableOpacity>
          <Modal transparent={true} visible={loading}>
            <View style={styles.dialogBackground}>
              <View style={styles.loadingView}>
                <ActivityIndicator size={'large'} color={Color.primary} />
                <Text style={styles.loadingText}>Đang tải</Text>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
