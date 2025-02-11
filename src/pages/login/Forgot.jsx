import { useState, useEffect } from 'react';
import {
  CognitoIdentityProviderClient,
  ForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({
  region: 'us-east-1',
});

function Forgot() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [delivery, setDelivery] = useState('');
  const [password, setPassword] = useState('');
  const [verificationComponent, setVerificationComponent] = useState(false);
  const [resetSucess, setResetSuccess] = useState(false);

  //define a client using the proper region

  //form is submitted, code is sent to email
  const retrieveCode = async (event) => {
    event.preventDefault();

    //sets email to lowercase first before sending it to Cognito
    const lowerCaseEmail = email.toLowerCase();

    //This is what will be sent to Cognito, so that user can get a verification code
    const input = {
      ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
      Username: lowerCaseEmail,
    };
    const command = new ForgotPasswordCommand(input);
    //sends the email
    try {
      //sends the client the command in order to get code
      const response = await client.send(command);
      //the response we get back tells us how we received the code
      setDelivery(response?.CodeDeliveryDetails?.DeliveryMedium || 'unknown');

      console.log(response);
    } catch (error) {
      console.error('error:', error);
    }
    //after we receive code, set this to true to conditionally render the next step
    setVerificationComponent(true);
  };

  //code is submitted to Cognito and verified for password reset
  const codeSubmission = (event) => {
    //prevents full page refresh
    event.preventDefault();

    console.log('code:', code);
  };

  return (
    <div className='flex w-full h-screen'>
      {!verificationComponent ? (
        <div className='page-wrapper w-full flex flex-row items-center justify-center items-center'>
          <h1 className='mainHeading text-5xl font-semibold'>
            {' '}
            Forgot password?
          </h1>
          <p className='font-medium text-lg text-gray-500 mt-4 animate-pulse'>
            Enter the email you use to login below
          </p>
          <form
            className='form-wrapper bg-white px-10 py-20 rounded-3xl'
            onSubmit={retrieveCode}
          >
            <label className='text-lg font-medium'>Email: </label>
            <input
              type='email'
              className='w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent'
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
            <label className='text-lg font-medium'>Verification Code: </label>
            <input
              type='text'
              className='w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder='1234'
              required
            ></input>
            <br></br>
            <label>New Password: </label>
            <input
              type='text'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button type='submit'>Submit</button>
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
          </form>
        </div>
      ) : (
        <div>
          <p>Testing</p>
        </div>
      )}
      <div className='flex relative w-full h-screen lg:flex items-center justify-center bg-violet-100'>
        <div className='relative w-60 h-60 bg-gradient-to-tr from-violet-900 to-pink-500 rounded-full animate-spin'></div>
        <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'></div>
      </div>
    </div>
  );
}

export default Forgot;
