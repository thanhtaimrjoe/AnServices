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
    marginBottom: 25,
  },
  smallText: {
    color: Color.primary,
    fontSize: 14,
    width: 262,
    textAlign: 'center',
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputField: {
    width: 262,
    height: 48,
    borderRadius: 30,
    paddingHorizontal: 16,
    backgroundColor: Color.field,
    color: Color.primary,
  },
  errorMsg: {
    paddingLeft: 16,
    color: 'red',
  },
  button: {
    width: 262,
    height: 48,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.btn,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.primary,
  },
});
export {styles};
