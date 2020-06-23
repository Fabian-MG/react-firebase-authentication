import React, { useState } from 'react'


const DefaultLoginToggle = ({ onlyOneLeft, isEnabled, signInMethod, onLink, onUnlink}) => {
    const initialState = {
      passwordOne: '',
      passwordTwo: '',
    }
    const [userCredentials, setUserCredentials] = useState(initialState)
    const { passwordOne, passwordTwo } = userCredentials
    
    const handleSubmit = (e) => {
      e.preventDefault()
  
      onLink(passwordOne);
      setUserCredentials(initialState)
    }
  
    const handleChange = (e) => {
      const { name, value } = e.target
  
      setUserCredentials({...userCredentials, [name]: value})
    }
  
    const isInvalid = passwordOne !== passwordTwo || passwordOne === ''
  
    return isEnabled ? (
      <button
        type="button"
        onClick={() => onUnlink(signInMethod.id)}
        disabled={onlyOneLeft}
      >
        Deactivate {signInMethod.id}
      </button>
    ) : (
      <form onSubmit={handleSubmit}>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={handleChange}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={handleChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Link {signInMethod.id}
        </button>
      </form>
    );
  };
  
export default DefaultLoginToggle