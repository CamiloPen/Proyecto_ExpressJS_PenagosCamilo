import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming AuthContext provides isAuthenticated and user.rol

function Navbar() {
    // Destructure isAuthenticated and user from the AuthContext
    const { isAuthenticated, user } = useAuth();

    // It's important to consider that 'user.rol' might be undefined
    // initially, especially if the role is selected on a separate page
    // like '/roles' after initial authentication.
    // The Navbar will only show role-specific links once 'user.rol' is set.
    return (
        <header className="main-header bg-gray-800 text-white p-4 shadow-md rounded-b-lg">
            <div className="header-container container mx-auto flex justify-between items-center">
                {/* Application Title/Logo */}
                <h1 className="text-2xl font-bold text-blue-300">ACME SCHOOL</h1>
                
                {/* Navigation Menu */}
                <nav>
                    <ul className="nav-menu flex space-x-6">
                        {isAuthenticated ? (
                            <>
                                {/* Links visible to ALL authenticated users */}
                                <li>
                                    <Link to='/profile' className="hover:text-blue-400 transition duration-300 ease-in-out">Mi Perfil</Link>
                                </li>
                                <li>
                                    <Link to='/schedules' className="hover:text-blue-400 transition duration-300 ease-in-out">Cursos Programados</Link>
                                </li>
                                {/* This link is crucial if the role is selected after login */}
                                <li>
                                    <Link to='/roles' className="hover:text-blue-400 transition duration-300 ease-in-out">Selector de Rol</Link> 
                                </li>

                                {/* Links specific to Admin role */}
                                {user && user.rol === 'AD' && ( // Ensure user object exists before accessing rol
                                    <>
                                        <li>
                                            <Link to='/courses' className="hover:text-blue-400 transition duration-300 ease-in-out">Cursos</Link>
                                        </li>
                                        <li>
                                            <Link to='/students' className="hover:text-blue-400 transition duration-300 ease-in-out">Estudiantes</Link>
                                        </li>
                                        <li>
                                            <Link to='/teachers' className="hover:text-blue-400 transition duration-300 ease-in-out">Profesores</Link>
                                        </li>
                                        <li>
                                            <Link to='/topics' className="hover:text-blue-400 transition duration-300 ease-in-out">Temas</Link>
                                        </li>
                                        <li>
                                            <Link to='/rates' className="hover:text-blue-400 transition duration-300 ease-in-out">Calificaciones</Link>
                                        </li>
                                    </>
                                )}

                                {/* Add specific links for other roles if you have them */}
                                {/* Example: Links for Teachers (if their role is 'teacher') */}
                                {user && user.rol === 'TE' && (
                                    <>
                                        <li>
                                            <Link to='/teacher-dashboard' className="hover:text-blue-400 transition duration-300 ease-in-out">Dashboard Profesor</Link>
                                        </li>
                                        {/* Add more teacher-specific links here */}
                                    </>
                                )}

                                {/* Example: Links for Students (if their role is 'student') */}
                                {user && user.rol === 'ST' && (
                                    <>
                                        <li>
                                            <Link to='/student-dashboard' className="hover:text-blue-400 transition duration-300 ease-in-out">Dashboard Estudiante</Link>
                                        </li>
                                        {/* Add more student-specific links here */}
                                    </>
                                )}

                                {/* You might also want a logout button here */}
                                {/* <li>
                                    <button onClick={logoutFunction} className="hover:text-blue-400 transition duration-300 ease-in-out">Cerrar Sesión</button>
                                </li> */}
                            </>
                        ) : (
                            <>
                                {/* Links visible to UNauthenticated users */}
                                <li>
                                    <Link to='/' className="hover:text-blue-400 transition duration-300 ease-in-out">Inicio</Link>
                                </li>
                                <li>
                                    <Link to='/register' className="hover:text-blue-400 transition duration-300 ease-in-out">Registrarse</Link>
                                </li>
                                {/* Assuming you have a login page */}
                                <li>
                                    <Link to='/login' className="hover:text-blue-400 transition duration-300 ease-in-out">Iniciar Sesión</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
