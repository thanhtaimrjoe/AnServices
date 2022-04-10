import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {styles} from './ListRequestServiceStyle';
import Loading from '../../general/Loading';
import IconURL from '../../../style/IconURL';

export default function ListRequestService(props) {
  const {status, refreshing, listFilterStatus, serviceRequest} = props;

  //refresh request service by status
  const onRefreshServiceRequestByStatus = () => {
    props.onRefreshServiceRequestByStatus();
  };

  //tap on filter -> get request service by status
  const onGetServiceRequestByStatus = status => {
    props.onGetServiceRequestByStatus(status);
  };

  //button --- navigate to request detail
  const onShowRequestDetail = serviceRequest => {
    props.onShowRequestDetail(serviceRequest);
  };

  //button --- navigate to invoice
  const onShowInvoice = (
    serviceRequestId,
    promotionId,
    serviceRequestReference,
  ) => {
    props.onShowInvoice(serviceRequestId, promotionId, serviceRequestReference);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefreshServiceRequestByStatus}
        />
      }>
      <Text style={styles.title}>Danh sách yêu cầu</Text>
      <View style={styles.filter}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {listFilterStatus.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.filterBtn,
                  status.statusID === item.statusID && styles.filterBtnActive,
                ]}
                onPress={() => onGetServiceRequestByStatus(item)}>
                <Text
                  style={[
                    styles.filterText,
                    status.statusID === item.statusID &&
                      styles.filterTextActive,
                  ]}>
                  {item.statusName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {serviceRequest.length === 0 && <Loading />}
      {serviceRequest.errorsMsg && (
        <View style={styles.errorView}>
          <Image source={{uri: IconURL.notFoundImg}} style={styles.errorImg} />
          <Text style={styles.errorMsg}>Không có yêu cầu nào có sẵn</Text>
        </View>
      )}
      {serviceRequest.length > 0 &&
        !serviceRequest.errorsMsg &&
        serviceRequest.map((item, index) => {
          return (
            <View key={index} style={styles.serviceRequestItemContainer}>
              <TouchableOpacity
                style={styles.serviceRequestItem}
                onPress={() => onShowRequestDetail(item)}>
                <Image
                  source={{uri: IconURL.serviceRequestImg}}
                  style={styles.serviceRequestItemImg}
                />
                <Text numberOfLines={1} style={styles.serviceRequestItemName}>
                  {item.serviceRequestDescription}
                </Text>
              </TouchableOpacity>
              {item.serviceRequestStatus === 14 && (
                <View style={styles.invoiceContainer}>
                  <Text style={styles.invoiceTitle}>
                    Chúng tôi đã hoàn thành xong dịch vụ. Mời bạn xem hóa đơn
                  </Text>
                  <TouchableOpacity
                    style={styles.invoiceBtn}
                    onPress={() =>
                      onShowInvoice(
                        item.serviceRequestId,
                        item.promotionId,
                        item.serviceRequestReference,
                      )
                    }>
                    <Text style={styles.invoiceBtnText}>Xem hóa đơn</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
    </ScrollView>
  );
}
