import './Home.css';

function Home() {
  function fetchdata() {
    fetch('/data')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log('got nothing', err));
  }

  return (
    <>
      <h1>This is the home pages</h1>
      <button
        onClick={() => {
          fetchdata();
        }}
      >
        data
      </button>
    </>
  );
}

export default Home;
