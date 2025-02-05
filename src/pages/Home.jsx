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

  const testingMiddleware = () => {
    fetch('/protected', {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJraWQiOiI0Ym9xcFBHU2ZPVTFvS0RWRVlPS2RFYzBPcFhYXC82eEVnN0MxR0tLZitqcz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhNDc4YTQ2OC00MGMxLTcwNDAtZGZjOS01MTVkMzNiZWM5YTUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9wOUVIWHhPOTQiLCJjbGllbnRfaWQiOiIxYjUxNTV2MXQxNzZrM2FmY2o2bXM5NjRsOCIsIm9yaWdpbl9qdGkiOiIwNzA3YWZkNy02NWFiLTRiOTAtODQxOC0wNTUzZDIyOGI3NzUiLCJldmVudF9pZCI6IjIxNDFjMWMxLTczYmYtNGFkNS1iNTBiLTY1YzM4OWUxY2Q3NSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3Mzg3ODc2MDcsImV4cCI6MTczODc5NTE5MywiaWF0IjoxNzM4NzkxNTkzLCJqdGkiOiJkMmZlZTkwNC0wMGUyLTQ3MDAtOWQ3NS02NzE4NGVjMGExZTkiLCJ1c2VybmFtZSI6ImE0NzhhNDY4LTQwYzEtNzA0MC1kZmM5LTUxNWQzM2JlYzlhNSJ9.qCEVSrl1CsOLC-iLlnU06CzBtOo6cq1_khVFtHzsqw5O1opZaD9E5T-fsN_wTa9ZsBalUpkWCO6aFXsnK7yVnV4cCg2r000S9u031RjvMwkt1ju7IOUSqSbf4PxPVX6wfOXAxZcaAeXHKsfChe1pNNBkPBnyfMjWIjnI58UjQs6oHLfYFcQGI-jp4u9_i2XSKMexUaXW8N0i_HcHMCC4oR_egb9rmDcDasPcVljFWvKZW7on7MNsADE9XOkYV8Ro4kMI3mlCGYBRGtETcc8bf5B9UXH1yoWTMl-e_hGuV3JAC6S49B3pZCTESoPc-IGSNxtcBbK_wyD-lfBx1KWu4w',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log('Response:', data))
      .catch((error) => console.error('Error:', error));
  };

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
      <button onClick={testingMiddleware}>Testing</button>
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
