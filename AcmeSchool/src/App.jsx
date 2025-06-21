import { BrowserRouter, Routes, Route} from 'react-router-dom';
import RegisterPage from './pages/register';
import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/regsiter' element = {<RegisterPage/>} />
        <Route path='/courses' element = {<h1>Courses</h1>} />
        <Route path='/teachers' element = {<h1>Teachers</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App