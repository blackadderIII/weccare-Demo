import React from 'react'

// components
import LoadingComponent from '../components/loading'

// styling
import '../css/loadingPage.css'

export default function LoadingPage() {

    return (
        <main className='loadingPage'>
            <img src='logo.png'></img>
            <LoadingComponent />
        </main>
    )
}
