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

export default function ListRequestService(props) {
  const {status, refreshing, listFilterStatus, requestService} = props;

  //refresh request service by status
  const onRefreshRequestServiceByStatus = () => {
    props.onRefreshRequestServiceByStatus();
  };

  //tap on filter -> get request service by status
  const onGetRequestServiceByStatus = status => {
    props.onGetRequestServiceByStatus(status);
  };

  //button --- navigate to request detail
  const onShowRequestDetail = requestService => {
    props.onShowRequestDetail(requestService);
  };

  //button --- navigate to invoice
  const onShowInvoice = requestServiceId => {
    props.onShowInvoice(requestServiceId);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefreshRequestServiceByStatus}
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
                onPress={() => onGetRequestServiceByStatus(item)}>
                <Text style={styles.filterText}>{item.statusName}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {requestService.length === 0 && <Loading />}
      {requestService.errorsMsg && (
        <View style={styles.errorView}>
          <Image
            source={require('../../../assets/icon/not-found.png')}
            style={styles.errorImg}
          />
          <Text style={styles.errorMsg}>Không có yêu cầu nào có sẵn</Text>
        </View>
      )}
      {requestService.length > 0 &&
        !requestService.errorsMsg &&
        requestService.map((item, index) => {
          return (
            <View key={index} style={styles.requestServiceItemContainer}>
              <TouchableOpacity
                style={styles.requestServiceItem}
                onPress={() => onShowRequestDetail(item)}>
                <Image
                  source={require('../../../assets/icon/service.png')}
                  style={styles.requestServiceItemImg}
                />
                <Text numberOfLines={1} style={styles.requestServiceItemName}>
                  {item.requestServiceDescription}
                </Text>
                {/* <View style={styles.requestServiceItemStatus}>
                <Text style={styles.requestServiceItemStatusText}>
                  {item.requestServiceStatus.statusName}
                </Text>
              </View> */}
              </TouchableOpacity>
              {item.requestServiceStatus.statusId === 14 && (
                <View style={styles.invoiceContainer}>
                  <Text style={styles.invoiceTitle}>
                    Chúng tôi đã hoàn thành xong dịch vụ. Mời bạn xem hóa đơn
                  </Text>
                  <TouchableOpacity
                    style={styles.invoiceBtn}
                    onPress={() => onShowInvoice(item.requestServiceId)}>
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
