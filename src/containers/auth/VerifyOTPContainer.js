import React from 'react'
import VerifyOTP from '../../components/auth/VerifyOTP'

export default function VerifyOTPContainer() {
    const verifyOTP = (code) => {
        console.log('code', code)
    }
    const resendOTP = () => {
        console.log('Ok thi resend ne')
    }
    return (
        <VerifyOTP onVerifyOTP={verifyOTP} onResendOTP={resendOTP}/>
    )
}
