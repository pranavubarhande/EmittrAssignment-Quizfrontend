const API_BASE_URL = 'http://192.168.94.56:3333';

export const client = async (url, method, body) => {
    const complete_url = `${API_BASE_URL}/${url}`;

    try {
      const response = await fetch(complete_url, {
        method,
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error('Failed to sign in');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

export default client;
