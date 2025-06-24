import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import {RegisterPage, Home, Courses, Teachers, Students, Topics, Schedules} from './pages/index.js'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/teachers' element={<Teachers />} />
          <Route path='/topics' element={<Topics />} />
          <Route path='/students' element={<Students />} />
          <Route path='/schedules' element={<Schedules />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App