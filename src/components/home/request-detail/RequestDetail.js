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

export default function RequestDetail(props) {
  const {requestService, requestDetail} = props;
  //state --- mediaItem
  const [pause, setPause] = useState(false);
  //state --- mediaItem
  const [mediaItem, setMediaItem] = useState();
  //state --- showMediaViewDialog
  const [showMediaViewDialog, setShowMediaViewDialog] = useState(false);

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
      <View style={styles.serviceContainer}>
        <Text style={styles.title}>Loại dịch vụ</Text>
        {requestDetail.length > 0 ? (
          requestDetail.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.serviceItemContainer}
                onPress={() => onShowMaterialDetail(item)}>
                <Image
                  source={{uri: item.service.serviceImg}}
                  style={styles.serviceItemImg}
                />
                <Text style={styles.serviceItemName}>
                  {item.service.serviceName}
                </Text>
                <Icon name="chevron-right" style={styles.serviceItemIcon} />
              </TouchableOpacity>
            );
          })
        ) : (
          <View>
            <ActivityIndicator size={'large'} color={Color.primary} />
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
            {requestService.requestServiceDescription}
          </Text>
        </View>
      </View>
      <View style={styles.mediaContainer}>
        <Text style={styles.mediaTitle}>Ảnh hoặc video</Text>
        <View style={styles.mediaFileContainer}>
          {requestService.media.map((item, index) => {
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
                    poster={
                      'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/icon%2Fvideo-loading.png?alt=media&token=49d05763-3958-49d6-b92d-8fa1cc1a5567'
                    }
                    posterResizeMode={'cover'}
                    paused={pause}
                    onLoad={() => {
                      setPause(true);
                    }}
                  />
                  <Image
                    source={require('../../../assets/icon/play.png')}
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
