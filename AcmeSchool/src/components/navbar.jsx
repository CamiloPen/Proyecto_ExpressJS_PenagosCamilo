import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { isAuthenticated } = useAuth()

    return (
        <nav>
            <h1>ACME SCHOOL</h1>
            <ul>
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to='/courses'>Cursos</Link>
                        </li>
                        <li>
                            <Link to='/schedules'>Cursos Programados</Link>
                        </li>
                        <li>
                            <Link to='/teachers'>Profesores</Link>
                        </li>
                        <li>
                            <Link to='/topics'>Temas</Link>
                        </li>
                        <li>
                            <Link to='/students'>Estudiantes</Link>
                        </li>
                    </>
                ) : (
                    <li>
                        que mas ve
                    </li>)}
            </ul>
        </nav>
    )
}

export default Navbar