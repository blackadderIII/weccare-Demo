import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// style
import '../css/signin.css'

// components
import { LoadingBtnComponent } from '../components/loading'

// utils
import { color } from '../utils/color'
import Toast, { errorToast, successToast, warnToast } from '../components/toastComponent'
import { api } from '../utils/api'

export default function ResetPassword() {

    const navigate = useNavigate()

    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme')
        return storedTheme ? storedTheme : 'light'
    })
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [passwordVisible1, setPasswordVisible1] = useState(false)
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

    useEffect(() => {
        const getEmail = localStorage.getItem('tempEmail')
        setEmail(getEmail)
    }, [])

    const resetPassword = async () => {

        if (!newPassword || !confirmPassword) {
            warnToast("Fields can't be empty. Please check and try again")
            return
        }

        if (newPassword !== confirmPassword) {
            warnToast("Passwords don't match. Please check and try again")
            return
        }

        setIsLoading(true)
        setIsDisabled(true)

        try {
            const sendCode = await fetch(`${api}/resetPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: newPassword,
                })
            })

            const res = await sendCode.json()
            const response = res.message

            if (response === 'error executing query') {
                setIsLoading(false)
                setIsDisabled(false)
                errorToast("Can't reach servers. Please try again later")
                return
            }

            if (response === "failed") {
                setIsLoading(false)
                setIsDisabled(false)
                errorToast("Incorrect Code. Please check and try again.")
                return
            }

            setIsLoading(false)
            setIsDisabled(false)
            successToast("Password reset successfully")
            setTimeout(() => navigate('/login'), 3000)
            return
        }
        catch (error) {
            setIsLoading(false)
            setIsDisabled(false)
            console.log('error resetting password', error)
            errorToast('An error occured. Please try again later.')
            return
        }
    }

    return (
        <main className='signin-container'>
            <Toast />
            <div className='signin-modal theme'>

                <div className='top'>
                    <h1 className='text-theme'>Reset Password</h1>
                </div>

                <p className='text-theme' style={{ marginBottom: 20, fontSize: 14, width: '100%' }}>
                    Create a new, stronger, password.
                </p>

                {/* password */}
                <div className='field'>
                    <label>Password</label>
                    <div className='password-field'>
                        <input type={passwordVisible ? 'text' : 'password'} placeholder='Enter your password' onChange={(e) => setNewPassword(e.currentTarget.value)} />
                        <i className={passwordVisible ? 'fal fa-eye-slash' : 'fal fa-eye'} onClick={() => setPasswordVisible(!passwordVisible)}></i>
                    </div>
                </div>

                {/* password */}
                <div className='field'>
                    <label>Password</label>
                    <div className='password-field'>
                        <input type={passwordVisible1 ? 'text' : 'password'} placeholder='Enter your password' onChange={(e) => setConfirmPassword(e.currentTarget.value)} />
                        <i className={passwordVisible1 ? 'fal fa-eye-slash' : 'fal fa-eye'} onClick={() => setPasswordVisible1(!passwordVisible1)}></i>
                    </div>
                </div>

                <button disabled={isDisabled} onClick={() => resetPassword()}>
                    {isLoading ?
                        <LoadingBtnComponent /> :
                        <h3>Reset</h3>
                    }
                </button>

            </div>

            <div className='forgot-bar theme' onClick={() => navigate('/login')}>
                <p>Cancel</p>
            </div>
        </main>
    )
}
