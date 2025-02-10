import { useState, useEffect } from 'react';
import {
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';

function Forgot() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [delivery, setDelivery] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [verificationComponent, setVerificationComponent] = useState(false);
  const [resetSucess, setResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //define a client using the proper region
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
      //sends the client the command in order to get code
      const response = await client.send(command);
      //the response we get back tells us how we received the code
      setDelivery(response.CodeDeliveryDetails.DeliveryMedium);

      console.log(response);
    } catch (error) {
      console.error('error:', error);
    }

    console.log('testing');
    //after we receive code, set this to true to conditionally render the next step
    setVerificationComponent(true);
  };

  //code is submitted to Cognito and verified for password reset
  const codeSubmission = async (event) => {
    //prevents full page refresh
    event.preventDefault();
    if (passwordOne !== passwordTwo) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setErrorMessage('');
    const input = {
      ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
      Password: passwordOne,
    };

    const command = new ConfirmForgotPasswordCommand(input);
    try {
      await client.send(command);
      setResetSuccess(true);
    } catch (error) {
      console.error('Error confirming password reset:', error);
      setErrorMessage('Failed to reset password. Please try again.');
    }
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
      ) : !resetSucess ? (
        <div>
          <h1>You received a code sent to via {delivery}</h1>
          <p>Enter the verification code you received below</p>
          <form onSubmit={codeSubmission}>
            <label>Verification Code: </label>
            <input
              type='text'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder='1234'
              required
            ></input>
            <br></br>
            <label>New Password: </label>
            <input
              type='text'
              value={passwordOne}
              onChange={(e) => setPasswordOne(e.target.value)}
              required
            ></input>
            <label>Re-type new password</label>
            <input
              type='text'
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
              required
            ></input>
            <button type='submit'>Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Password Reset Successful</h1>
          <p>Log in with your new password.</p>
        </div>
      )}
    </div>
  );
}

export default Forgot;
