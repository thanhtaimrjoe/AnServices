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
  inputTitle: {
    color: Color.primary,
    fontSize: 16,
    marginBottom: 3,
  },
  inputField: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: Color.field,
    color: Color.primary,
  },
  errorMsg: {
    color: Color.error,
    marginTop: 3,
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
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.white,
  },
  //dialog
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
