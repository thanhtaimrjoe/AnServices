import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background1,
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    marginVertical: 16,
    fontSize: 24,
    color: Color.primary,
    fontWeight: '500',
  },
  //Report Item
  reportProblemItem: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: Color.fourth,
    borderRadius: 10,
    height: 65,
    marginBottom: 8,
  },
  reportProblemItemImg: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  reportProblemItemName: {
    width: '60%',
    fontSize: 18,
    color: Color.primary,
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
