import axios from 'axios';

const API = 'http://127.0.0.1:4000'

export const registerRequest = user => axios.get(`${API}/auth/google`, user)

export const loginRequest = axios.get(`${API}/auth/google`)