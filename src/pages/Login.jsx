import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from '../pools/userPool.js';
import { useAuth } from './context/AuthContext.jsx';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUserSession } = useAuth();
  const navigate = useNavigate();

  //handles the login process for users, using AWS Cognito
  const handlesLogin = (event) => {
    //prevents default action of form from taking place when submitting
    event.preventDefault();

    //sets email to be lowercase (case insensitive)
    let lowerCaseEmail = email;
    lowerCaseEmail = lowerCaseEmail.toLocaleLowerCase();

    //creates a new CognitoUser object, containing the username and the pool it will access
    const user = new CognitoUser({
      Username: lowerCaseEmail,
      Pool: userPool,
    });

    //Creates a new AuthenticationDetails object containing the username and password information
    const authenticationDetails = new AuthenticationDetails({
      Username: lowerCaseEmail,
      Password: password,
    });

    //using the user object, we pass in the authentication to see if this user's password matches
    user.authenticateUser(authenticationDetails, {
      //on success, we want to print the success and print it to console
      onSuccess: (data) => {
        console.log('Login Successful:', data);
        setUserSession({ user, session: data });
        navigate('/Home'); //immediately navigates to Home page,
      },
      //upon failure, we instead console the error message, reason why
      onFailure: (err) => {
        console.error('Login not successful', err);
        setError(err.message || 'Something did not go right');
      },
    });
  };

  //Can potentially revamp this function to instead not make a request to server but use the
  //navigate hook from React to simply navigate to signup page upon clicking the button
  //this function allows user to go to signup page
  const signUp = () => {
    //this function will call the signup endpoint
    navigate('/signup');
    // fetch('/signup')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data); //just testing, CAN BE DELETED
    //     const { redirectTo } = data;
    //     //this will be used if the login is incorrect, the user will be
    //     //redirected to Signup
    //     if (redirectTo) {
    //       navigate(redirectTo);
    //     }
    //   });
  };

  return (
    <>
      <div className='flex w-full h-screen'>
        <div className='page-wrapper w-full flex items-center justify-center items-center'>
          <div className='page-container-2'>
            <div className='block'>
              <div className='form-wrapper bg-white px-10 py-20 rounded-3xl'>
                <h2 className='mainHeading text-5xl font-semibold'>
                  Welcome back!
                </h2>
                <p className='font-medium text-lg text-gray-500 mt-4 animate-pulse'>
                  Welcome back! Please enter your details.
                </p>

                <div className='mt-8'>
                  <form onSubmit={handlesLogin}>
                    <label className='text-lg font-medium'>Email: </label>
                    <input
                      type='email'
                      className='w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder='Enter your email'
                    ></input>
                    <label className='text-lg font-medium'>Password: </label>
                    <input
                      type='password'
                      className='w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder='Enter your password'
                    ></input>
                    <div className='mt-8 flex justify-between items-center'>
                      <div>
                        <input type='checkbox' id='savePassword'></input>
                        <label
                          className='ml-2 font-medium text-base'
                          htmlFor='savePassword'
                        >
                          Remember for 30 days
                        </label>
                      </div>

                      <button
                        className='ml-2 font-medium text-violet-500 text-base'
                        href='/forgot'
                      >
                        Forgot Password
                      </button>
                    </div>
                    <div className='mt-8 flex flex-col gap-y-4'>
                      <button
                        className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'
                        type='submit'
                      >
                        Sign in
                      </button>
                      <button
                        className='flex rounded-xl py-3 border-2 border-gray-300 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all'
                        type='submit'
                      >
                        Sign in with Google
                      </button>
                    </div>
                  </form>

                  <div className='mt-8 flex justify-center items-center'>
                    <p className='font-medium text-base'>
                      Do not have an account?
                    </p>
                    <button
                      className='text-violet-500 font-medium ml-2'
                      onClick={() => {
                        signUp();
                      }}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
                <p>
                  Forgot Password? <a href='/forgot'>Click here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='relative w-full h-full lg:flex items-center justify-center bg-violet-100'>
          <div className='relative w-60 h-60 bg-gradient-to-tr from-violet-900 to-pink-500 rounded-full animate-spin'></div>
          <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'></div>
        </div>
      </div>
    </>
  );
}

export default Login;
