import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function Signup() {
  const navigate = useNavigate();

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
      <div className='header'></div>
      <div className='page-wrapper'>
        <div className='page-container-left'></div>
        <div className='page-container-2'>
          <div className='block'>
            <div className='form-wrapper'>
              <h2 className='mainHeading'>Get Started with AWSome!</h2>
              <div className='general-desc'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
                dolorum. Dignissimos amet in quidem id est consequuntur, natus
                aliquam possimus maiores dolorum eum odio earum tenetur facilis
                necessitatibus magni similique!
              </div>
              <div className='socials-login'>
                <h4>Sign up instead with Google or </h4>
                <a
                  href='https://accounts.google.com/o/oauth2/auth?response_type=code&amp;access_type=online&amp;client_id=1046768301397-9u42bnvab0vmvdf5f6lnf6p821vfh57m.apps.googleusercontent.com&amp;redirect_uri=https%3A%2F%2Fdash.saleskip.com%2Fp%2F&amp;state&amp;scope=email%20profile&amp;approval_prompt=auto'
                  className='social-login w-inline-block'
                >
                  <img src='images/G.png' alt='' className='image'></img>
                  <div className='div-block-64'>
                    <div className='text-block-9'>Google</div>
                  </div>
                </a>
              </div>
              <div className='formbox'>
                <form>
                  <label htmlFor='first-name'>First Name: </label>
                  <input type='text' id='first-name' required></input>
                  <label htmlFor='last-name'>Last Name: </label>
                  <input type='text' id='last-name' required></input>
                  <label htmlFor='email'>Email: </label>
                  <input type='email' id='email' required></input>
                  <label htmlFor='password'> Password: </label>
                  <input type='password' id='password' required></input>
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
  );
}

export default Signup;
