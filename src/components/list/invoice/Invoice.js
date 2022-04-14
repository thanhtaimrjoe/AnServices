import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {styles} from './InvoiceStyle';
import IconURL from '../../../style/IconURL';
import moment from 'moment';
import 'moment/locale/vi';
import Color from '../../../style/Color';

export default function Invoice(props) {
  const {invoice, promotionInfo, serviceRequestReference} = props;

  //moment locale
  moment().locale('vi');

  //add comma to integer
  const addCommaToInteger = value => {
    if (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return '';
    }
  };

  const getTotalServicePrice = () => {
    var result = 0;
    if (invoice.details) {
      invoice.details.map((item, index) => {
        result += item.requestDetailPrice;
      });
      //setTotalServicePrice(result);
      return result;
    }
  };

  //button --- show parent's invoice
  const onShowParentInvoice = () => {
    props.onShowParentInvoice();
  };

  return (
    <ScrollView style={styles.container}>
      <Modal transparent={true} visible={invoice.customerName ? false : true}>
        <View style={styles.loadingDialogBackground}>
          <ActivityIndicator size={'large'} color={Color.primary} />
          <Text style={styles.loadingText}>Đang tải</Text>
        </View>
      </Modal>
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
            {invoice.serviceRequestDescription}
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
                    uri: item.service.serviceImg,
                  }}
                  style={styles.serviceItemImg}
                />
                <View style={styles.serviceItemTextContainer}>
                  <Text style={styles.serviceItemName}>
                    {item.service.serviceName}
                  </Text>
                  <View style={styles.serviceItemPriceContainer}>
                    <Text style={styles.serviceItemPriceTitle}>Giá tiền: </Text>
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
            {moment(invoice.contractStartDate).format('Do MMMM YYYY')}
          </Text>
        </View>
      </View>
      <View style={styles.contractEndDateContainer}>
        <Text style={styles.contractEndDateTitle}>Ngày kết thúc thi công</Text>
        <View style={styles.contractEndDateView}>
          <Text style={styles.contractEndDateText}>
            {moment(invoice.contractEndDate).format('Do MMMM YYYY')}
          </Text>
        </View>
      </View>
      <View style={styles.depositAndVoucherContainer}>
        <View style={styles.contractDepositContainer}>
          <Text style={styles.contractDepositTitle}>Đã đặt cọc</Text>
          <View style={styles.contractDepositView}>
            <Text style={styles.contractDepositText}>
              {invoice.contractDeposit * 100}%
            </Text>
          </View>
        </View>
        <View style={styles.contractDepositContainer}>
          <Text style={styles.contractDepositTitle}>Áp dụng voucher</Text>
          <View style={styles.contractDepositView}>
            <Text style={styles.contractDepositText}>
              {!promotionInfo.errorsMsg
                ? promotionInfo.promotionValue * 100
                : 0}
              %
            </Text>
          </View>
        </View>
      </View>
      {serviceRequestReference !== null && (
        <TouchableOpacity
          style={styles.invoiceItemContainer}
          onPress={onShowParentInvoice}>
          <Image
            source={{uri: IconURL.invoiceImg}}
            style={styles.invoiceItemImg}
          />
          <Text style={styles.invoiceItemName}>Hóa đơn của yêu cầu trước</Text>
        </TouchableOpacity>
      )}
      <View style={styles.invoiceTotalContainer}>
        <View style={styles.invoiceTotalPriceContainer}>
          <Text style={styles.invoiceTotalPriceTitle}>
            Tổng tiền hợp đồng ban đầu:
          </Text>
          <Text style={styles.invoiceTotalPrice}>
            {addCommaToInteger(invoice.contractTotalPrice)}đ
          </Text>
        </View>
        <View style={styles.invoiceTotalPriceContainer}>
          <Text style={styles.invoiceTotalPriceTitle}>Tổng tiền dịch vụ:</Text>
          <Text style={styles.invoiceTotalPrice}>
            {addCommaToInteger(getTotalServicePrice())}đ
          </Text>
        </View>
        <View style={styles.invoiceTotalPriceContainer}>
          <Text style={styles.invoiceTotalPriceTitle}>Trừ tiền đặt cọc:</Text>
          <Text style={styles.invoiceTotalPrice}>
            -
            {invoice.contractDeposit === 0
              ? 0
              : addCommaToInteger(
                  invoice.contractTotalPrice * invoice.contractDeposit,
                )}
            đ
          </Text>
        </View>
        <View style={styles.invoiceTotalPriceContainer}>
          <Text style={styles.invoiceTotalPriceTitle}>
            Giảm giá theo voucher:
          </Text>
          <Text style={styles.invoiceTotalPrice}>
            -
            {promotionInfo.errorsMsg
              ? 0
              : addCommaToInteger(
                  getTotalServicePrice() * promotionInfo.promotionValue,
                )}
            đ
          </Text>
        </View>
        <View style={styles.invoiceTotalPriceContainer}>
          <Text style={styles.invoiceTotalPriceTitle}>Thuế VAT(10%):</Text>
          <Text style={styles.invoiceTotalPrice}>
            +{addCommaToInteger(getTotalServicePrice() * 0.1)}đ
          </Text>
        </View>
        <View style={styles.invoiceTotalPriceContainer}>
          <Text style={styles.invoiceTotalPriceMainTitle}>Thành tiền:</Text>
          <Text style={styles.invoiceTotalPriceMain}>
            {promotionInfo.errorsMsg
              ? addCommaToInteger(
                  getTotalServicePrice() -
                    invoice.contractTotalPrice * invoice.contractDeposit +
                    getTotalServicePrice() * 0.1,
                )
              : addCommaToInteger(
                  getTotalServicePrice() -
                    invoice.contractTotalPrice * invoice.contractDeposit +
                    getTotalServicePrice() * 0.1 -
                    getTotalServicePrice() * promotionInfo.promotionValue,
                )}
            đ
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
