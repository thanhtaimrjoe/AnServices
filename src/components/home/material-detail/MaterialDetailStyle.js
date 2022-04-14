import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background1,
    paddingHorizontal: 15,
    flex: 1,
  },
  //service button
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20,
  },
  serviceButtonContainer: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: Color.service,
  },
  serviceButtonDisableContainer: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: Color.disable,
  },
  serviceButtonIcon: {
    width: 45,
    height: 45,
  },
  serviceButtonText: {
    textAlign: 'center',
    color: Color.primary,
  },
  serviceButtonDisableText: {
    textAlign: 'center',
    color: Color.second,
  },
  //material list
  materialListItemContainer: {
    marginBottom: 20,
  },
  materialTitle: {
    fontSize: 18,
    color: Color.primary,
    fontWeight: '500',
  },
  //material item
  materialContainer: {
    marginTop: 15,
    padding: 16,
    borderRadius: 10,
    backgroundColor: Color.cover,
  },
  materialMainInfoContainer: {
    flexDirection: 'row',
  },
  materialMainTextContainer: {
    width: '70%',
  },
  materialName: {
    color: Color.primary,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  materialNote: {
    color: Color.placeholder,
    marginBottom: 5,
  },
  materialQuantityContainer: {
    flexDirection: 'row',
  },
  materialQuantityTitle: {
    color: Color.primary,
    marginRight: 4,
  },
  materialQuantity: {
    color: Color.red,
    fontWeight: '500',
    marginRight: 4,
  },
  materialQuantityDeny: {
    color: Color.red,
    fontWeight: '500',
    marginRight: 4,
    textDecorationLine: 'line-through',
  },
  materialIconContainer: {
    width: '30%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  materialIcon: {
    width: 25,
    height: 25,
  },
  materialOtherContainer: {
    flexDirection: 'row',
  },
  materialButtonContainer: {
    paddingLeft: 10,
    paddingVertical: 6,
    marginLeft: 4,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  messageTitle: {
    color: Color.primary,
    marginRight: 8,
  },
  messageMainContainer: {
    width: '80%',
    padding: 8,
    backgroundColor: Color.white,
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
    width: '85%',
    padding: 16,
    backgroundColor: 'white',
  },
  requestMaterialTitle: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '500',
    color: Color.primary,
    marginBottom: 20,
  },
  requestMaterialNameContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  requestMaterialName: {
    fontSize: 18,
    color: Color.primary,
  },
  requestMaterialNameData: {
    fontSize: 18,
    color: Color.red,
    fontWeight: '500',
  },
  //request material quantity
  materialInfoContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  materialQuantityTitle1: {
    color: Color.primary,
    marginRight: 10,
  },
  materialQuantity1: {
    width: '30%',
    padding: 8,
    borderRadius: 10,
    color: Color.primary,
    backgroundColor: Color.field,
    marginRight: 20,
  },
  //request material unit
  materialUnitTitle1: {
    color: Color.primary,
  },
  materialUnitText1: {
    fontWeight: '500',
    color: Color.primary,
  },
  //request material note
  materialNoteContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  materialNoteTitle1: {
    color: Color.primary,
    marginRight: 20,
  },
  materialNote1: {
    width: '75%',
    padding: 8,
    borderRadius: 10,
    color: Color.primary,
    backgroundColor: Color.field,
  },
  //request button
  btnRequest: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
  },
  btnRequestLoading: {
    width: '100%',
    paddingVertical: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
  },
  btnRequestText: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.white,
  },
  //report
  reportProblemListContainer: {},
  reportTitle: {
    fontSize: 18,
    color: Color.primary,
    fontWeight: '500',
    marginBottom: 15,
  },
  //Report Item
  reportProblemItem: {
    width: '100%',
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: Color.request,
    borderRadius: 10,
    marginBottom: 15,
  },
  reportProblemItemImg: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  reportProblemItemName: {
    width: '80%',
    fontSize: 18,
    color: Color.primary,
  },
  //error message from api
  errorView: {
    paddingVertical: 50,
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
  //loading screen
  loadingScreen: {
    width: '100%',
    paddingVertical: 50,
  },
});
export {styles};
