import React, { FC, useEffect, useRef, useState } from 'react';
import './forgot-password.css';
import axios from 'axios';
import {useNavigate} from 'react-router';
import { passwordValidation,confirmPassValidation,emailValidation } from '../../validations.tsx/form-validations';
interface ForgotPasswordProps {}
interface UserData {
  [key: string]: string;
}
const ForgotPassword: FC<ForgotPasswordProps> = () => {
  const userData:UserData={
    Username:'',
    Email:'',
    Gender:'',
    DateOfBirth:'',
    Country:'',
    CountryCode:'',
    Phone :'',
    Password:'',
    ConfirmPassword:''
  }
  let allUsers:any;
  const [isRegistered,setIsRegistered]=useState(false);
  let navigate=useNavigate();
  const [userTochange,setUserToChange]=useState(userData);
  const [userId,setUserId]=useState(0);
  const mailRef=useRef<HTMLInputElement>(null);
  let mailSpan=useRef<HTMLSpanElement>(null);
  let passwrodSpan=useRef<HTMLSpanElement>(null);
  let confirmRef=useRef<HTMLSpanElement>(null);
  let passField=useRef<HTMLInputElement>(null);
  useEffect(()=>{
      axios.get('http://localhost:3000/registeredUsers')
      .then(resolve=>{
        allUsers=resolve.data;
        console.log(allUsers)
      })
  },[])
  const checkRegistered=()=>{
    if(mailRef.current){
    for(let user of allUsers){
      console.log(user.Email===mailRef.current.value);
      if(user.Email===mailRef.current.value){
            setUserToChange(user);
            console.log(userTochange);
            setUserId(user.id)
            setIsRegistered(true);
            return;
      }
    }
    window.alert("There is not user with that mail")
  }
  }

  const isEmailValid=(mail:string)=>{
    let result=emailValidation(mail);
    if(mailSpan.current){
      mailSpan.current.innerHTML=result;
    }
  }

  const isPasswordValid=(password:string)=>{
    let result=passwordValidation(password);
    if(passwrodSpan.current){
      passwrodSpan.current.innerHTML=result;
    }
    if(result==""){
      userTochange.Password=password;
    }
  }
  const confirmPassword=(password:string)=>{
    if(passField.current){
      let result=confirmPassValidation(passField.current.value,password);
      if(confirmRef.current){
        confirmRef.current.innerHTML=result
      }
      if(result==""){
        userTochange.ConfirmPassword=password;
      }
    }
  }
  function togglePasswordVisibility() {

    if(passField.current){
      if(passField.current.type==="password"){
        passField.current.type="text";
      }
      else{
        passField.current.type="password"
      }
    }
  }
  const changePassword=()=>{
    if(passField.current && confirmRef.current){
      if(passField.current.innerHTML===confirmRef.current.innerHTML){
        delete userTochange['id'];
        console.log(userTochange);
        window.alert("Password Changed successfully");
          // axios.post('http://localhost:3000/registeredUsers?Email=',userTochange)
          // .then(resolve=>{console.log(resolve.data)})
          // .catch(error=>{console.log(error)})

          axios.put(`http://localhost:3000/registeredUsers/${userId}`,userTochange)
        .then(resolve=>{
          console.log(resolve.data)
        })
        .catch(error=>{
          console.log(error)
        })
        navigate('/',{replace:true});
      }
      else{
        window.alert("Please Provide valid Password")
      }
    }
  }
  return (
    <div className="forgot-password" data-testid="ForgotPassword">
        {
          !isRegistered && <div className='check'>
          <input type="text" placeholder='Enter Your Email' ref={mailRef} onChange={(e)=>isEmailValid(e.target.value)} /><br>
              </br>
              <span ref={mailSpan}></span>
              <button onClick={checkRegistered} > Click Here to check </button>
          </div>
        }

            {
              isRegistered &&

              <div className='check'>
                <input type="password" ref={passField} onChange={(e)=>isPasswordValid(e.target.value)} placeholder='Enter your password'/><br></br>
                <span ref={passwrodSpan}></span>
                <input type='checkbox' onClick={togglePasswordVisibility} />ShowPassword<br></br>
                <input type="password" placeholder='Confirm Password' onChange={(e)=>confirmPassword(e.target.value)}/>
                <span ref={confirmRef}></span>

                <button onClick={changePassword} >Click Here Change Password</button>
                </div>
            }
  </div>
  )
}

export default ForgotPassword;
