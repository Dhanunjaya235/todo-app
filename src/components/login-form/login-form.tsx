import React, { FC, useEffect, useRef } from 'react';
import { successToast,errorToast } from '../../toasters/toasters';
import './login-form.css';
import { emailValidation ,passwordValidation} from '../../validations.tsx/form-validations';
import axios from 'axios';
import debounce from "lodash/debounce";
import {useNavigate} from 'react-router';
import { getUser } from '../axios-methods/database-operations';
interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
  let emailRef=useRef<HTMLSpanElement>(null);
  let passwordRef=useRef<HTMLSpanElement>(null);
  let passField=useRef<HTMLInputElement>(null);
  let navigate=useNavigate();
  let emailvalid=false,passvalid=false;
  let allUsers:any;
  useEffect(()=>{
      axios.get('http://localhost:3000/registeredUsers').then(resolve=>{
        allUsers=resolve.data;
      })
      .catch(error=>console.log(error))
  },[])

  const logIn=(e:any)=>{
      e.preventDefault();
      let isRegistered=false;
      console.log("Login");
      if(emailvalid && passvalid){
        console.log(getUser(e.target.email.value));
        for(let user of allUsers){
          if(user.Email===e.target.email.value){
            if(user.Password===e.target.password.value){
              successToast("Login Successfull");
              localStorage.setItem('username',user.Email);
              isRegistered=true;
              navigate(`/home/${user.Username}`,{replace:true})
            }
            else{
              errorToast("Invalid Password");
              isRegistered=true;
            }
          }
        }
        if(!isRegistered){
          errorToast("User is not Rgesitered Yet")
          navigate('/register')
        }
      }
  }
  const onEmailEntering = (e:any) => {
    console.log("Changed value:", e.target.value);
    let result=emailValidation(e.target.value);
    if(emailRef.current){
      emailRef.current.innerHTML=result;
    }
    if(result===""){
      emailvalid=true;
    }
  };

  const onEnteringPassword=(e:any)=>{
    console.log("Changed value:", e.target.value);
    let result=passwordValidation(e.target.value);
      if(passwordRef.current){
        passwordRef.current.innerHTML=result
      }
      if(result===""){
        passvalid=true
      }
  }
  const debouncedOnChange = debounce(onEmailEntering, 1000);
  const debouncedOnPasswordEntering=debounce(onEnteringPassword,1000);
    function togglePasswordVisibility() {
      const today = Date.now();
      console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today));
      if(passField.current){
        if(passField.current.type==="password"){
          passField.current.type="text";
        }
        else{
          passField.current.type="password"
        }
      }
    }
  return (
    <div className="login-form" data-testid="LoginForm">
   <div className="wrapper">
      <div className="title-text">
        <div className="title login">Login Form</div>
      </div>
        <div className="form-inner">
          <form onSubmit={logIn} className="login">
            <pre>
            </pre>
            <div className="field">
              <input type="text" placeholder="Email Address"  name='email' onChange={debouncedOnChange} required />
            </div>
            <span ref={emailRef}></span>
            <div className="field">
              <input type="password" placeholder="Password" ref={passField} name='password' onChange={debouncedOnPasswordEntering } required />
            </div>
            <input type="checkbox" onClick={togglePasswordVisibility}/>ShowPassword<br></br>
            <span ref={passwordRef}></span>
            <div className="pass-link"><a onClick={()=>navigate('/forgotPassword',{replace:true})}>Forgot password?</a></div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">Create an account <a onClick={()=>navigate('/register',{replace:true})}>Signup now</a></div>
          </form>
  </div>
  </div>
  </div>
  )
}

export default LoginForm;
