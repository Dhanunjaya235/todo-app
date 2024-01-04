import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/login-form/login-form';
import RegisterForm from './components/register-form/register-form';
import {Routes,Route} from 'react-router-dom';
import useAuthenticationHook from './components/custom-hook/authentication-Hook';
import PrivateRoute from './components/routing-guard/protected-route';
import Home from './components/home/home';
import ForgotPassword from './components/forgot-password/forgot-password';
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginForm/>}></Route>
        <Route path='/register' element={<RegisterForm/>}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
        <Route path='/home/:name' element={<PrivateRoute component={<Home/>}></PrivateRoute>}></Route>
      </Routes>
    <ToastContainer/>
    </div>
  );
}

export default App;
