import React, { useEffect, useState, useContext } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import "../css/writeCard.css"

import { errorToast, successToast, warnToast } from '../components/toastComponent';
import { TitleComponentH1 } from '../components/titleComponent'
import { LoadingBtnComponent } from '../components/loading';

import { api } from '../utils/api'
import { UserContext } from '../utils/userContext';

import { carecards } from '../lib/fakeCareCards';

export default function WriteCard() {

    const { user } = useContext(UserContext)

    const departments = ['Business Development', 'Client Rep', 'Commercial & Contracts', 'Design and Engineering', 'Finance & Accounts', 'HR & Admin', 'HSE', 'HSSEQ', 'IT', 'Logistics and Stores', 'Maintenance', 'Operations', 'Planning', 'Procurement', 'Projects', 'QAQC', 'Security', 'Workshop']

    const designations = ['ExCo Member', 'Manager', 'Head of Department', 'Supervisor', 'Graduate Trainee', 'National Service Personel', 'Visitor', 'Other']

    // -------------------------------------------------------------------------------------------

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

    // -------------------------------------------------------------------------------------------

    const [cardID, setCardID] = useState('')
    const [cardTitle, setCardTitle] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [department, setDepartment] = useState('')
    const [designation, setDesignation] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('')
    const [location, setLocation] = useState('')
    const [observationType, setObservationType] = useState(null)
    const [peopleActs, setPeopleActs] = useState(false)
    const [condition, setCondition] = useState(false)
    const [environmental, setEnvironmental] = useState(false)
    const [assetEquipment, setAssetEquipment] = useState(false)
    const [procedureSystem, setProcedureSystem] = useState(false)
    const [quality, setQuality] = useState(false)
    const [security, setSecurity] = useState(false)
    const [description, setDescription] = useState(null)
    const [actions, setActions] = useState(null)
    const [suggestion, setSuggestion] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // -------------------------------------------------------------------------------------------

    useEffect(() => {
        const generateRandomNumber = () => {
            const min = 1000000;
            const max = 9999999;
            const randomNumber = `CC-${Math.floor(Math.random() * (max - min + 1)) + min}`;

            setCardID(randomNumber)
        }

        generateRandomNumber()
    }, [])

    const clearFields = () => {
        setCardID('')
        setCardTitle('')
        setFirstname('')
        setEmail('')
        setLastname('')
        setDepartment('')
        setDesignation('')
        setSelectedCountry('')
        setLocation('')
        setObservationType(null)
        setPeopleActs(false)
        setCondition(false)
        setEnvironmental(false)
        setAssetEquipment(false)
        setProcedureSystem(false)
        setQuality(false)
        setSecurity(false)
        setDescription(null)
        setActions(null)
        setSuggestion(null)
        setIsSubmitting(false)
    }

    const submitCard = async () => {
        // Validate mandatory fields
        if (!firstname || !lastname || !department || !designation || !selectedCountry || !location || !observationType || !description) {
          warnToast("Please fill out all mandatory fields.");
          return;
        }
        if (!peopleActs && !condition && !environmental && !assetEquipment && !procedureSystem && !quality && !security) {
          warnToast("Please select at minimum, one (1) observation.");
          return;
        }
      
        setIsSubmitting(true);
      
        try {
          // Create new card object
          const newCard = {
            cardID: cardID || `CC-${Date.now()}`, // Generate a unique ID if none is provided
            cardTitle: cardTitle,
            observerFirstname: firstname,
            observerLastname: lastname,
            observerEmail: user.email,
            observerDepartment: department,
            observerDesignation: designation,
            observerCountry: selectedCountry,
            observerLocation: location,
            observationType: observationType,
            peopleActs: peopleActs ? 1 : 0,
            condition: condition ? 1 : 0,
            environmental: environmental ? 1 : 0,
            assetsEquipment: assetEquipment ? 1 : 0,
            procedureSystem: procedureSystem ? 1 : 0,
            quality: quality ? 1 : 0,
            security: security ? 1 : 0,
            description: description,
            actionsTaken: actions,
            suggestion: suggestion,
            status: "Pending", // Default status
            riskLevel: "Low", // Default risk level (can be adjusted as needed)
            dateAdded: new Date().toISOString(), // Add current date and time
          };
      
          // Add the new card to the dataset
          carecards.push(newCard);
      
          setIsSubmitting(false);
          successToast("Card submitted successfully");
          clearFields(); // Clear the form fields after submission
          return;
        } catch (error) {
          setIsSubmitting(false);
          console.log("Error submitting card:", error);
          errorToast("An error occurred. Please try again later.");
          return;
        }
      };
      

    // -------------------------------------------------------------------------------------------

    return (
        <section className='write'>
            <div className='row-01'>
                <TitleComponentH1
                    title={'Write Care Card'}
                />
            </div>

            <div className='row-02'>
                <div className='section'>
                    <h3 className='subtitle'>Title</h3>

                    <div className='field'>
                        <span className='description'>This is an optional feature that allows you to
                            name the care card for it to be easily recognized later on</span>
                        <input type='text' name='card-title' id='card-title' placeholder='Card Title...' value={cardTitle} onChange={e => setCardTitle(e.target.value)} />
                    </div>
                </div>

                <div className='section'>
                    <h3 className='subtitle'>*Part A - General</h3>

                    <div className='multi-field'>
                        <div className='field'>
                            <label>First Name</label>
                            <input type='text' name='observer-lastname' id='observer-firstname' placeholder="Observer's First Name..." value={firstname} onChange={e => setFirstname(e.target.value)} />
                        </div>
                        <div className='field'>
                            <label>Last Name</label>
                            <input type='text' name='observer-firstname' id='observer-lastname' placeholder="Observer's Last Name..." value={lastname} onChange={e => setLastname(e.target.value)} />
                        </div>
                    </div>

                    <div className='multi-field'>
                        <div className='field'>
                            <label>Department</label>
                            <select value={department} onChange={e => setDepartment(e.target.value)}>
                                <option hidden defaultValue={''}>Select a department</option>
                                {departments.map(department =>
                                    <option key={department} value={department}>{department}</option>
                                )}
                            </select>
                        </div>
                        <div className='field'>
                            <label>Designation</label>
                            <select value={designation} onChange={e => setDesignation(e.target.value)}>
                                <option hidden defaultValue={''}>Select a designation</option>
                                {designations.map(designation =>
                                    <option key={designation} value={designation}>{designation}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className='multi-field'>
                        <div className='field'>
                            <label>Observer's Location</label>
                            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                                <option hidden defaultValue={''}>Select a Country</option>
                                {
                                    countries.map((country, index) => {
                                        countries.sort((a, b) => a.name.common.localeCompare(b.name.common))
                                        return (
                                            <option key={index} value={country.name.common}>
                                                {country.name.common}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='field'>
                            <label>Location</label>
                            <input type='text' name='location' id='location' value={location} onChange={e => setLocation(e.target.value)} placeholder='Location...' />
                        </div>
                    </div>
                </div>

                <div className='section'>
                    <h3 className='subtitle'>*Part B - Type of Observation</h3>
                    <div className='check-box-container'>
                        <div className='check-box' onClick={() => { setObservationType('Positive') }}>
                            <i className={observationType === 'Positive' ? 'fas fa-check-circle' : 'far fa-circle'}></i>
                            <p>Positive</p>
                        </div>
                        <div className='check-box' onClick={() => { setObservationType('Substandard Hazard') }}>
                            <i className={observationType === 'Substandard Hazard' ? 'fas fa-check-circle' : 'far fa-circle'}></i>
                            <p>Substandard Hazard</p>
                        </div>
                        <div className='check-box' onClick={() => { setObservationType('Improvement') }}>
                            <i className={observationType === 'Improvement' ? 'fas fa-check-circle' : 'far fa-circle'}></i>
                            <p>Improvement</p>
                        </div>
                    </div>
                </div>

                <div className='section'>
                    <h3 className='subtitle'>*Part C - Observation</h3>
                    <div className='check-box-container'>
                        <div className='check-box' onClick={() => { setPeopleActs(!peopleActs) }}>
                            <i className={peopleActs ? 'fas fa-check-circle' : 'far fa-circle'}></i>
                            <p>People | Acts</p>
                        </div>
                        <div className='check-box' onClick={() => { setCondition(!condition) }}>
                            <i className={condition ? 'fas fa-check-circle' : 'far fa-circle'}></i>
                            <p>Condition</p>
                        </div>
                        <div className='check-box' onClick={() => { setEnvironmental(!environmental) }}>
                            <i className={environmental ? 'fas fa-check-circle' : 'far fa-circle'}></i>
                            <p>Environmental</p>
                        </div>
                        <div className='check-box' onClick={() => { setAssetEquipment(!assetEquipment) }}>
                            <i className={assetEquipment ? 'fas fa-check-circle' : 'far fa-circle'}></i>
                            <p>Asset | Equipment</p>
                        </div>
                        <div className='check-box' onClick={() => { setProcedureSystem(!procedureSystem) }}>
                            <i className={procedureSystem ? 'fas fa-check-circle' : 'far fa-circle'}></i>
                            <p>Procedure | System</p>
                        </div>
                        <div className='check-box' onClick={() => { setQuality(!quality) }}>
                            <i className={quality ? 'fas fa-check-circle' : 'far fa-circle'}></i>
                            <p>Quality</p>
                        </div>
                        <div className='check-box' onClick={() => { setSecurity(!security) }}>
                            <i className={security ? 'fas fa-check-circle' : 'far fa-circle'}></i>
                            <p>Security</p>
                        </div>
                    </div>
                </div>

                <div className='section'>
                    <h3 className='subtitle'>*Part D - Description of Observation</h3>
                    <SimpleMDE
                        value={description}
                        onChange={e => setDescription(e)}
                        placeholder='Describe the observation...'
                        className='text-areas'
                    />
                </div>

                <div className='section'>
                    <h3 className='subtitle'>Part E - Actions and Suggestions</h3>
                    <div className='check-box-container'>
                        <div className='check-box' onClick={() => { setActions('Yes') }}>
                            <i className={actions === 'Yes' ? 'fas fa-check-circle' : 'far fa-circle'}></i>
                            <p>Yes</p>
                        </div>
                        <div className='check-box' onClick={() => { setActions('No') }} style={{ marginBottom: 20 }}>
                            <i className={actions === 'No' ? 'fas fa-check-circle' : 'far fa-circle'}></i>
                            <p>No</p>
                        </div>
                    </div>
                    <SimpleMDE
                        value={suggestion}
                        onChange={e => setSuggestion(e)}
                        placeholder='Corrective action or suggestion...'
                        className='text-areas'
                    />
                </div>

                <button className='submit' onClick={() => submitCard()}>
                    {isSubmitting ?
                        <LoadingBtnComponent /> :
                        'Submit'
                    }
                </button>

            </div>
        </section>
    )
}
