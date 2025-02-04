import { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router';
import Verify from './Verification.jsx';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSignups = (event) => {
    //prevents default form loading upon submission
    event.preventDefault();

    const poolData = {
      UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    };
    //ensures our poolID stays safe, along with ClientId
    const userPool = new CognitoUserPool(poolData);

    //defaults 'success' to false to begin
    setSuccess(false);

    //ensures email will be saved case insensitive
    let lowerCaseEmail = email;
    lowerCaseEmail = lowerCaseEmail.toLowerCase();

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
          console.error('Sign up failed:', err);
          return;
        }
        console.log('Sign up was successful:', data);
        setSuccess(true);
      }
    );

    setIsVerified(true);
  };

  //This allows user to go to login page
  const login = () => {
    console.log('testing');
    navigate('/');

    //CAN BE DELETED
    // fetch('/login')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     const { redirectTo } = data;
    //     //this will be used if the login is incorrect, the user will be
    //     //redirected to Signup
    //     if (redirectTo) {
    //       navigate(redirectTo);
    //     }
    //   });
  };

  return (
    <div>
      {!isVerified ? (
        <div className='header flex w-full h-screen'>
          <div className='page-wrapper w-full flex items-center justify-center items-center'>
            <div className='page-container-2'>
              <div className='block'>
                <div className='form-wrapper bg-white px-10 py-20 rounded-3xl'>
                  <h2 className='mainHeading text-5xl semi-bold'>
                    Get Started with AWSome!
                  </h2>
                  <div className='general-desc mt-8 font-medium text-lg text-gray-500'>
                    See all your metrics in one place with an AWSome monitoring
                    tool for your EC2 instances!
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
                      <label className=' text-lg font-medium'>
                        {' '}
                        Password:{' '}
                      </label>
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
                      <div className='mt-8 flex flex-col gap-y-4'>
                        <button
                          className='drop-shadow-xl shadow-blue-600 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'
                          type='submit'
                        >
                          Sign up
                        </button>
                       
                      </div>
                    </form>
                    <div >
                      <a href='https://us-east-1p9ehxxo94.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=1b5155v1t176k3afcj6ms964l8&response_type=token&scope=email+openid+profile&redirect_uri=https://d84l1y8p4kdic.cloudfront.net&identity_provider=Google'>
                      <button className='drop-shadow-xl shadow-blue-600 active:scale-[.98] active duration-75 hover:scale-[1.01] ease-in-out transition py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'>
                        Sign up with Google
                      </button>
                      
                      </a>

                    </div>
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
