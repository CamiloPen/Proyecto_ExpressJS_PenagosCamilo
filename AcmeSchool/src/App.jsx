import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RoleSelector from './context/RoleSelector.jsx';
import { RegisterPage, Home, Courses, Teachers, Students, Topics, Schedules, Profile, Rates, MySchedules } from './pages/index.js'

import Protected from './context/protectedRoute';
import { Admin, All, Teacher } from './context/Admin.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route element={<Protected />}>
            <Route path='/roles' element={<RoleSelector />} />
            <Route element={<All />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/schedules' element={<Schedules />} />
              <Route path='/myschedules' element={<MySchedules />} />
              <Route element={<Teacher />}>
                <Route path='/Rates' element={<Rates />} />
                <Route element={<Admin />}>
                  <Route path='/courses' element={<Courses />} />
                  <Route path='/students' element={<Students />} />
                  <Route path='/teachers' element={<Teachers />} />
                  <Route path='/topics' element={<Topics />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App