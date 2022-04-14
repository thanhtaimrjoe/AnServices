import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    paddingHorizontal: 16,
    flex: 1,
  },
  //package
  packageContainer: {
    marginTop: 15,
  },
  packageTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
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
  //service
  serviceContainer: {
    marginTop: 15,
  },
  title: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  //service item
  serviceItem: {
    width: '100%',
    backgroundColor: Color.cover,
    borderRadius: 10,
    marginBottom: 10,
  },
  serviceItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  serviceItemTextContainer: {
    width: '65%',
  },
  serviceItemName: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
    marginBottom: 3,
  },
  serviceItemImg: {
    width: 69,
    height: 69,
    marginRight: 20,
  },
  //request detail status
  requestDetailStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestDetailStatusTitle: {
    color: Color.primary,
  },
  requestDetailStatusID2: {
    marginLeft: 4,
    fontWeight: '500',
    color: Color.pending,
  },
  requestDetailStatusID6: {
    marginLeft: 4,
    fontWeight: '500',
    color: Color.inProgress,
  },
  requestDetailStatusID9: {
    marginLeft: 4,
    fontWeight: '500',
    color: Color.confirming,
  },
  requestDetailStatusID11: {
    marginLeft: 4,
    fontWeight: '500',
    color: Color.happy,
  },
  requestDetailStatusID12: {
    marginLeft: 4,
    fontWeight: '500',
    color: Color.unhappy,
  },
  requestDetailStatusID16: {
    marginLeft: 4,
    fontWeight: '500',
    color: Color.rework,
  },
  requestDetailStatusText: {
    color: Color.primary,
  },
  //rate
  rateContainer: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Color.white,
  },
  rareTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateTitle: {
    textAlign: 'center',
    color: Color.primary,
  },
  rateTitleBold: {
    color: Color.happy,
    fontWeight: '500',
  },
  rateTitleTime: {
    textAlign: 'center',
    color: Color.red,
    fontWeight: '500',
  },
  rateBtnContainer: {
    borderTopWidth: 1,
    borderTopColor: Color.white,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rateHappyBtn: {
    backgroundColor: Color.happyBtn,
    width: '50%',
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: Color.white,
    borderBottomLeftRadius: 10,
  },
  rateUnhappyBtn: {
    backgroundColor: Color.unhappyBtn,
    width: '50%',
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomRightRadius: 10,
  },
  rateImg: {
    width: 50,
    height: 50,
  },
  rateBtnText: {
    color: Color.primary,
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
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Color.field,
  },
  phoneText: {
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
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Color.field,
  },
  descriptionText: {
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
  //media view dialog
  mediaFull: {
    width: '90%',
    height: undefined,
    aspectRatio: 1,
  },
  //service dialog
  dialogBackground: {
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  //play button
  playImg: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 30,
    right: 35,
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
  addressView: {
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Color.field,
  },
  addressText: {
    color: Color.primary,
  },
  //cancel request button
  cancelBtn: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    marginBottom: 15,
  },
  cancelBtnText: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.white,
  },
  //contract
  contractContainer: {
    marginBottom: 15,
  },
  contractTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  //contract item
  contractItemContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: Color.cover,
    borderRadius: 10,
    height: 65,
  },
  contractItemImg: {
    width: 30,
    height: 30,
    marginRight: 16,
  },
  contractItemName: {
    width: '55%',
    fontSize: 16,
    color: Color.primary,
  },
  contractItemStatus: {
    width: '30%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Color.primary,
  },
  contractItemStatusText: {
    color: Color.white,
    textAlign: 'center',
  },
  //invoice
  invoiceContainer: {
    marginBottom: 15,
  },
  invoiceTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  //invoice item
  invoiceItemContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: Color.cover,
    borderRadius: 10,
    height: 65,
  },
  invoiceItemImg: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  invoiceItemName: {
    width: '55%',
    fontSize: 16,
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
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: Color.background,
  },
  dialogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dialogTitle: {
    fontSize: 20,
    color: Color.primary,
  },
  exitIcon: {
    padding: 6,
    fontSize: 24,
    color: Color.primary,
  },
  btnDownload: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Color.primary,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnApprove: {
    width: '45%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Color.approve,
  },
  btnRequestUpdate: {
    width: '45%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Color.requestUpdate,
  },
  btnText: {
    fontSize: 16,
    color: Color.white,
  },
  //loading dialog
  loadingDialogBackground: {
    backgroundColor: Color.white,
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
