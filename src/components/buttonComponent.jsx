import React from 'react'

import '../css/buttonComponent.css'

import { LoadingBtnComponent } from './loading'

export function SaveButtonComponent({ isLoading, bgColor, color, title, onclick }) {
    return (
        <button
            className='save-button-component'
            style={{ background: bgColor, color: color }}
            onClick={onclick}
        >
            {isLoading ?
                <LoadingBtnComponent /> :
                title
            }
        </button>
    )
}