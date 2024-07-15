import {jwtDecode} from "jwt-decode";
import axios from "axios";
import http from './httpService'

const api = `${process.env.REACT_APP_API}/auth`;

const tokenKey='token'
http.setJwt(getJwt());

async function register(user) {
  const response = await axios.post(api + "/register",  user );
  loginWithJwt(response.headers['x-auth-token'])
}

async function login(user) {
  console.log(user)
  const { data: jwt } = await axios.post(api + "/login", user);
  console.log(jwt)
  loginWithJwt(jwt);
}

function loginWithJwt(jwt) {
  console.log(jwt)
  localStorage.setItem(tokenKey, jwt);
  http.setJwt(jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
  http.setJwt(null);
  window.location='/'
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  register,
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
