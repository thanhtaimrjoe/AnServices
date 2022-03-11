import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../../style/Color';
import {styles} from './RequestServiceStyle';
import Video from 'react-native-video';
export default function RequestService(props) {
  const {services, uploading} = props;
  //initital state
  const initialState = [];
  //state --- full name and fullNameError
  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  //state --- phone and phoneNumberError
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState();
  //state --- description and descriptionError
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState();
  //state --- address and addressError
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState();
  //state --- selectedService and selectedServiceError
  const [selectedService, setSelectedService] = useState(initialState);
  const [selectedServiceError, setSelectedServiceError] = useState();
  //state ===
  const [selectedPackage, setSelectedPackage] = useState();
  const [selectedPackageError, setSelectedPackageError] = useState();
  //state --- media item
  const [mediaItem, setMediaItem] = useState();
  //state --- media and mediaError
  const [media, setMedia] = useState(initialState);
  const [mediaError, setMediaError] = useState();
  //state --- showServiceDialog
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  //state --- showPackageDialog
  const [showPackageDialog, setShowPackageDialog] = useState(false);
  //state --- showMediaDialog
  const [showMediaDialog, setShowMediaDialog] = useState(false);
  //state --- showMediaViewDialog
  const [showMediaViewDialog, setShowMediaViewDialog] = useState(false);

  //package information
  const packages = [
    {
      packageId: 1,
      packageName: 'Gói 1',
      packageDescription: 'Chỉ yêu cầu nhân công, vật tư do bản thân cung cấp',
      packageImg: require('../../../assets/icon/workers.png'),
    },
    {
      packageId: 2,
      packageName: 'Gói 2',
      packageDescription: 'Thuê cả nhân công và vật tư do chúng tôi cung cấp',
      packageImg: require('../../../assets/icon/builder.png'),
    },
  ];

  useEffect(() => {
    selectedService;
    selectedPackage;
    media;
    mediaItem;
  }, []);

  //show service dialog
  const onShowServiceDialog = () => {
    setShowServiceDialog(true);
  };

  //exit dialog
  const onExitDialog = () => {
    if (showServiceDialog) {
      setShowServiceDialog(false);
    }
    if (showPackageDialog) {
      setShowPackageDialog(false);
    }
  };

  //choose service item
  const onChooseServiceItem = item => {
    if (!selectedService.includes(item)) {
      setSelectedService([...selectedService, item]);
    }
    setShowServiceDialog(false);
  };

  //remove service item
  const onRemoveServiceItem = index => {
    setSelectedService(selectedService =>
      selectedService.filter((value, i) => i != index),
    );
  };

  //show package dialog
  const onShowPackageDialog = () => {
    setShowPackageDialog(true);
  };

  //choose package item
  const onChoosePackageItem = item => {
    setSelectedPackage(item);
    setShowPackageDialog(false);
  };

  //show media dialog
  const onShowMediaDialog = () => {
    setShowMediaDialog(true);
  };

  //remove media item
  const onRemoveMediaItem = index => {
    setMedia(media => media.filter((value, i) => i != index));
  };

  //view media
  const onViewMedia = item => {
    setMediaItem(item);
    setShowMediaViewDialog(true);
  };

  //validation
  const validateValue = () => {
    var result = true;
    //reset new
    setFullNameError('');
    setPhoneNumberError('');
    setDescriptionError('');
    setAddressError('');
    setSelectedServiceError('');
    setSelectedPackageError('');
    setMediaError('');
    //validate full name
    if (fullName.trim().length === 0) {
      setFullNameError('Họ và tên nhập không đúng');
      result = false;
    }
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
    //validate selectedPackageError
    if (!selectedPackage) {
      setSelectedPackageError('Bạn chưa chọn gói yêu cầu');
      result = false;
    }
    //validate media
    if (media.length === 0) {
      setMediaError('Bạn chưa chọn ảnh hoặc video');
    }
    return result;
  };

  //check size of video and image
  const checkSizeMedia = () => {
    var result = 0;
    media.map(item => {
      result += item.fileSize;
    });
    if (result / 1000000 > 4) {
      return false;
    }
    return true;
  };

  //button --- create request service
  const onCreateRequestService = () => {
    if (checkSizeMedia()) {
      var validation = validateValue();
      if (validation) {
        props.onCreateRequestService(
          selectedPackage,
          fullName,
          phoneNumber,
          address,
          selectedService,
          description,
          media,
        );
      }
    } else {
      Alert.alert('Thông báo', 'Ảnh hoặc video của bạn đã vượt quá 4Mb');
    }
  };

  //open camera -> set to media
  const onOpenCamera = () => {
    setShowMediaDialog(false);
    const option = {
      mediaType: 'photo',
      durationLimit: 30,
      quality: 1,
    };
    launchCamera(option, response => {
      if (response.assets) {
        response.assets.map(item => {
          setMedia([...media, item]);
        });
      }
    });
  };

  //open video -> set to media
  const onOpenVideo = () => {
    setShowMediaDialog(false);
    const option = {
      mediaType: 'video',
      durationLimit: 30,
      quality: 1,
    };
    launchCamera(option, response => {
      if (response.assets) {
        response.assets.map(item => {
          setMedia([...media, item]);
        });
      }
    });
  };

  //open gallery -> set to media
  const onOpenGallery = () => {
    setShowMediaDialog(false);
    const option = {
      mediaType: 'mix',
      quality: 1,
      selectionLimit: 0,
    };
    launchImageLibrary(option, response => {
      if (response.assets) {
        response.assets.map(item => {
          setMedia(media => [...media, item]);
        });
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.packageContainer}>
        <Text style={styles.packageTitle}>Chọn gói yêu cầu</Text>
        {selectedPackage && (
          <View style={styles.packageItemContainer}>
            <Image
              source={selectedPackage.packageImg}
              style={styles.packageItemImg}
            />
            <View style={styles.packageItemTextContainer}>
              <Text style={styles.packageItemName}>
                {selectedPackage.packageName}
              </Text>
              <Text style={styles.packageItemDescription}>
                {selectedPackage.packageDescription}
              </Text>
            </View>
          </View>
        )}
        <TouchableOpacity style={styles.addBtn} onPress={onShowPackageDialog}>
          <Text style={styles.addBtnIcon}>+</Text>
        </TouchableOpacity>
        <Text style={styles.errorMessage}>{selectedPackageError}</Text>
      </View>
      <Modal transparent={true} visible={showPackageDialog}>
        <View style={styles.dialogBackground}>
          <View style={styles.dialogContainer}>
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogTitle}>Gói của chúng tôi</Text>
              <TouchableOpacity
                onPress={onExitDialog}
                style={styles.exitIconContainer}>
                <Icon name="times" style={styles.exitIcon} />
              </TouchableOpacity>
            </View>
            {packages.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.packageItemContainer}
                  onPress={() => onChoosePackageItem(item)}>
                  <Image
                    source={item.packageImg}
                    style={styles.packageItemImg}
                  />
                  <View style={styles.packageItemTextContainer}>
                    <Text style={styles.packageItemName}>
                      {item.packageName}
                    </Text>
                    <Text style={styles.packageItemDescription}>
                      {item.packageDescription}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
      <View style={styles.serviceContainer}>
        <Text style={styles.serviceTitle}>Chọn dịch vụ</Text>
        {selectedService.map((item, index) => {
          return (
            <View key={index} style={styles.serviceItemContainer}>
              <Image
                source={{uri: item.serviceImg}}
                style={styles.serviceItemImg}
              />
              <View style={styles.serviceItemTextContainer}>
                <Text style={styles.serviceItemName}>{item.serviceName}</Text>
                <Text style={styles.serviceItemDescription}>
                  {item.serviceDescription}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.serviceRemove}
                onPress={() => onRemoveServiceItem(index)}>
                <Icon name="times" style={styles.serviceRemoveIcon} />
              </TouchableOpacity>
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
          <ScrollView style={styles.dialogContainer}>
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogTitle}>Dịch vụ của chúng tôi</Text>
              <TouchableOpacity
                onPress={onExitDialog}
                style={styles.exitIconContainer}>
                <Icon name="times" style={styles.exitIcon} />
              </TouchableOpacity>
            </View>
            {services.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.serviceItemContainer}
                  onPress={() => onChooseServiceItem(item)}>
                  <Image
                    source={{uri: item.serviceImg}}
                    style={styles.serviceItemImg}
                  />
                  <View style={styles.serviceItemTextContainer}>
                    <Text style={styles.serviceItemName}>
                      {item.serviceName}
                    </Text>
                    <Text style={styles.serviceItemDescription}>
                      {item.serviceDescription}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
      <View style={styles.fullNameContainer}>
        <Text style={styles.fullNameTitle}>Họ và tên chủ công trình</Text>
        <TextInput
          onChangeText={text => setFullName(text)}
          style={styles.fullNameInput}
          placeholder="Nhập họ và tên"
          placeholderTextColor={Color.placeholder}
        />
        <Text style={styles.errorMessage}>{fullNameError}</Text>
      </View>
      <View style={styles.phoneContainer}>
        <Text style={styles.phoneTitle}>Số điện thoại chủ công trình</Text>
        <TextInput
          onChangeText={text => setPhoneNumber(text)}
          style={styles.phoneInput}
          placeholder="Nhập số điện thoại"
          placeholderTextColor={Color.placeholder}
          keyboardType="number-pad"
        />
        <Text style={styles.errorMessage}>{phoneNumberError}</Text>
      </View>
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
          {media.map((item, index) => {
            if (item.type !== 'video/mp4') {
              return (
                <View key={index} style={styles.mediaViewContainer}>
                  <TouchableOpacity onPress={() => onViewMedia(item)}>
                    <Image style={styles.mediaView} source={{uri: item.uri}} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mediaRemoveBtn}
                    onPress={() => onRemoveMediaItem(index)}>
                    <Icon name="times" style={styles.mediaRemoveIcon} />
                  </TouchableOpacity>
                </View>
              );
            } else {
              return (
                <View key={index} style={styles.mediaViewContainer}>
                  <TouchableOpacity onPress={() => onViewMedia(item)}>
                    <Image style={styles.mediaView} source={{uri: item.uri}} />
                    <Image
                      source={require('../../../assets/icon/play.png')}
                      style={styles.playImg}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mediaRemoveBtn}
                    onPress={() => onRemoveMediaItem(index)}>
                    <Icon name="times" style={styles.mediaRemoveIcon} />
                  </TouchableOpacity>
                </View>
              );
            }
          })}
        </View>
        <Text style={styles.errorMessage}>{mediaError}</Text>
      </View>
      <Modal transparent={true} visible={showMediaDialog}>
        <TouchableWithoutFeedback onPress={() => setShowMediaDialog(false)}>
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
                onPress={onOpenVideo}>
                <Text style={styles.dialogMediaText}>Mở video</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dialogMediaBtn}
                onPress={onOpenGallery}>
                <Text style={styles.dialogMediaText}>Chọn từ thư viện</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {mediaItem && (
        <Modal transparent={true} visible={showMediaViewDialog}>
          <TouchableWithoutFeedback
            onPress={() => setShowMediaViewDialog(false)}>
            <View style={styles.dialogBackground}>
              {mediaItem.type === 'image/jpeg' ? (
                <Image source={{uri: mediaItem.uri}} style={styles.mediaFull} />
              ) : (
                <Video
                  source={{
                    uri: mediaItem.uri,
                  }}
                  resizeMode="cover"
                  style={styles.mediaFull}
                  controls={true}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      {uploading ? (
        <View style={styles.confirmBtn}>
          <ActivityIndicator color={Color.primary} size={'large'} />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={onCreateRequestService}>
          <Text style={styles.confirmBtnText}>Xác nhận</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
