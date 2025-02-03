import { useState, useEffect, useContext, createContext } from 'react';
import userPool from '../../pools/userPool';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //grabs current logged in user from the browser's local storage
    const currentUser = userPool.getCurrentUser();

    //if current user is active, do the following
    if (currentUser) {
      currentUser.getSession((err, session) => {
        if (err || !session.isValid()) {
          console.log('not logged in testing');
          setUserSession(null);
        } else {
          //save the current user and their session
          console.log('testing saving current user');
          setUserSession({ user: currentUser, session });
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
