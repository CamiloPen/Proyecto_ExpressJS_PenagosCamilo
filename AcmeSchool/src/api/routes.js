import axios from 'axios';
axios.defaults.withCredentials = true;

const API = 'http://localhost:4000'

export const registerRequest = user => axios.put(`${API}/user/register`, user)

export function loginRequest() {window.location.href = `${API}/auth/google`}

export const getTopics = () => axios.get(`${API}/topics`)

export const getCourses = () => axios.get(`${API}/courses`)

export const getSchedules = () => axios.get(`${API}/schedules`)

export const getTeachers = () => axios.get(`${API}/teachers`)

export const getStudents = () => axios.get(`${API}/students`)

export const addCourse = (course) => axios.post(`${API}/courses`, course)

export const addTopic = (topic) => axios.post(`${API}/topics`, topic)

export const addSchedule = (schedule) => axios.post(`${API}/schedules`, schedule)
