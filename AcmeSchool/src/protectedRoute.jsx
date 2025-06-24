import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"

function Protected() {
    const {user, isAuthenticated} = useAuth()

    if (!isAuthenticated) return <Navigate to='/' />

    return <Outlet />
}

export default Protected