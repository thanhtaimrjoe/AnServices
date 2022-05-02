import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './PersonalInformationStyle';
import Color from '../../../style/Color';

export default function PersonalInformation(props) {
  const {userInfo, uploading} = props;
  //state --- full name and fullNameError
  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  //state --- email and emailError
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  //state --- address and addressError
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState();
  //state --- isFocusedFullName
  const [isFocusedFullName, setIsFocusedFullName] = useState(false);
  //state --- isFocusedEmail
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  //state --- isFocusedAddress
  const [isFocusedAddress, setIsFocusedAddress] = useState(false);

  useEffect(() => {
    //auto fill data
    if (userInfo) {
      setFullName(userInfo.fullName);
      setEmail(userInfo.email);
      setAddress(userInfo.address);
    }
  }, [userInfo]);

  //validation
  const validateValue = () => {
    var result = true;
    //reset new
    setFullNameError('');
    setEmailError('');
    setAddressError('');
    //validate full name
    if (fullName.trim().length === 0) {
      setFullNameError('Bạn chưa nhập họ và tên');
      result = false;
    }
    //validate email
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
    //validate address
    if (address.trim().length === 0) {
      setAddressError('Bạn chưa nhập địa chỉ');
      result = false;
    }
    return result;
  };

  //button --- change personal information
  const onChangePersonalInformation = () => {
    const validation = validateValue();
    if (validation) {
      props.onChangePersonalInformation(fullName, email, address);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.fullNameContainer}>
          <Text style={styles.fullNameTitle}>Họ và tên</Text>
          <TextInput
            value={fullName}
            onFocus={() => setIsFocusedFullName(true)}
            onBlur={() => setIsFocusedFullName(false)}
            onChangeText={text => setFullName(text)}
            style={[
              styles.fullNameInput,
              {
                borderColor: isFocusedFullName
                  ? Color.fieldFocus
                  : Color.fieldBlur,
              },
              {borderWidth: isFocusedFullName ? 1.5 : 1},
            ]}
            placeholder="Nhập họ và tên"
            placeholderTextColor={Color.placeholder}
          />
          <Text style={styles.errorMessage}>{fullNameError}</Text>
        </View>
        <View style={styles.emailContainer}>
          <Text style={styles.emailTitle}>Email</Text>
          <TextInput
            value={email}
            onFocus={() => setIsFocusedEmail(true)}
            onBlur={() => setIsFocusedEmail(false)}
            onChangeText={text => setEmail(text)}
            style={[
              styles.emailInput,
              {
                borderColor: isFocusedEmail
                  ? Color.fieldFocus
                  : Color.fieldBlur,
              },
              {borderWidth: isFocusedEmail ? 1.5 : 1},
            ]}
            placeholder="Nhập email"
            keyboardType="email-address"
            placeholderTextColor={Color.placeholder}
          />
          <Text style={styles.errorMessage}>{emailError}</Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Địa chỉ</Text>
          <TextInput
            value={address}
            onFocus={() => setIsFocusedAddress(true)}
            onBlur={() => setIsFocusedAddress(false)}
            onChangeText={text => setAddress(text)}
            multiline={true}
            style={[
              styles.addressInput,
              {
                borderColor: isFocusedAddress
                  ? Color.fieldFocus
                  : Color.fieldBlur,
              },
              {borderWidth: isFocusedAddress ? 1.5 : 1},
            ]}
            placeholder="Nhập địa chỉ"
            placeholderTextColor={Color.placeholder}
          />
          <Text style={styles.errorMessage}>{addressError}</Text>
        </View>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={onChangePersonalInformation}>
          <Text style={styles.confirmBtnText}>Xác nhận</Text>
        </TouchableOpacity>
        <Modal transparent={true} visible={uploading}>
          <View style={styles.dialogBackground}>
            <View style={styles.loadingView}>
              <ActivityIndicator size={'large'} color={Color.primary} />
              <Text style={styles.loadingText}>Đang thay đổi thông tin</Text>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}
