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
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
    marginTop: 16,
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
    marginBottom: 20,
  },
  serviceItemName: {
    width: 161,
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
  },
  serviceItemIcon: {
    fontSize: 16,
    color: Color.primary,
  },
  serviceItemImg: {
    width: 80,
    height: 80,
  },
  //fullName
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
    justifyContent: 'center',
    padding: 10,
    backgroundColor: Color.field,
  },
  fullNameText: {
    color: Color.sixth,
  },
  //phone
  phoneContainer: {
    marginBottom: 25,
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
    color: Color.sixth,
  },
  //description
  descriptionContainer: {
    marginBottom: 25,
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
    marginBottom: 25,
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
    color: Color.sixth,
  },
});
export {styles};
