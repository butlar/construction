import React from 'react'
import { useContext } from 'react'
import { AuthContext } from './../backend/context/Auth';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    
    const { user } = useContext(AuthContext);

    if (!user) {
        //console.log('NOT log');
        return <Navigate to='/admin/login'/>
    }
    // else {
    //     console.log('YES');
    // }
    return children;
}

export default RequireAuth
