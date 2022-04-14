import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 15,
    alignItems: 'center',
    backgroundColor: Color.background1,
  },
  //title
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 16,
    color: Color.primary,
  },
  titlePhoneNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: Color.primary,
  },
  //otp
  otpContainer: {
    width: '90%',
    height: 50,
    marginBottom: 20,
  },
  otpField: {
    width: 45,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: Color.primary,
    color: Color.primary,
  },
  //resend
  resendContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  resendText: {
    color: Color.primary,
    fontSize: 14,
  },
  resendBtn: {
    color: Color.resend,
    fontSize: 14,
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
  //loading dialog
  dialogBackground: {
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
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
});
export {styles};
