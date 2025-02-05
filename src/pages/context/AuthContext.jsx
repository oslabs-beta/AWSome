import { useState, useEffect, useContext, createContext } from 'react';
// import userPool from '../../pools/userPool';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

//allows for any children component to use this CONTEXT, small scale state management
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //grabbing the pool data
    const poolData = {
      UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    };
    //ensures our poolID stays safe, along with ClientId
    const userPool = new CognitoUserPool(poolData);

    //grabs current logged in user from the browser's local storage
    const currentUser = userPool.getCurrentUser();

    //if current user is active, do the following
    if (currentUser) {
      //grab userSession info
      currentUser.getSession((err, session) => {
        if (err || !session.isValid()) {
          console.log('not logged in testing');
          setUserSession(null);
        } else {
          //save the current user and their session
          console.log('testing saving current user');
          setUserSession({ user: currentUser, session });
          const accessToken = session.getAccessToken().getJwtToken();
          const idToken = session.getIdToken().getJwtToken();
          console.log('access token:', accessToken);
          console.log('id token:', idToken);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  //to be used to change User's status back to signout, should redirect user
  //to Login page
  const signOut = () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
    }
    setUserSession(null);
  };

  return (
    <AuthContext.Provider value={{ userSession, setUserSession, signOut }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

//alows us to use our auth context by creating a custom hook
export const useAuth = () => useContext(AuthContext);
