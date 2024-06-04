import React, { createContext, useEffect, useState, useCallback } from "react";
import { getAuth } from "firebase/auth";

import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import { json } from "react-router-dom";

export const AuthContext = createContext({
  createUser: () => {},
  user: null,
  loginWithGoogle: () => {},
  loading: true,
  login: () => {},
  logout: () => {},
  deleteUserAccount: () => {},
  token: false,
  changeToken: () => {},
});
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

let logoutTimer;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState(null);

  const createUser = useCallback((email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }, []);

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = useCallback(() => {
    setLoading(true);
    localStorage.removeItem("token_data");
    setToken(null);
    setTokenExpiry(null);
    console.log("logout");
    return signOut(auth);
  }, []);

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const deleteUserAccount = () => {
    setLoading(true);
    return deleteUser(auth.currentUser);
  };

  const changeToken = useCallback((token, expiration_date) => {
    setToken(token);
    const tokenExpiry =
      expiration_date || new Date(new Date().getTime() + 1000 * 3600);

    setTokenExpiry(tokenExpiry);
    localStorage.setItem(
      "token_data",
      JSON.stringify({ token: token, expiration: tokenExpiry.toISOString() })
    );
  }, []);

  useEffect(() => {
    if (token && tokenExpiry) {
      const remainnig_time = tokenExpiry.getTime() - new Date().getTime();
      console.log(remainnig_time, "remainnig_time");
      logoutTimer = setTimeout(logout, remainnig_time);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpiry]);

  useEffect(() => {
    console.log("useEffect");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("onAuthStateChanged");
      setUser(currentUser);
      console.log(currentUser, "currentUser");
      // console.log(user, "user");
      const local_token_data = JSON.parse(localStorage.getItem("token_data"));
      if (
        local_token_data &&
        local_token_data.token &&
        new Date(local_token_data.expiration) > new Date()
      ) {
        changeToken(
          local_token_data.token,
          new Date(local_token_data.expiration)
        );
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [setUser, setLoading, setToken, changeToken]);

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
        token,
        changeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
