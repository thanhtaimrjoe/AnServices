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
import IconURL from '../../../style/IconURL'
export default function Home(props) {
  const {user, refreshing, requestService, listFilterStatus} = props;
  //state --- status
  const [status, setStatus] = useState('Đang nhận');

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
          source={{uri: IconURL.welcomeImg}}
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
              source={{uri: IconURL.notFoundImg}}
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
                  source={{uri: IconURL.requestServiceImg}}
                  style={styles.requestServiceItemImg}
                />
                <Text numberOfLines={1} style={styles.requestServiceItemName}>
                  {item.serviceRequestDescription}
                </Text>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}
