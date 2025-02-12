import { useNavigate } from 'react-router';
import BarChart from './components/Barchart.jsx';
import LineChart from './components/Linechart.jsx';
import { useSelector } from 'react-redux';
import DropDownMenu from './components/menu.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { useEffect } from 'react';

const Home = () => {
  const { signOut, userSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userSession) navigate('/');
  }, [userSession, navigate]);

  const logOut = () => {
    signOut();
  };

  //ASK JASON ABOUT THIS
  //SIMPLY TESTING MIDDLEWARE, To be implemented properly needs an api call to fetch current user's access token
  //then use that token and send it as part of the header with each request
  // const testingMiddleware = () => {
  //   fetch('/protected', {
  //     method: 'GET',
  //     headers: {
  //       Authorization:
  //         'Bearer ',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log('Response:', data))
  //     .catch((error) => console.error('Error:', error));
  // };

  const graphs = useSelector((state) => state.graphs);
  const newgraph = [];

  for (let i = 0; i < graphs.graph.length; i++) {
    if (graphs.graph[i] === 'bar') {
      let bar = (
        <div
          key={i}
          className='bg-purple-700 rounded-lg shadow-lg p-6 flex flex-col'
        >
          <h3 className='text-lg font-semibold mb-4'>{graphs.metric[i]}</h3>
          <BarChart className='h-60 fit  ' />
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
          <LineChart className='h-60 fit  ' />
        </div>
      );

      newgraph.push(line);
    }
  }

  return (
    <div className='bg-gradient-to-br from-purple-900 to-indigo-800 text-white font-sans min-h-screen flex flex-col'>
      <header className='bg-purple-800 text-white p-4 flex justify-between items-center shadow-md'>
        <h1 className='text-xl font-bold'>AWSome</h1>
        <nav className='flex items-center space-x-6'>
          <a href='#' className='hover:underline'>
            Dashboard
          </a>
          <button
            onClick={() => navigate('/newUserProfile')}
            className='hover:underline cursor-pointer'
          >
            Account
          </button>

          <button onClick={logOut} className='hover:underline'>
            Logout
          </button>
          <div>
            <DropDownMenu />
          </div>
        </nav>
      </header>

      {/*Connect to User's AWS Account Button */}
      <button className='bg-pink-600'>Connect!</button>

      {/* Metrics Section */}
      <main className='flex-grow flex flex-col items-center py-12'>
        <h2 className='text-3xl font-extrabold mb-8'>METRICS</h2>
        <div
          id='container'
          className='grid grid-cols-2 gap-6 w-full max-w-5xl px-6'
        >
          {newgraph}
        </div>
      </main>

      {/* Footer */}
      <footer className='bg-purple-800 text-center py-4'>
        <p className='text-sm'>
          &copy; 2025 AWSome Metrics. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
