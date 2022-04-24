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
import IconURL from '../../../style/IconURL';
export default function Home(props) {
  const {user, workerInfo, refreshing, requestService, listFilterStatus} =
    props;
  //state --- status
  const [status, setStatus] = useState({
    statusID: 0,
    statusName: 'Đang nhận',
  });

  //set state status
  const onGetAllServiceRequestByWorkerID = status => {
    setStatus(status);
    props.onGetAllServiceRequestByWorkerID(status.statusID);
  };

  //button --- navigate to request service detail
  const onShowRequestServiceDetail = requestService => {
    props.onShowRequestServiceDetail(requestService);
  };

  //button --- refresh request service by worker id
  const onRefreshServiceRequestByWorkerID = () => {
    props.onRefreshServiceRequestByWorkerID(status.statusID);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefreshServiceRequestByWorkerID}
        />
      }>
      <View style={styles.logoContainer}>
        <Image source={{uri: IconURL.anserviceImg}} style={styles.logoImg} />
        <Text style={styles.logoText}>AnServices</Text>
      </View>
      <View style={styles.userInfoContainer}>
        <Image source={{uri: IconURL.userImg}} style={styles.userIcon} />
        <View>
          <Text style={styles.userInfoName}>{user.fullName}</Text>
          <Text style={styles.userInfoDescription}>
            {workerInfo.typeJob && workerInfo.typeJob.typeJobName}
          </Text>
        </View>
      </View>
      <Text style={styles.requestServiceListTitle}>Danh sách dịch vụ</Text>
      <View style={styles.filter}>
        {listFilterStatus.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterBtn,
                status.statusID === item.statusID && styles.filterBtnActive,
              ]}
              onPress={() => onGetAllServiceRequestByWorkerID(item)}>
              <Text
                style={[
                  styles.filterText,
                  status.statusID === item.statusID && styles.filterTextActive,
                ]}>
                {item.statusName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.requestServiceListContainer}>
        {requestService.length === 0 && (
          <View style={styles.loadingScreen}>
            <Loading />
          </View>
        )}
        {requestService.errorsMsg ? (
          <View style={styles.errorView}>
            <Image
              source={{uri: IconURL.notFoundImg}}
              style={styles.errorImg}
            />
            <Text style={styles.errorMsg}>Chưa có yêu cầu nào</Text>
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
