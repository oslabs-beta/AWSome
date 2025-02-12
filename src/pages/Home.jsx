import './Home.css';
import { useNavigate } from 'react-router';
import BarChart from './components/Barchart.jsx';
import LineChart from './components/Linechart.jsx';
import { useDispatch, useSelector } from 'react-redux';
import DropDownMenu from './menu.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { useState, useRef, useEffect } from 'react';
import { getData } from '../state/graph-reducer.js';
import { AWSdata } from '../../backend/fetch.js';

const Home = () => {
  const { signOut, userSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userSession) navigate('/');
  }, [userSession, navigate]);

  const logOut = () => {
    signOut();
  };

  const graphs = useSelector((state) => state.graphs);
  console.log(graphs);
  const dispatch = useDispatch();
  const newgraph = [];

  for (let i = 0; i < graphs.graph.length; i++) {
    if (graphs.graph[i] === 'bar') {
      let bar = (
        <div
          key={i}
          className='bg-purple-700 rounded-lg shadow-lg p-6 flex flex-col'
        >
          <h3 className='text-lg font-semibold mb-4'>{graphs.metric[i]}</h3>
          <BarChart table={graphs.data[i] || 1} className='h-60 fit  ' />
        </div>
      );
      newgraph.push(bar);
    } else if (graphs.graph[i] === 'areaLine') {
      let line = (
        <div
          key={i}
          className='bg-purple-700 rounded-lg shadow-lg p-6 flex flex-col'
        >
          <h3 className='text-lg font-semibold mb-4'>{graphs.metric[i]}</h3>
          <LineChart table={graphs.data[i] || 1} className='h-60 fit  ' />
        </div>
      );

      newgraph.push(line);
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='bg-gradient-to-br from-indigo-50 to-indigo-100 text-gray-800 font-sans min-h-screen flex flex-col overflow-hidden'>
      {/* Navbar */}
      <header className='h-full absolute max-w-[15rem] shadow-xl bg-gradient-to-br from-purple-900 to-indigo-800'>
        <h1 className='text-2xl font-semibold text-white p-4'>AWSome</h1>

        <div
          className='w-full text-left py-2 px-4 text-white rounded-md mt-6 hover:bg-[#000000] cursor-pointer transition-all duration-200 ease-in-out'
          onClick={() => navigate('/newUserProfile')}
        >
          Account
        </div>
        <button
          className='block w-full text-white bg-[#BE1F5D] text-left py-2 px-4 hover:bg-[#000000] rounded-md transition duration-150 ease-in-out'
          onClick={() => navigate('/Home')}
          onMouseEnter={handleMouseEnter}
        >
          Dashboard
        </button>

        <a
          onClick={logOut}
          className='block w-full text-white text-left py-2 px-4 hover:bg-[#000000] rounded-md transition duration-150 ease-in-out'
        >
          Logout
        </a>

        {/* {isOpen && (
          <nav
            ref={dropdownRef}
            className="absolute mt-4 w-48 bg-white shadow-xl rounded-lg space-y-2 p-2"
          >
            {/* <button className="w-full bg-pink-600 hover:bg-pink-700 text-sm py-2 px-4 rounded-lg mt-2 transition duration-150 ease-in-out"> */}
        {/* <DropDownMenu />
            {newgraph} */}
        {/* </button> */}
        {/* </nav> */}
        {/* )}  */}
      </header>

      {/* <h2 className="text-3xl font-extrabold mb-8 text-center flex flex-col p-16"> */}

      {/* </h2> */}
      <main className='flex-grow flex flex-col items-center py-12'>
        {/*Connect to User's AWS Account Button */}
        <div className='mb-12 -mx-12'  >
          {' '}
          {/* <button
            className='bg-white-600 '
            onClick={async () => {
              let data = await AWSdata(graphs);
              dispatch(getData({ data }));
            }}
          >
            Get Metrics
          </button> */}
          <DropDownMenu />
        </div>

        <div
          id='container'
          className='grid grid-cols-1 sm:grid-cols-2  gap-6 w-full max-w-5xl px-6'
        >
          {newgraph}
        </div>
      </main>

      {/* Footer */}
      <footer className='text-center py-6'>
        <p className='text-sm bg-gradient-to-br from-purple-900 to-indigo-800 text-transparent bg-clip-text ml-20'>
          &copy; 2025 AWSome Metrics. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
