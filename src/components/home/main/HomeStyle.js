import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    flex: 1,
  },
  header: {
    width: '100%',
    padding: 15,
    backgroundColor: Color.background,
  },
  //ads
  adsContainer: {
    width: '100%',
    height: 143,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Color.cover,
    marginBottom: 20,
  },
  adsTextContainer: {
    width: '50%',
  },
  adsTitle: {
    fontSize: 18,
    color: Color.primary,
    fontWeight: '500',
  },
  adsDescription: {
    fontSize: 14,
    color: Color.primary,
  },
  adsImg: {
    width: '40%',
    height: '100%',
  },
  //request service button
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  requestBtn: {
    width: '30%',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.request,
  },
  requestIcon: {
    width: 45,
    height: 45,
    marginBottom: 10,
  },
  requestText: {
    fontSize: 14,
    paddingHorizontal: 12,
    color: Color.primary,
    textAlign: 'center',
  },
  //view contract button
  contractBtn: {
    width: '30%',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.contract,
  },
  contractIcon: {
    width: 45,
    height: 45,
    marginBottom: 10,
  },
  contractText: {
    fontSize: 14,
    paddingHorizontal: 12,
    color: Color.primary,
    textAlign: 'center',
  },
  //service list
  serviceContainer: {
    paddingHorizontal: 15,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
    marginBottom: 20,
  },
  //service item
  serviceItemContainer: {
    flexDirection: 'row',
    backgroundColor: Color.cover,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginBottom: 15,
  },
  serviceItemTextContainer: {
    width: '65%',
  },
  serviceItemName: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
    marginBottom: 5,
  },
  serviceItemDescription: {
    fontSize: 14,
    color: Color.primary,
  },
  serviceItemImg: {
    width: 69,
    height: 69,
    marginRight: 20,
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
});
export {styles};
