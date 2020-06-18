import React, { useEffect, useState } from "react";
import app from './firebaseConfig'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // const [token,setToken] = useState(null);
  const [pending, setPending] = useState(true);
  useEffect(() => {
    // function storeUser(user){
    //   setCurrentUser(user);
    //   setPending(false)
    // }
    console.log(localStorage.getItem('user'))
    setCurrentUser(localStorage.getItem('user'));
    setPending(false);

    // app.auth().onAuthStateChanged((user) => {
    //   setCurrentUser(user)
    //   setPending(false)
    // });
  }, []);
  // function add

  if (pending) {
    return <>Loading...</>
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
};