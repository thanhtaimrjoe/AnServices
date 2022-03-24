import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background1,
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
    backgroundColor: Color.fifth,
  },
  fullNameText: {
    color: Color.sixth,
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
    backgroundColor: Color.fifth,
  },
  phoneText: {
    color: Color.sixth,
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
    backgroundColor: Color.fifth,
  },
  addressText: {
    color: Color.sixth,
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
    backgroundColor: Color.fifth,
  },
  descriptionText: {
    color: Color.sixth,
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
    backgroundColor: Color.forth,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Color.third,
    marginBottom: 10,
  },
  serviceItemTextContainer: {
    width: '55%',
  },
  serviceItemName: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
    marginBottom: 8,
  },
  serviceItemImg: {
    width: 80,
    height: 80,
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
    backgroundColor: Color.fifth,
  },
  contractStartDateText: {
    color: Color.sixth,
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
    backgroundColor: Color.fifth,
  },
  contractEndDateText: {
    color: Color.sixth,
  },
  //contract deposit date
  contractDepositContainer: {
    marginBottom: 15,
  },
  contractDepositTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  contractDepositView: {
    width: '20%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: Color.fifth,
  },
  contractDepositText: {
    color: Color.sixth,
  },
  //invoice total price
  invoiceTotalContainer: {
    marginBottom: 15,
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
