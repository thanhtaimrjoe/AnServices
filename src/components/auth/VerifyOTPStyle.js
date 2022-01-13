import { StyleSheet } from "react-native"
import Color from '../../styles/Color';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.background1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
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
        marginBottom: 28,
        textAlign: 'center'
    },
    resendContainer: {
        flexDirection: 'row',
        marginBottom: 28,
    },
    resendText: {
        color: Color.primary,
        fontSize: 14,
    },
    resendBtn: {
        color: Color.second,
        fontSize: 14,
    },
    otpContainer: {
        width: 262,
        height: 50,
        marginBottom: 20,
    },
    otpField: {
        width: 35,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 10,
        color: Color.primary,
    },
    button: {
        width: 262,
        height: 48,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.primary,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Color.third,
    }
})
export {styles}