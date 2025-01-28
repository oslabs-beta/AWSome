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
        <div>
          <div className='header flex w-full h-screen'></div>
          <div className='page-wrapper w-full flex items-center justify-center items-center'>
            <div className='page-container-left'></div>
            <div className='page-container-2'>
              <div className='block'>
                <div className='form-wrapper bg-white px-10 py-20 rounded-3xl'>
                  <h2 className='mainHeading text-5xl semi-bold'>Get Started with AWSome!</h2>
                  <div className='general-desc'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Alias, dolorum. Dignissimos amet in quidem id est
                    consequuntur, natus aliquam possimus maiores dolorum eum
                    odio earum tenetur facilis necessitatibus magni similique!
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
                        
                      ></input>
                      <button type='submit'>Submit</button>
                      <input type='checkbox' id='savePassword'></input>
                      <label htmlFor='savePassword'>Remember for 30 days</label>
                      <br></br>
                    </form>
                    <div></div>
                  </div>
                  <p>
                    Forgot Password? <a href='/error'>Click here</a>
                  </p>
                  <p>Have an account? Login instead</p>
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
        </div>
      ) : (
        <Verify email={email} />
      )}
    </div>
  );
}

export default Signup;
