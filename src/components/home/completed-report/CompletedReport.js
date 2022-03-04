import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './CompletedReportStyle';
import Color from '../../../style/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function CompletedReport(props) {
  const {uploading, requestDetailItem} = props;
  //initital state
  const initialState = [];
  //state --- description and descriptionError
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState();
  //state --- mediaItem
  const [mediaItem, setMediaItem] = useState();
  //state --- media and mediaError
  const [media, setMedia] = useState(initialState);
  const [mediaError, setMediaError] = useState();
  //state --- showMediaDialog
  const [showMediaDialog, setShowMediaDialog] = useState(false);
  //state --- showMediaViewDialog
  const [showMediaViewDialog, setShowMediaViewDialog] = useState(false);

  useEffect(() => {
    media;
    mediaItem;
  }, []);

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

  //open camera -> set to media state
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

  //open video -> set to media state
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

  //open gallery -> set to media state
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
          setMedia(media => [...media, item]);
        });
      }
    });
  };

  //validation
  const validateValue = () => {
    var result = true;
    //reset new
    setDescriptionError('');
    setMediaError('');
    if (description.trim().length === 0) {
      setDescriptionError('Mô tả nhập không đúng');
      result = false;
    }
    if (media.length === 0) {
      setMediaError('Bạn chưa chọn ảnh hoặc video');
    }
    return result;
  };

  //button --- create report problem
  const onCreateReportProblem = () => {
    //check validate
    const validation = validateValue();
    if (validation) {
      props.onCreateReportProblem(description, media);
    }
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
      <View style={styles.requestContainer}>
        <Text style={styles.requestTitle}>Yêu cầu bạn đã chọn</Text>
        <View style={styles.requestItemContainer}>
          <Image
            source={require('../../../assets/icon/complete.png')}
            style={styles.requestItemImg}
          />
          <View style={styles.requestItemTextContainer}>
            <Text style={styles.requestItemName}>Báo cáo hoàn thành</Text>
            <Text style={styles.requestItemDescription}>
              Báo cáo sau khi đã hoàn thành xong công việc
            </Text>
          </View>
        </View>
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
          })}
        </View>
        <Text style={styles.errorMessage}>{mediaError}</Text>
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
          onPress={onCreateReportProblem}>
          <Text style={styles.confirmBtnText}>Gửi báo cáo</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
