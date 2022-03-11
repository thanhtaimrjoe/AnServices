import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background1,
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
    padding: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  filterBtnActive: {
    padding: 5,
    backgroundColor: Color.btn,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    color: Color.primary,
  },
  //Request Service Item
  requestServiceItemContainer: {
    width: '100%',
    backgroundColor: Color.field1,
    borderRadius: 10,
    marginBottom: 8,
  },
  requestServiceItem: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: Color.forth,
    borderRadius: 10,
    height: 65,
    //marginBottom: 8,
  },
  requestServiceItemImg: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  requestServiceItemName: {
    width: '80%',
    fontSize: 18,
    color: Color.primary,
  },
  requestServiceItemStatus: {
    width: '25%',
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Color.primary,
  },
  requestServiceItemStatusText: {
    textAlign: 'center',
    color: Color.third,
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
    backgroundColor: Color.btn,
  },
  invoiceBtnText: {
    color: Color.primary,
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
