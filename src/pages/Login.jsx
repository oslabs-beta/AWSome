function Login() {
  return (
    <div>
      <div className='header'></div>
      <div className='page-wrapper'>
        <div className='page-container-left'></div>
        <div className='page-container-2'>
          <div className='block'>
            <div className='form-wrapper'>
              <h2 className='mainHeading'>Welcome back!</h2>
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
              <div className='formbox'>
                <form>
                  <label htmlFor='email'>Email: </label>
                  <input type='text' id='email'></input>
                  <label htmlFor='password' id='password'></label>
                  <input type='text' id='password'></input>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
