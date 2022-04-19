import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {styles} from './SignUpStyle';
import Color from '../../../style/Color';

export default function SignUp(props) {
  const {loading} = props;
  //state --- fullName and fullNameError
  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  //state --- email and emailError
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  //state --- address and addressError
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  //state --- inviteCode
  const [inviteCode, setInviteCode] = useState('');

  //validation
  const validateValue = () => {
    var result = true;
    //reset new
    setFullNameError('');
    setEmailError('');
    setAddressError('');
    if (fullName.trim().length === 0) {
      setFullNameError('Bạn chưa nhập họ và tên');
      result = false;
    }
    if (email.trim().length === 0) {
      setEmailError('Bạn chưa nhập email');
      result = false;
    }
    if (email.trim().length > 0) {
      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/)) {
        setEmailError('Email nhập không đúng định dạng');
        result = false;
      }
    }
    if (address.trim().length === 0) {
      setAddressError('Bạn chưa nhập địa chỉ');
      result = false;
    }
    return result;
  };

  //button --- create customer account
  const onCreateCustomerAccount = () => {
    var validation = validateValue();
    if (validation) {
      props.onCreateCustomerAccount(fullName, email, address, inviteCode);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.bigText}>Xác nhận thông tin</Text>
          <Text style={styles.smallText}>
            Chỉ còn một bước nữa là hoàn tất quá trình đăng ký.
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Họ và tên</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Nhập họ và tên"
              placeholderTextColor={Color.placeholder}
              onChangeText={text => setFullName(text)}
            />
            <Text style={styles.errorMsg}>{fullNameError}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Nhập email"
              placeholderTextColor={Color.placeholder}
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
            />
            <Text style={styles.errorMsg}>{emailError}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Địa chỉ</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Nhập địa chỉ"
              placeholderTextColor={Color.placeholder}
              onChangeText={text => setAddress(text)}
            />
            <Text style={styles.errorMsg}>{addressError}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Nhập mã giới thiệu (nếu có)</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Nhập mã giới thiệu"
              placeholderTextColor={Color.placeholder}
              onChangeText={text => setInviteCode(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={onCreateCustomerAccount}>
            <Text style={styles.buttonText}>Đăng ký</Text>
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
