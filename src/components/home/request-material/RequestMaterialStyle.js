import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background1,
    paddingHorizontal: 15,
  },
  //service
  serviceContainer: {
    marginVertical: 15,
  },
  serviceTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  //service item
  serviceItemContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Color.cover,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  serviceItemTextContainer: {
    width: '70%',
  },
  serviceItemName: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
  },
  serviceItemDescription: {
    fontSize: 14,
    color: Color.primary,
  },
  serviceItemPrice: {
    fontSize: 14,
    color: Color.primary,
  },
  serviceItemImg: {
    width: 69,
    height: 69,
    marginRight: 20,
  },
  //request
  requestContainer: {
    marginBottom: 20,
  },
  requestTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  //request item
  requestItemContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Color.cover,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  requestItemTextContainer: {
    width: '70%',
  },
  requestItemName: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
  },
  requestItemDescription: {
    fontSize: 14,
    color: Color.primary,
  },
  requestItemPrice: {
    fontSize: 14,
    color: Color.primary,
  },
  requestItemImg: {
    width: 69,
    height: 69,
    marginRight: 20,
  },
  //material
  materialTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  //show list material
  materialContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: Color.field,
  },
  materialMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  //material picker
  materialPickerContainer: {
    width: '85%',
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: Color.white,
  },
  materialPickerItem: {
    color: Color.primary,
    backgroundColor: Color.white,
  },
  //material quantity
  materialInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  materialQuantityTitle: {
    color: Color.primary,
    marginRight: 10,
  },
  materialQuantity: {
    width: '30%',
    padding: 8,
    borderRadius: 10,
    color: Color.primary,
    backgroundColor: Color.white,
    marginRight: 20,
  },
  //material unit
  materialUnitTitle: {
    color: Color.primary,
  },
  materialUnitText: {
    fontWeight: '500',
    color: Color.primary,
  },
  //material note
  materialNoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  materialNoteTitle: {
    color: Color.primary,
    marginRight: 20,
  },
  materialNote: {
    width: '75%',
    padding: 8,
    borderRadius: 10,
    color: Color.primary,
    backgroundColor: Color.white,
  },
  //remove button
  removeContainer: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeIcon: {
    fontSize: 25,
    color: Color.primary,
  },
  //add button
  btnAdd: {
    width: '100%',
    backgroundColor: Color.field,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 40,
  },
  btnAddText: {
    fontSize: 32,
    color: Color.primary,
  },
  //confirm button
  confirmBtn: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    marginBottom: 20,
  },
  confirmBtnText: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.white,
  },
  //error message
  errorMessage: {
    color: 'red',
    marginTop: 5,
  },
  //loading dialog
  dialogBackground: {
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingView: {
    width: '50%',
    padding: 16,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  loadingText: {
    color: Color.primary,
    marginTop: 15,
  },
});
export {styles};
