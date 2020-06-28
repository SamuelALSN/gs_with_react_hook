import React, {useEffect} from 'react';
import styles from '../App.module.css'

type InputWithLabelProps = {
    id: string;
    value: string;
    type?: string; // ? say that this property is optionnal
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isFocused?: boolean;
    children: React.ReactNode;
}

const InputWithLabel = ({
                            id,
                            value,
                            onInputChange,
                            type = 'text',
                            children,
                            isFocused
                        }: InputWithLabelProps) => {

    // A : Creation of a ref with React's useRef hook | this ref object is a persistent value which stays intact over the lifetime of a React compoent. it comes with a property called current which in constrat to the ref object can be changed
    const inputRef = React.useRef<HTMLInputElement>(null!)

    // C : opt into React's lifecycle with React's useEffect Hook , performing the focus on the input field when the component renders (or it dependencies change)
    useEffect(() => {
        if (isFocused && inputRef.current) {
            // D : and fourth since the ref is passed to the input field's ref attribute, its current property give acess to the element, Execute its focus programmatically as a side-effect, but only if isFocused is set and and the current property is existent
            inputRef.current.focus() // we made the returned ref type safe and typed it as read-only because we only execute the focus method on it (read). // React takes over for us there setting the DOM element to the current property
        }
    }, [isFocused])
    return (
        <>
            <label htmlFor={id} className={styles.label}>
                {children}
            </label>
            &nbsp;
            {/* B  : The ref is passed to the input field JSX-reserved ref attribute and the element instance is assigned to the changeable current property */}
            <input
                ref={inputRef}

                id={id}
                type={type}
                value={value}
                // autoFocus={isFocused}
                onChange={onInputChange}
                className={styles.input}
            />
        </>
    )
};

export default InputWithLabel;