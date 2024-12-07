import React, { useState } from 'react'

import '../css/searchComponent.css'

export default function SearchComponent({ placeholder, search, onSearch, onFilterChange, initiateSearch }) {

    const [inputActive, setInputActive] = useState(false)
    const [filter, setFilter] = useState('')

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            initiateSearch()
        }
    };

    return (
        <div className='search-container theme'>
            <i className={`fal fa-search ${inputActive ? 'active' : ''}`}></i>
            <input className='text-theme' value={search} type='text' placeholder={placeholder} onFocus={() => setInputActive(true)} onBlur={() => setInputActive(false)} onChange={e => onSearch(e.target.value)} onKeyDown={handleKeyDown} />
            <select onChange={e => onFilterChange(e.target.value)}>
                <option value={'cardID'}>Card ID</option>
                <option value={'username'}>Username</option>
                <option value={'email'}>Email</option>
                <option value={'department'}>Department</option>
            </select>
        </div>
    )
}
