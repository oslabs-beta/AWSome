export async function AWSdata(graphs) {
  console.log('in fetch', graphs);

  try {
    let res = await fetch('http://localhost:81/data', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(graphs),
    });
    console.log('res: ', res);
    let data = await res.json();
    console.log('data in fetch.js: ', data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
