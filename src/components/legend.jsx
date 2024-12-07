import React from 'react'

import '../css/legend.css'

export default function Legend({ backgroundColor, name }) {
    return (
        <div className='legend'>
            <div className='color-tip' style={{ background: backgroundColor }}></div>
            <h3 className='text-theme'>{name}</h3>
        </div>
    )
}
