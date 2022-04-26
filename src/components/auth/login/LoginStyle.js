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
    width: '50%',
    height: '25%',

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
  btn: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    marginBottom: 20,
  },
  btnText: {
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
