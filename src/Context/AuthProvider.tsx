import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { User } from "firebase/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}
type AuthContextType = {
  user?: User;
  setCurrentUser:(name: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  setCurrentUser:()=>{}
});

// Authentication provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const values = { user: currentUser, setCurrentUser: setCurrentUser };

  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
