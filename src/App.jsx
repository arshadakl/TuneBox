import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LoginAuth from './Auth/LoginAuth';
import LogoutAth from './Auth/LogoutAth';


function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<LoginAuth />} >
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<LogoutAth />} >
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App
