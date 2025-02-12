import { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router';
import Verify from '../login/Verification.jsx';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //url data to redirect to when user wishes to sign up with Google
  const authUrl = `https://${import.meta.env.VITE_COGNITO_USER_POOL_ID.toLowerCase().replace(
    '_',
    ''
  )}.auth.us-east-1.amazoncognito.com/login?client_id=${
    import.meta.env.VITE_COGNITO_CLIENT_ID
  }&redirect_uri=http://localhost:5173&response_type=code`;

  //function to handle the signup process for our users
  const handleSignups = (event) => {
    //prevents default form loading upon submission
    event.preventDefault();

    //grabs pool data
    const poolData = {
      UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    };
    //makes a userPool instance using the data from above
    const userPool = new CognitoUserPool(poolData);

    //Becomes 'false' to begin
    setSuccess(false);

    //ensures email will be saved case insensitive
    let lowerCaseEmail = email;
    lowerCaseEmail = lowerCaseEmail.toLowerCase();

    //atttirbutes to send for signUP method
    const attributeList = [
      {
        Name: 'email',
        Value: lowerCaseEmail,
      },
    ];

    userPool.signUp(
      lowerCaseEmail,
      password,
      attributeList,
      null,
      (err, data) => {
        if (err) {
          //if the email, password or anything is off throw error
          console.error('Sign up failed:', err.message);
          setErrorMessage(`${err.message}`);
          return;
        }
        //otherwise console log success and show next steps
        console.log('Sign up with this was good:', data);
        setSuccess(true);
        setIsVerified(true);
      }
    );
  };

  //This allows user to go to login page
  const login = () => {
    console.log('testing');
    navigate('/');
  };

  return (
    <div>
      {!isVerified ? (
        <div className='header flex w-full h-screen'>
          <div className='page-wrapper w-full flex items-center justify-center mx-10'>
            <div className='page-container-2'>
              <div className='block'>
                <div className='form-wrapper bg-white px-10 py-20 rounded-3xl'>
                  <h2 className='mainHeading text-5xl semi-bold'>
                    Get Started with AWSome!
                  </h2>
                  <div className='font-medium text-lg text-violet-500 mt-4 animate-pulse'>
                    See all your metrics in one place with an AWSome monitoring
                    tool for your EC2 instances!
                  </div>

                  <div className='formbox mt-8 drop-shadow-xl shadow-blue-600'>
                    <form onSubmit={handleSignups}>
                      <label className='text-lg font-medium'>Email: </label>
                      <input
                        type='email'
                        className='w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent'
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrorMessage('');
                        }}
                        required
                        placeholder='Enter your email'
                      ></input>
                      
                      <label className=' text-lg font-medium'>Password:</label>
                      <input
                        type='password'
                        className='w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent'
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setErrorMessage('');
                        }}
                        required
                        placeholder='Enter your password'
                      ></input>
                      {!errorMessage ? (
                        <p className='mt-6 text-sm flex justify-center animate-pulse'>
                          Password must contain Uppercase, lowercase, number and
                          symbol.
                        </p>
                      ) : (
                        <p className='text-red-500'>{errorMessage}</p>
                      )}
                      <div className='mt-8 flex flex-col gap-y-4'>
                        <button
                          className='drop-shadow-xl shadow-blue-600 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'
                          type='submit'
                        >
                          Sign up
                        </button>
                      </div>
                    </form>
                    <div>
                      <a className='mt-8 flex flex-col gap-y-4' href={authUrl}>
                        <button className='border-2 border-violet-500 drop-shadow-xl shadow-blue-600 active:scale-[.98] active duration-75 hover:scale-[1.01] ease-in-out transition py-3 rounded-xl bg-transparent text-gray-700 text-lg font-bold'>
                          Sign up with Google
                        </button>
                      </a>
                      <p className='flex justify-center font-medium text-base ml-6 mt-5'>
                        Have an account?{' '}
                      <button
                        onClick={() => {
                          login();
                        }}
                        className='flex justify-center ml-5 text-violet-500 font-medium ml-2'
                      >
                        Login
                      </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex w-full h-screen relative lg:flex items-center justify-center bg-violet-100'>
            <div className='relative w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin'></div>
            <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'></div>
          </div>
        </div>
      ) : (
        <Verify email={email} />
      )}
    </div>
  );
}

export default Signup;
