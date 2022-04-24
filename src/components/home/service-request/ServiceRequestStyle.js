import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    paddingHorizontal: 15,
    flex: 1,
  },
  //package
  packageContainer: {
    marginVertical: 15,
  },
  packageTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
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
  //add button
  addBtn: {
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.field,
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
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: Color.background,
  },
  dialogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
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
    color: Color.white,
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
    marginBottom: 20,
  },
  serviceItemTextContainer: {
    width: '65%',
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
    width: 69,
    height: 69,
    marginRight: 20,
  },
  serviceRemove: {
    padding: 6,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  serviceRemoveIcon: {
    fontSize: 18,
    color: Color.primary,
  },
  //package item
  packageItemContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Color.cover,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  packageItemModalContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Color.cover,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginBottom: 15,
  },
  packageItemTextContainer: {
    width: '65%',
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
    width: 69,
    height: 69,
    marginRight: 20,
  },
  //full name field
  fullNameContainer: {
    marginBottom: 15,
  },
  fullNameTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  fullNameInput: {
    borderRadius: 10,
    padding: 12,
    backgroundColor: Color.field,
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
  phoneInput: {
    borderRadius: 10,
    padding: 12,
    backgroundColor: Color.field,
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
  descriptionInput: {
    paddingHorizontal: 12,
    paddingVertical: 18,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Color.field,
    color: Color.primary,
  },
  //media
  mediaContainer: {
    marginBottom: 15,
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
    backgroundColor: Color.field,
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
    backgroundColor: Color.field,
    borderTopRightRadius: 10,
  },
  mediaRemoveIcon: {
    color: Color.primary,
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
    marginBottom: 15,
  },
  addressTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  addressInput: {
    padding: 12,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Color.field,
    color: Color.primary,
  },
  //promotion
  promotionContainer: {
    marginBottom: 25,
  },
  promotionBtnContainer: {
    padding: 12,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    backgroundColor: Color.field,
    marginBottom: 10,
  },
  promotionBtnText: {
    color: Color.primary,
  },
  promotionMain: {
    flexDirection: 'row',
  },
  promotionMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  promotionMainText: {
    color: Color.primary,
  },
  promotionCancelBtn: {
    paddingHorizontal: 12,
  },
  promotionCancelText: {
    color: Color.red,
    fontWeight: '500',
  },
  promotionIcon: {
    fontSize: 16,
    color: Color.primary,
  },
  //Request Service Item
  requestServiceItem: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: Color.field,
    borderRadius: 10,
    height: 65,
    marginBottom: 8,
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
  //request button
  confirmBtn: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    marginBottom: 15,
  },
  confirmBtnText: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.white,
  },
  //promotion item
  promotionItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.promotion,
    marginBottom: 8,
    borderRadius: 10,
  },
  promotionInfo: {
    width: '60%',
    padding: 16,
    borderRightWidth: 1,
  },
  promotionItemName: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
  },
  promotionItemDescription: {
    color: Color.primary,
  },
  promotionItemDate: {
    width: '40%',
    padding: 16,
  },
  promotionItemDateText: {
    paddingVertical: 5,
    color: Color.primary,
  },
  circle: {
    backgroundColor: Color.white,
    width: 40,
    height: 40,
    borderRadius: 50,
    position: 'absolute',
    top: 25,
    right: -20,
  },
  //error message
  errorMessage: {
    color: Color.error,
    marginTop: 5,
  },
  //loading dialog
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
