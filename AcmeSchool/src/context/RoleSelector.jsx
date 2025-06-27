import { useEffect } from 'react';
import { useAuth } from "./AuthContext"
import { useNavigate } from 'react-router-dom';

function RoleSelector() {
    const { user } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        if (user.rol.length === 1) {
            user.rol = user.rol[0];
            navigate('/profile')
        }
    }, [user]);

    return (
        <div className="container-home">
            <h2>Antes de continuar por favor <br/> Selecciona tu rol</h2>
            <div className='container-buttons'>
                {user.rol.map(role => (
                <button
                    key={role}
                    onClick={() => {
                        user.rol = role
                        navigate('/profile')
                        console.log(user)
                    }}
                >
                    {role == "AD" ? ("Admin") : (role == "ST" ? ("Estudiante") : ("Profesor"))}
                </button>
            ))}
            </div>
        </div>
    );
}

export default RoleSelector