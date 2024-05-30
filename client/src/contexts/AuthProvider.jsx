import React, { createContext, useState } from "react";
import { getAuth } from "firebase/auth";

import app from "../firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   const authInfo = {
  //     createUser,
  //   };

  return (
    <AuthContext.Provider value={{ createUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
