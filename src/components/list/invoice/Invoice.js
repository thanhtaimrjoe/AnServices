import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './InvoiceStyle';
import Loading from '../../general/Loading';

export default function Invoice(props) {
  const {invoice} = props;

  //add comma to integer
  const addCommaToInteger = value => {
    if (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return '';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.fullNameContainer}>
        <Text style={styles.fullNameTitle}>Họ và tên chủ công trình</Text>
        <View style={styles.fullNameView}>
          <Text style={styles.fullNameText}>{invoice.customerName}</Text>
        </View>
      </View>
      <View style={styles.phoneContainer}>
        <Text style={styles.phoneTitle}>Số điện thoại chủ công trình</Text>
        <View style={styles.phoneView}>
          <Text style={styles.phoneText}>{invoice.customerPhone}</Text>
        </View>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Địa chỉ</Text>
        <View style={styles.addressView}>
          <Text style={styles.addressText}>{invoice.customerAddress}</Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Mô tả tình trạng</Text>
        <View style={styles.descriptionView}>
          <Text style={styles.descriptionText}>
            {invoice.requestServiceDescription}
          </Text>
        </View>
      </View>
      <View style={styles.serviceContainer}>
        <Text style={styles.serviceTitle}>Phí dịch vụ</Text>
        {invoice.details &&
          invoice.details.map((item, index) => {
            return (
              <View key={index} style={styles.serviceItemContainer}>
                <Image
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/icon%2Fair-conditioner.png?alt=media&token=f5fa3b70-90d6-4ffe-b48d-9cee841e6a25',
                  }}
                  style={styles.serviceItemImg}
                />
                <View style={styles.serviceItemTextContainer}>
                  <Text style={styles.serviceItemName}>
                    {item.service.serviceName}
                  </Text>
                  <View style={styles.serviceItemPriceContainer}>
                    <Text style={styles.serviceItemPriceTitle}>Số tiền: </Text>
                    <Text style={styles.serviceItemPrice}>
                      {addCommaToInteger(item.requestDetailPrice)}đ
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
      </View>
      <View style={styles.contractStartDateContainer}>
        <Text style={styles.contractStartDateTitle}>Ngày bắt đầu thi công</Text>
        <View style={styles.contractStartDateView}>
          <Text style={styles.contractStartDateText}>
            {invoice.contractStartDate}
          </Text>
        </View>
      </View>
      <View style={styles.contractEndDateContainer}>
        <Text style={styles.contractEndDateTitle}>Ngày kết thúc thi công</Text>
        <View style={styles.contractEndDateView}>
          <Text style={styles.contractEndDateText}>
            {invoice.contractEndDate}
          </Text>
        </View>
      </View>
      <View style={styles.contractDepositContainer}>
        <Text style={styles.contractDepositTitle}>Đã đặt cọc</Text>
        <View style={styles.contractDepositView}>
          <Text style={styles.contractDepositText}>
            {invoice.contractDeposit * 100}%
          </Text>
        </View>
      </View>
      <View style={styles.invoiceTotalContainer}>
        <View style={styles.invoiceTotalPriceContainer}>
          <Text style={styles.invoiceTotalPriceTitle}>Tổng tiền dịch vụ:</Text>
          <Text style={styles.invoiceTotalPrice}>
            {addCommaToInteger(invoice.contractTotalPrice)}đ
          </Text>
        </View>
        <View style={styles.invoiceTotalPriceContainer}>
          <Text style={styles.invoiceTotalPriceTitle}>Trừ tiền đặt cọc:</Text>
          <Text style={styles.invoiceTotalPrice}>
            -
            {addCommaToInteger(
              invoice.contractTotalPrice * invoice.contractDeposit,
            )}
            đ
          </Text>
        </View>
        <View style={styles.invoiceTotalPriceContainer}>
          <Text style={styles.invoiceTotalPriceTitle}>Thuế VAT(10%):</Text>
          <Text style={styles.invoiceTotalPrice}>
            +
            {addCommaToInteger(
              invoice.contractTotalPrice * invoice.contractDeposit,
            )}
            đ
          </Text>
        </View>
        <View style={styles.invoiceTotalPriceContainer}>
          <Text style={styles.invoiceTotalPriceMainTitle}>Thành tiền:</Text>
          <Text style={styles.invoiceTotalPriceMain}>
            {addCommaToInteger(
              invoice.contractTotalPrice -
                invoice.contractTotalPrice * invoice.contractDeposit +
                invoice.contractTotalPrice * invoice.contractDeposit,
            )}
            đ
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
