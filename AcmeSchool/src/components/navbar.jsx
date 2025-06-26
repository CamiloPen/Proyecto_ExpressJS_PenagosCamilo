import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { isAuthenticated, user } = useAuth()

    return (
        <header className="main-header">
            <div className="header-container">
                <h1>ACME SCHOOL</h1>
                <nav>
                    <ul className="nav-menu">
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
                                <li>
                                    <Link to='/rates'>Calificaciones</Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                que mas ve
                            </li>)}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar