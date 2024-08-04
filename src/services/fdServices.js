import axios from 'axios';

const api = `${process.env.REACT_APP_API}/fd`;

export function makeFD(data) {
    return axios.post(api+'/issue',data);
}

export function withdrawFD(data){
    return axios.post(api+'/withdraw',data)
}

export function getFdOption(option){
    return axios.get(api+`/getFdOption/${option}`)
}

export function getFds(){
    return axios.get(api);
}
