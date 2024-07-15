import axios from "axios";
import { toast } from "react-toastify";
import auth from './authService'


const api = `${process.env.REACT_APP_API}/user`;

export function getUser() {
    return axios.get(api);
}

export async function deleteUser(){
    await axios.delete(api);
    auth.logout();
    toast.success("User deleted")
    window.location='/';
}

export function changePin(data){
    return axios.put(api,data);
}



