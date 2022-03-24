import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: 300,
    height: 240,
    marginBottom: 28,
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
    width: 262,
    marginBottom: 20,
    textAlign: 'center',
  },
  //resend
  resendContainer: {
    flexDirection: 'row',
    marginBottom: 25,
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
    width: 270,
    height: 50,
    marginBottom: 20,
  },
  otpField: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: Color.primary,
    color: Color.primary,
  },
  button: {
    width: 262,
    height: 48,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.btn,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.primary,
  },
});
export {styles};
