import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.background,
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
    textAlign: 'center',
    marginBottom: 30,
  },
  //Share to friend button
  shareToFriendBtnContainer: {
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    backgroundColor: Color.primary,
  },
  shareToFriendBtnText: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.white,
  },
  //loading
  loadingIcon: {
    marginBottom: 16,
  },
  loadingText: {
    color: Color.primary,
    fontSize: 18,
  },
});
export {styles};
