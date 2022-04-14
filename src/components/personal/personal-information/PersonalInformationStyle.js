import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    padding: 15,
    flex: 1,
  },
  //full name field
  fullNameContainer: {
    marginBottom: 5,
  },
  fullNameTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 3,
  },
  fullNameInput: {
    borderRadius: 10,
    padding: 12,
    backgroundColor: Color.field,
    color: Color.primary,
  },
  //email
  emailContainer: {
    marginBottom: 5,
  },
  emailTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 3,
  },
  emailInput: {
    padding: 12,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Color.field,
    color: Color.primary,
  },
  //address
  addressContainer: {
    marginBottom: 5,
  },
  addressTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 3,
  },
  addressInput: {
    padding: 12,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Color.field,
    color: Color.primary,
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
    marginTop: 25,
  },
  confirmBtnText: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.white,
  },
  //dialog
  dialogBackground: {
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  //loading dialog
  loadingView: {
    width: '60%',
    padding: 16,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  loadingText: {
    color: Color.primary,
    marginTop: 15,
  },
  //error message
  errorMessage: {
    color: Color.error,
    marginTop: 3,
  },
});
export {styles};
