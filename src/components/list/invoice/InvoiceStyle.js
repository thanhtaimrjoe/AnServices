import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    paddingHorizontal: 16,
    flex: 1,
  },
  //full name field
  fullNameContainer: {
    marginVertical: 15,
  },
  fullNameTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  fullNameView: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: Color.field,
  },
  fullNameText: {
    color: Color.primary,
  },
  //phone field
  phoneContainer: {
    marginBottom: 15,
  },
  phoneTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  phoneView: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: Color.field,
  },
  phoneText: {
    color: Color.primary,
  },
  //address field
  addressContainer: {
    marginBottom: 15,
  },
  addressTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  addressView: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: Color.field,
  },
  addressText: {
    color: Color.primary,
  },
  //description field
  descriptionContainer: {
    marginBottom: 15,
  },
  descriptionTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  descriptionView: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: Color.field,
  },
  descriptionText: {
    color: Color.primary,
  },
  //service
  serviceContainer: {
    marginBottom: 15,
  },
  serviceTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  //service item
  serviceItemContainer: {
    width: '100%',
    backgroundColor: Color.cover,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginBottom: 10,
  },
  serviceItemTextContainer: {
    width: '65%',
  },
  serviceItemName: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
    marginBottom: 8,
  },
  serviceItemImg: {
    width: 69,
    height: 69,
    marginRight: 20,
  },
  serviceItemPriceContainer: {
    flexDirection: 'row',
  },
  serviceItemPriceTitle: {
    color: Color.primary,
    fontSize: 14,
  },
  serviceItemPrice: {
    color: Color.primary,
    fontWeight: '500',
    fontSize: 14,
  },
  //contract start date
  contractStartDateContainer: {
    marginBottom: 15,
  },
  contractStartDateTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  contractStartDateView: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: Color.field,
  },
  contractStartDateText: {
    color: Color.primary,
  },
  //contract end date
  contractEndDateContainer: {
    marginBottom: 15,
  },
  contractEndDateTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  contractEndDateView: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: Color.field,
  },
  contractEndDateText: {
    color: Color.primary,
  },
  //deposit and voucher container
  depositAndVoucherContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  //contract deposit
  contractDepositContainer: {
    width: '50%',
  },
  contractDepositTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  contractDepositView: {
    width: '40%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: Color.field,
  },
  contractDepositText: {
    color: Color.primary,
  },
  //invoice item
  invoiceItemContainer: {
    width: '100%',
    paddingVertical: 8,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: Color.field,
    borderRadius: 10,
    marginBottom: 10,
  },
  invoiceItemImg: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  invoiceItemName: {
    fontSize: 18,
    color: Color.primary,
  },
  //invoice total price
  invoiceTotalContainer: {
    borderTopWidth: 1,
    borderTopColor: Color.primary,
  },
  invoiceTotalPriceContainer: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  invoiceTotalPriceTitle: {
    color: Color.primary,
  },
  invoiceTotalPrice: {
    color: Color.primary,
  },
  invoiceTotalPriceMainTitle: {
    color: Color.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  invoiceTotalPriceMain: {
    color: Color.primary,
    fontSize: 16,
    fontWeight: '500',
  },
});
export {styles};
