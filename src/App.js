import React, { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './pages/login'
import SignUp from './pages/signup' 
import Dashboard from './pages/Dashboard'
import { useNavigate } from 'react-router-dom';
import TakeTest from './pages/TakeTest'
import UserResponses from './pages/UserResponses'
function App() {
  const [user_token, setUsertoken] = useState(localStorage.getItem("user_token") || null);
 
  return (
    <div style={{width:'100%', height:'100vh'}}>
      <Router>
        <Routes>
          <Route exact path="/" element={user_token ? <Dashboard setUsertoken={setUsertoken} /> : <Login setUsertoken={setUsertoken} />} />
          <Route path="/sign-in" element={<Login setUsertoken={setUsertoken} />} />
          <Route path="/sign-up" element={<SignUp setUsertoken={setUsertoken} />} />
          <Route path="/take-test/:language" element={<TakeTest setUsertoken={setUsertoken} />} />
          <Route path="/user-responses/" element={<UserResponses setUsertoken={setUsertoken} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
