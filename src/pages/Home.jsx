import './Home.css';
import { useNavigate } from 'react-router';

import BarChart from './components/Barchart.jsx';
import LineChart from './components/Linechart.jsx';
import LineChartPage from './components/LineChartPage.jsx';
import { useSelector, useDispatch } from 'react-redux'
import { addGraph } from '../state/graph-reducer.js';

function Home() {

const navigate = useNavigate()
  //SIMPLY TESTING MIDDLEWARE, To be implemented properly needs an api call to fetch current user's access token
  //then use that token and send it as part of the header with each request 
  const testingMiddleware = () => {
    fetch('/protected', {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJraWQiOiI0Ym9xcFBHU2ZPVTFvS0RWRVlPS2RFYzBPcFhYXC82eEVnN0MxR0tLZitqcz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhNDc4YTQ2OC00MGMxLTcwNDAtZGZjOS01MTVkMzNiZWM5YTUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9wOUVIWHhPOTQiLCJjbGllbnRfaWQiOiIxYjUxNTV2MXQxNzZrM2FmY2o2bXM5NjRsOCIsIm9yaWdpbl9qdGkiOiJkNGI2YjJmMS0yNjlhLTQ4YjctODAwZC1hNTUyOTEyZDZkNzYiLCJldmVudF9pZCI6IjkwYmRiNjU1LTNhOWYtNGU1ZS05YWNmLWY2MzA1YjAyMGM1YiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3Mzg3OTI2OTMsImV4cCI6MTczODg3NDgwOCwiaWF0IjoxNzM4ODcxMjA4LCJqdGkiOiI5OGZkZGE2Zi0zYWMxLTQwZmItYmE2Yi1iYTg0MWQxZjIxZDUiLCJ1c2VybmFtZSI6ImE0NzhhNDY4LTQwYzEtNzA0MC1kZmM5LTUxNWQzM2JlYzlhNSJ9.VN4dRDdhh_ISefP734u4yBV5TknNb48_deExZ9HXHBwQS3lZ1J0xvsn8T2CD13Xn1H3PHoSQEIaqAP2lwyfzRfYFFOJGd5bScOWQd2Hk043MWfMGt1K3mzMTmGqz6FXHnHw9QG-jjE3jPGTn6BUvQ49u0gPB_57PrZ6fWOFAiwPlUAvC5MLLzFun6FbguwetdGfEySFuM5mRGoHPGJsDs4aKrj9GCzO5fnUket23fTzwwB4djkCsqGL6v2Vcbw-bI-9YOlYV-TOHM-fLnJ2VyYJfHBokX3BI0MIP8vzt1op8CDFzYMIrvnrs_yqVH2tOZKW-nqQSBtYIWV2CsPyd0g',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log('Response:', data))
      .catch((error) => console.error('Error:', error));
  };

  // const graphs = useSelector(state => state);
  // const dispatch = useDispatch()


  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-800 text-white font-sans min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-purple-800 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">AWSome</h1>
        <nav className="flex items-center space-x-6">
          <a href="#" className="hover:underline">
            Dashboard
          </a>
          <a
            onClick={() => navigate("/newUserProfile")}
            className="hover:underline"
          >
            Account
          </a>
          <a href="#" className="hover:underline">
            Settings
          </a>
          <a href="#" className="hover:underline">
            Recommended
          </a>
          <button className="bg-pink-600 hover:bg-pink-700 text-sm py-1 px-4 rounded-lg"
          // onClick={() => dispatch(addGraph())}
          >
            Add Metrics
          </button>
        </nav>
      </header>

      {/*Connect to User's AWS Account Button */}
      <button className='bg-pink-600'>Connect!</button>


      {/* Metrics Section */}
      <main className='flex-grow flex flex-col items-center py-12'>
        <h2 className='text-3xl font-extrabold mb-8'>METRICS</h2>
        <div id='container' className='grid grid-cols-2 gap-6 w-full max-w-5xl px-6'>
          <div className='bg-purple-700 rounded-lg shadow-lg p-6 flex flex-col'>
            <h3 className='text-lg font-semibold mb-4'>Network Packets</h3>

            {/* <div className='h-60 bg-purple-600 rounded'></div> */}
          </div>
          <div className='bg-purple-700 rounded-lg shadow-lg p-6 flex flex-col'>
            <h3 className='text-lg font-semibold mb-4'>Network Traffic</h3>
            <LineChartPage className='h-60 fit  ' />
            {/* <div className='h-60 bg-purple-600 rounded'></div> */}
          </div>
          <div className="bg-purple-700 rounded-lg shadow-lg p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-4">CPU Usage</h3>
            <BarChart className="h-60 fit  " />
            {/* <div className='h-60 bg-purple-600 rounded fit'>
            </div> */}
          </div>
          <div className='bg-purple-700 rounded-lg shadow-lg p-6 flex flex-col'>
            <h3 className='text-lg font-semibold mb-4'>Write and Read Operation</h3>
            <LineChart className='h-60 fit  ' />
            {/* <div className='h-60 bg-purple-600 rounded'></div> */}
          </div>
          
        </div>
      </main>
      <button onClick={testingMiddleware}>Testing</button>
      {/* Footer */}
      <footer className="bg-purple-800 text-center py-4">
        <p className="text-sm">
          &copy; 2025 AWSome Metrics. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
