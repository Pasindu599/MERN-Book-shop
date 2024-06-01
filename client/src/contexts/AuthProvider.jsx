import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

import app from "../firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { deleteUser } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   const authInfo = {
  //     createUser,
  //   };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      setUser(currentUser);
      // console.log(currentUser, "currentUser");
      // console.log(user, "user");
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const deleteUserAccount = () => {
    setLoading(true);
    return deleteUser(auth.currentUser);
  };

  return (
    <AuthContext.Provider
      value={{
        createUser,
        user,
        loginWithGoogle,
        loading,
        login,
        logout,
        deleteUserAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
