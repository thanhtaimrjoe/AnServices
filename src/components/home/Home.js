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
import Loading from '../general/Loading';
import {styles} from './HomeStyle';

export default function Home(props) {
  const {services} = props;
  const onRequestService = () => {
    props.onRequestService();
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
            source={require('../../assets/icon/repair-tools.png')}
            style={styles.adsImg}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.requestBtn} onPress={onRequestService}>
          <Icon name="tools" style={styles.requestIcon} />
          <Text style={styles.requestText}>Yêu cầu sửa chữa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.requestBtn}>
          <Icon name="file-contract" style={styles.requestIcon} />
          <Text style={styles.requestText}>Xem hợp đồng</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.serviceContainer}>
        <Text style={styles.serviceTitle}>Dịch vụ của chúng tôi</Text>
        {services.length > 0 ? (
          services.map((item, index) => {
            return (
              <View key={index} style={styles.serviceItemContainer}>
                <Image
                  source={require('../../assets/icon/broken.png')}
                  style={styles.serviceItemImg}
                />
                <View style={styles.serviceItemTextContainer}>
                  <Text style={styles.serviceItemName}>{item.serviceName}</Text>
                  <Text style={styles.serviceItemDescription}>
                    {item.serviceDescription}
                  </Text>
                </View>

                <Text style={styles.serviceItemPrice}>
                  {item.servicePrice}Đ
                </Text>
              </View>
            );
          })
        ) : (
          <Loading />
        )}
      </View>
    </ScrollView>
  );
}
