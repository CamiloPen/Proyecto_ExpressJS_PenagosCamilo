import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"

function Admin() {
    const { user } = useAuth()
    if (user.rol != "AD" ) {
        return <Navigate to='/schedules'/>
    }

    return <Outlet />
}

export default Admin  