import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    flex: 1,
    padding: 15,
  },
  //promotion item
  promotionItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.promotion,
    marginBottom: 8,
    borderRadius: 10,
  },
  promotionInfo: {
    width: '60%',
    padding: 16,
    borderRightWidth: 1,
  },
  promotionItemName: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
  },
  promotionItemDescription: {
    color: Color.primary,
  },
  promotionItemDate: {
    width: '40%',
    padding: 16,
  },
  promotionItemDateText: {
    paddingVertical: 5,
    color: Color.primary,
  },
  circle: {
    backgroundColor: Color.white,
    width: 40,
    height: 40,
    borderRadius: 50,
    position: 'absolute',
    top: 25,
    right: -20,
  },
  //error message from api
  errorView: {
    marginTop: 200,
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
