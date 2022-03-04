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
    color: Color.primary,
    backgroundColor: Color.field,
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
    color: Color.third,
    fontSize: 18,
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
  dialogTitle: {
    fontSize: 18,
    color: Color.primary,
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
  //media view dialog
  mediaFull: {
    width: '90%',
    height: undefined,
    aspectRatio: 1,
  },
  //confirm button
  confirmBtn: {
    width: '100%',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.btn,
    marginBottom: 20,
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
