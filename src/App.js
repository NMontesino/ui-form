import { useState } from 'react'
import Form from './components/Form'
import './App.css'

const App = () =>
{

  const [formType, setFormType] = useState('signup')
  const setSignIn = (inputs) =>
  {
    setFormType('signin')
    console.log(inputs)
  }
  const setSignUp = (inputs) =>
  {
    setFormType('signup')
    console.log(inputs)
  }

  return (
    <div className="App">
      <Form type={ formType } signin={ setSignIn } signup={ setSignUp } />
    </div>
  )

}

export default App
