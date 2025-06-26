import { useState, useEffect } from 'react';
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
        <div className="container">
            <h2 className="text-xl font-bold mb-4">Selecciona tu rol</h2>
            {user.rol.map(role => (
                <button
                    key={role}
                    onClick={() => {
                        user.rol = role
                        navigate('/profile')
                    }}
                    className="block w-full my-2 bg-blue-500 text-white py-2 rounded"
                >
                    {role.toUpperCase()}
                </button>
            ))}
        </div>
    );
}

export default RoleSelector