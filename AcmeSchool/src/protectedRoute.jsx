import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"

function Protected() {
    const {user, isAuthenticated} = useAuth()

    if (!isAuthenticated) {
        return <Navigate to='/' />
    }

    if (!user.rol.includes('AD')) {
        console.log('nelson')
        return <Navigate to='/' />
    }

    return <Outlet />
}

export default Protected