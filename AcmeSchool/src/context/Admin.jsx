import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"

function Admin() {
    const { user } = useAuth()
    if (user.rol != "AD" ) {
        return <Navigate to='/schedules'/>
    }

    return <Outlet />
}

function All() {
    const { user } = useAuth()
    if (typeof user.rol != "string" ) {
        return <Navigate to='/roles'/>
    }

    return <Outlet />
}

function Teacher() {
    const { user } = useAuth()
    if (user.rol == "ST" ) {
        return <Navigate to='/schedules'/>
    }

    return <Outlet />
}

export {Admin, All, Teacher} 