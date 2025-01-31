import './Home.css';
import BarChart from './components/Barchart';

function Home() {
  // function fetchdata() {
  //   fetch('/data')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => console.log('got nothing', err));
  // }

  return (
    <div className='bg-gradient-to-br from-purple-900 to-indigo-800 text-white font-sans min-h-screen flex flex-col'>
      {/* Navbar */}
      <header className='bg-purple-800 text-white p-4 flex justify-between items-center shadow-md'>
        <h1 className='text-xl font-bold'>AWSome</h1>
        <nav className='flex items-center space-x-6'>
          <a href='#' className='hover:underline'>
            Dashboard
          </a>
          <a href='#' className='hover:underline'>
            Account
          </a>
          <a href='#' className='hover:underline'>
            Settings
          </a>
          <a href='#' className='hover:underline'>
            Recommended
          </a>
          <button className='bg-pink-600 hover:bg-pink-700 text-sm py-1 px-4 rounded-lg'>
            Add Metrics
          </button>
        </nav>
      </header>

      {/* Metrics Section */}
      <main className='flex-grow flex flex-col items-center py-12'>
        <h2 className='text-3xl font-extrabold mb-8'>METRICS</h2>
        <div className='grid grid-cols-2 gap-6 w-full max-w-5xl px-6'>
          <div className='bg-purple-700 rounded-lg shadow-lg p-6 flex flex-col'>
            <h3 className='text-lg font-semibold mb-4'>Memory</h3>
            <div className='h-60 bg-purple-600 rounded'></div>
          </div>
          <div className='bg-purple-700 rounded-lg shadow-lg p-6 flex flex-col'>
            <h3 className='text-lg font-semibold mb-4'>Network Traffic</h3>
            <div className='h-60 bg-purple-600 rounded'></div>
          </div>
          <div className='bg-purple-700 rounded-lg shadow-lg p-6 flex flex-col'>
            <h3 className='text-lg font-semibold mb-4'>CPU Usage</h3>
            <BarChart className='h-60 fit  ' />
            {/* <div className='h-60 bg-purple-600 rounded fit'>
            </div> */}
          </div>
          <div className='bg-purple-700 rounded-lg shadow-lg p-6 flex flex-col'>
            <h3 className='text-lg font-semibold mb-4'>Important Data</h3>
            <div className='h-60 bg-purple-600 rounded'></div>
          </div>
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
}

export default Home;
