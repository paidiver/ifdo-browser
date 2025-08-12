export async function fetchApiData(url, setState: any = null, verb = 'GET', body = null) {
  // set path based on the environment
  // const path = process.env.NEXT_PUBLIC_API_PATH;
  const path = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8081/v1/';
  // const path = "/";
  console.log(body);
  try {
    console.log(`Fetching data from: ${path}${url}`);
    if (verb === 'POST') {
      const response = await fetch(`${path}${url}`, {
        method: verb,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (setState) {
        setState(data);
      }
      return data;
    } else if (verb === 'GET') {
      const response = await fetch(`${path}${url}`, {
        method: verb,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (setState) {
        setState(data);
      }
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
