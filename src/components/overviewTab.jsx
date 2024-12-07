import React from 'react'

import '../css/overviewtab.css'

export default function OverviewTab({ onclick, bgColor, illustration, amount, illustrationColor, name, percentage }) {
    return (
        <div className='overview-tab' style={{ background: bgColor }} onClick={onclick}>
            <i className={illustration + ' ' + 'background'}></i>
            <div className='icon'>
                <i className={illustration} style={{ color: illustrationColor }}></i>
            </div>
            <div className='info'>
                <div className='left-col'>
                    <h2>{amount}</h2>
                    <span>{name}</span>
                </div>
                <span className='percentage'>{percentage}</span>
            </div>
        </div>
    )
}
