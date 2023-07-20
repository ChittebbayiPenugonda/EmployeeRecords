import { auth } from './config/firebase';
import {useEffect, useState} from 'react';

import {createContext} from 'react';

export const AuthContext = createContext({});
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setPending(false);
        });
    },[]);

    if(pending){
        return (<p>Loading...</p>);
    }


    return (  
        <AuthContext.Provider
        value={{
            currentUser
        }}
        >
            {children}
        </AuthContext.Provider>
    );
}
 
