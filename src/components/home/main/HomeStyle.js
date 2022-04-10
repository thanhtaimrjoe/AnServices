import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background1,
    paddingHorizontal: 15,
  },
  //logo anservice
  logoContainer: {
    width: '100%',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  logoImg: {
    width: 42,
    height: 42,
    marginRight: 6,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '500',
    color: Color.primary,
  },
  //user information
  userInfoContainer: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: Color.userCover,
    marginBottom: 20,
  },
  userIcon: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  userInfoName: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.white,
  },
  userInfoDescription: {
    color: Color.white,
  },
  requestServiceListTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
    marginBottom: 20,
  },
  //filter
  filter: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.second,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  filterBtnActive: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: Color.primary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  filterText: {
    color: Color.second,
  },
  filterTextActive: {
    color: Color.white,
  },
  requestServiceListContainer: {
    alignItems: 'center',
  },
  //error message from api
  errorView: {
    marginTop: 100,
    alignItems: 'center',
  },
  errorMsg: {
    fontSize: 16,
    color: Color.primary,
    textAlign: 'center',
  },
  errorImg: {
    marginBottom: 20,
    width: 100,
    height: 100,
  },
  //request service item
  requestServiceItemContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: Color.request,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 16,
  },
  requestServiceItemImg: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  requestServiceItemName: {
    width: '80%',
    fontSize: 18,
    color: Color.primary,
  },
  //loading screen
  loadingScreen: {
    width: '100%',
    paddingVertical: 100,
  },
});
export {styles};
