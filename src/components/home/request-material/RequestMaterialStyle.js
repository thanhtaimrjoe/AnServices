import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background1,
    paddingHorizontal: 16,
  },
  //service
  serviceContainer: {
    marginVertical: 16,
  },
  serviceTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 8,
  },
  //service item
  serviceItemContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Color.fourth,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 5,
  },
  serviceItemTextContainer: {
    width: '60%',
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
    width: 90,
    height: 90,
  },
  //request
  requestContainer: {
    marginBottom: 16,
  },
  requestTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 8,
  },
  //request item
  requestItemContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Color.fourth,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 5,
  },
  requestItemTextContainer: {
    width: '60%',
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
    width: 90,
    height: 90,
  },
  //material tittle
  materialTitleContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  materialTitleName: {
    fontSize: 18,
    color: Color.primary,
    marginRight: 120,
  },
  //show list material
  materialContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: Color.fourth,
  },
  //material picker
  materialPickerContainer: {
    width: '85%',
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: Color.third,
    marginBottom: 12,
  },
  materialPickerItem: {
    color: Color.primary,
    backgroundColor: Color.third,
  },
  //material quantity
  materialQuantityContainer: {
    width: '25%',
  },
  materialQuantityTitle: {
    fontSize: 16,
    color: Color.primary,
  },
  materialQuantity: {
    paddingLeft: 10,
    borderRadius: 10,
    marginRight: 8,
    //borderWidth: 1,
    color: Color.primary,
    backgroundColor: Color.third,
    //borderColor: Color.primary,
  },
  //material unit
  materialUnitContainer: {
    width: '25%',
  },
  materialUnitTitle: {
    fontSize: 16,
    color: Color.primary,
  },
  materialUnit: {
    paddingVertical: 14,
    paddingLeft: 10,
    borderRadius: 10,
    marginRight: 8,
    //borderWidth: 1,
    //borderColor: Color.primary,
    backgroundColor: Color.third,
  },
  materialUnitText: {
    fontSize: 16,
    color: Color.sixth,
  },
  //material note
  materialNoteContainer: {
    width: '50%',
  },
  materialNoteOtherContainer: {
    width: '75%',
  },
  materialNoteTitle: {
    fontSize: 16,
    color: Color.primary,
  },
  materialNote: {
    paddingLeft: 10,
    borderRadius: 10,
    marginRight: 8,
    //borderWidth: 1,
    //borderColor: Color.primary,
    color: Color.primary,
    backgroundColor: Color.third,
  },
  //remove button
  removeContainer: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeIcon: {
    fontSize: 20,
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
  //request button
  btnRequest: {
    width: '100%',
    height: 45,
    backgroundColor: Color.btn,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  btnRequestText: {
    color: Color.primary,
    fontSize: 18,
    fontWeight: '500',
  },
});
export {styles};
