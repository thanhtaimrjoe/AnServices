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
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
    marginTop: 16,
  },
  //service item
  serviceItem: {
    width: '100%',
    backgroundColor: Color.forth,
    borderRadius: 10,
    marginBottom: 10,
  },
  serviceItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Color.third,
  },
  serviceItemTextContainer: {
    width: 161,
  },
  serviceItemName: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
  },
  serviceItemImg: {
    width: 80,
    height: 80,
  },
  //request detail status
  requestDetailStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestDetailStatusTitle: {
    color: Color.second,
  },
  requestDetailStatusID2: {
    marginLeft: 8,
    padding: 5,
    borderRadius: 10,
    backgroundColor: Color.yellow,
  },
  requestDetailStatusID6: {
    marginLeft: 8,
    padding: 5,
    borderRadius: 10,
    backgroundColor: Color.purple,
  },
  requestDetailStatusID9: {
    marginLeft: 8,
    padding: 5,
    borderRadius: 10,
    backgroundColor: Color.green,
  },
  requestDetailStatusText: {
    color: Color.primary,
  },
  //rate
  rateContainer: {
    marginTop: 8,
  },
  rateTitle: {
    textAlign: 'center',
    color: Color.primary,
  },
  rateBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 25,
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
    marginBottom: 25,
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
    backgroundColor: Color.fifth,
  },
  phoneText: {
    color: Color.sixth,
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
  descriptionView: {
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Color.fifth,
  },
  descriptionText: {
    color: Color.sixth,
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
    backgroundColor: Color.fifth,
  },
  addressText: {
    color: Color.sixth,
  },
  //cancel button
  cancelBtn: {
    width: '100%',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.btn,
    marginBottom: 25,
  },
  cancelBtnText: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
  },
});
export {styles};
