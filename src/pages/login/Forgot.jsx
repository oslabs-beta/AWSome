import { useState, useEffect } from 'react';
import {
  CognitoIdentityProviderClient,
  ForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';

function Forgot() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [delivery, setDelivery] = useState('');
  const [verificationComponent, setVerificationComponent] = useState(false);

  const client = new CognitoIdentityProviderClient({
    region: 'us-east-1',
  });

  //form is submitted, code is sent to email
  const retrieveCode = async (event) => {
    event.preventDefault();

    //This is what will be sent to Cognito, so that user can get a verification code
    const input = {
      ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
      Username: email,
    };
    const command = new ForgotPasswordCommand(input);
    //sends the email
    try {
      const response = await client.send(command);
      setDelivery(response.CodeDeliveryDetails.DeliveryMedium);
      console.log(response);
    } catch (error) {
      console.error('error:', error);
    }

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
          <h1>You received a code sent to via {delivery}</h1>
          <p>Enter the verification code you received below</p>
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
