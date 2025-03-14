import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const storedUser = localStorage.getItem('userInfo');
    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

    useEffect(() => {
        // Listen for changes in localStorage (when another tab updates userInfo)
        const handleStorageChange = () => {
            const updatedUser = localStorage.getItem("userInfo");
            //console.log('JKJ'+updatedUser);
            setUser(updatedUser ? JSON.parse(updatedUser) : null);
        };
        
        
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);


    const login = (user) => {
        localStorage.setItem('userInfo', JSON.stringify(user));
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
