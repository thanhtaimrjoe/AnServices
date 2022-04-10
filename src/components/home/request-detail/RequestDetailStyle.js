import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background1,
    padding: 15,
    flex: 1,
  },
  //package
  packageContainer: {
    marginBottom: 20,
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
  //service list
  serviceContainer: {
    marginBottom: 20,
  },
  serviceTitle: {
    fontSize: 18,
    color: Color.primary,
  },
  //service item
  serviceItem: {
    marginTop: 10,
  },
  serviceItemContainer: {
    width: '100%',
    backgroundColor: Color.cover,
    borderRadius: 10,
  },
  serviceItemMainContainer: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  serviceItemInforContainer: {
    width: '70%',
    marginRight: 10,
  },
  serviceItemName: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
    marginBottom: 5,
  },
  serviceItemDescriptionContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  serviceItemTitle: {
    fontSize: 16,
    color: Color.primary,
    marginRight: 4,
  },
  serviceItemStatus2: {
    fontSize: 16,
    color: Color.pending,
    fontWeight: '500',
  },
  serviceItemStatus6: {
    fontSize: 16,
    color: Color.inProgress,
    fontWeight: '500',
  },
  serviceItemStatus9: {
    fontSize: 16,
    color: Color.confirming,
    fontWeight: '500',
  },
  serviceItemStatus11: {
    fontSize: 16,
    color: Color.happy,
    fontWeight: '500',
  },
  serviceItemStatus12: {
    fontSize: 16,
    color: Color.unhappy,
    fontWeight: '500',
  },
  serviceItemStatus16: {
    fontSize: 16,
    color: Color.rework,
    fontWeight: '500',
  },
  serviceItemPriority: {
    fontSize: 16,
    color: Color.red,
    fontWeight: '500',
  },
  serviceItemDateContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  serviceItemDate: {
    fontSize: 16,
    color: Color.primary,
  },
  serviceItemImg: {
    width: 70,
    height: 70,
  },
  serviceItemBtn: {
    backgroundColor: Color.detail,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  serviceItemBtnText: {
    fontSize: 16,
    fontWeight: '500',
    color: Color.primary,
    marginRight: 8,
  },
  serviceItemBtnIcon: {
    fontSize: 16,
    color: Color.primary,
  },

  //fullName
  fullNameContainer: {
    marginBottom: 20,
  },
  fullNameTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  fullNameView: {
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: Color.field,
  },
  fullNameText: {
    color: Color.primary,
  },
  //phone
  phoneContainer: {
    marginBottom: 20,
  },
  phoneTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  phoneView: {
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: Color.field,
  },
  phoneText: {
    color: Color.primary,
  },
  //description
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  descriptionView: {
    justifyContent: 'center',
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
    marginBottom: 20,
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
  //media view dialog
  mediaFull: {
    width: '90%',
    height: undefined,
    aspectRatio: 1,
  },
  //dialog
  dialogBackground: {
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  //play video button
  playImg: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 33,
    right: 35,
  },
  //address
  addressContainer: {
    marginBottom: 20,
  },
  addressTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  addressView: {
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Color.field,
  },
  addressText: {
    color: Color.primary,
  },
  //loading screen
  loadingScreen: {
    width: '100%',
    paddingVertical: 16,
  },
});
export {styles};
