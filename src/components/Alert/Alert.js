'use client'
import React from 'react'
import Image from 'next/image'
import sad from '../../../public/images/sad.png'
import okay from '../../../public/images/ok.png'
import './Alert.css'

/**
 * Renders an alert box component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the alert.
 * @param {string} props.message - The message of the alert.
 * @param {string} props.type - The type of the alert ('error').
 * @param {Function} props.hideAlertFunction - The function to hide the alert.
 * @returns {JSX.Element} The rendered alert box component.
 */
export default function Gifting ({title, message, type, hideAlertFunction}) {
    
    return (
        <div className='alert-box'>
            <div className='alert-box-image-container'>
               {
                     type === 'error' ? 
                     <Image src={sad} className='alert-box-image' alt='sad' /> : <Image className='alert-box-image' src={okay} alt='okay' />
               }
            </div>
            <div className='alert-box-content'>
                <h1>{title}</h1>
                <p>{message}</p>
                <button onClick={hideAlertFunction}>
                    Continue
                </button>
            </div>
        </div>
    )
}
