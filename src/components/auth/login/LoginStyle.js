import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background1,
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
    paddingHorizontal: 40,
    color: Color.primary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputField: {
    width: '80%',
    paddingVertical: 14,
    paddingLeft: 16,
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: Color.field,
    marginBottom: 20,
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
  buttonLoading: {
    width: '80%',
    paddingVertical: 8,
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
