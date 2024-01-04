import  React, { Component, useContext } from  "react";
import {  Navigate } from  "react-router-dom";
import { ReactNode } from "react";
import useAuthenticationHook from "../custom-hook/authentication-Hook";
interface PrivateRouteProps{
        component: ReactNode,
}
const  PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
        let condition=useAuthenticationHook();
        let token=localStorage.getItem('username');
    return  condition && token  ? (<>{props.component}</>) : 
        (<Navigate  to="/"  />);
};
export  default  PrivateRoute;