import React from 'react'

import '../css/header.css'

export default function Header({ theme, profilepicture, toggleTheme, isActive, toggleNotification, toggleProfileMenu }) {

    return (
        <header className='theme'>
            <div className='header-buttons'>
                <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'} onClick={toggleTheme}></i>
                {/* <i
                    id='notification-btn'
                    className={isActive ? 'fas fa-bell' : 'fal fa-bell not-active'}
                    style={{ color: isActive ? '#39b54a' : theme === 'light' ? '#222' : '#fff' }}
                    onClick={toggleNotification}>
                </i> */}
            </div>
            <img
                src={`${profilepicture}`}
                className='header-profile'
                onClick={toggleProfileMenu}
                id='profile-btn'
            />
        </header>
    )
}
