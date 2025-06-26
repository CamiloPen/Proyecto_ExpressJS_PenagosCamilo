import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"

function Protected() {
    const { isAuthenticated} = useAuth()

    if (!isAuthenticated) {
        return <Navigate to='/' />
    }

    return <Outlet />
}

export default Protected   