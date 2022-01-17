import {StyleSheet} from 'react-native';
import Color from '../../styles/Color';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    width: '100%',
    height: 120,
    alignItems: 'center',
    backgroundColor: 'green',
  },
  avtContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: Color.primary,
  },
  avtIcon: {
    fontSize: 50,
    color: Color.primary,
  },
  profileName: {
    fontSize: 24,
    color: Color.primary,
  },
});
export {styles};
