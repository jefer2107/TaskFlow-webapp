import { createContext } from "react";
import { jwtDecode } from "jwt-decode";

export interface contextProps{
    payload:any
}

export const contextUser = createContext<contextProps | null>(null)

export const ContextUserProvider = ({ children }:any) => {
    const token = localStorage.getItem("token")
    const payload:any = token? jwtDecode(token): null

    const valuesContext:contextProps = {
        payload: { 
            id: parseInt(payload?.Id), 
            name: payload?.Name, 
            email: payload?.Email 
        }
    }
    
    return(
        <contextUser.Provider
        value={valuesContext}
        >
            
            {children}
        </contextUser.Provider>
    )
}