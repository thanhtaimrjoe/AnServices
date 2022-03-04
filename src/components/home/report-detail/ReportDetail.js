import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './ReportDetailStyle';
import Video from 'react-native-video';

export default function ReportDetail(props) {
  const {reportDetail, requestDetailItem} = props;
  //state --- pause
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.serviceContainer}>
        <Text style={styles.serviceTitle}>Tên dịch vụ</Text>
        <View style={styles.serviceItemContainer}>
          <Image
            source={{uri: requestDetailItem.service.serviceImg}}
            style={styles.serviceItemImg}
          />
          <View style={styles.serviceItemTextContainer}>
            <Text style={styles.serviceItemName}>
              {requestDetailItem.service.serviceName}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Mô tả</Text>
        <View style={styles.descriptionView}>
          <Text style={styles.descriptionText}>
            {reportDetail.reportDescription}
          </Text>
        </View>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateTitle}>Thời gian báo cáo</Text>
        <View style={styles.dateView}>
          <Text style={styles.dateText}>{reportDetail.reportDate}</Text>
        </View>
      </View>
      <View style={styles.mediaContainer}>
        <Text style={styles.mediaTitle}>Ảnh hoặc video</Text>
        <View style={styles.mediaFileContainer}>
          {reportDetail.tblMedia.map((item, index) => {
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
