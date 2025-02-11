import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './Home.css';
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";


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


  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Open dropdown on hover or click
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 text-gray-800 font-sans min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="h-full absolute max-w-[15rem] shadow-xl  bg-gradient-to-br from-purple-900 to-indigo-800  ">
          <h1 className="text-2xl font-semibold text-white p-4">AWSome</h1>

          {/* Dropdown Button */}
          <div
            className="w-full text-left py-2 px-4 bg-[#BE1F5D] text-white rounded-md mt-6 hover:bg-[#000000] cursor-pointer transition-all duration-200 ease-in-out"
            onMouseEnter={handleMouseEnter}
          >
            Account
          </div>
          <button
            className="block w-full text-white text-left py-2 px-4 hover:bg-[#000000] rounded-md transition duration-150 ease-in-out"
            onClick={() => navigate("/Home")}
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
            Settings
          </a>
          <a href='#' className='hover:underline'>
            Recommended
          </a>
          <a onClick={logOut} className='hover:underline'>
            Logout
          </a>
          <button className='bg-pink-600 hover:bg-pink-700 text-sm py-1 px-4 rounded-lg'>
            Add Metrics
          </button>
        </nav>
      </header>

          {/* Dropdown Menu */}
          {isOpen && (
            <nav
              ref={dropdownRef}
              className="absolute mt-4 w-48 bg-white shadow-xl rounded-lg space-y-2 p-2"
            >
              <a
                href="#"
                className="block py-2 px-4 hover:bg-indigo-100 rounded-md transition duration-150 ease-in-out"
              >
                Settings
              </a>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-indigo-100 rounded-md transition duration-150 ease-in-out"
              >
                Recommended
              </a>
              <button className="w-full bg-pink-600 hover:bg-pink-700 text-sm py-2 px-4 rounded-lg mt-2 transition duration-150 ease-in-out">
                Add Metrics
              </button>
            </nav>
          )}
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
        {/* Page Content */}
        <main className="flex flex-col items-center justify-center flex-grow py-12 space-y-6 px-4 md:px-12 ml-20">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
            Welcome, New User!
          </h2>
          <p className="text-lg text-center text-gray-600 max-w-lg mx-auto">
            Start setting up your AWS monitoring dashboard.
          </p>
          <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition duration-200 ease-in-out">
            Generate External Id
          </button>

          <input
            className="border-2 border-gray-300 p-3 rounded-md mt-4 w-full max-w-md"
            type="text"
            placeholder="Enter your Role ARN"
          />
        </main>

        {/* Footer */}
        <footer className=" text-center py-6">
          <p className="text-sm bg-gradient-to-br from-purple-900 to-indigo-800 text-transparent bg-clip-text ml-20">
            &copy; 2025 AWSome Metrics. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}

export default NewUser;
