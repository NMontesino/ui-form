import { useState, useEffect } from 'react'
import InputField from './InputField'
import './Form.css'

const Form = () =>
{

    const [accountInfo, setAccountInfo] = useState({'name': '', 'email': '', 'password': '', 'confirm-password': ''})
    const [pw, setPW] = useState('')
    const [cpw, setCPW] = useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(true)

    const captureData = (type, data) =>
    {
        setAccountInfo({...accountInfo, [type]: data})
    }

    const inputs = Object.keys(accountInfo).map(key => <InputField type={ key } capture={ captureData } style={key.includes('password') ? passwordsMatch ? null : {border: '1px solid red', color: 'red'} : null} />)

    useEffect(() => 
    {
        ((pw === cpw) || (accountInfo['password'] === accountInfo['confirm-password'])) ? setPasswordsMatch(true) : setPasswordsMatch(false)
    }, [pw, cpw, accountInfo])

    useEffect(() =>
    {
        console.log(((pw === cpw) && pw !== '') ? accountInfo : null)
    }, [pw, cpw])

    const handleSubmit = (e) =>
    {

        e.preventDefault()

        setPW(accountInfo['password'])
        setCPW(accountInfo['confirm-password'])

    }

    return (
        <form onSubmit={ (e) => handleSubmit(e) }>
            <h1>Create Account</h1>
            <fieldset>
                { inputs }
            </fieldset>
            <p style={passwordsMatch ? {visibility: 'hidden'} : null}>Passwords do not match</p>
            <button>Create New Account</button>
        </form>
    )

}

export default Form