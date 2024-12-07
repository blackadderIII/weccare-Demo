import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// styling
import './css/root.css'
import './css/fonts.css'

// components 
import LoadingPage from './pages/loadingpage'
import Header from './components/header'
import NavigationBar from './components/navbar'
import Toast, { errorToast } from './components/toastComponent'
// import Notification from './components/notification'
import ProfileMenu from './components/profileMenu'

// utils
import { color } from './utils/color'
import { ThemeContext } from './utils/themeContext'
import { UserContext } from './utils/userContext'

import defaultProfile from '../profilePictures/default.jpg'

export default function Root() {

    const navigate = useNavigate()

    const [user, setUser] = useState()
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme')
        return storedTheme ? storedTheme : 'light'
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isNotificationActive, setIsNotificationActive] = useState(false)
    const [profileMenuActive, setProfileMenuActive] = useState(false)
    const [adminProfile, setAdminProfile] = useState(defaultProfile)

    // load user
    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = localStorage.getItem('admin')
                if (storedUser) {
                    setUser(JSON.parse(storedUser))
                    setIsLoading(false)
                } else {
                    setUser(null)
                    setIsLoading(false)
                    navigate('/login')
                    return
                }
            }
            catch (error) {
                setIsLoading(false)
                console.log("Error loading user", error)
                navigate('/login')
                errorToast("An error occured. Please try again later")
                return
            }
        }

        loadUser()
    }, [])

    // check profile picture
    const checkProfilePicture = async () => {
        const getAdminInfo = localStorage.getItem('admin')
        const admin = JSON.parse(getAdminInfo)
        if (admin.profilepicture !== 'default.jpg') {
            setAdminProfile(`../profilePictures/${admin.profilepicture}`)
            return
        } else {
            setAdminProfile(defaultProfile)
        }
    }

    useEffect(() => {
        checkProfilePicture()
    }, [user])

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

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <ThemeContext.Provider value={{ theme, toggleTheme, applyTheme, setTheme }}>
                <main>
                    <Toast />
                    {/* <Notification
                        isActive={isNotificationActive}
                        toggleNotification={() => setIsNotificationActive(false)}
                    /> */}
                    <Header
                        profilepicture={adminProfile}
                        theme={theme}
                        toggleTheme={() => toggleTheme()}
                        isActive={isNotificationActive}
                        toggleNotification={() => setIsNotificationActive(!isNotificationActive)}
                        toggleProfileMenu={() => setProfileMenuActive(!profileMenuActive)}
                    />
                    <ProfileMenu
                        isActive={profileMenuActive}
                        toggleProfileMenu={() => setProfileMenuActive(false)}
                    />
                    <NavigationBar />
                    <section className='render-space'>
                        <Outlet />
                    </section>
                </main>
            </ThemeContext.Provider>
        </UserContext.Provider>
    )
}