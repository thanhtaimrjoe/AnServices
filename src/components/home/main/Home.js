import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Loading from '../../general/Loading';
import {styles} from './HomeStyle';

export default function Home(props) {
  const {services} = props;

  //button --- request service
  const onRequestService = () => {
    props.onRequestService();
  };
  //button --- view contract
  const onViewContract = () => {
    props.onViewContract();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.adsContainer}>
          <View style={styles.adsTextContainer}>
            <Text style={styles.adsTitle}>Bạn cần sửa gì ư?</Text>
            <Text style={styles.adsDescription}>
              Đừng lo, chúng tôi sẽ cung cấp những dịch vụ tốt nhất dành cho bạn
            </Text>
          </View>
          <Image
            source={require('../../../assets/icon/repair-tools.png')}
            style={styles.adsImg}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.requestBtn}
            onPress={onRequestService}>
            <Icon name="tools" style={styles.requestIcon} />
            <Text style={styles.requestText}>Yêu cầu sửa chữa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.requestBtn} onPress={onViewContract}>
            <Icon name="file-contract" style={styles.requestIcon} />
            <Text style={styles.requestText}>Xem hợp đồng</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.serviceContainer}>
        <Text style={styles.serviceTitle}>Dịch vụ của chúng tôi</Text>
        {services.length === 0 && <Loading />}
        {services.errorsMsg ? (
          <View style={styles.errorView}>
            <Image
              source={require('../../../assets/icon/not-found.png')}
              style={styles.errorImg}
            />
            <Text style={styles.errorMsg}>Không có dịch vụ nào có sẵn</Text>
          </View>
        ) : (
          services.map((item, index) => {
            return (
              <View key={index} style={styles.serviceItemContainer}>
                <Image
                  source={{uri: item.serviceImg}}
                  style={styles.serviceItemImg}
                />
                <View style={styles.serviceItemTextContainer}>
                  <Text style={styles.serviceItemName}>{item.serviceName}</Text>
                  <Text style={styles.serviceItemDescription}>
                    {item.serviceDescription}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}
