import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 305,
    height: 222,
    marginBottom: 20,
  },
  bigText: {
    color: Color.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  smallText: {
    color: Color.primary,
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  //resend
  resendContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  resendText: {
    color: Color.primary,
    fontSize: 14,
  },
  resendBtn: {
    color: Color.second,
    fontSize: 14,
  },
  otpContainer: {
    width: '80%',
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
  button: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.white,
  },
});
export {styles};
