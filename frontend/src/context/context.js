import React from 'react'
import { createContext,useState } from 'react'

export const Authcontext=createContext();

export const AuthProvider = ({ children }) => {
    const [email ,setemail]=useState(null);
    const [Role,setrole]=useState('user');
   
    return(
        <Authcontext.Provider value={{email , Role, setemail, setrole}}>
            {children}
        </Authcontext.Provider>
    )
}