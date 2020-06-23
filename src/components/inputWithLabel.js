import React, {useState} from 'react';


/*
* The search component doesn't manage the state anymore but only passes up the event to te App component after text is entered in input field */
const InputWithLabel = ({id, label, value, onInputChange, type = 'text'}) => (

    <>
        <label htmlFor={id}>{label} </label>
        &nbsp;
        <input
            id={id}
            type={type}
            value={value}
            onChange={onInputChange}
        />
    </>
);

export default InputWithLabel;