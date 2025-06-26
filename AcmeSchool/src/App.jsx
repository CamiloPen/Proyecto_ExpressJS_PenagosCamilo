import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RoleSelector from './context/RoleSelector.jsx';
import { RegisterPage, Home, Courses, Teachers, Students, Topics, Schedules } from './pages/index.js'
import Navbar from './components/navbar';
import Protected from './context/protectedRoute';
import Profile from './pages/profile.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
            <Route path='/register' element={<RegisterPage />} />

          <Route element={<Protected/>}>
            <Route path='/roles' element={<RoleSelector />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/teachers' element={<Teachers />} />
            <Route path='/topics' element={<Topics />} />
            <Route path='/students' element={<Students />} />
            <Route path='/schedules' element={<Schedules />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App