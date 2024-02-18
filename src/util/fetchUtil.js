//common fetch utility function that can be used by all services
// const API_BASE_URL = 'http://localhost:3333';
const API_BASE_URL = 'http://ec2-3-109-212-81.ap-south-1.compute.amazonaws.com:3333';

export const client = async (url, method, body) => {
    const complete_url = `${API_BASE_URL}/${url}`;

    try {
      const authToken = localStorage.getItem('user_token');
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
