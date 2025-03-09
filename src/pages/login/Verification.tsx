import { useEffect, useState } from 'react';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router';

//types for the props
interface VerifyProps {
  email: string;
}

interface PoolData {
  UserPoolId: string;
  ClientId: string;
}

const Verify: React.FC<VerifyProps> = ({ email }): JSX.Element => {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  //handles checking if user enters appropriate code after signup
  const handleVerification = (): void => {
    //grabs pool data, ensures our poolID stays safe, along with ClientId
    const poolData: PoolData = {
      UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    };

    //creates a userPool out of the data provided above
    const userPool = new CognitoUserPool(poolData);

    //creates a CognitoUser instance, which we can run operations on
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    //uses confirmRegistration method to ensure the verification code is true
    //DEPRECATED CAN BE UPDATED TO new AWS SDK
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
