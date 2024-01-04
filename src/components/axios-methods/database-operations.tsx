import axios from 'axios'


export function getUser(email:string){
    let user:boolean;
    let data:any;
    axios.get(` http://localhost:3000/registeredUsers/?Email=${email}`)
    .then(resolve=>{
        console.log(resolve.data[0]);
        if(resolve.data[0]){
            console.log(resolve.data[0]);
            return false;
        }
        else{
            return true
        }
    })
    .catch(error=>{
        console.log(error)
    })
}