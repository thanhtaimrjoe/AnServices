import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './HomeStyle';
import Loading from '../../general/Loading';
export default function Home(props) {
  const {user, refreshing, requestService, listFilterStatus} = props;
  //state --- status
  const [status, setStatus] = useState('Gần đây');

  //set state status
  const onSetStatusFilter = status => {
    setStatus(status);
  };

  //button --- navigate to request service detail
  const onShowRequestServiceDetail = requestService => {
    props.onShowRequestServiceDetail(requestService);
  };

  //button --- refresh request service by worker id
  const onRefreshRequestServiceByWorkerID = () => {
    props.onRefreshRequestServiceByWorkerID();
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefreshRequestServiceByWorkerID}
        />
      }>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Xin chào,</Text>
        <Text style={styles.welcomeName}>{user.fullName}</Text>
        <Image
          source={require('../../../assets/icon/welcome.png')}
          style={styles.welcomeImg}
        />
      </View>
      <Text style={styles.requestServiceListTitle}>Dịch vụ đang nhận</Text>
      <View style={styles.filter}>
        {listFilterStatus.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterBtn,
                status === item.status && styles.filterBtnActive,
              ]}
              onPress={() => onSetStatusFilter(item.status)}>
              <Text
                style={[
                  styles.filterBtnText,
                  status === item.status && styles.filterBtnTextActive,
                ]}>
                {item.status}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.requestServiceListContainer}>
        {requestService.length === 0 && <Loading />}
        {requestService.errorsMsg ? (
          <View style={styles.errorView}>
            <Image
              source={require('../../../assets/icon/not-found.png')}
              style={styles.errorImg}
            />
            <Text style={styles.errorMsg}>
              Hiện tại bạn chưa được nhận bất kỳ dịch vụ nào
            </Text>
          </View>
        ) : (
          requestService.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.requestServiceItemContainer}
                onPress={() => onShowRequestServiceDetail(item)}>
                <Image
                  source={require('../../../assets/icon/service.png')}
                  style={styles.requestServiceItemImg}
                />
                <Text numberOfLines={1} style={styles.requestServiceItemName}>
                  {item.requestServiceDescription}
                </Text>
                <View style={styles.requestServiceItemStatusContainer}>
                  <Text style={styles.requestServiceItemStatus}>
                    {item.requestServiceStatus.statusId === 2 && 'Đang chờ'}
                    {item.requestServiceStatus.statusId === 3 && 'Chấp thuận'}
                    {item.requestServiceStatus.statusId === 6 && 'Đang sửa'}
                    {item.requestServiceStatus.statusId === 1 && 'Từ chối'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}
