import axios from 'axios';
axios.defaults.withCredentials = true;

const API = 'http://localhost:4000'

export const registerRequest = user => axios.post(`${API}/user`, user)

export function loginRequest() {window.location.href = `${API}/auth/google`}