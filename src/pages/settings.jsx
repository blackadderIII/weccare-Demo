import React, { useContext, useEffect, useState } from 'react'

import '../css/settings.css'

import { TitleComponentH1, TitleComponentH3 } from '../components/titleComponent'
import InputComponent, { PasswordComponent, SelectComponent } from '../components/inputComponent'
import { SaveButtonComponent } from '../components/buttonComponent'
import { successToast, errorToast, warnToast } from '../components/toastComponent'

// utils
import { ThemeContext } from '../utils/themeContext'
import { UserContext } from '../utils/userContext'
// import { api } from '../utils/api'

// images
import lightMode from '../assets/shots/light.png'
import darkMode from '../assets/shots/dark.png'
import { Loading } from '../components/loading'


export default function Settings() {

    const { theme, applyTheme, setTheme } = useContext(ThemeContext)
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        applyTheme(theme)

        const lightMode = document.querySelector('.showcase.light')
        const darkMode = document.querySelector('.showcase.dark')

        if (theme === 'light') {
            lightMode.classList.add('active')
            darkMode.classList.remove('active')
        } else {
            lightMode.classList.remove('active')
            darkMode.classList.add('active')
        }

    }, [theme])

    // user/ admin

    // check profile
    const checkProfilePicture = async () => {
        if (user.profilepicture !== 'default.jpg') {
            setProfilepicture(`../profilePictures/${user.profilepicture}`)
            return
        } else {
            console.log('../profilePictures/default.jpg')
        }
    }

    useEffect(() => {
        checkProfilePicture()
    }, [user])

    const [profilepicture, setProfilepicture] = useState('../profilePictures/default.jpg')
    const [firstname, setFirstname] = useState(user.firstname)
    const [lastname, setLastname] = useState(user.lastname)
    const [location, setLocation] = useState(user.location)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isChanging, setIsChanging] = useState(false)

    // --------------------------------------------------------------------------------------------------------------

    const [countries, setCountry] = useState([])

    const getCountries = async () => {

        const fetchCountries = await fetch('https://restcountries.com/v3.1/all')
        const getCountries = await fetchCountries.json()
        if (getCountries) {
            setCountry(getCountries)
        } else {
            setCountry(null)
        }
    }

    useEffect(() => {
        getCountries();
    }, [])

    // --------------------------------------------------------------------------------------------------------------

    const [isProfileSaving, setIsProfileSaving] = useState(false)

    // const saveProfile = async () => {
    //     if (!firstname || !lastname || !location) {
    //         warnToast("Fields can't be empty. Please try again later.")
    //         return
    //     }

    //     if (firstname === user.firstname && lastname === user.lastname && location === user.location) {
    //         warnToast("No change was made")
    //         return
    //     }

    //     setIsLoading(true)

    //     try {
    //         const save = await fetch(`${api}/saveProfile`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 email: user.email,
    //                 firstname: firstname,
    //                 lastname: lastname,
    //                 location: location,
    //             })
    //         })

    //         const response = await save.json()

    //         if (response.message === 'error executing query' || response.message === 'failed') {
    //             setIsLoading(false)
    //             errorToast("An error occured. Please try again later")
    //             return
    //         }

    //         setIsLoading(false)
    //         localStorage.setItem("admin", JSON.stringify(response.info[0]))
    //         setUser(response.info[0])
    //         successToast("Profile saved successfully")
    //         return

    //     }
    //     catch (error) {
    //         setIsLoading(false)
    //         console.log('error saving profile', error)
    //         errorToast("An error occured. Please try again later")
    //         return
    //     }
    // }

    // const saveProfilePicture = async (picture) => {

    //     if (!picture) {
    //         console.log('empty')
    //         return
    //     }

    //     setIsProfileSaving(true)

    //     const formData = new FormData()
    //     formData.append('image', picture)

    //     try {
    //         const save = await fetch(`${api}/uploadProfile`, {
    //             method: 'POST',
    //             body: formData
    //         })

    //         if (save.ok) {
    //             try {
    //                 const saveFileName = await fetch(`${api}/saveFileName/${user.email}`)
    //                 const response = await saveFileName.json()

    //                 if (response.message === 'error executing query') {
    //                     setIsProfileSaving(false)
    //                     errorToast("An error occured while saving profile picture. Please try again later")
    //                     return
    //                 }
    //                 if (response.message === 'failed') {
    //                     setIsProfileSaving(false)
    //                     errorToast("Can't change profile picture now. Please try again later")
    //                     return
    //                 }

    //                 setIsProfileSaving(false)
    //                 localStorage.setItem("admin", JSON.stringify(response.info[0]))
    //                 setUser(response.info[0])
    //                 successToast("Profile Picture changed successfully.")
    //                 return

    //             }
    //             catch (error) {
    //                 setIsProfileSaving(false)
    //                 console.log('error saving filename to database', error)
    //                 errorToast("An error occured while saving profile picture. Please try again later")
    //                 return
    //             }
    //         }
    //     }
    //     catch (error) {
    //         setIsProfileSaving(false)
    //         console.log('error saving profile picture', error)
    //         errorToast("An error occured while saving profile picture. Please try again later")
    //         return
    //     }
    // }

    // const handleProfilePicture = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         const selectedPicture = e.target.files[0]

    //         const reader = new FileReader()

    //         reader.onload = function (e) {
    //             setProfilepicture(e.target.result)
    //         }

    //         reader.readAsDataURL(selectedPicture)
    //         saveProfilePicture(selectedPicture)
    //     } else {
    //         warnToast("No picture selected")
    //         return
    //     }
    // }

    // // --------------------------------------------------------------------------------------------------------------

    // function passwordCheck(str) {
    //     // Regular expression to match uppercase letter, number, and special character
    //     const regex = /(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]/;
    //     return regex.test(str);
    // }


    // const changePassword = async () => {
    //     if (!currentPassword || !newPassword || !confirmPassword) {
    //         warnToast("Fields can't be empty. Please check and try again")
    //         return
    //     }

    //     if (newPassword !== confirmPassword) {
    //         warnToast("Passwords don't match")
    //         return
    //     }

    //     if (!passwordCheck(newPassword) || newPassword.length < 8) {
    //         warnToast("Password requirements not met. Please check and try again later")
    //         return
    //     }

    //     setIsChanging(true)

    //     try {
    //         const changePass = await fetch(`${api}/changePassword`, {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 email: user.email,
    //                 currentPassword: currentPassword,
    //                 password: newPassword,
    //             })
    //         })
    //         const response = await changePass.json()

    //         if (response.message === 'error executing query' || response.message === 'failed') {
    //             setIsChanging(false)
    //             errorToast("An error occured. Please try again later")
    //             return
    //         }

    //         if (response.message === 'incorrect password') {
    //             setIsChanging(false)
    //             errorToast("Password incorrect")
    //             return
    //         }

    //         setIsChanging(false)
    //         successToast("Password changed successfully")
    //         return
    //     }
    //     catch (error) {
    //         console.log('error changing password', error)
    //         errorToast("An error occured. Please try again later")
    //         return
    //     }

    // }

    // --------------------------------------------------------------------------------------------------------------

    return (
        <section className='settings'>

            <div className='row-01'>
                <TitleComponentH1
                    title={'Settings'}
                />
            </div>

            <div className='row-02'>

                <div>
                    <div className='tab theme'>
                        <TitleComponentH3 title={'Edit Profile'} />
                        <div style={{ height: 20 }}></div>
                        <label className='title'>Avatar</label>
                        <div className='profile-picture'>
                            <div className='profile-picture-container'>
                                {isProfileSaving ? <div className='loading-container'><Loading /></div> : ''}
                                <img src={profilepicture} />
                            </div>
                            <div className='upload-info'>
                                <label htmlFor='upload-dp' className='upload-button'>Upload Image</label>
                                <input type='file' onChange={e => handleProfilePicture(e)} accept=".png, .jpg, .jpeg" hidden id='upload-dp' />
                                <span>
                                    At least 500x500 px is recommended.<br />
                                    JPG or PNG is allowed. Your picture is saved
                                    automatcally after selecting one.
                                </span>
                            </div>
                        </div>
                        {/* <hr></hr> */}
                        <label className='title'>First Name</label>
                        <InputComponent
                            icon={'fal fa-user'}
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            placeholder={'Your first name'}
                        />
                        <label className='title'>Last Name</label>
                        <InputComponent
                            icon={'fal fa-user'}
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            placeholder={'Your last name'}
                        />
                        <label className='title'>Location</label>
                        <SelectComponent
                            icon={'fal fa-location-dot'}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            options={
                                <>
                                    <option defaultValue={''} hidden>Select Location</option>
                                    {
                                        countries.map((country, index) => {
                                            countries.sort((a, b) => a.name.common.localeCompare(b.name.common))
                                            return (
                                                <option key={index}>
                                                    {country.name.common}
                                                </option>
                                            )
                                        })
                                    }
                                </>
                            }
                        />
                        <SaveButtonComponent
                            bgColor={'#39b54a'}
                            color={'#fff'}
                            title={'Save Changes'}
                            isLoading={isLoading}
                            onclick={() => saveProfile()}
                        />
                    </div>
                </div>

                <div>
                    <div className='tab theme'>
                        <TitleComponentH3 title={'Password'} />
                        <div style={{ height: 20 }}></div>

                        <label className='title'>Current Passsword</label>
                        <PasswordComponent
                            icon={'fal fa-key'}
                            password={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            placeholder={'Your current password'}
                        />

                        <label className='title'>New Passsword</label>
                        <PasswordComponent
                            icon={'fal fa-lock'}
                            password={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            placeholder={'New password'}
                        />

                        <label className='title'>Re-enter Passsword</label>
                        <PasswordComponent
                            icon={'fal fa-lock'}
                            password={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            placeholder={'Repeat new password'}
                        />

                        <label className='checkbox text-theme'>
                            <input type='checkbox' id='show-password' onChange={() => { setShowPassword(!showPassword) }} />
                            Show Password?
                        </label>

                        <span className='extra-info text-theme'>
                            * Minimum 8 characters <br />
                            * At least one uppercase character <br />
                            * At least one number <br />
                            * At least one special-case character <br />
                        </span>

                        <SaveButtonComponent
                            title={'Change Password'}
                            bgColor={'#39b54a'}
                            color={"#fff"}
                            isLoading={isChanging}
                            onclick={() => changePassword()}
                        />
                    </div>
                </div>

                <div>
                    <div className='tab theme'>
                        <TitleComponentH3
                            title={'Appearance | Theme'}
                        />
                        <div style={{ height: 20 }}></div>
                        <div className='theme-showcase'>
                            <div className='showcase light active' onClick={() => setTheme('light')}>
                                <img src={lightMode} />
                                <span className='text-theme'>Light</span>
                            </div>
                            <div className='showcase dark' onClick={() => setTheme('dark')}>
                                <img src={darkMode} />
                                <span className='text-theme'>Dark</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
