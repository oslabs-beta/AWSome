import { useEffect, useState } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '../pools/userPool';

const Verify = ({ email }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');

  const handleVerification = () => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      err
        ? setMessage(`Verification failed: ${err.message}`)
        : setMessage(`Account verified successfully!`);
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
