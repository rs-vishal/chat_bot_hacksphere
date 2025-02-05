import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Widget from './components/Widget';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import { AuthProvider } from './context/context';
function App() {
  return (
    <AuthProvider>
    <Router>
      {/* <nav>
        <Link to="/">Home</Link> 
      </nav> */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />

        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Widget/>}/>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
