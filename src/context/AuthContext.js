import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

//create provider
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  //check weather we have user or not
  useEffect(() => {
    //onAuthStateChanged function
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {/* children mean, our components that mean our app */}
      {/* our app can be user currentUser */}
      {children}
    </AuthContext.Provider>
  );
};
