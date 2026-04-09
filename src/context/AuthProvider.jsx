import React from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({children}) => {
  const authData={

  }
  return <AuthContext.Provider value={authData}>
    {children}

  </AuthContext.Provider>
 
};

export default AuthProvider;