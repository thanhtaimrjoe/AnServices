import React from 'react'
import Login from '../../components/auth/Login'

export default function LoginContainer(props) {
    const {navigation} = props;
    const sendOTP = () => {
        navigation.navigate('VerifyOTPContainer');
    }
    return (
        <Login onSendOTP={sendOTP}/>
    )
}
