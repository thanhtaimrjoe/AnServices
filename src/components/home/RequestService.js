import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Color from '../../styles/Color';
import {styles} from './RequestServiceStyle';
export default function RequestService(props) {
  const {services} = props;
  const initialState = [];
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState();
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState();
  const [selectedService, setSelectedService] = useState(initialState);
  const [selectedServiceError, setSelectedServiceError] = useState('');
  const [photo, setPhoto] = useState(initialState);
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [showMediaDialog, setShowMediaDialog] = useState(false);
  useEffect(() => {
    selectedService;
    photo;
  }, []);
  const onShowServiceDialog = () => {
    setShowServiceDialog(true);
  };
  const onChooseServiceItem = item => {
    if (!selectedService.includes(item)) {
      setSelectedService([...selectedService, item]);
    }
    setShowServiceDialog(false);
  };
  const onShowMediaDialog = () => {
    setShowMediaDialog(true);
  };
  const validateValue = () => {
    var result = true;
    //set new string
    setPhoneNumberError('');
    setDescriptionError('');
    setAddressError('');
    setSelectedServiceError('');
    //validate phone
    if (phoneNumber.trim().length === 0) {
      setPhoneNumberError('Số điện thoại nhập không đúng');
      result = false;
    }
    //validate description
    if (description.trim().length === 0) {
      setDescriptionError('Mô tả nhập không đúng');
      result = false;
    }
    //validate address
    if (address.trim().length === 0) {
      setAddressError('Địa chỉ nhập không đúng');
      result = false;
    }
    //validate selectedService
    if (selectedService.length === 0) {
      setSelectedServiceError('Bạn chưa chọn dịch vụ');
    }
    return result;
  };
  const onCreateRequestService = () => {
    var validation = validateValue();
    if (validation) {
      const serviceList = [];
      selectedService.map(item => {
        serviceList.push(item.serviceId);
      });
      const requestService = {
        customerId: '',
        customerPhone: phoneNumber,
        customerAddress: address,
        serviceList: serviceList,
        requestServiceDescription: description,
        mediaList: ['test1.png', 'test2.mp4'],
      };
      props.onCreateRequestService(requestService);
    }
  };
  const onOpenCamera = () => {
    setShowMediaDialog(false);
    const option = {
      mediaType: 'photo',
      quality: 1,
    };
    launchCamera(option, response => {
      if (response.assets) {
        response.assets.map(item => {
          setPhoto([...photo, item.uri]);
        });
      }
    });
  };
  const onOpenGallery = () => {
    setShowMediaDialog(false);
    const option = {
      mediaType: 'mixed',
      quality: 1,
      selectionLimit: 0,
    };
    launchImageLibrary(option, response => {
      if (response.assets) {
        response.assets.map(item => {
          setPhoto(photo => [...photo, item.uri]);
        });
      }
    });
  };
  const showServiceItem = () => {
    var result = <Text>Nothing happen</Text>;
    if (services.length > 0) {
      result = (
        <FlatList
          data={services}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.serviceItemContainer}
              onPress={() => onChooseServiceItem(item)}>
              <Image
                source={require('../../assets/icon/broken.png')}
                style={styles.serviceItemImg}
              />
              <View style={styles.serviceItemTextContainer}>
                <Text style={styles.serviceItemName}>{item.serviceName}</Text>
                <Text style={styles.serviceItemDescription}>
                  {item.serviceDescription}
                </Text>
              </View>
              <Text style={styles.serviceItemPrice}>{item.servicePrice}Đ</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index}
        />
      );
    }
    return result;
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.serviceContainer}>
        <Text style={styles.title}>Chọn dịch vụ</Text>
        {selectedService.map((item, index) => {
          return (
            <View key={index} style={styles.serviceItemContainer}>
              <Image
                source={require('../../assets/icon/broken.png')}
                style={styles.serviceItemImg}
              />
              <View style={styles.serviceItemTextContainer}>
                <Text style={styles.serviceItemName}>{item.serviceName}</Text>
                <Text style={styles.serviceItemDescription}>
                  {item.serviceDescription}
                </Text>
              </View>
              <Text style={styles.serviceItemPrice}>{item.servicePrice}Đ</Text>
            </View>
          );
        })}
        <TouchableOpacity style={styles.addBtn} onPress={onShowServiceDialog}>
          <Text style={styles.addBtnIcon}>+</Text>
        </TouchableOpacity>
        <Text style={styles.errorMessage}>{selectedServiceError}</Text>
      </View>
      <Modal transparent={true} visible={showServiceDialog}>
        <View style={styles.dialogBackground}>
          <View style={styles.dialogContainer}>
            <Text style={styles.dialogTitle}>Dịch vụ của chúng tôi</Text>
            {showServiceItem()}
          </View>
        </View>
      </Modal>
      <View style={styles.phoneContainer}>
        <Text style={styles.phoneTitle}>Số điện thoại</Text>
        <TextInput
          onChangeText={text => setPhoneNumber(text)}
          style={styles.phoneInput}
          placeholder="Nhập số điện thoại"
          placeholderTextColor={Color.placeholder}
          keyboardType="number-pad"
        />
        <Text style={styles.errorMessage}>{phoneNumberError}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Mô tả tình trạng</Text>
        <TextInput
          onChangeText={text => setDescription(text)}
          multiline={true}
          style={styles.descriptionInput}
          placeholder="Nhập tình trạng"
          placeholderTextColor={Color.placeholder}
        />
        <Text style={styles.errorMessage}>{descriptionError}</Text>
      </View>
      <View style={styles.mediaContainer}>
        <Text style={styles.mediaTitle}>Ảnh hoặc video</Text>
        <View style={styles.mediaFileContainer}>
          <TouchableOpacity style={styles.mediaBtn} onPress={onShowMediaDialog}>
            <Text style={styles.mediaBtnIcon}>+</Text>
          </TouchableOpacity>
          {photo.map((item, index) => {
            return (
              <Image
                key={index}
                style={styles.mediaView}
                source={{uri: item}}
              />
            );
          })}
        </View>
      </View>
      <Modal transparent={true} visible={showMediaDialog}>
        <View style={styles.dialogBackground}>
          <View style={styles.dialogContainer}>
            <Text style={styles.dialogTitle}>Chọn ảnh hoặc video</Text>
            <TouchableOpacity
              style={styles.dialogMediaBtn}
              onPress={onOpenCamera}>
              <Text style={styles.dialogMediaText}>Mở camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dialogMediaBtn}
              onPress={onOpenGallery}>
              <Text style={styles.dialogMediaText}>Chọn từ thư viện</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Địa chỉ</Text>
        <TextInput
          onChangeText={text => setAddress(text)}
          multiline={true}
          style={styles.addressInput}
          placeholder="Nhập địa chỉ"
          placeholderTextColor={Color.placeholder}
        />
        <Text style={styles.errorMessage}>{addressError}</Text>
      </View>
      <TouchableOpacity
        style={styles.confirmBtn}
        onPress={onCreateRequestService}>
        <Text style={styles.confirmBtnText}>Xác nhận</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
