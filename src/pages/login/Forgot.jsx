import { text } from 'd3';
import { useState, useEffect } from 'react';

function Forgot() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [verificationComponent, setVerificationComponent] = useState(false);

  //form is submitted, code is sent to email
  const retrieveCode = (event) => {
    event.preventDefault();
    console.log('testing');
    setVerificationComponent(true);
  };

  //code is submitted to Cognito and verified for password reset
  const codeSubmission = (event) => {
    event.preventDefault();
    console.log('code:', code);
  };

  return (
    <div>
      {!verificationComponent ? (
        <div>
          <h1> Forgot password?</h1>
          <p>Enter the email you use to login below</p>
          <form onSubmit={retrieveCode}>
            <label>Email: </label>
            <input
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder='type email'
              required
            ></input>
            <button type='submit'>Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Enter the verification code you received below</h1>
          <form onSubmit={codeSubmission}>
            <label>Verification Code: </label>
            <input
              type='text'
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              placeholder='1234'
              required
            ></input>
            <button type='submit'>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Forgot;
