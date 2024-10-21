import { Outlet, useNavigate } from "react-router-dom"
import { ContextUserProvider } from "./context/ContextUser"
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export const Protected = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        if(!token) navigate("/login")
    }, [token])

    return(
        <ContextUserProvider>
            {
                token? <Outlet />: "não autorizado"
            }
            
        </ContextUserProvider>
    )
}