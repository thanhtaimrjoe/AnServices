import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 15,
  },
  inputField: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: Color.field,
    color: Color.primary,
  },
  errorMsg: {
    paddingLeft: 16,
    color: Color.error,
    marginTop: 15,
  },
  button: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    marginTop: 20,
  },
  buttonLoading: {
    width: '80%',
    paddingVertical: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.white,
  },
});
export {styles};
