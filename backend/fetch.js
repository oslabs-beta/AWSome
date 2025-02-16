export async function AWSdata(graphs) {
  try {
    let res = await fetch('http://localhost:81/data', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(graphs),
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
  }

    let data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
