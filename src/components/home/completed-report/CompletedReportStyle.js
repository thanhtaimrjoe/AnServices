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
  serviceItemImg: {
    width: 69,
    height: 69,
    marginRight: 20,
  },
  //request
  requestContainer: {
    marginBottom: 15,
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
    height: 80,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: Color.primary,
    backgroundColor: Color.field,
  },
  //media
  mediaContainer: {
    marginBottom: 10,
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
    color: Color.white,
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
    backgroundColor: Color.white,
  },
  dialogTitle: {
    fontSize: 18,
    color: Color.primary,
    marginVertical: 15,
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
  //media view dialog
  mediaFull: {
    width: '90%',
    height: undefined,
    aspectRatio: 1,
  },
  //confirm button
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
  //error message
  errorMessage: {
    color: 'red',
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
