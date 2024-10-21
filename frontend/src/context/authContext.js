import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username,setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, setIsLoggedIn,setLoading,setUsername,username }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
