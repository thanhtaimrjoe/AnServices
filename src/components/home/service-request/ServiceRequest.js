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
import {styles} from './ServiceRequestStyle';
import Video from 'react-native-video';
import IconURL from '../../../style/IconURL';
import Loading from '../../general/Loading';
import moment from 'moment';
export default function ServiceRequest(props) {
  const {services, promotion, uploading, serviceRequestRework} = props;
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
  //state --- showPromotionDialog
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  //state --- promotionItem
  const [promotionItem, setPromotionItem] = useState();
  //state --- isFocusedFullName
  const [isFocusedFullName, setIsFocusedFullName] = useState(false);
  //state --- isFocusedPhoneNumber
  const [isFocusedPhoneNumber, setIsFocusedPhoneNumber] = useState(false);
  //state --- isFocusedAddress
  const [isFocusedAddress, setIsFocusedAddress] = useState(false);
  //state --- isFocusedDescription
  const [isFocusedDescription, setIsFocusedDescription] = useState(false);

  //package information
  const packages = [
    {
      packageId: 1,
      packageName: 'Gói 1',
      packageDescription: 'Chỉ yêu cầu nhân công, vật tư do bản thân cung cấp',
      packageImg: IconURL.package1Img,
    },
    {
      packageId: 2,
      packageName: 'Gói 2',
      packageDescription: 'Thuê cả nhân công và vật tư do chúng tôi cung cấp',
      packageImg: IconURL.package2Img,
    },
  ];

  useEffect(() => {
    selectedService;
    selectedPackage;
    media;
    mediaItem;
    promotionItem;
    //auto fill data when request service rework
    if (serviceRequestRework) {
      //package
      packages.map((item, index) => {
        if (serviceRequestRework.requestServicePackage === item.packageId) {
          setSelectedPackage(item);
        }
      });
      //service
      setSelectedService(serviceRequestRework.serviceList);
      //full name
      setFullName(serviceRequestRework.customerName);
      //phone number
      setPhoneNumber(serviceRequestRework.customerPhone);
      //address
      setAddress(serviceRequestRework.customerAddress);
      //description
      setDescription(serviceRequestRework.requestServiceDescription);
    }
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
    if (showPromotionDialog) {
      setShowPromotionDialog(false);
    }
  };

  //choose service item
  const onChooseServiceItem = item => {
    //remove validate msg (if have)
    setSelectedServiceError('');
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
    //remove validate msg (if have)
    setSelectedPackageError('');
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

  //show promotion dialog
  const onShowPromotionDialog = () => {
    setShowPromotionDialog(true);
  };

  //select promotion
  const onSelectPromotion = item => {
    setPromotionItem(item);
    setShowPromotionDialog(false);
  };

  //remove promotion
  const onRemovePromotion = () => {
    setPromotionItem();
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
    //check phone number 10 digit
    if (!phoneNumber.match(/(0[3|5|7|8|9])+([0-9]{8})\b/)) {
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
      result = false;
    }
    //validate selectedPackageError
    if (!selectedPackage) {
      setSelectedPackageError('Bạn chưa chọn gói yêu cầu');
      result = false;
    }
    //validate media
    if (media.length === 0) {
      setMediaError('Bạn chưa chọn ảnh hoặc video');
      result = false;
    }
    return result;
  };

  //check size of video and image
  const checkSizeMedia = () => {
    var result = 0;
    media.map(item => {
      result += item.fileSize;
    });
    if (result / 1000000 > 30) {
      return false;
    }
    return true;
  };

  //button --- create service request
  const onCreateServiceRequest = () => {
    //create promotionID
    const promotionID = promotionItem ? promotionItem.promotionId : 0;
    if (checkSizeMedia()) {
      var validation = validateValue();
      if (validation) {
        props.onCreateServiceRequest(
          selectedPackage.packageId,
          fullName,
          phoneNumber,
          address,
          selectedService,
          description,
          media,
          promotionID,
        );
      }
    } else {
      Alert.alert('Thông báo', 'Ảnh hoặc video của bạn đã vượt quá 30Mb');
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
          setMediaError('');
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
          setMediaError('');
          setMedia([...media, item]);
        });
      }
    });
  };

  //open gallery -> set to media
  const onOpenGallery = () => {
    setShowMediaDialog(false);
    const option = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 0,
    };
    launchImageLibrary(option, response => {
      if (response.assets) {
        response.assets.map(item => {
          setMediaError('');
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
              source={{uri: selectedPackage.packageImg}}
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
            <TouchableOpacity
              style={styles.serviceRemove}
              onPress={onShowPackageDialog}>
              <Icon name="edit" style={styles.serviceRemoveIcon} />
            </TouchableOpacity>
          </View>
        )}
        {!serviceRequestRework && !selectedPackage && (
          <TouchableOpacity style={styles.addBtn} onPress={onShowPackageDialog}>
            <Text style={styles.addBtnIcon}>+</Text>
          </TouchableOpacity>
        )}
        {!serviceRequestRework && (
          <Text style={styles.errorMessage}>{selectedPackageError}</Text>
        )}
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
                  style={styles.packageItemModalContainer}
                  onPress={() => onChoosePackageItem(item)}>
                  <Image
                    source={{uri: item.packageImg}}
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
        {!serviceRequestRework && (
          <TouchableOpacity style={styles.addBtn} onPress={onShowServiceDialog}>
            <Text style={styles.addBtnIcon}>+</Text>
          </TouchableOpacity>
        )}
        {!serviceRequestRework && (
          <Text style={styles.errorMessage}>{selectedServiceError}</Text>
        )}
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
          value={fullName}
          onFocus={() => setIsFocusedFullName(true)}
          onBlur={() => setIsFocusedFullName(false)}
          onChangeText={text => {
            setFullNameError('');
            setFullName(text);
          }}
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
      <View style={styles.phoneContainer}>
        <Text style={styles.phoneTitle}>Số điện thoại chủ công trình</Text>
        <TextInput
          maxLength={10}
          value={phoneNumber}
          onFocus={() => setIsFocusedPhoneNumber(true)}
          onBlur={() => setIsFocusedPhoneNumber(false)}
          onChangeText={text => {
            setPhoneNumberError('');
            setPhoneNumber(text);
          }}
          style={[
            styles.phoneInput,
            {
              borderColor: isFocusedPhoneNumber
                ? Color.fieldFocus
                : Color.fieldBlur,
            },
            {borderWidth: isFocusedPhoneNumber ? 1.5 : 1},
          ]}
          placeholder="Nhập số điện thoại"
          placeholderTextColor={Color.placeholder}
          keyboardType="number-pad"
        />
        <Text style={styles.errorMessage}>{phoneNumberError}</Text>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Địa chỉ</Text>
        <TextInput
          value={address}
          onFocus={() => setIsFocusedAddress(true)}
          onBlur={() => setIsFocusedAddress(false)}
          onChangeText={text => {
            setAddressError('');
            setAddress(text);
          }}
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
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Mô tả tình trạng</Text>
        <TextInput
          value={description}
          onFocus={() => setIsFocusedDescription(true)}
          onBlur={() => setIsFocusedDescription(false)}
          onChangeText={text => {
            setDescriptionError('');
            setDescription(text);
          }}
          multiline={true}
          style={[
            styles.descriptionInput,
            {
              borderColor: isFocusedDescription
                ? Color.fieldFocus
                : Color.fieldBlur,
            },
            {borderWidth: isFocusedDescription ? 1.5 : 1},
          ]}
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
                      source={{uri: IconURL.playVideoImg}}
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
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      {!serviceRequestRework && (
        <View style={styles.promotionContainer}>
          <TouchableOpacity
            style={styles.promotionBtnContainer}
            onPress={onShowPromotionDialog}>
            <Text style={styles.promotionBtnText}>Mã giảm giá</Text>
            <Icon name="chevron-down" style={styles.promotionIcon} />
          </TouchableOpacity>
          {promotionItem && (
            <View style={styles.promotionMainContainer}>
              <Text style={styles.promotionMainText}>
                Giảm {promotionItem.promotionValue * 100}%
              </Text>
              <TouchableOpacity
                style={styles.promotionCancelBtn}
                onPress={onRemovePromotion}>
                <Text style={styles.promotionCancelText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      <Modal transparent={true} visible={showPromotionDialog}>
        <View style={styles.dialogBackground}>
          <ScrollView style={styles.dialogContainer}>
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogTitle}>Voucher của bạn</Text>
              <TouchableOpacity
                onPress={onExitDialog}
                style={styles.exitIconContainer}>
                <Icon name="times" style={styles.exitIcon} />
              </TouchableOpacity>
            </View>
            {promotion.length === 0 && <Loading />}
            {promotion.errorsMsg && (
              <View style={styles.errorView}>
                <Image
                  source={{uri: IconURL.notFoundImg}}
                  style={styles.errorImg}
                />
                <Text style={styles.errorMsg}>Không có voucher nào có sẵn</Text>
              </View>
            )}
            {promotion.length > 0 &&
              !promotion.errorsMsg &&
              promotion.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.promotionItem}
                    onPress={() => onSelectPromotion(item)}>
                    <View style={styles.promotionInfo}>
                      <Text style={styles.promotionItemName}>
                        Giảm {item.promotionValue * 100}%
                      </Text>
                      <Text style={styles.promotionItemDescription}>
                        {item.promotionDescription}
                      </Text>
                    </View>
                    <View style={styles.promotionItemDate}>
                      <Text style={styles.promotionItemDateText}>
                        Ngày hết hạn
                      </Text>
                      <Text style={styles.promotionItemDateText}>
                        {moment(item.promotionDateExpired).format('DD/MM/YYYY')}
                      </Text>
                    </View>
                    <View style={styles.circle}></View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.confirmBtn}
        onPress={onCreateServiceRequest}>
        <Text style={styles.confirmBtnText}>Xác nhận</Text>
      </TouchableOpacity>
      <Modal transparent={true} visible={uploading}>
        <View style={styles.dialogBackground}>
          <View style={styles.loadingView}>
            <ActivityIndicator size={'large'} color={Color.primary} />
            <Text style={styles.loadingText}>Đang gửi yêu cầu</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
