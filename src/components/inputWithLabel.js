import React, {useState} from 'react';


/*
* The search component doesn't manage the state anymore but only passes up the event to te App component after text is entered in input field */
const InputWithLabel = ({id, value, onInputChange, type = 'text', children}) => (

    <>
        <label htmlFor={id}>{children} </label>
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