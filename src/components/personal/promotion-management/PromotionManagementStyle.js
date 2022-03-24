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
      //Request Service Item
      requestServiceItemContainer: {
        width: '100%',
        backgroundColor: Color.field1,
        borderRadius: 10,
        marginBottom: 8,
      },
      requestServiceItem: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        backgroundColor: Color.forth,
        borderRadius: 10,
        height: 65,
        //marginBottom: 8,
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
    marginBottom: 10,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: Color.primary,
  },
  exitIcon: {
    fontSize: 24,
    color: Color.primary,
  },
  promotionDescription: {
    fontSize: 16,
    color: Color.primary
  },
  promotionCodeContainer: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.purple
  },
  promotionCode: {
    width: '65%',
    fontSize: 18,
    padding: 16,
    color: Color.third,
    backgroundColor: Color.red
  },
  promotionCodeBtn: {
    width: '35%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Color.btn,
  },
  promotionCodeBtnText: {
    fontSize: 18,
    color: Color.primary,
  }
});
export {styles};
