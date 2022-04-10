import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './RequestDetailStyle';
import Video from 'react-native-video';
import Color from '../../../style/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconURL from '../../../style/IconURL';
import moment from 'moment';
import 'moment/locale/vi';
import Loading from '../../general/Loading';

export default function RequestDetail(props) {
  const {requestService, requestDetail} = props;
  //state --- mediaItem
  const [pause, setPause] = useState(false);
  //state --- mediaItem
  const [mediaItem, setMediaItem] = useState();
  //state --- showMediaViewDialog
  const [showMediaViewDialog, setShowMediaViewDialog] = useState(false);
  moment().locale('vi');

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
    mediaItem;
  }, []);

  //view media
  const onViewMedia = item => {
    setMediaItem(item);
    setShowMediaViewDialog(true);
  };

  //button --- navigate to material detail
  const onShowMaterialDetail = requestDetailItem => {
    props.onShowMaterialDetail(requestDetailItem);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.packageContainer}>
        <Text style={styles.packageTitle}>Gói yêu cầu</Text>
        {packages.map((item, index) => {
          if (item.packageId === requestService.serviceRequestPackage) {
            return (
              <View key={index} style={styles.packageItemContainer}>
                <Image
                  source={{uri: item.packageImg}}
                  style={styles.packageItemImg}
                />
                <View style={styles.packageItemTextContainer}>
                  <Text style={styles.packageItemName}>{item.packageName}</Text>
                  <Text style={styles.packageItemDescription}>
                    {item.packageDescription}
                  </Text>
                </View>
              </View>
            );
          }
        })}
      </View>
      <View style={styles.serviceContainer}>
        <Text style={styles.serviceTitle}>Loại dịch vụ</Text>
        {requestDetail.length > 0 ? (
          requestDetail.map((item, index) => {
            return (
              <View key={index} style={styles.serviceItem}>
                <View style={styles.serviceItemContainer}>
                  <View style={styles.serviceItemMainContainer}>
                    <View style={styles.serviceItemInforContainer}>
                      <Text style={styles.serviceItemName}>
                        {item.service.serviceName}
                      </Text>
                      <View style={styles.serviceItemDescriptionContainer}>
                        <Text style={styles.serviceItemTitle}>Tình trạng:</Text>
                        {item.requestDetailStatus === 2 && (
                          <Text style={styles.serviceItemStatus2}>
                            Chưa xử lý
                          </Text>
                        )}
                        {item.requestDetailStatus === 6 && (
                          <Text style={styles.serviceItemStatus6}>
                            Đang xử lý
                          </Text>
                        )}
                        {item.requestDetailStatus === 9 && (
                          <Text style={styles.serviceItemStatus9}>
                            Chờ xác nhận
                          </Text>
                        )}
                        {item.requestDetailStatus === 11 && (
                          <Text style={styles.serviceItemStatus11}>
                            Hài lòng
                          </Text>
                        )}
                        {item.requestDetailStatus === 12 && (
                          <Text style={styles.serviceItemStatus12}>
                            Không hài lòng
                          </Text>
                        )}
                        {item.requestDetailStatus === 16 && (
                          <Text style={styles.serviceItemStatus16}>
                            Làm lại yêu cầu
                          </Text>
                        )}
                      </View>
                      <View style={styles.serviceItemDescriptionContainer}>
                        <Text style={styles.serviceItemTitle}>Độ ưu tiên:</Text>
                        {item.tblRepairDetails[0].requestDetailPriority ===
                          1 && (
                          <Text style={styles.serviceItemPriority}>Thấp</Text>
                        )}
                        {item.tblRepairDetails[0].requestDetailPriority ===
                          2 && (
                          <Text style={styles.serviceItemPriority}>
                            Trung bình
                          </Text>
                        )}
                        {item.tblRepairDetails[0].requestDetailPriority ===
                          3 && (
                          <Text style={styles.serviceItemPriority}>Cao</Text>
                        )}
                        {item.tblRepairDetails[0].requestDetailPriority ===
                          4 && (
                          <Text style={styles.serviceItemPriority}>
                            Rất cao
                          </Text>
                        )}
                      </View>
                    </View>
                    <Image
                      source={{uri: item.service.serviceImg}}
                      style={styles.serviceItemImg}
                    />
                  </View>
                  <View style={styles.serviceItemDateContainer}>
                    <Text style={styles.serviceItemTitle}>Ngày nhận:</Text>
                    <Text style={styles.serviceItemDate}>
                      {moment(item.tblRepairDetails[0].repairDateBegin).format(
                        'dddd Do MMMM YYYY',
                      )}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.serviceItemBtn}
                    onPress={() => onShowMaterialDetail(item)}>
                    <Text style={styles.serviceItemBtnText}>Xem chi tiết</Text>
                    <Icon
                      name="arrow-right"
                      style={styles.serviceItemBtnIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.loadingScreen}>
            <Loading />
          </View>
        )}
      </View>
      <View style={styles.fullNameContainer}>
        <Text style={styles.fullNameTitle}>Họ và tên chủ công trình</Text>
        <View style={styles.fullNameView}>
          <Text style={styles.fullNameText}>{requestService.customerName}</Text>
        </View>
      </View>
      <View style={styles.phoneContainer}>
        <Text style={styles.phoneTitle}>Số điện thoại chủ công trình</Text>
        <View style={styles.phoneView}>
          <Text style={styles.phoneText}>{requestService.customerPhone}</Text>
        </View>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Địa chỉ</Text>
        <View style={styles.addressView}>
          <Text style={styles.addressText}>
            {requestService.customerAddress}
          </Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Mô tả tình trạng</Text>
        <View style={styles.descriptionView}>
          <Text style={styles.descriptionText}>
            {requestService.serviceRequestDescription}
          </Text>
        </View>
      </View>
      <View style={styles.mediaContainer}>
        <Text style={styles.mediaTitle}>Ảnh hoặc video</Text>
        <View style={styles.mediaFileContainer}>
          {requestService.tblMedia.map((item, index) => {
            if (!item.mediaUrl.includes('.mp4')) {
              return (
                <TouchableOpacity key={index} onPress={() => onViewMedia(item)}>
                  <Image
                    style={styles.mediaView}
                    source={{uri: item.mediaUrl}}
                  />
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity key={index} onPress={() => onViewMedia(item)}>
                  <Video
                    style={styles.mediaView}
                    source={{uri: item.mediaUrl}}
                    poster={IconURL.loadingVideoImg}
                    posterResizeMode={'cover'}
                    paused={pause}
                    onLoad={() => {
                      setPause(true);
                    }}
                  />
                  <Image
                    source={{uri: IconURL.playVideoImg}}
                    style={styles.playImg}
                  />
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </View>
      {mediaItem && (
        <Modal transparent={true} visible={showMediaViewDialog}>
          <TouchableWithoutFeedback
            onPress={() => setShowMediaViewDialog(false)}>
            <View style={styles.dialogBackground}>
              {!mediaItem.mediaUrl.includes('.mp4') ? (
                <Image
                  source={{uri: mediaItem.mediaUrl}}
                  style={styles.mediaFull}
                />
              ) : (
                <Video
                  source={{
                    uri: mediaItem.mediaUrl,
                  }}
                  resizeMode="cover"
                  style={styles.mediaFull}
                  poster={
                    'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/icon%2Fvideo-loading.png?alt=media&token=49d05763-3958-49d6-b92d-8fa1cc1a5567'
                  }
                  posterResizeMode={'cover'}
                  controls={true}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </ScrollView>
  );
}
