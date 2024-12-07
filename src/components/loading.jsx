import React from 'react'

// style
import '../css/loadingComponent.css'

export default function LoadingComponent() {
    return (
        <div className='loading-container'>
            <div className='ball-01'></div>
            <div className='ball-02'></div>
            <div className='ball-03'></div>
        </div>
    )
}

export function LoadingComponentGrey() {
    return (
        <div className='loading-container'>
            <div className='ball-01' style={{ backgroundColor: '#999' }}></div>
            <div className='ball-02' style={{ backgroundColor: '#bbb' }}></div>
            <div className='ball-03' style={{ backgroundColor: '#ddd' }}></div>
        </div>
    )
}

export const LoadingBtnComponent = () => {
    return (
        <div className='loading-spiner'></div>
    )
}

export const Loading = () => {
    return (
        <div className='loading-spiner-2'></div>
    )
}