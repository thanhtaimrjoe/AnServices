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
    if (oldPhoneNumber.trim().length === 0) {
      setOldPhoneNumberError('Bạn chưa nhập số điện thoại cũ');
      result = false;
    }
    //validate new phone number
    if (newPhoneNumber.trim().length === 0) {
      setNewPhoneNumberError('Bạn chưa nhập số điện thoại mới');
      result = false;
    }
    return result;
  };

  //button --- check validate old number and send otp to new number
  const onSendOTP = () => {
    const validation = validateValue();
    if (validation) {
      if (
        newPhoneNumber.trim().length < 10 ||
        newPhoneNumber.trim().length > 10
      ) {
        Alert.alert('Thông báo', 'Số điện thoại mới không hợp lệ');
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
              onChangeText={text => setNewPhoneNumber(text)}
              placeholder="Nhập số điện thoại mới"
              placeholderTextColor={Color.placeholder}
              keyboardType="numeric"
              style={styles.phoneNumberInput}
            />
            <Text style={styles.errorMessage}>{newPhoneNumberError}</Text>
          </View>
          {loading ? (
            <View style={styles.confirmLoadingBtn}>
              <ActivityIndicator color={Color.white} size={'large'} />
            </View>
          ) : (
            <TouchableOpacity style={styles.confirmBtn} onPress={onSendOTP}>
              <Text style={styles.confirmBtnText}>Xác nhận</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
