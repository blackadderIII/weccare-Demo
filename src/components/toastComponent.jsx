import React from 'react'

import '../css/toast.css'

export const successToast = (message, duration = 3000) => {

    const toastContainer = document.getElementById('toast-space')

    const toastElement = document.createElement('div');
    toastElement.className = 'toast'
    toastElement.innerHTML = `<i class='fas fa-check-circle success'></i><span><h4>Success</h4><p class='text-theme'>${message}</p></span>`;
    toastContainer.appendChild(toastElement);

    setTimeout(() => {
        toastContainer.removeChild(toastElement)
    }, duration)
};

export const warnToast = (message, duration = 3000) => {

    const toastContainer = document.getElementById('toast-space')

    const toastElement = document.createElement('div');
    toastElement.className = 'toast'
    toastElement.innerHTML = `<i class='fas fa-triangle-exclamation warn'></i><span><h4>Warning</h4><p class='text-theme'>${message}</p></span>`;
    toastContainer.appendChild(toastElement);

    setTimeout(() => {
        toastContainer.removeChild(toastElement)
    }, duration)
};

export const errorToast = (message, duration = 3000) => {

    const toastContainer = document.getElementById('toast-space')

    const toastElement = document.createElement('div');
    toastElement.className = 'toast'
    toastElement.innerHTML = `<i class='fas fa-xmark-circle error'></i><span><h4>Error</h4><p class='text-theme'>${message}</p></span>`;
    toastContainer.appendChild(toastElement);

    setTimeout(() => {
        toastContainer.removeChild(toastElement)
    }, duration)
};


export default function Toast() {
    return (
        <div id='toast-space' className='toast-space'>

        </div>
    )
} 