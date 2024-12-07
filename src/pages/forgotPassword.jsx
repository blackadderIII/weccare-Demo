import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// style
import '../css/signin.css'

// components
import { LoadingBtnComponent } from '../components/loading'

// utils
import { color } from '../utils/color'
import Toast, { errorToast, warnToast } from '../components/toastComponent'
// import { api } from '../utils/api'

export default function ForgotPassword() {

    const navigate = useNavigate()

    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme')
        return storedTheme ? storedTheme : 'light'
    })
    const [email, setEmail] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        localStorage.setItem('theme', theme)
        applyTheme(theme)
    }, [theme])

    const applyTheme = (theme) => {
        document.body.classList.remove('dark', 'light')
        document.body.classList.add(theme)

        const components = document.querySelectorAll('.theme')
        const textComponents = document.querySelectorAll('.text-theme')

        if (theme === 'dark') {
            document.body.style.backgroundColor = color.backgrounddark
        } else {
            document.body.style.backgroundColor = color.backgroundlight
        }

        components.forEach((component) => {
            if (theme === 'dark') {
                component.style.backgroundColor = color.darkComponent;
            } else {
                component.style.backgroundColor = color.lightComponent;
            }
        })

        textComponents.forEach((text) => {
            if (theme === 'dark') {
                text.style.color = '#ffffff'
            } else {
                text.style.color = '#2a2c41'
            }
        })
    }

    // const sendEmail = async () => {

    //     if (!email) {
    //         warnToast("Enter your email")
    //         return
    //     }

    //     setIsLoading(true)
    //     setIsDisabled(true)

    //     try {
    //         const sendMailRequest = await fetch(`${api}/sendResetCode`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 email: email,
    //             })
    //         })

    //         const res = await sendMailRequest.json()
    //         const response = res.message

    //         if (response === 'error executing query' || response === 'Error sending Mail') {
    //             setIsLoading(false)
    //             setIsDisabled(false)
    //             errorToast("An error occured. Please try again later.")
    //             return
    //         }

    //         if (response === "user doesn't exist") {
    //             setIsLoading(false)
    //             setIsDisabled(false)
    //             errorToast("Invalid Email")
    //             return
    //         }

    //         setIsLoading(false)
    //         setIsDisabled(false)
    //         localStorage.setItem('tempEmail', email)
    //         navigate('/verifyCode')
    //         return
    //     }
    //     catch (error) {
    //         setIsLoading(false)
    //         setIsDisabled(false)
    //         console.log('error sending password', error)
    //         errorToast('An error occured. Please try again later.')
    //         return
    //     }
    // }

    return (
        <main className='signin-container'>
            <Toast />
            <div className='signin-modal theme'>

                <div className='top'>
                    <h1 className='text-theme'>Forgot Password</h1>
                </div>

                <p className='text-theme' style={{ marginBottom: 30, fontSize: 14, }}>
                    Enter the email associated with your account to recieve a code to help you reset your password.
                </p>

                {/* email */}
                <div className='field'>
                    <label>Email</label>
                    <input type='email' placeholder='Enter your email' onChange={(e) => setEmail(e.currentTarget.value)} />
                </div>

                <button disabled={isDisabled} onClick={() => sendEmail()}>
                    {isLoading ?
                        <LoadingBtnComponent /> :
                        <h3>Send Code</h3>
                    }
                </button>

            </div>

            <div className='forgot-bar theme' onClick={() => navigate('/login')}>
                <p>Go back to Login</p>
            </div>
        </main>
    )
}
