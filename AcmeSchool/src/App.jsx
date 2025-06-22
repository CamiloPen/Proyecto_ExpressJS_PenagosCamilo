import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/register';
import Home from './pages/home';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/courses' element={<h1>Courses</h1>} />
          <Route path='/teachers' element={<h1>Teachers</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App