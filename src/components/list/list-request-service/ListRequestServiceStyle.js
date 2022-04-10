import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    color: Color.primary,
    fontWeight: '500',
  },
  filter: {
    marginVertical: 25,
    flexDirection: 'row',
    width: '100%',
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.second,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  filterBtnActive: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: Color.primary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    color: Color.second,
  },
  filterTextActive: {
    color: Color.white,
  },
  //Service Request Item
  serviceRequestItemContainer: {
    width: '100%',
    backgroundColor: Color.request1,
    borderRadius: 10,
    marginBottom: 8,
  },
  serviceRequestItem: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: Color.request,
    borderRadius: 10,
    height: 65,
    //marginBottom: 8,
  },
  serviceRequestItemImg: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  serviceRequestItemName: {
    width: '80%',
    fontSize: 18,
    color: Color.primary,
  },
  //invoice
  invoiceContainer: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-evenly',
  },
  invoiceTitle: {
    width: '65%',
    color: Color.primary,
  },
  invoiceBtn: {
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: Color.primary,
  },
  invoiceBtnText: {
    color: Color.white,
  },
  //error message from api
  errorView: {
    marginTop: 100,
    alignItems: 'center',
  },
  errorMsg: {
    fontSize: 16,
    color: Color.primary,
  },
  errorImg: {
    marginBottom: 20,
    width: 100,
    height: 100,
  },
});
export {styles};
