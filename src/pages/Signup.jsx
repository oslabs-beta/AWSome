import { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router';
import userPool from '../pools/userPool.js';
import Verify from './Verification.jsx';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSignups = (event) => {
    console.log('Email:', email);
    const test = email.trim();
    console.log(test);
    event.preventDefault();
    setSuccess(false);

    const attributeList = [
      {
        Name: 'email',
        Value: email,
      },
    ];

    userPool.signUp(email, password, attributeList, null, (err, data) => {
      if (err) {
        console.error('Sign up failed:', err);
        return;
      }
      console.log('Sign up was successful:', data);
      setSuccess(true);
    });

    setIsVerified(true);
  };

  //This allows user to go to login page
  const login = () => {
    fetch('/login')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const { redirectTo } = data;
        //this will be used if the login is incorrect, the user will be
        //redirected to Signup
        if (redirectTo) {
          navigate(redirectTo);
        }
      });
  };

  return (
    <div>
      {!isVerified ? (
        <div className='header flex w-full h-screen'>
          <div className='page-wrapper w-full flex items-center justify-center items-center'>
            <div className='page-container-2'>
              <div className='block'>
                <div className='form-wrapper bg-white px-10 py-20 rounded-3xl'>
                  <h2 className='mainHeading text-5xl semi-bold'>Get Started with AWSome!</h2>
                  <div className='general-desc mt-8 font-medium text-lg text-gray-500'>
                    See all your metrics in one place with an AWSome monitoring tool for your EC2 instances!
                  </div>
                  
                  <div className='formbox mt-8 drop-shadow-xl shadow-blue-600'>
                    <form onSubmit={handleSignups}>
                      <label className='text-lg font-medium'>Email: </label>
                      <input
                        type='email'
                        className='mt-3 mb-3 ml-4 w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Enter your email'
                      ></input>
                      <label className=' text-lg font-medium'> Password: </label>
                      <input
                        type='password'
                        className='mt-3 mb-3 ml-4 w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent'
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        required
                        placeholder='Enter your password'
                        
                      ></input>
                    </form>
                    <div></div>
                  </div>
                  <div className='mt-8 flex flex-col gap-y-4'>
                        <button className='drop-shadow-xl shadow-blue-600 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold' type='submit'>Sign up</button>
                        <button className='drop-shadow-xl shadow-blue-600 flex rounded-xl py-3 border-2 border-gray-200 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all'type='submit'>Sign up with Google</button>
                  </div>
                  <p>Have an account? </p>
                  <button
                    onClick={() => {
                      login();
                    }}
                  >
                    Login
                  </button>
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
