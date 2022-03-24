import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background1,
  },
  welcomeContainer: {
    width: '100%',
    height: 238,
    backgroundColor: Color.fourth,
    paddingTop: 16,
  },
  welcomeText: {
    fontSize: 18,
    color: Color.primary,
    marginLeft: 16,
  },
  welcomeName: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
    marginLeft: 16,
  },
  welcomeImg: {
    alignSelf: 'flex-end',
    width: 270,
    height: 170,
  },
  requestServiceListTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
    marginTop: 30,
    paddingHorizontal: 16,
  },
  //filter
  filter: {
    marginVertical: 25,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
  },
  filterBtnActive: {
    padding: 8,
    backgroundColor: Color.btn,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  filterBtn: {
    padding: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  filterBtnTextActive: {
    color: Color.primary,
  },
  filterBtnText: {
    color: Color.primary,
  },
  requestServiceListContainer: {
    paddingHorizontal: 16,
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
  },
  errorImg: {
    marginBottom: 20,
    width: 100,
    height: 100,
  },
  //request service item
  requestServiceItemContainer: {
    width: '100%',
    height: 63,
    backgroundColor: Color.field,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  requestServiceItemImg: {
    width: 30,
    height: 30,
    marginRight: 16,
  },
  requestServiceItemName: {
    width: '60%',
    fontSize: 18,
    color: Color.primary,
  },
  requestServiceItemStatusContainer: {
    width: '25%',
    paddingVertical: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
  },
  requestServiceItemStatus: {
    color: Color.third,
  },
});
export {styles};
