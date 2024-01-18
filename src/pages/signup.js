import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/authService';
import { isValidEmail } from '../regex';
const SignUp = () => {
  const navigate = useNavigate();
    const [request, setRequest] = useState({
        name: '',
        email:'',
        password:''
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRequest((prevRequest) => ({
          ...prevRequest,
          [name]: value
        }));
      };
      const handleClick = () => {
        if(!isValidEmail(request.email)){
          alert("enter valid email");
          return;
        }
        if (!request.email || !request.name || !request.password) {
          alert('Fill Complete Details!');
          return;
        }
        signUp(request).then(res => {
          alert("Sign Up Successful. Please Login!")
          navigate('/sign-in');
        })
      };

    return (
      <div style={{ display: 'flex',flexDirection:'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
      <h1 >Sign Up</h1>

      <div style={{ width: '400px', padding: '40px', border: '1px solid #ccc', borderRadius: '35px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            placeholder="Email"
            value={request.email}
            name={"email"}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '10px', marginBottom: '5px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="name"
            placeholder="Full Name"
            name={"name"}
            value={request.name}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '10px', marginBottom: '5px', boxSizing: 'border-box' }}
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
          onClick={handleClick}
          style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          SignUp
        </button>

        <button
          onClick={() => navigate('/sign-in')}
          style={{ backgroundColor: '#2196f3', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '5px' }}
        >
          Go to SignIn
        </button>
      </div>
    </div>
    )
  
}

export default SignUp;
