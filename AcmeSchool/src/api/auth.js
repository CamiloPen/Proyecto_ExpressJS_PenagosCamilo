import axios from 'axios';

const API = 'http://127.0.0.1:4000'

export const registerRequest = user => axios.put(`${API}/user`, user)

export function loginRequest() {window.location.href = `${API}/auth/google`}