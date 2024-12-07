import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import '../css/headerMenu.css'

export default function ProfileMenu({ isActive, toggleProfileMenu }) {

    const navigate = useNavigate()

    const clickedOutsideMenu = () => {
        toggleProfileMenu()
    }

    const handleClickedOutsideMenu = (e) => {

        const menu = document.getElementById('profile-menu')
        const profileBtn = document.getElementById('profile-btn')

        if (!menu.contains(e.target) && !profileBtn.contains(e.target)) {
            clickedOutsideMenu()
        }
    }

    useEffect(() => {
        if (isActive) {
            document.addEventListener('mousedown', handleClickedOutsideMenu)
            return () => {
                document.removeEventListener('mousedown', handleClickedOutsideMenu)
            }
        }
        return
    }, [isActive])

    const navigateTo = (link) => {
        navigate(link)
        toggleProfileMenu()
    }

    const logout = () => {
        localStorage.removeItem("admin")
        navigate('/login')
    }

    return (
        <div id='profile-menu' className={isActive ? 'header-menu active' : 'header-menu' + ' ' + 'theme'}>
            <div className='option' onClick={() => navigateTo('/settings')}>
                <i className='fal fa-gear-complex'></i>
                <p>Settings</p>
            </div>
            {/* <div className='option' onClick={() => navigateTo('/')}>
                <i className='fal fa-info-circle'></i>
                <p>Support & Info</p>
            </div> */}
            <hr></hr>
            <div className='option' onClick={() => logout()}>
                <i className='fal fa-sign-out'></i>
                <p>Logout</p>
            </div>
        </div>
    )
}
