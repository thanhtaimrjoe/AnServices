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
        width: 235,
        textAlign: 'center',
        marginBottom: 30,
      },
      //Code Reedem
      codeReedemInput: {
        backgroundColor: Color.field,
        color: Color.primary,
        width: '70%',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
      },
      codeReedemBtn: {
        backgroundColor: Color.btn,
        width: '70%',
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      codeReedemBtnText: {
          fontSize: 18,
          fontWeight: '500',
          color: Color.primary,
          padding: 8,
      }
});
export {styles}