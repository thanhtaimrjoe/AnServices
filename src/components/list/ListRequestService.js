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
import Loading from '../general/Loading';

export default function ListRequestService(props) {
  const {listRequestService} = props;
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    props.onRefresh();
    setRefreshing(false);
  };
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text style={styles.title}>Danh sách dịch vụ</Text>
      <View style={styles.filter}>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.filterText}>Đang chờ</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.filterText}>Đang sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.filterText}>Hoàn thành</Text>
        </TouchableOpacity>
      </View>
      {listRequestService.length > 0 ? (
        listRequestService.map((item, index) => {
          return (
            <View key={index} style={styles.requestServiceItem}>
              <Image
                source={require('../../assets/icon/broken.png')}
                style={styles.requestServiceItemImg}
              />
              <Text style={styles.requestServiceItemName}>
                {item.requestServiceDescription}
              </Text>
              <View style={styles.requestServiceItemStatus}>
                <Text style={styles.requestServiceItemStatusText}>
                  {item.requestServiceStatus}
                </Text>
              </View>
            </View>
          );
        })
      ) : (
        <Loading />
      )}
    </ScrollView>
  );
}
