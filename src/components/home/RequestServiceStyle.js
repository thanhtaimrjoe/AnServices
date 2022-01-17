import {StyleSheet} from 'react-native';
import Color from '../../styles/Color';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background2,
    paddingHorizontal: 16,
    flex: 1,
  },
  serviceContainer: {
    marginBottom: 25,
  },
  title: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
    marginTop: 16,
  },
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
  dialogBackground: {
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  dialogContainer: {
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    backgroundColor: Color.third,
  },
  dialogTitle: {
    fontSize: 18,
    color: Color.primary,
    margin: 10,
  },
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
  serviceItemPrice: {
    fontSize: 14,
    color: Color.primary,
  },
  serviceItemImg: {
    width: 101,
    height: 96,
  },
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
  },
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
  },
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
  },
  confirmBtn: {
    width: '100%',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    marginBottom: 25,
  },
  confirmBtnText: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.third,
  },
  //error message
  errorMessage: {
    color: 'red',
  },
});
export {styles};
