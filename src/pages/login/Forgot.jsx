import { useState, useEffect } from 'react';
import {
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({
  region: 'us-east-1',
});

function Forgot() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [delivery, setDelivery] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [verificationComponent, setVerificationComponent] = useState(false);
  const [resetSucess, setResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
  const codeSubmission = async (event) => {
    //prevents full page refresh
    event.preventDefault();
    //If user types in two passwords that are not the same, this error message will display
    if (passwordOne !== passwordTwo) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    //
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
      console.error('Error:', error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='flex w-full h-screen'>
      {!verificationComponent ? (
        <div className='page-wrapper w-full flex items-center justify-center'>
          <div className='page-container-2'>
            <div className='block'>
              <div className='form-wrapper bg-white mt-12 py-20 rounded-3xl'>
                <h2 className='mainHeading mt-12 flex justify-center text-5xl text-violet-600 font-semibold'>
                  {' '}
                  Forgot password?
                </h2>
                <p className='font-medium flex justify-center text-lg text-violet-500 mt-7 mb-7 animate-pulse'>
                  Enter the email you used to signup below:
                </p>

                <div>
                  <form onSubmit={retrieveCode}>
                    <label className='text-lg font-medium'>Email: </label>
                    <input
                      type='email'
                      className='shadow-lg shadow-gray-300 w-full border-2 border-gray-300 rounded-xl p-4 mt-3 bg-transparent'
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder='Type Email'
                      required
                    ></input>
                    <div className='mt-8 flex flex-col gap-y-4'>
                      <button
                        className='shadow-md shadow-gray-400 mt-4 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'
                        type='submit'
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : !resetSucess ? (
        <div className='page-wrapper w-full flex items-center justify-center'>
          <div className='page-container-2'>
            <div className='block'>
              <div className='form-wrapper bg-white mt-12 py-20 rounded-3xl'>
                <h3 className='mainHeading mt-12 flex justify-center text-5xl text-violet-600 font-semibold'>
                  Your is code sent via {delivery}
                </h3>
                <p className='font-medium flex justify-center text-lg text-violet-500 mt-7 mb-7 animate-pulse'>
                  Enter the verification code you received below
                </p>
                <form onSubmit={codeSubmission}>
                  <label className='text-lg font-medium'>
                    Verification Code:{' '}
                  </label>
                  <input
                    type='text'
                    className='shadow-lg shadow-gray-300 w-full border-2 border-gray-300 rounded-xl p-4 mt-3 mb-4 bg-transparent'
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder='1234'
                    required
                  ></input>
                  <br></br>
                  <label className='text-lg font-medium'>New Password: </label>
                  <input
                    type='text'
                    className='shadow-lg shadow-gray-300 w-full border-2 border-gray-300 rounded-xl p-4 mt-3 mb-4 bg-transparent'
                    value={passwordOne}
                    onChange={(e) => setPasswordOne(e.target.value)}
                    placeholder=' Password must contain Uppercase, lowercase, number and symbol.'
                    required
                  ></input>
                  <label className='text-lg font-medium'>
                    Re-type new password
                  </label>
                  <input
                    type='text'
                    className='shadow-lg shadow-gray-300 w-full border-2 border-gray-300 rounded-xl p-4 mt-3 mb-4 bg-transparent'
                    value={passwordTwo}
                    onChange={(e) => setPasswordTwo(e.target.value)}
                    placeholder=' Password must contain Uppercase, lowercase, number and symbol.'
                    required
                  ></input>
                  {errorMessage && (
                    <p className='flex justify-center text-red-500 mt-2'>
                      {errorMessage}
                    </p>
                  )}
                  <div className='mt-6 flex flex-col gap-y-4'>
                    <button
                      className='shadow-md shadow-gray-400 mt-4 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'
                      type='submit'
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 className='mainHeading mt-12 flex justify-center text-5xl text-violet-600 font-semibold'>
            Password Reset Successful
          </h2>
          <p className='font-medium flex justify-center text-lg text-violet-500 mt-7 mb-7 animate-pulse'>
            Log in with your new password.
          </p>
          
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
