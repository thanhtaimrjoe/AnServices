import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background1,
    paddingHorizontal: 16,
    flex: 1,
  },
  //package
  packageContainer: {
    marginBottom: 25,
  },
  packageTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
    marginTop: 16,
  },
  //service
  serviceContainer: {
    marginBottom: 25,
  },
  serviceTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
    marginTop: 16,
  },
  //add button
  addBtn: {
    width: '100%',
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.fifth,
  },
  addBtnIcon: {
    fontSize: 25,
    color: Color.primary,
  },
  //dialog
  dialogBackground: {
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  dialogContainer: {
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: Color.third,
  },
  dialogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  dialogTitle: {
    fontSize: 18,
    color: Color.primary,
  },
  exitIconContainer: {
    paddingHorizontal: 8,
  },
  exitIcon: {
    color: Color.primary,
    fontSize: 24,
  },
  //media dialog
  dialogMediaBtn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Color.primary,
    marginBottom: 15,
  },
  dialogMediaText: {
    fontSize: 18,
    color: Color.third,
  },
  //service item
  serviceItemContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Color.forth,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom: 20,
  },
  serviceItemTextContainer: {
    width: 161,
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
  serviceItemImg: {
    width: 80,
    height: 80,
  },
  serviceRemove: {
    padding: 6,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  serviceRemoveIcon: {
    fontSize: 18,
  },
  //package item
  packageItemContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Color.forth,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom: 20,
  },
  packageItemTextContainer: {
    width: '60%',
  },
  packageItemName: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
  },
  packageItemDescription: {
    fontSize: 14,
    color: Color.primary,
  },
  packageItemImg: {
    width: 80,
    height: 80,
  },
  //full name field
  fullNameContainer: {
    marginBottom: 25,
  },
  fullNameTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  fullNameInput: {
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Color.fifth,
    color: Color.primary,
  },
  //phone field
  phoneContainer: {
    marginBottom: 25,
  },
  phoneTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  phoneInput: {
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Color.fifth,
    color: Color.primary,
  },
  //description field
  descriptionContainer: {
    marginBottom: 25,
  },
  descriptionTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  descriptionInput: {
    height: 80,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Color.fifth,
    color: Color.primary,
  },
  //media
  mediaContainer: {
    marginBottom: 25,
  },
  mediaTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  mediaFileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mediaBtn: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.fifth,
    marginRight: 5,
    marginBottom: 5,
  },
  mediaViewContainer: {
    flexDirection: 'row',
  },
  mediaView: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  mediaBtnIcon: {
    fontSize: 25,
    color: Color.primary,
  },
  mediaRemoveBtn: {
    padding: 6,
    position: 'absolute',
    top: 0,
    right: 5,
  },
  mediaRemoveIcon: {
    color: Color.third,
    fontSize: 18,
  },
  //play video button
  playImg: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 30,
    right: 35,
  },
  //media view dialog
  mediaFull: {
    width: '90%',
    height: undefined,
    aspectRatio: 1,
  },
  //address
  addressContainer: {
    marginBottom: 25,
  },
  addressTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  addressInput: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Color.fifth,
    color: Color.primary,
  },
  //request button
  confirmBtn: {
    width: '100%',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.btn,
    marginBottom: 25,
  },
  confirmBtnText: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
  },
  //error message
  errorMessage: {
    color: 'red',
  },
});
export {styles};
