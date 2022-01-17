import {StyleSheet} from 'react-native';
import Color from '../../styles/Color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background2,
    flex: 1,
  },
  header: {
    width: '100%',
    height: 181,
    padding: 16,
    backgroundColor: Color.background1,
    marginBottom: 30,
  },
  //ads
  adsContainer: {
    width: '100%',
    height: 143,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Color.background2,
  },
  adsTextContainer: {
    width: 153,
    height: 82,
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
    width: 149,
    height: '100%',
  },
  //request service button and view contract button
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  requestBtn: {
    width: 69,
    height: 94,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestIcon: {
    fontSize: 40,
    color: Color.primary,
  },
  requestText: {
    paddingTop: 5,
    fontSize: 14,
    color: Color.primary,
    textAlign: 'center',
  },
  //service list
  serviceContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 20,
  },
  //service item
  serviceItemContainer: {
    flexDirection: 'row',
    backgroundColor: Color.forth,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom: 20,
  },
  serviceItemTextContainer: {
    width: 161,
  },
  serviceItemName: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
  },
  serviceItemDescription: {
    fontSize: 14,
    color: Color.primary,
  },
  serviceItemPrice: {
    fontSize: 14,
    color: Color.primary,
  },
  serviceItemImg: {
    width: 101,
    height: 96,
  },
});
export {styles};
