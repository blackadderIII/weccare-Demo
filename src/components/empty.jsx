import React from 'react'

import '../css/empty.css'

import emptyIcon from '../assets/icons/empty.png'
import errorIcon from '../assets/icons/error.png'
import notFound from '../assets/icons/notfound.png'

export default function Empty({ name }) {
    return (
        <div className='empty'>
            <img src={emptyIcon} alt='empty illustration' />
            <span>{name}</span>
        </div>
    )
}

export function ErrorIcon({ name }) {
    return (
        <div className='empty'>
            <img src={errorIcon} alt='error illustration' />
            <span>{name}</span>
        </div>
    )
}

export function NotFoundIcon({ name }) {
    return (
        <div className='empty'>
            <img src={notFound} alt='not found illustration' />
            <span>{name}</span>
        </div>
    )
}
