import { useState } from "react";


export function usernameValidation(name: string) {

    let usernameReg = /^[a-zA-Z]+$/;

    if (!usernameReg.test(name)) {
        return "Enter valid User Name"
    }
    return ""
}

export function emailValidation(mail: string) {
    let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|co\.in|net|edu|gov|mil|[a-zA-Z]{2,})$/;

    if (!emailReg.test(mail)) {
        return "Enter valid email"
    }
    return ""
}

export function passwordValidation(password: string) {

    let passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (!passwordReg.test(password)) {
        return "Password must contain a letter,number and special character and minimum of 8 length"
    }

    return ""
}

export function dobValidation(dob: string) {
    let today = new Date();
    let date = new Date(dob);
    console.log(today);
    console.log(date);
    if (date > today) {
        return "You can't choose future dates"
    }

    return ""
}

export function confirmPassValidation(password: string, conpass: string) {

    if (password === conpass) {
        return ""
    }
    return "Both Passwords not matching"
}

export function mobileNumberValidation(countryCode: string, number: string) {
    let pattern;
    switch (countryCode) {
        case '+91':
            pattern = /^[6-9]\d{9}$/;
            break;
        case '+1':
            pattern = /^\d{10}$/;
            break;
        case '+61':
            pattern = /^04\d{8}$/;
            break;
        case '+7':
            pattern=/^[3489]\d{6}$/
            break;
    }

    if(!pattern?.test(number)){
        return "Enter valid Number"
    }
    return ""
}