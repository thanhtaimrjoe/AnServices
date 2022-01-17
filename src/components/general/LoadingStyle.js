import {StyleSheet} from 'react-native';
import Color from '../../styles/Color';

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIcon: {
    marginBottom: 16,
  },
  loadingText: {
    color: Color.primary,
    fontSize: 18,
  },
});
export {styles};
