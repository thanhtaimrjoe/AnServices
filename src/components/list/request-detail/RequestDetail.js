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
import IconURL from '../../../style/IconURL';

export default function RequestDetail(props) {
  const {serviceRequestInfo, requestDetail, contractInfo, contractParentInfo} =
    props;
  //state --- pause
  const [pause, setPause] = useState(false);
  //state --- mediaItem
  const [mediaItem, setMediaItem] = useState();
  //state --- showMediaViewDialog
  const [showMediaViewDialog, setShowMediaViewDialog] = useState(false);

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
  const getReworkService = requestDetail => {
    var checkReworkservice = false;
    requestDetail.map((item, index) => {
      if (item.requestDetailStatus === 16) {
        checkReworkservice = true;
      }
    });
    if (checkReworkservice) {
      return (
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={onCreateServiceRequest}>
          <Text style={styles.cancelBtnText}>Yêu cầu sửa lại</Text>
        </TouchableOpacity>
      );
    }
  };
  //
  const onCreateServiceRequest = () => {
    const reworkService = [];
    Alert.alert(
      'Lưu ý',
      'Những dịch vụ với tình trạng Làm lại yêu cầu sẽ được yêu cầu lại.\nBạn chắc chắn chứ?',
      [
        {
          text: 'Có',
          onPress: () => {
            //get list rework service
            requestDetail.map((item, index) => {
              if (item.requestDetailStatus === 16) {
                reworkService.push(item.service);
              }
            });
            props.onCreateServiceRequest(reworkService);
          },
        },
        {
          text: 'Không',
        },
      ],
    );
  };

  //button --- happy service
  const onHappyService = requestDetailId => {
    props.onHappyService(requestDetailId);
  };

  //button --- unhappy service
  const onUnhappyService = requestDetailId => {
    props.onUnhappyService(requestDetailId);
  };

  //view media
  const onViewMedia = item => {
    setMediaItem(item);
    setShowMediaViewDialog(true);
  };

  //button --- cancel request service
  const onCancelServiceRequest = () => {
    if (serviceRequestInfo.serviceRequestId) {
      Alert.alert('Thông báo', 'Bạn có chắc muốn hủy yêu cầu này?', [
        {
          text: 'Có',
          onPress: () => {
            props.onCancelServiceRequest(serviceRequestInfo.serviceRequestId);
          },
        },
        {
          text: 'Không',
        },
      ]);
    }
  };

  //button --- show invoice page
  const onShowInvoice = (
    serviceRequestId,
    promotionId,
    serviceRequestReference,
  ) => {
    props.onShowInvoice(serviceRequestId, promotionId, serviceRequestReference);
  };

  //btn --- view contract detail
  const onViewContractDetail = contractItem => {
    props.onViewContractDetail(contractItem);
  };

  //check only unsatified service => disable invoice button
  const checkOnlyUnsatifiedService = () => {
    var result = true;
    requestDetail.map((item, index) => {
      if (item.requestDetailStatus === 12) {
        result = false;
      } else {
        result = true;
      }
    });
    return result;
  };

  return (
    <ScrollView style={styles.container}>
      <Modal
        transparent={true}
        visible={requestDetail.length > 0 ? false : true}>
        <View style={styles.loadingDialogBackground}>
          <ActivityIndicator size={'large'} color={Color.primary} />
          <Text style={styles.loadingText}>Đang tải</Text>
        </View>
      </Modal>
      <View style={styles.packageContainer}>
        <Text style={styles.packageTitle}>Gói yêu cầu đã chọn</Text>
        {packages.map((item, index) => {
          if (item.packageId === serviceRequestInfo.serviceRequestPackage) {
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
                        Tình trạng:
                      </Text>
                      {item.requestDetailStatus === 2 && (
                        <Text style={styles.requestDetailStatusID2}>
                          Chưa xử lý
                        </Text>
                      )}
                      {item.requestDetailStatus === 6 && (
                        <Text style={styles.requestDetailStatusID6}>
                          Đang xử lý
                        </Text>
                      )}
                      {item.requestDetailStatus === 9 && (
                        <Text style={styles.requestDetailStatusID9}>
                          Chờ xác nhận
                        </Text>
                      )}
                      {item.requestDetailStatus === 11 && (
                        <Text style={styles.requestDetailStatusID11}>
                          Hài lòng
                        </Text>
                      )}
                      {item.requestDetailStatus === 12 && (
                        <Text style={styles.requestDetailStatusID12}>
                          Không hài lòng
                        </Text>
                      )}
                      {item.requestDetailStatus === 16 && (
                        <Text style={styles.requestDetailStatusID16}>
                          Làm lại yêu cầu
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                {item.requestDetailStatus === 9 && (
                  <View style={styles.rateContainer}>
                    <Text style={styles.rateTitle}>
                      Thợ của chúng tôi đã làm xong.
                    </Text>
                    <Text style={styles.rateTitle}>
                      Mời bạn đánh giá để hoàn thành dịch vụ.
                    </Text>
                    <Text style={styles.rateTitle}>
                      Lưu ý: Dịch vụ tự động xác nhận
                    </Text>
                    <View style={styles.rareTitleContainer}>
                      <Text style={styles.rateTitleBold}>HÀI LÒNG </Text>
                      <Text style={styles.rateTitle}>sau </Text>
                      {item.service.typeServiceNavigation.typeServiceId ===
                        1 && <Text style={styles.rateTitleTime}>1 ngày</Text>}
                    </View>
                  </View>
                )}
                {item.requestDetailStatus === 9 && (
                  <View style={styles.rateBtnContainer}>
                    <TouchableOpacity
                      style={styles.rateHappyBtn}
                      onPress={() => onHappyService(item.requestDetailId)}>
                      <Image
                        source={{uri: IconURL.happyImg}}
                        style={styles.rateImg}
                      />
                      <Text style={styles.rateBtnText}>Hài lòng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rateUnhappyBtn}
                      onPress={() => onUnhappyService(item.requestDetailId)}>
                      <Image
                        source={{uri: IconURL.unHappyImg}}
                        style={styles.rateImg}
                      />
                      <Text style={styles.rateBtnText}>Không hài lòng</Text>
                    </TouchableOpacity>
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
          <Text style={styles.fullNameText}>
            {serviceRequestInfo.customerName}
          </Text>
        </View>
      </View>
      <View style={styles.phoneContainer}>
        <Text style={styles.phoneTitle}>Số điện thoại chủ công trình</Text>
        <View style={styles.phoneView}>
          <Text style={styles.phoneText}>
            {serviceRequestInfo.customerPhone}
          </Text>
        </View>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Địa chỉ</Text>
        <View style={styles.addressView}>
          <Text style={styles.addressText}>
            {serviceRequestInfo.customerAddress}
          </Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Mô tả tình trạng</Text>
        <View style={styles.descriptionView}>
          <Text style={styles.descriptionText}>
            {serviceRequestInfo.serviceRequestDescription}
          </Text>
        </View>
      </View>
      <View style={styles.mediaContainer}>
        <Text style={styles.mediaTitle}>Ảnh hoặc video</Text>
        <View style={styles.mediaFileContainer}>
          {serviceRequestInfo.tblMedia &&
            serviceRequestInfo.tblMedia.map((item, index) => {
              if (!item.mediaUrl.includes('.mp4')) {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onViewMedia(item)}>
                    <Image
                      style={styles.mediaView}
                      source={{uri: item.mediaUrl}}
                    />
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onViewMedia(item)}>
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
                  poster={IconURL.loadingVideoImg}
                  posterResizeMode={'cover'}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      {contractInfo.contractTitle && !contractInfo.errorsMsg && (
        <View style={styles.contractContainer}>
          <Text style={styles.contractTitle}>Hợp đồng</Text>
          {serviceRequestInfo.serviceRequestStatus !== 8 ? (
            <TouchableOpacity
              style={styles.contractItemContainer}
              onPress={() => onViewContractDetail(contractInfo)}>
              <Image
                source={{uri: IconURL.contractImg}}
                style={styles.contractItemImg}
              />
              <Text style={styles.contractItemName}>
                {contractInfo.contractTitle}
              </Text>

              {serviceRequestInfo.serviceRequestStatus !== 8 && (
                <View style={styles.contractItemStatus}>
                  <Text style={styles.contractItemStatusText}>
                    {contractInfo.contractStatus === 2 && 'Đang chờ'}
                    {contractInfo.contractStatus === 7 && 'Sửa lại'}
                    {contractInfo.contractStatus === 3 && 'Đồng ý'}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ) : (
            <View style={styles.contractItemContainer}>
              <Image
                source={{uri: IconURL.contractImg}}
                style={styles.contractItemImg}
              />
              <Text style={styles.contractItemName}>
                {contractInfo.contractTitle}
              </Text>
              {serviceRequestInfo.serviceRequestStatus !== 8 && (
                <View style={styles.contractItemStatus}>
                  <Text style={styles.contractItemStatusText}>
                    {contractInfo.contractStatus === 2 && 'Đang chờ'}
                    {contractInfo.contractStatus === 7 && 'Sửa lại'}
                    {contractInfo.contractStatus === 3 && 'Đồng ý'}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      )}
      {contractParentInfo.contractTitle && !contractParentInfo.errorsMsg && (
        <View style={styles.contractContainer}>
          <Text style={styles.contractTitle}>Hợp đồng của yêu cầu trước</Text>
          <TouchableOpacity
            style={styles.contractItemContainer}
            onPress={() => onViewContractDetail(contractParentInfo)}>
            <Image
              source={{uri: IconURL.contractImg}}
              style={styles.contractItemImg}
            />
            <Text style={styles.contractItemName}>
              {contractParentInfo.contractTitle}
            </Text>
            <View style={styles.contractItemStatus}>
              <Text style={styles.contractItemStatusText}>
                {contractParentInfo.contractStatus === 2 && 'Đang chờ'}
                {contractParentInfo.contractStatus === 7 && 'Sửa lại'}
                {contractParentInfo.contractStatus === 3 && 'Đồng ý'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {serviceRequestInfo.serviceRequestStatus === 13 &&
        checkOnlyUnsatifiedService() && (
          <View style={styles.invoiceContainer}>
            <Text style={styles.invoiceTitle}>Hóa đơn</Text>
            <TouchableOpacity
              style={styles.invoiceItemContainer}
              onPress={() =>
                onShowInvoice(
                  serviceRequestInfo.serviceRequestId,
                  serviceRequestInfo.promotionId,
                  serviceRequestInfo.serviceRequestReference,
                )
              }>
              <Image
                source={{uri: IconURL.invoiceImg}}
                style={styles.invoiceItemImg}
              />
              <Text style={styles.invoiceItemName}>Hóa đơn</Text>
            </TouchableOpacity>
          </View>
        )}
      {(serviceRequestInfo.serviceRequestStatus === 2 ||
        serviceRequestInfo.serviceRequestStatus === 15) && (
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={onCancelServiceRequest}>
          <Text style={styles.cancelBtnText}>Hủy yêu cầu</Text>
        </TouchableOpacity>
      )}
      {getReworkService(requestDetail)}
    </ScrollView>
  );
}
