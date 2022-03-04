import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background1,
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    color: Color.primary,
    fontWeight: '500',
    marginVertical: 16,
  },
  //contract item
  contractItemContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: Color.field,
    borderRadius: 10,
    height: 65,
    marginBottom: 8,
  },
  contractItemImg: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  contractItemName: {
    width: '55%',
    fontSize: 18,
    color: Color.primary,
  },
  contractItemStatus: {
    width: '25%',
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Color.primary,
  },
  contractItemStatusText: {
    color: Color.third,
    textAlign: 'center',
  },
  //dialog
  dialogBackground: {
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  dialogContainer: {
    width: '90%',
    borderRadius: 10,
    padding: 16,
    backgroundColor: Color.third,
  },
  dialogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dialogTitle: {
    fontSize: 18,
    color: Color.primary,
  },
  exitIcon: {
    fontSize: 24,
    color: Color.primary,
  },
  btnDownload: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Color.btn1,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnApprove: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Color.btn2,
  },
  btnRequestUpdate: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Color.btn3,
  },
  btnText: {
    fontSize: 16,
    color: Color.third,
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
