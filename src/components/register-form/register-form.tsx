import React, { FC, useEffect, useRef, useState } from 'react';
import './register-form.css';
import { usernameValidation,emailValidation,passwordValidation,dobValidation ,confirmPassValidation,
mobileNumberValidation} from '../../validations.tsx/form-validations';
import { successToast,errorToast } from '../../toasters/toasters';
import axios from 'axios';
import {useNavigate} from 'react-router';
interface RegisterFormProps { }
interface UserData {
  [key: string]: string;
}
const RegisterForm: FC<RegisterFormProps> = () => {

  const userData:UserData={
    Username:'',
    Email:'',
    Gender:'',
    DateOfBirth:'',
    Password:'',
    ConfirmPassword:'',
    Country:'',
    CountryCode:'',
    Phone :'',
    Agree:''
  }
  const [formData,setFormData]=useState(userData);
  useEffect(()=>{
    for(let values in formData){
      console.log(formData[values])
      if(formData[values]===""){
        setHideSubmit(false);
        return
      }
    }
    console.log("Use Effect");
    setHideSubmit(true);
  })
  const [hideSubmit,setHideSubmit]=useState(false);
  const formRef=useRef<HTMLFormElement>(null);
  const usernameSpan=useRef<HTMLSpanElement>(null);
  const buttonRef=useRef<HTMLInputElement>(null);
  const emailSpan=useRef<HTMLSpanElement>(null);
  const passwordSpan=useRef<HTMLSpanElement>(null);
  const confirmSpan=useRef<HTMLSpanElement>(null);
  const dobSpan=useRef<HTMLSpanElement>(null);
  const mobileSpan=useRef<HTMLSpanElement>(null);
  const countrySpan=useRef<HTMLSpanElement>(null);
  const codeSpan=useRef<HTMLSpanElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);
  const countryCodeRef=useRef<HTMLInputElement>(null);
  const passField=useRef<HTMLInputElement>(null);
  let navigate=useNavigate();
   async function formSubmission(e:any){
    e.preventDefault();
    userData.Gender=e.target.Gender.value;
    let user:any=await axios.get(`http://localhost:3000/registeredUsers/?Email=${userData.Email}`)
    .then(response=>{
     return response.data[0];
    })
    .catch(error=>console.log(error));

    console.log(user);
    if(user){
      errorToast("User with Email Already Exists");
      return;
    }
    else{
    axios.post(' http://localhost:3000/registeredUsers',userData)
      .then(resolve=>{
        successToast("Registered Successfully");
        navigate('/',{replace:true})
      })
      .catch(error=>{console.log(error)})
  }
}
  const isnamevalid=(name:string)=>{
    let result=usernameValidation(name);
    if(usernameSpan.current){
      usernameSpan.current.innerHTML=result;
    }
    if(result===""){
      userData.Username=name;
    }
    else if(result !==""){
      userData.Username="";
    }
    setFormData({...formData,Username:userData.Username});
  }
  const isEmailValid=(email:string)=>{
    let result=emailValidation(email);
    if(emailSpan.current){
      emailSpan.current.innerHTML=result;
    }
    if(result===""){
      userData.Email=email;
    }
    else if(result!==""){
      userData.Email="";
    }
    setFormData({...formData,Email:userData.Email});
  }
  const isDobValid=(dob:string)=>{
    let result=dobValidation(dob);
    if(dobSpan.current){
      dobSpan.current.innerHTML=result;
    }
    if(result===""){
      userData.DateOfBirth=dob;
    }
    else{
        userData.DateOfBirth=""
    }
    setFormData({...formData,DateOfBirth:userData.DateOfBirth})
  }
  const isPasswordValid=(password:string)=>{
    let result=passwordValidation(password);
    if(passwordSpan.current){
      passwordSpan.current.innerHTML=result;
    }
    if(result===""){
      userData.Password=password
    }
    else{
      userData.Password="";
    }
    setFormData({...formData,Password:userData.Password})
  }
  const isConfirmPassValid=(conPass:string)=>{
    let result:string;
    if(passField.current){
        result=confirmPassValidation(passField.current.value,conPass);
        if(confirmSpan.current){
          confirmSpan.current.innerHTML=result
        }
        if(result===""){
            userData.ConfirmPassword=conPass;
        }
        else{
          userData.ConfirmPassword=""
        }
        setFormData({...formData,ConfirmPassword:userData.ConfirmPassword})
    }
    
  }

  const setCountryCode=(country:string)=>{
    if(countryCodeRef.current){
      switch(country){
        case 'india':
          countryCodeRef.current.value='+91';
          break;
        case 'usa':
          countryCodeRef.current.value='+1';
          break;
        case 'australia':
          countryCodeRef.current.value='+61';
          break;
        case 'russia':
          countryCodeRef.current.value='+7';
          break;
        default:
          countryCodeRef.current.value='';
      }
      userData.CountryCode=countryCodeRef.current.value;
    }
    userData.Country=country;
    console.log(userData.Country);
    console.log(userData.CountryCode);
    setFormData({...formData,Country:country,CountryCode:userData.CountryCode});
  }
  const mobileNumberValid=(number:string)=>{
    if(countryCodeRef.current){
      if(countryCodeRef.current.value==='' && codeSpan.current){
        codeSpan.current.innerHTML="Select Country code from the country drop down";
            return;   
      }
      else{
        if(codeSpan.current){
          codeSpan.current.innerHTML="";
        }
      }
      let result=mobileNumberValidation(countryCodeRef.current.value,number);
      if(mobileSpan.current){
        mobileSpan.current.innerHTML=result;
      }
      if(result===""){
        userData.Phone=number;
      }
      else{
        userData.Phone="";
      }
      setFormData({...formData,Phone:userData.Phone})
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
  function genderChange(gender:string){
      console.log(gender)
      setFormData({...formData,Gender:gender});
  }
  function agreeTerms(){
    if(formData.Agree===""){
        setFormData({...formData,Agree:'Agrred'})
    }
    else{
      setFormData({...formData,Agree:''})
    }
  }
  return (
    <div className="register-form" data-testid="RegisterForm">
      <div className="wrapper">
        <div className="title-text">
          <div className="title login">SignUp Form</div>
        </div>
        <div className="form-inner">
          <form onSubmit={formSubmission} className="signup" >
            <div className="field">
              <input type="text" placeholder="Name" onChange={(e)=>isnamevalid(e.target.value)} required />
            </div>
            <span ref={usernameSpan}></span>
            <div className="field">
              <input type="text" placeholder="Email Address" onChange={(e)=>isEmailValid(e.target.value)} required />
            </div>
            <span ref={emailSpan}></span>
            <div className='field'>
              <input type='radio' name='Gender' value='Male' onClick={(e)=>{
                let v=(e.target as HTMLInputElement).value
                genderChange(v)
              }}   required /> Male
              <input type='radio' name='Gender' value='FeMale' 
              onClick={(e)=>{
                let v=(e.target as HTMLInputElement).value
                genderChange(v)
              }} required /> FeMale
            </div>
            
            <div className="field">
              <input type="text" placeholder="Enter your date of birth" max='18-03-2023' onChange={(e)=>isDobValid(e.target.value)} ref={dobRef} onFocus={() => { if (dobRef.current) { dobRef.current.type = 'date' } }} required />
            </div>
            <span ref={dobSpan}></span>
            <div className="field">
              <input type="password" placeholder="Password" ref={passField} onChange={(e)=>isPasswordValid(e.target.value)} required />
            </div>
            <input type="checkbox" onClick={togglePasswordVisibility}/>ShowPassword<br></br>
            <span ref={passwordSpan}></span>
            <div className="field">
              <input type="password" placeholder="Confirm password" onChange={(e)=>isConfirmPassValid(e.target.value)} required />
            </div>
           <span ref={confirmSpan}></span>
            <div className='field'>
              <select id="country" name="country" onChange={(e)=>setCountryCode(e.target.value)} required>
                <option value="">--Please choose your country--</option>
                <option value="usa">USA</option>
                <option value="india">India</option>
                <option value="australia">Australia</option>
                <option value="russia">Russia</option>
              </select>
            </div>
            <span ref={countrySpan}></span>
            <div className='mobile'>
              <input type='text' ref={countryCodeRef} placeholder='Country Code' required/>
              <input type='tel' placeholder='Enter your mobile number' onChange={(e)=>mobileNumberValid(e.target.value)} required/>
            </div>
            <span ref={codeSpan}></span>
            <span ref={mobileSpan}></span>

            <input type='checkbox' onClick={agreeTerms} value="Agreed" required />Agree To Terms and Conditions <br></br>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="reset" value="Reset" />
            </div>
            {
              hideSubmit && <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit"   value="Signup" />
            </div>
            }
            <div className="signup-link">Already have an account? <a onClick={()=>navigate('/',{replace:true})}>Login</a></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm;
