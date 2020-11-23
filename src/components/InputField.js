import { useState, useEffect } from 'react'
import './InputField.css'

const InputField = (props) =>
{

    const type = props.type.includes('confirm') ? props.type.slice(8) : props.type
    const label = props.type.split('-').map(word => (word[0].toUpperCase() + word.slice(1))).join(' ')

    const [inputValue, setInputValue] = useState('')
    useEffect(() => 
    {
        props.capture(props.type, inputValue)
    }, [inputValue])

    const handleChange = (e) =>
    {
        setInputValue(e.target.value)
    }

    return (
        <div className="field">
            <label style={{...props.style, border: 'none'}} htmlFor={ `account-${ props.type }` }>
                { label }
            </label>
            <input 
                onChange={ (e) => { handleChange(e) } } 
                id={ `account-${ props.type }` } 
                type={ type } 
                value={ inputValue } 
                name={ `account-${ props.type }` } 
                style={ props.style }
            />
        </div>
    )

}

export default InputField