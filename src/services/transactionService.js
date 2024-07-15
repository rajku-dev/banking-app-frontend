import axios from "axios";


const api = `${process.env.REACT_APP_API}/transaction`;

export function deposit(data) {
    return axios.post(api+'/deposit',data);
}

export function withdraw(data){
    return axios.post(api+'/withdraw',data)
}

export function transfer(data){
    return axios.post(api+'/transfer',data);
}

export function transactions(){
    return axios.get(api);
}
