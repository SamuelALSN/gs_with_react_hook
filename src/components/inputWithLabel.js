import React, {useEffect, useState} from 'react';


/*
* The search component doesn't manage the state anymore but only passes up the event to te App component after text is entered in input field */
const InputWithLabel = ({id, value, onInputChange, type = 'text', children, isFocused}) => {

    // A : Creation of a ref with React's useRef hook | this ref object is a persistent value which stays intact over the lifetime of a React compoent. it comes with a property called current which in constrat to the ref object can be changed
    const inputRef = React.useRef()

    // C : opt into React's lifecycle with React's useEffect Hook , performing the focus on the input field when the component renders (or it dependencies change)
    useEffect(() => {
        if (isFocused && inputRef.current) {
            // D : and fourth since the ref is passed to the input field's ref attribute, its current property give acess to the element, Execute its focus programmatically as a side-effect, but only if isFocused is set and and the current property is existent
            inputRef.current.focus()
        }
    }, [isFocused])
    return (
        <>
            <label htmlFor={id}>{children} </label>
            &nbsp;
            {/* B  : The ref is passed to the input field JSX-reserved ref attribute and the element instance is assigned to the changeable current property */}
            <input
                ref={inputRef}

                id={id}
                type={type}
                value={value}
                autoFocus={isFocused}
                onChange={onInputChange}
            />
        </>
    )
};

export default InputWithLabel;
