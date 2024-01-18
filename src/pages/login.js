import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../services/authService'
import { useNavigate } from 'react-router-dom';
const Login = ({setUsertoken}) => {
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    email: '',
    password: ''
  })
  const handleInputChange = event => {
    const { name, value } = event.target
    setRequest(prevRequest => ({
      ...prevRequest,
      [name]: value
    }))
  }
  const handleSubmit = (event) => {
    if (!request.email || !request.password) {
      alert('Fill Complete Details!');
      return;
    }

    login(request)
      .then((res) => {
        localStorage.setItem('user_token', res.accessToken);
        localStorage.setItem('user', JSON.stringify(res.user));
        setUsertoken(res.accessToken)
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
    
  };
 

  return (
    <div style={{ display: 'flex',flexDirection:'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
      <h1 >SignIn</h1>

      <div style={{ width: '400px', padding: '40px', border: '1px solid #ccc', borderRadius: '35px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            placeholder="Email"
            value={request.email}
            name={"email"}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '10px', marginBottom: '5px', boxSizing: 'border-box'}}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            placeholder="Password"
            name={"password"}
            value={request.password}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '10px', marginBottom: '5px', boxSizing: 'border-box' }}
          />
        </div>

        <button
          onClick={handleSubmit}
          style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Submit
        </button>

        <button
          onClick={() => navigate('/sign-up')}
          style={{ backgroundColor: '#2196f3', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '5px' }}
        >
          Go to Signup
        </button>
      </div>
    </div>
  )
}

export default Login;