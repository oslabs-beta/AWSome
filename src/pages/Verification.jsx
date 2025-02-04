import { useEffect, useState } from 'react';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

import { useNavigate } from 'react-router';

const Verify = ({ email }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  //handles checking if user enters appropriate code after signup
  const handleVerification = () => {
    //grabs pool data
    const poolData = {
      UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    };
    //ensures our poolID stays safe, along with ClientId
    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        setMessage(`Verification failed: ${err.message}`);
      } else {
        setMessage(`Account verified successfully!`);
        navigate('/');
      }
    });
  };

  return (
    <div>
      <h3>Verify your account</h3>
      <p>Enter the verification code sent to your email</p>
      <input
        type='text'
        placeholder='Verification Code: 123456'
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      ></input>
      <button onClick={handleVerification}>Verify</button>
      <p>{message}</p>
    </div>
  );
};

export default Verify;
