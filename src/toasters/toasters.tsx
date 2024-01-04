import {toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export function successToast(message:string){

    toast.success(message,{
        position:toast.POSITION.TOP_RIGHT,
        autoClose:500
        
    })
}

export function errorToast(message:string){

    toast.error(message,{
        position:toast.POSITION.TOP_RIGHT,
        autoClose:500
    })
}