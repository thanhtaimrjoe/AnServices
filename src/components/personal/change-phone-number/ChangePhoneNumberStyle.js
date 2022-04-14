import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 15,
    backgroundColor: Color.background1,
  },
  phoneNumberContainer: {
    marginBottom: 10,
  },
  phoneNumberTitle: {
    color: Color.primary,
    fontSize: 18,
    marginBottom: 10,
  },
  phoneNumberInput: {
    borderRadius: 10,
    padding: 12,
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
  },
  confirmBtnText: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.white,
  },
  //error message
  errorMessage: {
    color: Color.error,
    marginTop: 5,
  },
  //loading dialog
  dialogBackground: {
    backgroundColor: '#000000aa',
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
