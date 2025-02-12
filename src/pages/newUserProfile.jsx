import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './Home.css';

function NewUser() {
  const navigate = useNavigate();


  const { signOut } = useAuth();

  const logOut = async () => {
    signOut();
    navigate('/');
  };

  async function RandomID () {
    // let res = await fetch('/random');
    // console.log('promise: ', res);
    // let data = await res.json()
    // console.log('data: ', data)
    fetch('/random')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log('got nothing', err));
  }



  return (
    <div className='bg-gradient-to-br from-purple-900 to-indigo-800 text-white font-sans min-h-screen flex flex-col'>
      {/* Navbar */}
      <header className='bg-purple-800 text-white p-4 flex justify-between items-center shadow-md'>
        <h1 className='text-xl font-bold'>AWSome</h1>
        <nav className='flex items-center space-x-6'>
          <button
            className='over:underline cursor-pointer'
            onClick={() => navigate('/Home')}
          >
            Dashboard
          </button>
          <button
            className='hover:underline cursor-pointer'
            onClick={() => navigate('/newUserProfile')}
          >
            Account
          </button>
          <a href='#' className='hover:underline'>
            How to
          </a>
          <a onClick={logOut} className='hover:underline'>
            Logout
          </a>
          <button className='bg-pink-600 hover:bg-pink-700 text-sm py-1 px-4 rounded-lg'>
            Add Metrics
          </button>
        </nav>
      </header>

      {/* Page Content */}
      <main className='flex-grow flex flex-col items-center py-12'>
        <h2 className='text-3xl font-extrabold mb-8'>Welcome, New User!</h2>
        <p className='text-lg text-center max-w-lg'>
          Start setting up your AWS monitoring dashboard.
        </p>
        <div className='RandomID'>
        <button className='bg-pink-600 '
        onClick={RandomID}
        >Generate ExternalId </button>
        </div>
        <p>Enter your Role ARN</p>
        <input></input>
      </main>

      {/* Footer */}
      <footer className='bg-purple-800 text-center py-4'>
        <p className='text-sm'>
          &copy; 2025 AWSome Metrics. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default NewUser;
