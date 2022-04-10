import {View, Text, Image, ScrollView, RefreshControl} from 'react-native';
import React, {useState} from 'react';
import {styles} from './PromotionManagementStyle';
import IconURL from '../../../style/IconURL';
import Loading from '../../general/Loading';
import moment from 'moment';

export default function PromotionManagement(props) {
  const {promotion, refreshing} = props;

  //button --- refresh promotion
  const onRefreshPromotionManagement = () => {
    props.onRefreshPromotionManagement();
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefreshPromotionManagement}
        />
      }>
      {promotion.length === 0 && <Loading />}
      {promotion.errorsMsg && (
        <View style={styles.errorView}>
          <Image source={{uri: IconURL.notFoundImg}} style={styles.errorImg} />
          <Text style={styles.errorMsg}>Không có voucher nào có sẵn</Text>
        </View>
      )}
      {promotion.length > 0 &&
        !promotion.errorsMsg &&
        promotion.map((item, index) => {
          return (
            <View key={index} style={styles.promotionItem}>
              <View style={styles.promotionInfo}>
                <Text style={styles.promotionItemName}>
                  Giảm {item.promotionValue * 100}%
                </Text>
                <Text style={styles.promotionItemDescription}>
                  {item.promotionDescription}
                </Text>
              </View>
              <View style={styles.promotionItemDate}>
                <Text style={styles.promotionItemDateText}>Ngày hết hạn</Text>
                <Text style={styles.promotionItemDateText}>
                  {moment(item.promotionDateExpired).format('Do MMMM YYYY')}
                </Text>
              </View>
              <View style={styles.circle}></View>
            </View>
          );
        })}
    </ScrollView>
  );
}
