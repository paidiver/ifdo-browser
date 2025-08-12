export async function fetchApiData(
  url: string,
  setState: any = null,
  verb: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body: any = null
) {
  const path = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8081/v1/';
  const fullUrl = `${path}${url}`;

  try {
    console.log(`Fetching data from: ${fullUrl}`);

    const options: RequestInit = {
      method: verb,
      headers: {}
    };

    if (verb !== 'GET' && body !== null) {
      if (body instanceof FormData) {
        options.body = body;
      } else if (typeof body === 'object') {
        options.body = JSON.stringify(body);
        (options.headers as Record<string, string>)['Content-Type'] = 'application/json';
      } else {
        options.body = body;
      }
    }

    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (setState) {
      setState(data);
    }

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
