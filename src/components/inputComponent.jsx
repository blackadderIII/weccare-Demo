import React from 'react'

import '../css/inputComponent.css'

export default function InputComponent({ icon, value, placeholder, onChange }) {
    return (
        <div className='input-component'>
            <i className={`${icon} text-theme`}></i>
            <input className='text-theme' value={value} type='text' placeholder={placeholder} onChange={onChange} />
        </div>
    )
}

export const PasswordComponent = ({ icon, type, password, placeholder, onChange }) => {
    return (
        <div className='input-component'>
            <i className={`${icon} text-theme`}></i>
            <input className='text-theme' value={password} type={type} placeholder={placeholder} onChange={onChange} />
        </div>
    )
}

export const SelectComponent = ({ icon, options, value, onChange }) => {
    return (
        <div className='input-component'>
            <i className={`${icon} text-theme`}></i>
            <select className='text-theme' value={value} onChange={onChange}>
                {options}
            </select>
        </div>
    )
}
