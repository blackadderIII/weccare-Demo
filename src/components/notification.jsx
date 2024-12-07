import React, { useEffect } from 'react'
import { faker } from '@faker-js/faker'

import '../css/notification.css'

import systemDp from '../assets/profiles/system.png'
import user from '../assets/profiles/dp002.jpg'

import { TitleComponentH3 } from './titleComponent'

const notifications = [
    {
        pp: systemDp,
        message: 'You have successfully changed your password',
        time: 'Just Now'
    },
    {
        pp: user,
        message: 'John Addison submitted a new carecard',
        time: '35 mins ago'
    },
    {
        pp: systemDp,
        message: 'You have successfully changed your location',
        time: 'Yesterday'
    },
    {
        pp: systemDp,
        message: 'You have successfully changed your location',
        time: 'February 20, 2024'
    },
]

export const NotificationComponent = ({ pp, title, message, time }) => {
    return (
        <>
            <div className='notification'>
                <img src={pp}></img>
                <div className='notification-info'>
                    <p className='text-theme'>{message}</p>
                    <span>{time}</span>
                </div>
            </div>
            <hr className='notification-divider'></hr>
        </>
    )
}

export default function Notification({ isActive, toggleNotification }) {

    const clickedOutsideNotification = () => {
        toggleNotification()
    }

    const handleClickedOutsideNotification = (e) => {

        const notification = document.getElementById('notification-pane')
        const notificaionBtn = document.getElementById('notification-btn')

        if (!notification.contains(e.target) && !notificaionBtn.contains(e.target)) {
            clickedOutsideNotification()
        }
    }

    useEffect(() => {
        if (isActive) {
            document.addEventListener('mousedown', handleClickedOutsideNotification)
            return () => {
                document.removeEventListener('mousedown', handleClickedOutsideNotification)
            }
        }
        return
    }, [isActive])

    return (
        <div id='notification-pane' className={isActive ? 'notification-modal active' : 'notification-modal' + " " + 'theme'}>
            <TitleComponentH3
                title={'Notifications'}
            />
            <div className='notifcation-render'>
                {notifications.map((notificaion, index) => {
                    return (
                        <NotificationComponent
                            key={index}
                            pp={notificaion.pp}
                            title={notificaion.title}
                            message={notificaion.message}
                            time={notificaion.time}
                        />
                    )
                })}
            </div>
        </div>
    )
}
