import React from 'react'

import '../css/titleComponents.css'

export const TitleComponentH1 = ({ title }) => {
    return (
        <h1 className='title-01 text-theme'>
            {title}
        </h1>
    )
}

export const TitleComponentH2 = ({ title }) => {
    return (
        <h2 className='title-02 text-theme'>
            {title}
        </h2>
    )
}

export const TitleComponentH3 = ({ title }) => {
    return (
        <h3 className='title-03 text-theme'>
            {title}
        </h3>
    )
}

export const TitleComponentH4 = ({ title }) => {
    return (
        <h4 className='title-04 text-theme'>
            {title}
        </h4>
    )
}
