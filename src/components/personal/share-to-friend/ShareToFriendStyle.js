import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.background1,
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
    padding: 10,
    borderRadius: 10,
    backgroundColor: Color.btn,
  },
  shareToFriendBtnText: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
  },
  //Invite code
  // inviteCodeContainer: {
  //     padding: 10,
  //     borderWidth: 1,
  //     borderRadius: 10,
  //     borderColor: Color.primary
  // },
  // inviteCode: {
  //     fontSize: 18,
  //     fontWeight: '500',
  //     color: Color.primary
  // },
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
