import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from '../pools/userPool.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  //handles the login process for users, using AWS Cognito
  const handlesLogin = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(
      authenticationDetails,
      {
        onSuccess: (data) => {
          console.log('Login Successful:', data);
          setSuccess(true);
        },
      },
      {
        onFailure: (err) => {
          console.error('Login not successful', err);
          setError(err.message || 'Something did not go right');
        },
      }
    );
  };

  //on form submission, this function runs
  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   userPool.Login(email, password, [], null, (err, data) => {
  //     err ? console.error(err) : console.log(data);
  //   });
  // };

  //this function allows user to go to signup page
  const signUp = () => {
    fetch('/signup')
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
    <><div className='flex w-full h-screen'>
      <div className='page-wrapper w-full flex items-center justify-center items-center'>
        <div className='page-container-2'>
          <div className='block'>
            <div className='form-wrapper bg-white px-10 py-20 rounded-3xl'>
              <h2 className='mainHeading text-5xl font-semibold'>Welcome back!</h2>
              <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter your details.</p>
              <div className='general-desc'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
                dolorum. Dignissimos amet in quidem id est consequuntur, natus
                aliquam possimus maiores dolorum eum odio earum tenetur facilis
                necessitatibus magni similique!
              </div>
              <div className='socials-login'>
                <a
                  href='https://accounts.google.com/o/oauth2/auth?response_type=code&amp;access_type=online&amp;client_id=1046768301397-9u42bnvab0vmvdf5f6lnf6p821vfh57m.apps.googleusercontent.com&amp;redirect_uri=https%3A%2F%2Fdash.saleskip.com%2Fp%2F&amp;state&amp;scope=email%20profile&amp;approval_prompt=auto'
                  className='social-login w-inline-block'
                >
                  <img src='images/G.png' alt='' className='image'></img>
                  <div className='div-block-64'>
                    <div className='text-block-9'>Google</div>
                  </div>
                </a>
                <a
                  href='https://accounts.google.com/o/oauth2/auth?response_type=code&amp;access_type=online&amp;client_id=1046768301397-9u42bnvab0vmvdf5f6lnf6p821vfh57m.apps.googleusercontent.com&amp;redirect_uri=https%3A%2F%2Fdash.saleskip.com%2Fp%2F&amp;state&amp;scope=email%20profile&amp;approval_prompt=auto'
                  className='social-login w-inline-block'
                >
                  <img src='images/G.png' alt='' className='image'></img>
                  <div className='div-block-64'>
                    <div className='text-block-9'>Facebook</div>
                  </div>
                </a>
              </div>

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
                  <label>Password: </label>
                  <input
                    type='password'
                    className='w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder='Enter your password'
                  ></input>
                  <button type='submit'>Login</button>
                  <input type='checkbox' id='savePassword'></input>
                  <label htmlFor='savePassword'>Remember for 30 days</label>
                  <br></br>
                </form>
                <div>
                  <button>Forgot Password</button>
                </div>
              </div>

              <p>
                Forgot Password? <a href='/forgot'>Click here</a>
              </p>
              <button
                onClick={() => {
                  signUp();
                } }
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200'>
      <div className='relative w-60 h-60 bg-gradient-to-tr from-violet-900 to-pink-500 rounded-full animate-spin'></div>
      <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'></div>
    </div></>
    
  );
}

export default Login;
