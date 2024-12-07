import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import qrcode from '../assets/qr-code.png'

// styling
import '../css/navbar.css'

export default function NavigationBar() {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("admin")
        navigate('/login')
    }

    return (
        <nav>
            <div className='logo'>
                <img src='logo.png' onClick={() => setIsNavActive(!isNavActive)} />
                <h4 className='text-theme'>WEC Care.</h4>
            </div>

            <div className='navigation-links'>
                <NavLink to={'/'}>
                    <i className='fad fa-grid-2'></i><p>Dashboard</p>
                </NavLink>
                <NavLink to={'/writeCard'}>
                    <i className='fad fa-pen-to-square'></i><p>Write Care Card</p>
                </NavLink>
                <NavLink to={'/pendingCards'}>
                    <i className='fad fa-file-exclamation'></i><p>Pending Cards</p>
                </NavLink>
                <NavLink to={'/completedCards'}>
                    <i className='fad fa-file-check'></i><p>Completed Cards</p>
                </NavLink>
                <NavLink to={'/uncompletedCards'}>
                    <i className='fad fa-file-xmark'></i><p>Uncompleted Cards</p>
                </NavLink>
                <NavLink to={'/settings'}>
                    <i className='fad fa-gear-complex'></i><p>Settings</p>
                </NavLink>
            </div>

            {/* <div className='ad'>
                <h3>Scan to download the mobile app!</h3>
                <img src={qrcode}></img>
            </div> */}

            <div className='navigation-links'>
                <a onClick={() => logout()}>
                    <i className='fal fa-sign-out'></i>
                    <p>Logout</p>
                </a>
            </div>
        </nav>
    )
}
