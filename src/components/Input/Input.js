import React from 'react';
import './Input.css';

export default function Input({ label, maxLength, icon, type}) {
    if(type === "textarea") {
        return
            (
            <div className='input-component'>
                <textarea className='input-component-input' maxLength={maxLength} placeholder={label} />
            </div>
        )
    }
    else if(type === "text") {
        return
            (
            <div className='input-component'>
                <input className='input-component-input' maxLength={maxLength} placeholder={label} />
            </div>
        )
    }
}