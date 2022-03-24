import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background1,
    paddingHorizontal: 16,
    flex: 1,
  },
  //service
  serviceContainer: {
    marginTop: 16,
  },
  //service item
  serviceItemContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Color.field,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 5,
  },
  serviceItemTextContainer: {
    width: '60%',
    height: '80%',
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
    width: 90,
    height: 90,
  },
  //material
  materialTitle: {
    fontSize: 20,
    color: Color.primary,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 25,
  },
  materialHeader: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  materialHeaderName: {
    fontSize: 18,
    color: Color.primary,
    marginLeft: 30,
  },
  materialHeaderQuantity: {
    fontSize: 18,
    color: Color.primary,
  },
  //error message from api
  errorMsg: {
    marginTop: 100,
    fontSize: 16,
    textAlign: 'center',
    color: Color.primary,
  },
  //material list
  materialListItemContainer: {
    marginBottom: 16,
  },
  //material item
  materialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  materialItemContainer: {
    width: '100%',
    backgroundColor: Color.field,
    flexDirection: 'row',
    padding: 8,
    borderRadius: 10,
  },
  materialItemIconApprove: {
    fontSize: 16,
    color: Color.approve,
    marginHorizontal: 8,
  },
  materialItemIconDeny: {
    fontSize: 20,
    color: Color.deny,
    marginHorizontal: 9,
  },
  materialItemIconCancel: {
    fontSize: 20,
    color: Color.deny,
    marginHorizontal: 6,
  },
  materialItemIconPending: {
    fontSize: 16,
    color: Color.pending,
    marginHorizontal: 8,
  },
  materialItemNameContainer: {
    width: '40%',
    marginRight: 8,
  },
  materialItemName: {
    color: Color.primary,
  },
  materialItemNote: {
    color: Color.placeholder,
  },
  materialItemQuantity: {
    color: Color.second,
    fontWeight: '500',
    width: '20%',
  },
  marterialIconContainer: {
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderRadius: 10,
    marginLeft: 10,
  },
  materialIcon: {
    fontSize: 18,
    color: Color.primary,
  },
  //dialog
  dialogBackground: {
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  //request material dialog
  requestMaterialContainer: {
    width: '80%',
    padding: 16,
    backgroundColor: 'white',
  },
  requestMaterialTitle: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '500',
    color: Color.primary,
    marginBottom: 8,
  },
  requestMaterialNameContainer: {
    flexDirection: 'row',
  },
  requestMaterialName: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 8,
  },
  requestMaterialNameData: {
    fontSize: 18,
    color: Color.second,
    fontWeight: '500',
    marginBottom: 8,
  },
  requestMaterialQuantityAndUnitContainer: {
    flexDirection: 'row',
  },
  requestMaterialQuantityContainer: {
    width: '50%',
  },
  requestMaterialQuantityTitle: {
    fontSize: 18,
    color: Color.primary,
  },
  requestMaterialQuantity: {
    width: '60%',
    borderRadius: 10,
    paddingLeft: 8,
    color: Color.primary,
    backgroundColor: Color.field,
  },
  requestMaterialUnitContainer: {
    width: '30%',
  },
  requestMaterialUnitTitle: {
    fontSize: 18,
    color: Color.primary,
  },
  requestMaterialUnit: {
    fontSize: 16,
    justifyContent: 'center',
    paddingVertical: 14,
    paddingLeft: 8,
    color: Color.primary,
    borderRadius: 10,
    backgroundColor: Color.field,
  },
  requestMaterialNoteContainer: {
    width: '100%',
    marginBottom: 10,
  },
  requestMaterialNoteTitle: {
    fontSize: 18,
    color: Color.primary,
  },
  requestMaterialNote: {
    width: '100%',
    borderRadius: 10,
    paddingLeft: 8,
    color: Color.primary,
    backgroundColor: Color.field,
  },
  //request button
  btnRequest: {
    width: '100%',
    height: 45,
    backgroundColor: Color.btn,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
  },
  btnRequestText: {
    color: Color.primary,
    fontSize: 18,
    fontWeight: '500',
  },
  //message
  messageHeaderName: {
    color: Color.primary,
    fontSize: 18,
    paddingLeft: 8,
  },
  messageContentContainer: {
    width: '100%',
    padding: 8,
    backgroundColor: Color.field,
    borderRadius: 10,
  },
  messageContent: {
    color: Color.sixth,
  },
  //report
  reportProblemListContainer: {
    marginBottom: 16,
  },
  reportTitle: {
    fontSize: 20,
    color: Color.primary,
    fontWeight: '500',
    marginTop: 25,
    marginBottom: 10,
  },
  //Report Item
  reportProblemItem: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: Color.fourth,
    borderRadius: 10,
    height: 65,
    marginBottom: 8,
  },
  reportProblemItemImg: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  reportProblemItemName: {
    width: '60%',
    fontSize: 18,
    color: Color.primary,
  },
  //error message from api
  errorView: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  errorMsg: {
    fontSize: 16,
    color: Color.primary,
  },
  errorImg: {
    marginBottom: 20,
    width: 80,
    height: 80,
  },
});
export {styles};
