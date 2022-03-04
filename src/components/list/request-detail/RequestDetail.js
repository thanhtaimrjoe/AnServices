import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './RequestDetailStyle';
import Color from '../../../style/Color';
import Video from 'react-native-video';

export default function RequestDetail(props) {
  const {requestService, requestDetail} = props;
  //state --- pause
  const [pause, setPause] = useState(false);
  //state --- mediaItem
  const [mediaItem, setMediaItem] = useState();
  //state --- showMediaViewDialog
  const [showMediaViewDialog, setShowMediaViewDialog] = useState(false);

  useEffect(() => {
    mediaItem;
  }, []);

  //button --- happy service
  const onHappyService = () => {};

  //button --- unhappy service
  const onUnhappyService = () => {};

  //view media
  const onViewMedia = item => {
    setMediaItem(item);
    setShowMediaViewDialog(true);
  };

  //button --- cancel request service
  const onCancelRequestService = () => {
    if (requestService.requestServiceId) {
      Alert.alert('Thông báo', 'Bạn có chắc muốn hủy yêu cầu này?', [
        {
          text: 'Có',
          onPress: () => {
            props.onCancelRequestService(requestService.requestServiceId);
          },
        },
        {
          text: 'Không',
        },
      ]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.serviceContainer}>
        <Text style={styles.title}>Dịch vụ đã chọn</Text>
        {requestDetail.length > 0 ? (
          requestDetail.map((item, index) => {
            return (
              <View key={index} style={styles.serviceItem}>
                <View style={styles.serviceItemContainer}>
                  <Image
                    source={{uri: item.service.serviceImg}}
                    style={styles.serviceItemImg}
                  />
                  <View style={styles.serviceItemTextContainer}>
                    <Text style={styles.serviceItemName}>
                      {item.service.serviceName}
                    </Text>
                    <View style={styles.requestDetailStatusContainer}>
                      <Text style={styles.requestDetailStatusTitle}>
                        Tình trạng
                      </Text>

                      {item.requestDetailStatus === 2 && (
                        <View style={styles.requestDetailStatusID2}>
                          <Text style={styles.requestDetailStatusText}>
                            Chưa xử lý
                          </Text>
                        </View>
                      )}
                      {item.requestDetailStatus === 6 && (
                        <View style={styles.requestDetailStatusID6}>
                          <Text style={styles.requestDetailStatusText}>
                            Đang xử lý
                          </Text>
                        </View>
                      )}
                      {item.requestDetailStatus === 9 && (
                        <View style={styles.requestDetailStatusID9}>
                          <Text style={styles.requestDetailStatusText}>
                            Chờ xác nhận
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                {item.requestDetailStatus === 9 && (
                  <View style={styles.rateContainer}>
                    <Text style={styles.rateTitle}>
                      Chúng tôi đã hoàn thành dịch vụ. Mời bạn đánh giá hoàn
                      thành
                    </Text>
                    <View style={styles.rateBtnContainer}>
                      <TouchableOpacity
                        style={styles.rateBtn}
                        onPress={onHappyService}>
                        <Image
                          source={require('../../../assets/icon/happy.png')}
                          style={styles.rateImg}
                        />
                        <Text style={styles.rateBtnText}>Hài lòng</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.rateBtn}
                        onPress={onUnhappyService}>
                        <Image
                          source={require('../../../assets/icon/unhappy.png')}
                          style={styles.rateImg}
                        />
                        <Text style={styles.rateBtnText}>Không hài lòng</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
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
      {requestService.requestServiceStatus.statusId === 2 && (
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={onCancelRequestService}>
          <Text style={styles.cancelBtnText}>Hủy yêu cầu</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
