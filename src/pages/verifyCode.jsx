import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// style
import '../css/signin.css'

// components
import { LoadingBtnComponent } from '../components/loading'

// utils
import { color } from '../utils/color'
import Toast, { errorToast, warnToast } from '../components/toastComponent'
import { api } from '../utils/api'

export default function VerifyCode() {

    const navigate = useNavigate()

    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme')
        return storedTheme ? storedTheme : 'light'
    })
    const [code, setCode] = useState()
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

    const verifyCode = async () => {

        if (!code) {
            warnToast("Enter your email")
            return
        }

        setIsLoading(true)
        setIsDisabled(true)

        try {
            const sendCode = await fetch(`${api}/verifyCode/${email}/${code}`)

            const res = await sendCode.json()
            const response = res.message

            if (response === 'error executing query') {
                setIsLoading(false)
                setIsDisabled(false)
                errorToast("Can't reach servers. Please try again later")
                return
            }

            if (response === "incorrect code") {
                setIsLoading(false)
                setIsDisabled(false)
                errorToast("Incorrect Code. Please check and try again.")
                return
            }

            setIsLoading(false)
            setIsDisabled(false)
            navigate('/resetPassword')
            return
        }
        catch (error) {
            setIsLoading(false)
            setIsDisabled(false)
            console.log('error verifying code', error)
            errorToast('An error occured. Please try again later.')
            return
        }
    }

    return (
        <main className='signin-container'>
            <Toast />
            <div className='signin-modal theme'>

                <div className='top'>
                    <h1 className='text-theme'>Verify Code</h1>
                </div>

                <p className='text-theme' style={{ marginBottom: 20, fontSize: 14, }}>
                    A code was sent to {email} kindly check and enter the code below
                </p>

                {/* email */}
                <div className='field'>
                    <label>Code</label>
                    <input type='text' style={{ letterSpacing: 2, fontSize: 24 }} onChange={(e) => setCode(e.currentTarget.value)} />
                </div>

                <button disabled={isDisabled} onClick={() => verifyCode()}>
                    {isLoading ?
                        <LoadingBtnComponent /> :
                        <h3>Send Code</h3>
                    }
                </button>

            </div>

            <div className='forgot-bar theme' onClick={() => navigate('/forgotPassword')}>
                <p>Edit Email</p>
            </div>
        </main>
    )
}
