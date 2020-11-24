import { useState, useEffect } from 'react'
import InputField from './InputField'
import './Form.css'

const Form = (props) =>
{

    const [accountInfo, setAccountInfo] = useState({'name': '', 'email': '', 'password': '', 'confirm-password': ''})
    const [pw, setPW] = useState('')
    const [cpw, setCPW] = useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(true)

    const captureData = (type, data) =>
    {
        setAccountInfo({...accountInfo, [type]: data})
    }

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

        props.type === 'signup'
        ?
            setPW(accountInfo['password']) &&
            setCPW(accountInfo['confirm-password'])
        :
            console.log(accountInfo)

    }

    const handleToggle = async () =>
    {
        await props.type === 'signup' ? props.signin() : props.signup()
        props.type === 'signup' ? setAccountInfo({'email': '', 'password': ''}) : setAccountInfo({'name': '', 'email': '', 'password': '', 'confirm-password': ''})
    }

    return (
        <form onSubmit={ (e) => handleSubmit(e) }>
            <h1>{props.type === 'signup' ? 'Create Account' : 'Sign In'}</h1>
            <fieldset>
                { Object.keys(accountInfo).map(key => <InputField type={ key } capture={ captureData } style={(key.includes('password') && props.type === 'signup') ? passwordsMatch ? null : {border: '1px solid red', color: 'red'} : null} />) }
            </fieldset>
            <p style={passwordsMatch ? {visibility: 'hidden'} : null}>
                { props.type === 'signup' ? <span>Passwords do not match</span> : <span></span> }
                <span onClick={ handleToggle } className="toggle-form-type">{ props.type === 'signup' ? 'Log In' : 'Sign Up' }</span>
            </p>
            <button>{ props.type === 'signup' ? 'Create New Account' : 'Sign In'}</button>
        </form>
    )

}

export default Form